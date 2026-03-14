import { ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { WsService, WS_NOTIFICATIONS_FALLBACK_EVENT } from '../../../core/realtime/ws.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { Subscription, timeout } from 'rxjs';

interface Referral {
  id: string;
  patient_id: string;
  from_provider_id: string;
  to_specialist_id: string;
  urgency: string;
  reason: string;
  status: string;
  appointment_date: string;
  appointment_time: string;
  consultation_mode: string;
  location: string;
  specialty: string;
  created_at: string;
  specialist_name: string | null;
  specialist_phone: string | null;
  specialist_specialty?: string | null;
  consultation_status?: 'active' | 'completed' | 'ended' | null;
  consultation_started_at?: string | null;
  consultation_completed_at?: string | null;
  consultation_id?: string | null;
  daily_room_url?: string | null;
  display_status?: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  PATIENT_TABS = PATIENT_TABS;
  activeTab: 'upcoming' | 'past' = 'upcoming';
  loading = true;
  refreshing = false;
  error: string | null = null;
  warningMessage: string | null = null;
  private readonly REQUEST_TIMEOUT_MS = 8000;
  private readonly platformId = inject(PLATFORM_ID);
  private wsSubscription?: Subscription;

  upcomingAppointments: Referral[] = [];
  pastAppointments: Referral[] = [];

  constructor(
    public router: Router,
    private patientApi: PatientApiService,
    private ws: WsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.hydrateFromCache();
    this.loadReferrals();

    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('hhi_user_id') || '';
      this.ws.connect('patient', userId);
      this.wsSubscription = this.ws.events$.subscribe((event) => {
        if ([
          'referral.created',
          'referral.status',
          'consult.started',
          'consult.completed',
          WS_NOTIFICATIONS_FALLBACK_EVENT
        ].includes(event.event)) {
          this.loadReferrals();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  loadReferrals(): void {
    const hasCachedSnapshot = this.patientApi.getCachedReferrals() !== null;

    this.loading = !hasCachedSnapshot;
    this.refreshing = hasCachedSnapshot;
    this.error = null;
    this.warningMessage = null;

    this.patientApi.getReferrals().pipe(timeout(this.REQUEST_TIMEOUT_MS)).subscribe({
      next: (res) => {
        this.applyReferrals(res.referrals || []);
        this.loading = false;
        this.refreshing = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load referrals:', err);
        this.loading = false;
        this.refreshing = false;
        if (hasCachedSnapshot) {
          this.warningMessage = 'Showing your last loaded appointments. Refresh again when the network is stable.';
          this.cdr.detectChanges();
          return;
        }
        this.error = err?.name === 'TimeoutError'
          ? 'Appointments are taking longer than expected. Please try again.'
          : 'Failed to load appointments. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  setTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'new': return 'Waiting for Confirmation';
      case 'accepted':
      case 'confirmed': return 'Confirmed';
      case 'live': return 'Live';
      case 'completed': return 'Completed';
      case 'declined': return 'Declined';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'new': return 'status-pending';
      case 'accepted':
      case 'confirmed': return 'status-confirmed';
      case 'live': return 'status-live';
      case 'completed': return 'status-completed';
      case 'declined': return 'status-declined';
      default: return '';
    }
  }

  getInitials(name: string | null): string {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'Date pending';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(timeStr: string): string {
    if (!timeStr) return 'Time pending';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  retry(): void {
    this.loadReferrals();
  }

  canJoinConsultation(referral: Referral): boolean {
    const consultationStatus = String(referral.consultation_status || '').toLowerCase();
    return referral.consultation_mode === 'online'
      && Boolean(referral.consultation_id)
      && (consultationStatus === 'ready' || consultationStatus === 'active');
  }

  openConsultation(referral: Referral): void {
    if (!this.canJoinConsultation(referral)) {
      return;
    }
    this.router.navigate(['/patient/appointments', referral.id, 'consultation']);
  }

  private hydrateFromCache(): void {
    const cachedReferrals = this.patientApi.getCachedReferrals();
    if (cachedReferrals !== null) {
      this.applyReferrals(cachedReferrals as Referral[]);
      this.loading = false;
    }
  }

  private applyReferrals(referrals: Referral[]): void {
    const normalized = referrals.map((item) => ({
      ...item,
      display_status: this.resolveDisplayStatus(item)
    }));

    this.upcomingAppointments = normalized
      .filter((item) => ['new', 'accepted', 'confirmed', 'live'].includes(String(item.display_status || '')))
      .sort((left, right) => this.compareUpcoming(left, right));
    this.pastAppointments = normalized
      .filter((item) => ['declined', 'completed'].includes(String(item.display_status || '')))
      .sort((left, right) => this.comparePast(left, right));
  }

  private resolveDisplayStatus(referral: Referral): string {
    const consultationStatus = String(referral.consultation_status || '').toLowerCase();
    if (consultationStatus === 'active') {
      return 'live';
    }
    if (consultationStatus === 'completed' || consultationStatus === 'ended') {
      return 'completed';
    }
    return referral.status;
  }

  private compareUpcoming(left: Referral, right: Referral): number {
    return this.resolveUpcomingTimestamp(left) - this.resolveUpcomingTimestamp(right);
  }

  private comparePast(left: Referral, right: Referral): number {
    return this.resolvePastTimestamp(right) - this.resolvePastTimestamp(left);
  }

  private resolveUpcomingTimestamp(referral: Referral): number {
    if (!referral.appointment_date) {
      return Number.MAX_SAFE_INTEGER;
    }

    const timestamp = new Date(`${referral.appointment_date}T${referral.appointment_time || '23:59:59'}`).getTime();
    return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
  }

  private resolvePastTimestamp(referral: Referral): number {
    const candidates = [
      referral.consultation_completed_at,
      referral.appointment_date ? `${referral.appointment_date}T${referral.appointment_time || '00:00:00'}` : null,
      referral.created_at
    ].filter(Boolean) as string[];

    for (const candidate of candidates) {
      const timestamp = new Date(candidate).getTime();
      if (!Number.isNaN(timestamp)) {
        return timestamp;
      }
    }

    return 0;
  }
}
