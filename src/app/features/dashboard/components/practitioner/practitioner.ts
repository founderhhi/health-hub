import { ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { GpApiService } from '../../../../core/api/gp.service';
import { ProviderProfileService } from '../../../../core/services/provider-profile.service';
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
  private readonly autoRefreshIntervalSeconds = 5;
  isRefreshing = false;
  refreshCountdown = this.autoRefreshIntervalSeconds;
  unavailableNotice = '';
  activeConsultRoomUrl = '';
  activeConsultationId = '';
  activeConsultPatientId = '';
  activeConsultMode: ConsultMode = 'video';
  activeConsultPatientName = '';
  showConsultShell = false;
  private countdownInterval: any;
  private wsSubscription?: Subscription;
  private platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private isDestroyed = false;
  private renderScheduled = false;

  stats: DashboardStats = {
    waiting: 0,
    active: 0,
    completed: 0,
    avgTime: 0
  };

  queue: QueuePatient[] = [];
  filteredQueue: QueuePatient[] = [];
  private deletingPatientIds = new Set<string>();
  private acceptingPatientIds = new Set<string>();

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
    private providerProfileService: ProviderProfileService,
    private prescriptionsApi: PrescriptionsApiService,
    private referralsApi: ReferralsApiService,
    private ws: WsService
  ) { }

  ngOnInit(): void {
    this.startAutoRefresh();
    this.loadOperationalStatus();
    this.refreshDashboard();
    this.ws.connect('gp');
    this.wsSubscription = this.ws.events$.subscribe((event) => {
      if (event.event === 'queue.updated') {
        this.refreshDashboard();
      } else if (event.event === 'consult.completed') {
        const data = event.data as any;
        const completedId = data?.consultationId || data?.consultation?.id || '';

        if (completedId && completedId === this.activeConsultationId) {
          this.showConsultShell = false;
          this.activeConsultRoomUrl = '';
          this.activeConsultationId = '';
          this.activeConsultPatientId = '';
          this.showUnavailableNotice('Consultation has ended.');
          this.syncStats();
        }

        this.refreshDashboard();
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.stopAutoRefresh();
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
        if (!this.isRefreshing) {
          this.refreshDashboard();
        }
        this.refreshCountdown = this.autoRefreshIntervalSeconds;
      }
      this.renderNow();
    }, 1000);
  }

  /**
   * Stop auto-refresh
   */
  private stopAutoRefresh(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  /**
   * Delete patient from queue (manual)
   */
  deletePatient(patientId: string): void {
    const patient = this.queue.find(p => p.id === patientId);
    if (!patient || this.deletingPatientIds.has(patientId)) {
      return;
    }

    this.deletingPatientIds.add(patientId);
    this.gpApi.deleteFromQueue(patientId, 'manual').subscribe({
      next: (response) => {
        if (!response.success) {
          const fallback = 'Unable to remove patient from queue.';
          this.showUnavailableNotice(response.message || fallback);
          this.deletingPatientIds.delete(patientId);
          return;
        }

        this.queue = this.queue.filter((item) => item.id !== patientId);
        this.applyFilters();
        this.syncStats();
        this.showUnavailableNotice(`${patient.displayName} has been removed from the queue.`);
        this.deletingPatientIds.delete(patientId);
      },
      error: (err: any) => {
        console.error('Failed to remove patient from queue:', err);
        const message = err?.error?.message || 'Failed to remove patient from queue. Please retry.';
        this.showUnavailableNotice(message);
        this.deletingPatientIds.delete(patientId);
      }
    });
  }

  /**
   * Refresh the queue
   */
  refreshQueue(): void {
    this.refreshCountdown = this.autoRefreshIntervalSeconds;
    this.refreshDashboard();
  }

  private refreshDashboard(): void {
    this.isRefreshing = true;
    this.loadQueue();
    this.loadConsultationHistory();
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
            return aCreatedAt - bCreatedAt;
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

        const queueIds = new Set(this.queue.map((patient) => patient.id));
        for (const deletingId of Array.from(this.deletingPatientIds)) {
          if (!queueIds.has(deletingId)) {
            this.deletingPatientIds.delete(deletingId);
          }
        }
        for (const acceptingId of Array.from(this.acceptingPatientIds)) {
          if (!queueIds.has(acceptingId)) {
            this.acceptingPatientIds.delete(acceptingId);
          }
        }

        this.syncStats();
        this.isRefreshing = false;
        this.applyFilters();
        this.renderNow();
      },
      error: () => {
        this.isRefreshing = false;
        this.renderNow();
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

  isDeletePending(patientId: string): boolean {
    return this.deletingPatientIds.has(patientId);
  }

  isAcceptPending(patientId: string): boolean {
    return this.acceptingPatientIds.has(patientId);
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

  private syncStats(): void {
    const waiting = this.queue.filter((patient) => patient.status !== 'active').length;
    const queuedActive = this.queue.filter((patient) => patient.status === 'active').length;
    const liveConsultActive = this.showConsultShell && this.activeConsultationId ? 1 : 0;
    const completed = this.consultationHistory.length;
    const durations = this.consultationHistory
      .map((entry) => Number(entry.duration || 0))
      .filter((duration) => Number.isFinite(duration) && duration > 0);
    const avgTime = durations.length > 0
      ? Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length)
      : 0;

    this.stats = {
      waiting,
      active: Math.max(queuedActive, liveConsultActive),
      completed,
      avgTime
    };
  }

  private loadOperationalStatus(): void {
    this.gpApi.getOperationalStatus().subscribe({
      next: (response) => {
        this.isOperating = response.operational !== false;
        this.showHistory = !this.isOperating;
        this.providerProfileService.setOperationalStatus('gp', this.isOperating);
        this.renderNow();
      },
      error: (err) => {
        console.error('Failed to fetch operational status:', err);
        const fallback = this.providerProfileService.getProfile('gp').operational;
        this.isOperating = fallback;
        this.showHistory = !fallback;
        this.renderNow();
      }
    });
  }

  /**
   * Accept a patient from the queue
   */
  acceptPatient(patientId: string): void {
    if (this.deletingPatientIds.has(patientId) || this.acceptingPatientIds.has(patientId)) {
      return;
    }

    this.acceptingPatientIds.add(patientId);
    const selected = this.queue.find((item) => item.id === patientId);
    const snapshot = selected ? { ...selected } : null;

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
        this.activeConsultPatientId =
          response.consultation?.patient_id ||
          snapshot?.patientId ||
          '';

        const item = this.queue.find((p) => p.id === patientId);
        const consultSource = item || snapshot;
        if (item) {
          item.accepted = true;
          item.status = 'active';
        }

        this.activeConsultMode = consultSource?.mode || 'video';
        this.activeConsultPatientName = consultSource?.displayName || 'Patient';
        this.showConsultShell = true;
        this.applyFilters();
        this.syncStats();
        this.acceptingPatientIds.delete(patientId);
      },
      error: (err) => {
        console.error('Failed to accept patient:', err);
        const message = err?.error?.error || 'Unable to accept patient right now. Please retry.';
        this.showUnavailableNotice(message);
        this.acceptingPatientIds.delete(patientId);
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
        this.activeConsultPatientId = '';
        this.showUnavailableNotice(event.notes?.trim()
          ? 'Consultation ended. Notes saved.'
          : 'Consultation ended successfully.');
        this.syncStats();
        this.loadQueue();
        this.loadConsultationHistory();
      },
      error: (err) => {
        console.error('Failed to end consultation:', err);
        const message = this.resolveCompleteConsultationError(err);
        this.showUnavailableNotice(message);
        // Issue 5: Reset consult shell "ending" state so the button becomes usable again
        this.consultShellRef?.onEndError(message);
      }
    });
  }

  onConsultPrescribe(): void {
    if (!this.activeConsultPatientId) {
      this.showUnavailableNotice('Patient context is unavailable for prescription.');
      return;
    }
    this.prescribe(this.activeConsultPatientId);
  }

  onConsultRefer(): void {
    if (!this.activeConsultPatientId) {
      this.showUnavailableNotice('Patient context is unavailable for referral.');
      return;
    }
    this.referToSpecialist(this.activeConsultPatientId);
  }

  onLeaveConsultShell(): void {
    this.showConsultShell = false;
    this.syncStats();
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
    const previous = this.isOperating;
    const nextState = !previous;
    this.isOperating = nextState;

    this.gpApi.updateOperationalStatus(nextState).subscribe({
      next: (response) => {
        this.isOperating = response.operational !== false;
        this.showHistory = !this.isOperating;
        this.providerProfileService.setOperationalStatus('gp', this.isOperating);

        if (this.isOperating) {
          this.showUnavailableNotice('You are now online and will receive new patients.');
        } else {
          this.showUnavailableNotice('You are now on break. No new patients will be added to your queue.');
        }
        this.refreshDashboard();
        this.renderNow();
      },
      error: (err) => {
        console.error('Failed to update operational status:', err);
        this.isOperating = previous;
        this.showHistory = !previous;
        this.showUnavailableNotice('Failed to update your break status. Please retry.');
        this.renderNow();
      }
    });
  }

  /**
   * Load consultation history
   */
  private loadConsultationHistory(): void {
    this.gpApi.getConsultationHistory().subscribe({
      next: (response) => {
        this.consultationHistory = response.history || [];
        this.syncStats();
        this.renderNow();
      },
      error: (err) => {
        console.error('Failed to load consultation history:', err);
        this.renderNow();
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
        this.syncStats();
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
    this.renderNow();
  }

  dismissUnavailableNotice(): void {
    this.unavailableNotice = '';
  }

  closeEmbeddedConsultation(): void {
    this.activeConsultRoomUrl = '';
    this.activeConsultationId = '';
    this.activeConsultPatientId = '';
  }

  openConsultationInNewTab(): void {
    if (!this.activeConsultRoomUrl || !isPlatformBrowser(this.platformId)) {
      return;
    }
    window.open(this.activeConsultRoomUrl, '_blank');
  }

  private showUnavailableNotice(message: string): void {
    this.unavailableNotice = message;
    this.renderNow();
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.unavailableNotice = '';
      this.renderNow();
    }, 5000);
  }

  private renderNow(): void {
    if (this.isDestroyed || this.renderScheduled) {
      return;
    }
    this.renderScheduled = true;
    queueMicrotask(() => {
      this.renderScheduled = false;
      if (this.isDestroyed) {
        return;
      }
      this.cdr.detectChanges();
    });
  }

  private resolveCompleteConsultationError(err: any): string {
    const code = String(err?.error?.code || '');
    if (code === 'NOT_ACTIVE') {
      return 'Consultation is no longer active.';
    }
    if (code === 'NOT_ASSIGNED') {
      return 'Consultation is not assigned to your account.';
    }
    if (code === 'SCHEMA_ERROR') {
      return 'Consultation data is temporarily unavailable. Please contact support.';
    }
    return err?.error?.error || 'Failed to end consultation. Please try again.';
  }
}
