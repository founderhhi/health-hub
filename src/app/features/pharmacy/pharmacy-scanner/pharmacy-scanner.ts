import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';
import { ProfileButtonComponent } from '../../../shared/components/profile-button/profile-button';
import { BottomNavComponent, PHARMACY_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

interface RecentScan {
  code: string;
  timeLabel: string;
  timestamp: number;
  isDemo?: boolean;
}

interface PrescriptionItem {
  name: string;
  dosage: string;
  duration?: string;
  quantity?: string;
  maxDosage?: string;
}

interface PrescriptionView {
  id?: string;
  code: string;
  patientName: string;
  doctorName: string;
  dateIssued: string;
  medications: PrescriptionItem[];
  instructions: string;
  isDemo?: boolean;
}

const RECENT_SCANS_STORAGE_KEY = 'hhi_pharmacy_recent_scans';

const DEFAULT_RECENT_SCANS: RecentScan[] = [
  { code: 'RX-2024-001892', timeLabel: '2 min ago', timestamp: Date.now() - 2 * 60 * 1000 },
  { code: 'RX-2024-001891', timeLabel: '15 min ago', timestamp: Date.now() - 15 * 60 * 1000 },
  { code: 'RX-2024-001890', timeLabel: '1 hour ago', timestamp: Date.now() - 60 * 60 * 1000 }
];

const DEMO_PRESCRIPTION: PrescriptionView = {
  code: 'RX-DEMO-TEST-001',
  patientName: 'Test Patient T.',
  doctorName: 'Dr. Demo Doctor',
  dateIssued: 'Today',
  medications: [
    {
      name: 'Amoxicillin 500mg',
      dosage: '1 capsule, 3 times daily',
      duration: '7 days',
      quantity: '21 capsules'
    },
    {
      name: 'Ibuprofen 400mg',
      dosage: '1 tablet as needed for pain',
      maxDosage: 'Maximum 3 times daily',
      quantity: '12 tablets'
    }
  ],
  instructions: 'Take with food. Complete the full course of antibiotics even if symptoms improve. Do not take ibuprofen on an empty stomach.',
  isDemo: true
};

@Component({
  selector: 'app-pharmacy-scanner',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProfileButtonComponent, BottomNavComponent],
  templateUrl: './pharmacy-scanner.html',
  styleUrl: './pharmacy-scanner.scss',
})
export class PharmacyScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cameraVideo') cameraVideo?: ElementRef<HTMLVideoElement>;

  code = '';
  inlineMessage = '';
  inlineMessageType: 'error' | 'info' = 'error';
  toastMessage = '';
  cameraActive = false;
  permissionDenied = false;
  cameraError = '';
  recentScans: RecentScan[] = [];
  selectedPrescription: PrescriptionView | null = null;
  profileInitials = '';
  scanSuccess = false;
  PHARMACY_TABS = PHARMACY_TABS;

  private stream: MediaStream | null = null;
  private inlineMessageTimer: ReturnType<typeof setTimeout> | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private pharmacyApi: PharmacyApiService, private router: Router) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.profileInitials = this.getInitials(localStorage.getItem('hhi_display_name') || '');
      this.loadRecentScans();
    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
    this.clearTimers();
  }

  openProfile(): void {
    this.router.navigate(['/pharmacy/profile']);
  }

  async requestCameraAccess(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !navigator.mediaDevices?.getUserMedia) {
      this.cameraError = 'Camera access is unavailable in this browser environment.';
      return;
    }

    if (this.cameraActive) {
      return;
    }

    this.cameraError = '';
    this.permissionDenied = false;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      this.cameraActive = true;
      const video = this.cameraVideo?.nativeElement;
      if (video) {
        video.srcObject = this.stream;
      }
    } catch (error: unknown) {
      const errorName = (error as { name?: string })?.name;
      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        this.permissionDenied = true;
        return;
      }
      this.cameraError = 'Unable to access camera. Please check camera permissions and device settings.';
    }
  }

  manualLookup(): void {
    const trimmedCode = this.code.trim();
    if (!trimmedCode) {
      this.showInlineMessage('Enter a prescription code.', 'error');
      return;
    }

    if (trimmedCode.toUpperCase() === DEMO_PRESCRIPTION.code) {
      this.scanSuccess = true;
      setTimeout(() => {
        this.scanSuccess = false;
        this.selectedPrescription = DEMO_PRESCRIPTION;
        this.inlineMessage = '';
      }, 800);
      return;
    }

    if (this.recentScans.some((scan) => scan.code.toUpperCase() === trimmedCode.toUpperCase())) {
      this.showInlineMessage('Order dispensed', 'info');
      return;
    }

    this.inlineMessage = '';
    this.pharmacyApi.lookupByCode(trimmedCode).subscribe({
      next: (response) => {
        const prescription = response.prescription;
        const status = String(prescription?.status || '').toLowerCase();

        if (status === 'claimed' || status === 'dispensed') {
          this.showInlineMessage('This prescription has already been dispensed', 'info');
          return;
        }

        this.scanSuccess = true;
        setTimeout(() => {
          this.scanSuccess = false;
          this.selectedPrescription = this.mapPrescriptionToView(prescription, trimmedCode);
        }, 800);
      },
      error: () => {
        this.showInlineMessage('Prescription not found. Please check the code and try again.', 'error');
      }
    });
  }

  markAsDispensed(): void {
    if (!this.selectedPrescription) {
      return;
    }

    if (this.selectedPrescription.isDemo) {
      this.showToast('Demo prescription dispensed (test mode)');
      this.addRecentScan(this.selectedPrescription.code, true);
      this.closePrescriptionDialog();
      return;
    }

    if (!this.selectedPrescription.id) {
      this.showInlineMessage('Unable to dispense this prescription.', 'error');
      return;
    }

    this.pharmacyApi.claim(this.selectedPrescription.id).subscribe({
      next: () => {
        this.addRecentScan(this.selectedPrescription!.code);
        this.showToast('Prescription dispensed successfully');
        this.closePrescriptionDialog();
      },
      error: () => {
        this.showInlineMessage('Unable to mark this prescription as dispensed.', 'error');
      }
    });
  }

  closePrescriptionDialog(): void {
    this.selectedPrescription = null;
    this.code = '';
  }

  closeInlineMessage(): void {
    this.inlineMessage = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedPrescription) {
      this.closePrescriptionDialog();
    }
  }

  private addRecentScan(code: string, isDemo = false): void {
    const scan: RecentScan = {
      code,
      isDemo,
      timestamp: Date.now(),
      timeLabel: 'Just now'
    };

    const deduped = this.recentScans.filter((item) => item.code !== code);
    this.recentScans = [scan, ...deduped].slice(0, 8);
    this.persistRecentScans();
  }

  private loadRecentScans(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const saved = localStorage.getItem(RECENT_SCANS_STORAGE_KEY);
    if (!saved) {
      this.recentScans = DEFAULT_RECENT_SCANS;
      this.persistRecentScans();
      return;
    }

    try {
      const parsed = JSON.parse(saved) as RecentScan[];
      this.recentScans = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RECENT_SCANS;
    } catch {
      this.recentScans = DEFAULT_RECENT_SCANS;
    }
  }

  private persistRecentScans(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(RECENT_SCANS_STORAGE_KEY, JSON.stringify(this.recentScans));
  }

  private mapPrescriptionToView(prescription: any, enteredCode: string): PrescriptionView {
    const items = Array.isArray(prescription?.items)
      ? prescription.items.map((item: any) => ({
        name: item?.name || 'Medication',
        dosage: item?.dosage || item?.frequency || 'As directed',
        duration: item?.duration,
        quantity: item?.quantity
      }))
      : [];

    const patient = String(prescription?.patient_name || prescription?.patient_id || 'Patient');

    return {
      id: prescription?.id,
      code: prescription?.code || enteredCode,
      patientName: this.maskPatientName(patient),
      doctorName: prescription?.doctor_name || 'Dr. Michael Smith',
      dateIssued: prescription?.created_at ? new Date(prescription.created_at).toLocaleDateString() : 'Today',
      medications: items,
      instructions: prescription?.notes || 'Take as directed by your doctor.'
    };
  }

  private maskPatientName(value: string): string {
    const parts = value.trim().split(' ').filter(Boolean);
    if (parts.length < 2) {
      return value;
    }
    return `${parts[0]} ${parts[1].charAt(0)}.`;
  }

  private showInlineMessage(message: string, type: 'error' | 'info'): void {
    this.inlineMessage = message;
    this.inlineMessageType = type;
    if (this.inlineMessageTimer) {
      clearTimeout(this.inlineMessageTimer);
    }
    this.inlineMessageTimer = setTimeout(() => {
      this.inlineMessage = '';
    }, 3000);
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
    }, 2500);
  }

  private stopCamera(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.cameraActive = false;
  }

  private clearTimers(): void {
    if (this.inlineMessageTimer) {
      clearTimeout(this.inlineMessageTimer);
    }
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  private getInitials(value: string): string {
    if (!value.trim()) {
      return '';
    }
    return value
      .split(' ')
      .map((item) => item.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
