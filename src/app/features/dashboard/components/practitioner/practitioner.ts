import { Component, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { GpApiService } from '../../../../core/api/gp.service';
import { PrescriptionsApiService } from '../../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../../core/api/referrals.service';
import { WsService } from '../../../../core/realtime/ws.service';
import { ConsultShellComponent, ConsultMode } from '../../../../shared/components/consult-shell/consult-shell';

interface QueuePatient {
  id: string;
  patientId?: string;
  name: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  priority: 'routine' | 'urgent' | 'emergency';
  waitTime: string;
  waitMinutes: number;
  mode: 'video' | 'audio' | 'chat';
  aiSummary?: string;
  accepted?: boolean;
  createdAt: string;
  status?: 'waiting' | 'active' | 'completed' | 'paused';
  symptoms?: string;
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

interface ConsultationHistory {
  id: string;
  patientName: string;
  diagnosis?: string;
  completedAt: string;
  duration?: number;
}

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConsultShellComponent],
  templateUrl: './practitioner.html',
  styleUrl: './practitioner.scss'
})
export class Practitioner implements OnInit, OnDestroy {
  @ViewChild(ConsultShellComponent) consultShellRef?: ConsultShellComponent;

  today = new Date();
  isRefreshing = false;
  refreshCountdown = 10;
  unavailableNotice = '';
  activeConsultRoomUrl = '';
  activeConsultationId = '';
  activeConsultMode: ConsultMode = 'video';
  activeConsultPatientName = '';
  showConsultShell = false;
  private refreshInterval: any;
  private countdownInterval: any;
  private timeoutCheckInterval: any;
  private wsSubscription?: Subscription;
  private platformId = inject(PLATFORM_ID);

  stats: DashboardStats = {
    waiting: 5,
    active: 2,
    completed: 12,
    avgTime: 18
  };

  queue: QueuePatient[] = [];
  filteredQueue: QueuePatient[] = [];

  // Filter states
  filterName = '';
  filterPriority: 'all' | 'routine' | 'urgent' | 'emergency' = 'all';
  filterMode: 'all' | 'video' | 'audio' | 'chat' = 'all';
  filterStatus: 'all' | 'waiting' | 'active' | 'completed' = 'all';

  // Operational status
  isOperating = true;

  // Consultation history
  consultationHistory: ConsultationHistory[] = [];
  showHistory = false;

