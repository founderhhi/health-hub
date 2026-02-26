import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

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
  error: string | null = null;
  selectedRx: Prescription | null = null;

  prescriptions: Prescription[] = [];
  labOrders: LabOrder[] = [];

  constructor(
    public router: Router,
    private patientApi: PatientApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    let prescriptionsLoaded = false;
    let labOrdersLoaded = false;

    const checkDone = () => {
      if (prescriptionsLoaded && labOrdersLoaded) {
        this.loading = false;
      }
    };

    this.prescriptionsApi.listForPatient().subscribe({
      next: (res) => {
        this.prescriptions = (res.prescriptions || []).map(p => ({
          ...p,
          items: this.parseJsonArray<PrescriptionItem>(p.items)
        }));
        prescriptionsLoaded = true;
        checkDone();
      },
      error: (err) => {
        console.error('Failed to load prescriptions:', err);
        this.error = 'Failed to load health records. Please try again.';
        prescriptionsLoaded = true;
        checkDone();
      }
    });

    this.patientApi.getLabOrders().subscribe({
      next: (res) => {
        this.labOrders = (res.orders || []).map(o => ({
          ...o,
          tests: this.parseJsonArray<string>(o.tests)
        }));
        labOrdersLoaded = true;
        checkDone();
      },
      error: (err) => {
        console.error('Failed to load lab orders:', err);
        this.error = 'Failed to load health records. Please try again.';
        labOrdersLoaded = true;
        checkDone();
      }
    });
  }

  setTab(tab: 'prescriptions' | 'lab-results'): void {
    this.activeTab = tab;
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
}
