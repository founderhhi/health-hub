import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { WsService } from '../../../core/realtime/ws.service';

interface SpecialistReferral {
  id: string;
  patient_id: string;
  patient_name: string | null;
  patient_phone: string | null;
  specialist_name: string | null;
  referring_provider_name: string | null;
  referring_provider_role: string | null;
  referring_provider_specialty: string | null;
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: string | null;
  status: 'new' | 'accepted' | 'declined' | 'confirmed';
  specialty: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  consultation_mode: 'online' | 'offline' | null;
  location: string | null;
  consultation_id: string | null;
  consultation_status: 'active' | 'completed' | 'ended' | null;
  consultation_started_at: string | null;
  consultation_completed_at: string | null;
  requested_info_note: string | null;
  requested_info_at: string | null;
  created_at: string;
}

type ReferralFilter = 'all' | 'gp' | 'specialist' | 'declined';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './specialist-dashboard.html',
  styleUrl: './specialist-dashboard.scss',
})
export class SpecialistDashboardComponent implements OnInit, OnDestroy {
  referrals: SpecialistReferral[] = [];
  loading = true;
  errorMessage = '';
  selectedFilter: ReferralFilter = 'all';
  stats = {
    pending: 0,
    appointments: 0,
    active: 0,
    patients: 0
  };

  private wsSubscription?: Subscription;
  private readonly platformId = inject(PLATFORM_ID);
  private hasResolvedInitialLoad = false;
  private initialLoadRetryPending = false;
  private initialLoadRetried = false;
  private initialLoadRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly windowFocusHandler = () => this.loadReferrals(false);
  private readonly documentVisibilityHandler = () => {
    if (document.visibilityState === 'visible') {
      this.loadReferrals(false);
    }
  };

  private get activeReferrals(): SpecialistReferral[] {
    return this.referrals.filter((referral) => referral.status !== 'declined');
  }

  private get declinedReferrals(): SpecialistReferral[] {
    return this.referrals.filter((referral) => referral.status === 'declined');
  }

  get displayReferrals(): SpecialistReferral[] {
    switch (this.selectedFilter) {
      case 'gp':
        return this.activeReferrals.filter((referral) => this.isGpSource(referral));
      case 'specialist':
        return this.activeReferrals.filter((referral) => !this.isGpSource(referral));
      case 'declined':
        return this.declinedReferrals;
      default:
        return this.activeReferrals;
    }
  }

  get allCount(): number {
    return this.activeReferrals.length;
  }

  get gpCount(): number {
    return this.activeReferrals.filter((referral) => this.isGpSource(referral)).length;
  }

  get specialistCount(): number {
    return this.activeReferrals.filter((referral) => !this.isGpSource(referral)).length;
  }

  get declinedCount(): number {
    return this.declinedReferrals.length;
  }