  // ── Patient Details Modal State ──
  showPatientDetailsModal = false;
  selectedPatient: QueuePatient | null = null;

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
    this.startTimeoutChecker();
    this.loadConsultationHistory();
    this.ws.connect('gp');
    this.wsSubscription = this.ws.events$.subscribe((event) => {
      if (event.event === 'queue.updated') {
        this.loadQueue();
      } else if (event.event === 'consult.completed') {
        const data = event.data as any;
        const completedId = data?.consultationId || data?.consultation?.id || '';

        if (completedId && completedId === this.activeConsultationId) {
          this.showConsultShell = false;
          this.activeConsultRoomUrl = '';
          this.activeConsultationId = '';
          this.showUnavailableNotice('Consultation has ended.');
        }

        this.loadQueue();
        this.loadConsultationHistory();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
    this.stopTimeoutChecker();
    this.wsSubscription?.unsubscribe();
  }

  /**
   * Format patient name to "First L." format
   */
  formatPatientName(firstName?: string, lastName?: string, displayName?: string): string {
    // If we have display name from API, use it
    if (displayName && displayName.trim()) {
      return displayName;
    }

    // If we have first and last name, format as "First L."
    if (firstName && lastName) {
      const first = firstName.trim();
      const lastInitial = lastName.trim().charAt(0).toUpperCase();
      return `${first} ${lastInitial}.`;
    }

    // Fallback to first name only
    if (firstName) {
      return firstName.trim();
    }

    // Ultimate fallback
    return 'Unknown Patient';
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
   * Start 15-minute timeout checker
   */
  private startTimeoutChecker(): void {
    // Check every 30 seconds for patients exceeding 15 minutes
    this.timeoutCheckInterval = setInterval(() => {
      this.checkAndRemoveExpiredPatients();
    }, 30000);
  }

  /**
   * Stop timeout checker
   */
  private stopTimeoutChecker(): void {
    if (this.timeoutCheckInterval) {
      clearInterval(this.timeoutCheckInterval);
    }
  }

  /**
   * Check for and remove patients waiting > 15 minutes
   */
  private checkAndRemoveExpiredPatients(): void {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;

    this.queue = this.queue.filter(patient => {
      const createdAt = new Date(patient.createdAt).getTime();
      const waitTime = now - createdAt;

      if (waitTime > fifteenMinutes && patient.status === 'waiting') {
        // Patient has been waiting > 15 minutes - remove from queue
        this.removeFromQueue(patient.id, 'timeout');
        return false;
      }
      return true;
    });

    this.applyFilters();
  }

  /**
   * Remove patient from queue (timeout or manual delete)
   */
  private removeFromQueue(patientId: string, reason: 'timeout' | 'manual'): void {
    this.gpApi.deleteFromQueue(patientId, reason).subscribe({
      error: (err) => {
        console.error('Failed to remove patient from queue:', err);
      }
    });

    if (reason === 'timeout') {
      this.showUnavailableNotice('A patient was removed due to 15-minute timeout.');
    }
  }

  /**
   * Delete patient from queue (manual)
   */
  deletePatient(patientId: string): void {
    const patient = this.queue.find(p => p.id === patientId);
    if (!patient) return;

    // Remove from local queue immediately for responsive UI
    this.queue = this.queue.filter(p => p.id !== patientId);
    this.applyFilters();

    // Notify backend
    this.removeFromQueue(patientId, 'manual');

    this.showUnavailableNotice(`${patient.displayName} has been removed from the queue.`);
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
        const sourceQueue = Array.isArray(response?.queue) ? response.queue : [];

        // Render queue from backend response directly so UI stays aligned with API state.
        this.queue = sourceQueue
          .slice()
          .sort((a: any, b: any) => {
            const aCreatedAt = new Date(a?.created_at || 0).getTime();
            const bCreatedAt = new Date(b?.created_at || 0).getTime();
            return bCreatedAt - aCreatedAt;
          })
          .map((item: any) => {
            const createdAt = new Date(item?.created_at || now).getTime();
            const waitTimeMs = Math.max(0, now - createdAt);
            const minutes = Math.max(1, Math.floor(waitTimeMs / 60000));
            const displayName = this.formatPatientName(
              item.first_name,
              item.last_name,
              item.display_name
            );

            return {
              id: item.id,
              patientId: item.patient_id,
              name: displayName,
              displayName: displayName,
              firstName: item.first_name,
              lastName: item.last_name,
              priority: item.priority || 'routine',
              waitTime: `${minutes} min`,
              waitMinutes: minutes,
              mode: item.mode || 'video',
              aiSummary: item.symptoms?.complaint || item.ai_summary || 'Consultation request',
              status: item.status || 'waiting',
              createdAt: item.created_at,
              symptoms: item.symptoms?.description || item.symptoms
            } as QueuePatient;
          });

        this.stats.waiting = this.queue.length;
        this.isRefreshing = false;
        this.applyFilters();
      },
      error: () => {
        this.isRefreshing = false;
      }
    });
  }

  /**
   * Apply all filters to the queue
   */
  applyFilters(): void {
    this.filteredQueue = this.queue.filter(patient => {
      // Name filter
      if (this.filterName) {
        const searchTerm = this.filterName.toLowerCase();
        const patientName = patient.displayName.toLowerCase();
        if (!patientName.includes(searchTerm)) {
          return false;
        }
      }

      // Priority filter
      if (this.filterPriority !== 'all' && patient.priority !== this.filterPriority) {
        return false;
      }

      // Mode filter
      if (this.filterMode !== 'all' && patient.mode !== this.filterMode) {
        return false;
      }

      // Status filter
      if (this.filterStatus !== 'all' && patient.status !== this.filterStatus) {
        return false;
      }

      return true;
    });
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.filterName = '';
    this.filterPriority = 'all';
    this.filterMode = 'all';
    this.filterStatus = 'all';
    this.applyFilters();
  }

  /**
   * Accept a patient from the queue
   */
  acceptPatient(patientId: string): void {
    this.gpApi.acceptRequest(patientId).subscribe({
      next: (response) => {
        this.activeConsultRoomUrl =
          response.roomUrl || response.consultation?.daily_room_url || response.consultation?.roomUrl || '';
        this.activeConsultationId =
          response.consultation?.consultation_id ||
          response.consultation?.consultationId ||
          response.consultation?.id ||
          response.consultationId ||
          '';
        const item = this.queue.find((p) => p.id === patientId);
        if (item) {
          item.accepted = true;
          item.status = 'active';
          this.activeConsultMode = item.mode || 'video';
          this.activeConsultPatientName = item.displayName;
        }
        this.showConsultShell = true;
        this.applyFilters();
      }
    });
  }

