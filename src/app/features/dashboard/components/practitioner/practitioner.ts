import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GpApiService } from '../../../../core/api/gp.service';
import { PrescriptionsApiService } from '../../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../../core/api/referrals.service';
import { WsService } from '../../../../core/realtime/ws.service';

interface QueuePatient {
  id: string;
  patientId?: string;
  name: string;
  priority: 'routine' | 'urgent' | 'emergency';
  waitTime: string;
  mode: 'video' | 'audio' | 'chat';
  aiSummary?: string;
  accepted?: boolean;
}

interface DashboardStats {
  waiting: number;
  active: number;
  completed: number;
  avgTime: number;
}

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface ReferralFormData {
  specialty: string;
  urgency: string;
  reason: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationMode: 'online' | 'offline';
  location: string;
}

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './practitioner.html',
  styleUrl: './practitioner.scss',
})
export class Practitioner implements OnInit, OnDestroy {
  today = new Date();
  isRefreshing = false;
  refreshCountdown = 10;
  private refreshInterval: any;
  private countdownInterval: any;

  stats: DashboardStats = {
    waiting: 5,
    active: 2,
    completed: 12,
    avgTime: 18
  };

  queue: QueuePatient[] = [];

  // ── Prescription Modal State ──
  showPrescriptionModal = false;
  prescriptionPatientId = '';
  prescriptionItems: PrescriptionItem[] = [
    { name: '', dosage: '', frequency: '', duration: '' }
  ];

  // ── Referral Modal State ──
  showReferralModal = false;
  referralPatientId = '';
  referralForm: ReferralFormData = {
    specialty: '',
    urgency: 'routine',
    reason: '',
    appointmentDate: '',
    appointmentTime: '',
    consultationMode: 'online' as 'online' | 'offline',
    location: ''
  };

  SPECIALTIES = [
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'ENT',
    'Ophthalmology'
  ];

  constructor(
    private router: Router,
    private gpApi: GpApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private referralsApi: ReferralsApiService,
    private ws: WsService
  ) {}

