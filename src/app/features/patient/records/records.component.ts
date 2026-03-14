import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { timeout } from 'rxjs';

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Prescription {
  id: string;
  code: string;
  items: PrescriptionItem[];
  status: string;
  created_at: string;
}

interface LabOrder {
  id: string;
  tests: string[];
  status: string;
  result_notes: string | null;
  created_at: string;
  specialist_name: string | null;
}

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;
  activeTab: 'prescriptions' | 'lab-results' = 'prescriptions';
  loading = true;
  refreshing = false;
  error: string | null = null;
  warningMessage: string | null = null;
  selectedRx: Prescription | null = null;

  prescriptions: Prescription[] = [];
  labOrders: LabOrder[] = [];
  private readonly REQUEST_TIMEOUT_MS = 8000;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private patientApi: PatientApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) { }

  ngOnInit(): void {
    this.applyInitialTab();
    this.hydrateFromCache();
    this.loadData();
  }

  loadData(): void {
    const hasCachedSnapshot =
      this.prescriptionsApi.getCachedPatientPrescriptions() !== null ||
      this.patientApi.getCachedLabOrders() !== null;

    this.loading = !hasCachedSnapshot;
    this.refreshing = hasCachedSnapshot;
    this.error = null;
    this.warningMessage = null;

    let prescriptionsLoaded = false;
    let labOrdersLoaded = false;
    let prescriptionsFailed = false;
    let labOrdersFailed = false;

    const checkDone = () => {
      if (prescriptionsLoaded && labOrdersLoaded) {
        this.loading = false;
        this.refreshing = false;
        if (prescriptionsFailed && labOrdersFailed) {
          if (hasCachedSnapshot) {
            this.warningMessage = 'Showing your last loaded records. Refresh again when the network is stable.';
          } else {
            this.error = 'Failed to load health records. Please try again.';
          }
          return;
        }
        if (prescriptionsFailed || labOrdersFailed) {
          this.warningMessage = 'Some records could not be loaded. Please try again.';
        }
      }
    };

    this.prescriptionsApi.listForPatient().pipe(timeout(this.REQUEST_TIMEOUT_MS)).subscribe({
      next: (res) => {
        const prescriptions = Array.isArray(res?.prescriptions) ? res.prescriptions : [];
        this.prescriptions = prescriptions.map(p => ({
          ...p,
          items: this.parseJsonArray<PrescriptionItem>(p.items)
        }));
        prescriptionsLoaded = true;
        checkDone();
      },
      error: (err) => {
        console.error('Failed to load prescriptions:', err);
        prescriptionsFailed = true;
        this.prescriptions = [];
        prescriptionsLoaded = true;
        checkDone();
      }
    });

    this.patientApi.getLabOrders().pipe(timeout(this.REQUEST_TIMEOUT_MS)).subscribe({
      next: (res) => {
        const orders = Array.isArray(res?.orders) ? res.orders : [];
        this.labOrders = orders.map(o => ({
          ...o,
          tests: this.parseJsonArray<string>(o.tests)
        }));
        labOrdersLoaded = true;
        checkDone();
      },
      error: (err) => {
        console.error('Failed to load lab orders:', err);
        labOrdersFailed = true;
        this.labOrders = [];
        labOrdersLoaded = true;
        checkDone();
      }
    });
  }

  setTab(tab: 'prescriptions' | 'lab-results'): void {
    this.activeTab = tab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'claimed': return 'status-claimed';
      case 'fulfilled': return 'status-fulfilled';
      case 'completed': return 'status-completed';
      case 'ordered': return 'status-ordered';
      case 'in_progress': return 'status-in-progress';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'claimed': return 'Claimed';
      case 'fulfilled': return 'Fulfilled';
      case 'completed': return 'Completed';
      case 'ordered': return 'Ordered';
      case 'in_progress': return 'In Progress';
      default: return status;
    }
  }

  getLabStatusMessage(status: string): string {
    switch (status) {
      case 'completed': return 'Results available - contact your doctor';
      case 'in_progress': return 'In Progress';
      case 'ordered': return 'Ordered';
      default: return status;
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  retry(): void {
    this.loadData();
  }

  viewPrescription(rx: Prescription): void {
    this.selectedRx = rx;
  }

  closePrescription(): void {
    this.selectedRx = null;
  }

  private parseJsonArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
      return value as T[];
    }
    if (typeof value !== 'string' || !value.trim()) {
      return [];
    }

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }

  private applyInitialTab(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab === 'prescriptions' || tab === 'lab-results') {
      this.activeTab = tab;
    }
  }

  private hydrateFromCache(): void {
    const cachedPrescriptions = this.prescriptionsApi.getCachedPatientPrescriptions();
    if (cachedPrescriptions !== null) {
      this.prescriptions = cachedPrescriptions.map((item: any) => ({
        ...item,
        items: this.parseJsonArray<PrescriptionItem>(item.items)
      }));
      this.loading = false;
    }

    const cachedLabOrders = this.patientApi.getCachedLabOrders();
    if (cachedLabOrders !== null) {
      this.labOrders = cachedLabOrders.map((item: any) => ({
        ...item,
        tests: this.parseJsonArray<string>(item.tests)
      }));
      this.loading = false;
    }
  }
}