  onEndConsultation(event: { notes: string }): void {
    if (!this.activeConsultationId) return;
    this.gpApi.completeConsultation(this.activeConsultationId, event.notes).subscribe({
      next: () => {
        this.showConsultShell = false;
        this.activeConsultRoomUrl = '';
        this.activeConsultationId = '';
        this.showUnavailableNotice('Consultation completed successfully.');
        this.loadQueue();
        this.loadConsultationHistory();
      },
      error: (err) => {
        console.error('Failed to end consultation:', err);
        this.showUnavailableNotice('Failed to end consultation. Please try again.');
        // Issue 5: Reset consult shell "ending" state so the button becomes usable again
        this.consultShellRef?.onEndError('Failed to end consultation. Please try again.');
      }
    });
  }

  onLeaveConsultShell(): void {
    this.showConsultShell = false;
  }

  /**
   * View patient details - opens modal
   */
  viewDetails(patient: QueuePatient): void {
    this.selectedPatient = patient;
    this.showPatientDetailsModal = true;
  }

  /**
   * Close patient details modal
   */
  closePatientDetailsModal(): void {
    this.showPatientDetailsModal = false;
    this.selectedPatient = null;
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
        this.showUnavailableNotice('Prescription created successfully.');
      },
      error: (err) => {
        console.error('Failed to create prescription:', err);
        this.showUnavailableNotice('Failed to create prescription. Please try again.');
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
        this.showUnavailableNotice('Referral created successfully.');
      },
      error: (err) => {
        console.error('Failed to create referral:', err);
        this.showUnavailableNotice('Failed to create referral. Please try again.');
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
   * Skip a patient in the queue
   */
  skipPatient(patientId: string): void {
    console.log('Skipping patient:', patientId);
    // Move patient to end of queue
    const index = this.queue.findIndex(p => p.id === patientId);
    if (index > -1) {
      const patient = this.queue.splice(index, 1)[0];
      this.queue.push(patient);
      this.applyFilters();
    }
  }

  /**
   * View profile
   */
  viewProfile(): void {
    this.router.navigate(['/gp/profile']);
  }

  /**
   * Start/End break
   */
  startBreak(): void {
    this.isOperating = !this.isOperating;
    this.showHistory = !this.isOperating;

    // Update operational status on backend
    this.gpApi.updateOperationalStatus(this.isOperating).subscribe({
      error: (err) => {
        console.error('Failed to update operational status:', err);
      }
    });

    if (this.isOperating) {
      this.showUnavailableNotice('You are now online and will receive new patients.');
    } else {
      this.showUnavailableNotice('You are now on break. No new patients will be added to your queue.');
    }
  }

  /**
   * Load consultation history
   */
  private loadConsultationHistory(): void {
    this.gpApi.getConsultationHistory().subscribe({
      next: (response) => {
        this.consultationHistory = response.history || [];
      },
      error: (err) => {
        console.error('Failed to load consultation history:', err);
      }
    });
  }

  /**
   * Delete consultation history record
   */
  deleteHistoryRecord(recordId: string): void {
    this.gpApi.deleteConsultationRecord(recordId).subscribe({
      next: () => {
        this.consultationHistory = this.consultationHistory.filter(r => r.id !== recordId);
      },
      error: (err) => {
        console.error('Failed to delete consultation record:', err);
      }
    });
  }

  /**
   * View schedule
   */
  viewSchedule(): void {
    this.showUnavailableNotice('Schedule view is coming soon.');
  }

  /**
   * View patients
   */
  viewPatients(): void {
    this.showUnavailableNotice('Patients view is coming soon.');
  }

  /**
   * View history
   */
  viewHistory(): void {
    this.showHistory = true;
  }

  dismissUnavailableNotice(): void {
    this.unavailableNotice = '';
  }

  closeEmbeddedConsultation(): void {
    this.activeConsultRoomUrl = '';
    this.activeConsultationId = '';
  }

  openConsultationInNewTab(): void {
    if (!this.activeConsultRoomUrl || !isPlatformBrowser(this.platformId)) {
      return;
    }
    window.open(this.activeConsultRoomUrl, '_blank');
  }

  private showUnavailableNotice(message: string): void {
    this.unavailableNotice = message;
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.unavailableNotice = '';
    }, 5000);
  }
}