  ngOnInit(): void {
    this.startAutoRefresh();
    this.loadQueue();
    this.ws.connect('gp');
    this.ws.events$.subscribe((event) => {
      if (event.event === 'queue.updated') {
        this.loadQueue();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }

  /**
   * Start auto-refresh countdown
   */
  private startAutoRefresh(): void {
    this.countdownInterval = setInterval(() => {
      this.refreshCountdown--;
      if (this.refreshCountdown <= 0) {
        this.refreshQueue();
        this.refreshCountdown = 10;
      }
    }, 1000);
  }

  /**
   * Stop auto-refresh
   */
  private stopAutoRefresh(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  /**
   * Refresh the queue
   */
  refreshQueue(): void {
    this.isRefreshing = true;
    this.loadQueue();
  }

  private loadQueue(): void {
    this.gpApi.getQueue().subscribe({
      next: (response) => {
        const now = Date.now();
        this.queue = response.queue.map((item: any) => {
          const createdAt = new Date(item.created_at).getTime();
          const minutes = Math.max(1, Math.floor((now - createdAt) / 60000));
          return {
            id: item.id,
            patientId: item.patient_id,
            name: item.display_name || 'Patient',
            priority: 'routine',
            waitTime: `${minutes} min`,
            mode: item.mode || 'video',
            aiSummary: item.symptoms?.complaint || 'Consultation request'
          } as QueuePatient;
        });
        this.stats.waiting = this.queue.length;
        this.isRefreshing = false;
      },
      error: () => {
        this.isRefreshing = false;
      }
    });
  }

  /**
   * Accept a patient from the queue
   */
  acceptPatient(patientId: string): void {
    this.gpApi.acceptRequest(patientId).subscribe({
      next: (response) => {
        if (response.roomUrl) {
          window.open(response.roomUrl, '_blank');
        }
        const item = this.queue.find((p) => p.id === patientId);
        if (item) {
          item.accepted = true;
        }
      }
    });
  }

  // ── Prescription Modal Methods ──

  prescribe(patientId?: string): void {
    if (!patientId) {
      return;
    }
    this.prescriptionPatientId = patientId;
    this.prescriptionItems = [{ name: '', dosage: '', frequency: '', duration: '' }];
    this.showPrescriptionModal = true;
  }

  addPrescriptionItem(): void {
    this.prescriptionItems.push({ name: '', dosage: '', frequency: '', duration: '' });
  }

  removePrescriptionItem(index: number): void {
    if (this.prescriptionItems.length > 1) {
      this.prescriptionItems.splice(index, 1);
    }
  }

  submitPrescription(): void {
    const validItems = this.prescriptionItems.filter(
      (item) => item.name.trim() && item.dosage.trim()
    );
    if (validItems.length === 0) {
      return;
    }
    this.prescriptionsApi.create(this.prescriptionPatientId, validItems).subscribe({
      next: () => {
        this.closePrescriptionModal();
      },
      error: (err) => {
        console.error('Failed to create prescription:', err);
      }
    });
  }

  closePrescriptionModal(): void {
    this.showPrescriptionModal = false;
    this.prescriptionPatientId = '';
    this.prescriptionItems = [{ name: '', dosage: '', frequency: '', duration: '' }];
  }

  // ── Referral Modal Methods ──

  referToSpecialist(patientId?: string): void {
    if (!patientId) {
      return;
    }
    this.referralPatientId = patientId;
    this.referralForm = {
      specialty: '',
      urgency: 'routine',
      reason: '',
      appointmentDate: '',
      appointmentTime: '',
      consultationMode: 'online',
      location: ''
    };
    this.showReferralModal = true;
  }

  submitReferral(): void {
    if (!this.referralForm.specialty || !this.referralForm.reason.trim()) {
      return;
    }
    this.referralsApi.createReferral(
      this.referralPatientId,
      this.referralForm.urgency,
      this.referralForm.reason,
      {
        specialty: this.referralForm.specialty,
        appointmentDate: this.referralForm.appointmentDate || undefined,
        appointmentTime: this.referralForm.appointmentTime || undefined,
        consultationMode: this.referralForm.consultationMode,
        location: this.referralForm.consultationMode === 'offline'
          ? this.referralForm.location
          : undefined
      }
    ).subscribe({
      next: () => {
        this.closeReferralModal();
      },
      error: (err) => {
        console.error('Failed to create referral:', err);
      }
    });
  }

  closeReferralModal(): void {
    this.showReferralModal = false;
    this.referralPatientId = '';
    this.referralForm = {
      specialty: '',
      urgency: 'routine',
      reason: '',
      appointmentDate: '',
      appointmentTime: '',
      consultationMode: 'online',
      location: ''
    };
  }

  // ── Other Actions ──

  /**
   * View patient details (route does not exist yet)
   */
  viewDetails(patientId: string): void {
    alert('Patient details view is not available yet.');
  }

  /**
   * Skip a patient in the queue
   */
  skipPatient(patientId: string): void {
    console.log('Skipping patient:', patientId);
    // Move patient to end of queue
    const index = this.queue.findIndex(p => p.id === patientId);
    if (index > -1) {
      const patient = this.queue.splice(index, 1)[0];
      this.queue.push(patient);
    }
  }

  /**
   * View profile
   */
  viewProfile(): void {
    this.router.navigate(['/dashboard/practitioner/profile']);
  }

  /**
   * Start break
   */
  startBreak(): void {
    console.log('Starting break');
  }

  /**
   * View schedule (route may not exist)
   */
  viewSchedule(): void {
    console.log('Schedule view not available yet');
  }

  /**
   * View patients (route may not exist)
   */
  viewPatients(): void {
    console.log('Patients view not available yet');
  }

  /**
   * Open settings (route may not exist)
   */
  openSettings(): void {
    console.log('Settings view not available yet');
  }

  /**
   * View history (route may not exist)
   */
  viewHistory(): void {
    console.log('History view not available yet');
  }
}