  get pendingDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.stats.pending;
  }

  get appointmentsDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.stats.appointments;
  }

  get activeDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.stats.active;
  }

  get patientsDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.stats.patients;
  }

  get allDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.allCount;
  }

  get gpDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.gpCount;
  }

  get specialistDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.specialistCount;
  }

  get declinedDisplayCount(): string | number {
    return this.showLoadingCounts ? '—' : this.declinedCount;
  }

  private get showLoadingCounts(): boolean {
    return this.loading && !this.hasResolvedInitialLoad;
  }

  get todayAppointments(): SpecialistReferral[] {
    return this.referrals.filter((referral) => {
      if (!referral.appointment_date || referral.status === 'declined') {
        return false;
      }
      return this.isSameDay(referral.appointment_date, new Date());
    });
  }

  get consultRoute(): string[] {
    const activeReferral = this.referrals.find((referral) =>
      referral.consultation_mode === 'online'
      && referral.consultation_status === 'active'
      && referral.consultation_id
    );
    if (activeReferral) {
      return ['/specialist/consultation', activeReferral.id];
    }

    const acceptedReferral = this.referrals.find((referral) =>
      referral.consultation_mode === 'online'
      && ['accepted', 'confirmed'].includes(referral.status)
      && referral.consultation_id
    );
    if (acceptedReferral) {
      return ['/specialist/consultation', acceptedReferral.id];
    }

    return ['/specialist'];
  }

  constructor(
    private referralsApi: ReferralsApiService,
    private ws: WsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cachedReferrals = this.referralsApi.getCachedSpecialistReferrals();
    if (cachedReferrals) {
      this.referrals = cachedReferrals as SpecialistReferral[];
      this.recalculateStats();
      this.loading = false;
      this.hasResolvedInitialLoad = true;
    }

    this.loadReferrals(!this.hasResolvedInitialLoad);
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('focus', this.windowFocusHandler);
      document.addEventListener('visibilitychange', this.documentVisibilityHandler);
    }
    this.ws.connect('specialist');
    this.wsSubscription = this.ws.events$.subscribe((event) => {
      if (['referral.created', 'referral.status', 'referral.request_info', 'consult.started', 'consult.completed'].includes(event.event)) {
        this.loadReferrals(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    if (this.initialLoadRetryTimer) {
      clearTimeout(this.initialLoadRetryTimer);
      this.initialLoadRetryTimer = null;
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('focus', this.windowFocusHandler);
      document.removeEventListener('visibilitychange', this.documentVisibilityHandler);
    }
  }

  trackReferral(_index: number, referral: SpecialistReferral): string {
    return referral.id;
  }

  selectFilter(filter: ReferralFilter): void {
    this.selectedFilter = filter;
  }

  viewReferral(id: string): void {
    this.router.navigate(['/specialist/referral', id]);
  }

  acceptReferral(id: string): void {
    this.referralsApi.updateStatus(id, 'accepted').subscribe({
      next: (response) => {
        this.errorMessage = '';
        const referralId = response.referral?.id || id;
        if (response.referral?.consultation_mode === 'online') {
          this.router.navigate(['/specialist/consultation', referralId]);
          return;
        }
        this.router.navigate(['/specialist/referral', referralId]);
      },
      error: () => {
        this.errorMessage = 'Unable to accept referral right now.';
      }
    });
  }

  openConsultation(referralId: string): void {
    this.router.navigate(['/specialist/consultation', referralId]);
  }

  canAccept(referral: SpecialistReferral): boolean {
    return referral.status === 'new';
  }

  canOpenConsultation(referral: SpecialistReferral): boolean {
    return referral.consultation_mode === 'online'
      && Boolean(referral.consultation_id)
      && referral.status !== 'declined';
  }

  appointmentSummary(referral: SpecialistReferral): string {
    const parts: string[] = [];
    if (referral.appointment_date) {
      parts.push(new Date(referral.appointment_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }));
    }
    if (referral.appointment_time) {
      parts.push(this.formatTime(referral.appointment_time));
    }
    if (referral.consultation_mode === 'offline' && referral.location) {
      parts.push(referral.location);
    } else if (referral.consultation_mode === 'online') {
      parts.push('Online');
    }
    return parts.join(' • ') || 'Scheduling details pending';
  }

  appointmentTimeLabel(referral: SpecialistReferral): string {
    return referral.appointment_time ? this.formatTime(referral.appointment_time) : 'Time pending';
  }

  timelineLabel(referral: SpecialistReferral): string {
    if (referral.consultation_status === 'completed' || referral.consultation_status === 'ended') {
      return `Completed ${this.formatRelativeOrDate(referral.consultation_completed_at)}`;
    }
    if (referral.consultation_status === 'active') {
      return `Consultation active since ${this.formatRelativeOrDate(referral.consultation_started_at)}`;
    }
    if (referral.appointment_date) {
      return `Scheduled ${this.appointmentSummary(referral)}`;
    }
    if (referral.requested_info_at) {
      return `More information requested ${this.formatRelativeOrDate(referral.requested_info_at)}`;
    }
    return `Referred ${this.formatRelativeOrDate(referral.created_at)}`;
  }

  private loadReferrals(showLoader = true): void {
    this.loading = showLoader && this.referrals.length === 0;
    this.referralsApi.listForSpecialist().subscribe({
      next: (response) => {
        this.referrals = Array.isArray(response.referrals) ? response.referrals : [];
        this.recalculateStats();
        this.errorMessage = '';
        this.loading = false;
        this.hasResolvedInitialLoad = true;
        this.handlePostLoadConsistencyRefresh();
      },
      error: () => {
        this.errorMessage = 'Unable to load referrals right now.';
        this.loading = false;
        this.hasResolvedInitialLoad = true;
      }
    });
  }

  private recalculateStats(): void {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    this.stats.pending = this.activeReferrals.filter((referral) => referral.status === 'new').length;
    this.stats.appointments = this.todayAppointments.length;
    this.stats.active = this.activeReferrals.filter((referral) => referral.consultation_status === 'active').length;
    this.stats.patients = new Set(
      this.activeReferrals
        .filter((referral) => {
          const created = new Date(referral.created_at);
          return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
        })
        .map((referral) => referral.patient_id)
    ).size;
  }

  private isGpSource(referral: SpecialistReferral): boolean {
    const role = String(referral.referring_provider_role || '').toLowerCase();
    return role === 'gp' || role === 'doctor' || !role;
  }

  private isSameDay(value: string, reference: Date): boolean {
    const candidate = new Date(value);
    return candidate.getFullYear() === reference.getFullYear()
      && candidate.getMonth() === reference.getMonth()
      && candidate.getDate() === reference.getDate();
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const suffix = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
  }

  private formatRelativeOrDate(value: string | null): string {
    if (!value) {
      return 'recently';
    }

    const date = new Date(value);
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.max(Math.round(diffMs / 60000), 0);

    if (diffMinutes < 60) {
      return `${diffMinutes || 1}m ago`;
    }

    if (diffMinutes < 24 * 60) {
      return `${Math.round(diffMinutes / 60)}h ago`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  private handlePostLoadConsistencyRefresh(): void {
    if (!isPlatformBrowser(this.platformId) || this.initialLoadRetried || this.initialLoadRetryPending || this.referrals.length > 0) {
      return;
    }

    this.initialLoadRetryPending = true;
    this.initialLoadRetryTimer = setTimeout(() => {
      this.initialLoadRetryPending = false;
      this.initialLoadRetried = true;
      this.initialLoadRetryTimer = null;
      this.loadReferrals(false);
    }, 300);
  }
}
