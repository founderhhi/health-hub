import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { NotificationsApiService } from '../../../core/api/notifications.service';
import { WsService } from '../../../core/realtime/ws.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { AiChatBubbleComponent } from '../../../shared/components/ai-chat-bubble/ai-chat-bubble.component';
import { Subscription, catchError, forkJoin, of } from 'rxjs';

interface HealthStats {
  consultations: number;
  prescriptions: number;
  records: number;
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent, AiChatBubbleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  PATIENT_TABS = PATIENT_TABS;

  // User data
  userName: string = '';
  notificationCount: number = 0;
  requestingConsult = false;
  requestError = '';
  showModeSelector = false;
  selectedMode: 'video' | 'audio' | 'chat' = 'video';
  recentPrescriptions: any[] = [];
  statsLoading = true;
  prescriptionsLoading = true;
  showPaymentModal = false;
  private wsSubscription?: Subscription;

  // Health statistics
  stats: HealthStats = {
    consultations: 0,
    prescriptions: 0,
    records: 0
  };

  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private patientApi: PatientApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private notificationsApi: NotificationsApiService,
    private ws: WsService
  ) {}

  ngOnInit(): void {
    // Load real user name from localStorage (set during login/signup)
    // SSR safety: only access localStorage in browser
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('hhi_display_name') || 'Patient';
    } else {
      this.userName = 'Patient';
    }

    this.loadStats();
    this.loadPrescriptions();
    this.loadNotifications();

    // SSR safety: only connect WebSocket in browser
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('hhi_user_id') || '';
      this.ws.connect('patient', userId);
      this.wsSubscription = this.ws.events$.subscribe((event) => {
        if (
          [
            'prescription.created',
            'prescription.claimed',
            'lab.status.updated',
            'referral.created',
            'consult.accepted'
          ].includes(event.event)
        ) {
          this.loadNotifications();
          this.loadPrescriptions();
          this.loadStats();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  // Get greeting based on time of day
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  /**
   * Navigate to specific service
   */
  navigateToService(service: string): void {
    switch(service) {
      case 'gp':
        this.showModeSelector = true;
        break;
      case 'healwell':
        this.router.navigate(['/heal-well/videos']);
        break;
      case 'specialist':
        this.router.navigate(['/patient/appointments']);
        break;
      case 'pharmacy':
        this.router.navigate(['/patient/records'], {
          queryParams: { tab: 'prescriptions' }
        });
        break;
      case 'diagnostics':
        // Coming soon - disabled
        break;
    }
  }

  /**
   * Show coming soon notification
   */
  showComingSoon(): void {
    // No-op for disabled cards
  }

  /**
   * View notifications
   */
  viewNotifications(): void {
    this.router.navigate(['/patient/notifications']);
  }

  viewRecords(): void {
    this.router.navigate(['/patient/records'], {
      queryParams: { tab: 'prescriptions' }
    });
  }

  openPayment(): void {
    this.showPaymentModal = true;
  }

  onPaymentComplete(result: { success: boolean }): void {
    if (result.success) {
      // QOL-FIX: removed artificial delay.
      this.showPaymentModal = false;
    }
  }

  closePayment(): void {
    this.showPaymentModal = false;
  }

  closeModeSelector(): void {
    this.showModeSelector = false;
    this.selectedMode = 'video';
  }

  requestWithMode(): void {
    if (this.requestingConsult) {
      return;
    }

    this.showModeSelector = false;
    this.requestingConsult = true;
    this.requestError = '';

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('hhi_consult_mode', this.selectedMode);
    }

    this.patientApi.requestConsult(this.selectedMode, { complaint: 'General consult' }).subscribe({
      next: () => {
        this.requestingConsult = false;
        this.router.navigate(['/patient/waiting']);
      },
      error: () => {
        this.requestingConsult = false;
        this.requestError = 'Unable to request a GP right now.';
      }
    });
  }

  private loadStats(): void {
    this.statsLoading = true;

    forkJoin({
      consults: this.patientApi.getConsults().pipe(
        catchError(() => of({ requests: [] as any[] }))
      ),
      activeConsult: this.patientApi.getActiveConsult().pipe(
        catchError(() => of({ active: null }))
      ),
      prescriptions: this.prescriptionsApi.listForPatient().pipe(
        catchError(() => of({ prescriptions: [] as any[] }))
      ),
      labs: this.patientApi.getLabOrders().pipe(
        catchError(() => of({ orders: [] as any[] }))
      )
    }).subscribe(({ consults, activeConsult, prescriptions, labs }) => {
      const requests = Array.isArray(consults?.requests) ? consults.requests : [];
      const consultationsCount = requests.filter((item: any) => {
        const status = String(item?.status || '').toLowerCase();
        return status !== 'removed' && status !== 'cancelled';
      }).length;

      this.stats.consultations = activeConsult?.active
        ? Math.max(consultationsCount, 1)
        : consultationsCount;
      this.stats.prescriptions = Array.isArray(prescriptions?.prescriptions) ? prescriptions.prescriptions.length : 0;
      this.stats.records = Array.isArray(labs?.orders) ? labs.orders.length : 0;
      this.statsLoading = false;
    });
  }

  private loadPrescriptions(): void {
    this.prescriptionsLoading = true;
    this.prescriptionsApi.listForPatient().subscribe({
      next: (response) => {
        const prescriptions = Array.isArray(response?.prescriptions) ? response.prescriptions : [];
        this.recentPrescriptions = prescriptions.slice(0, 3);
        this.prescriptionsLoading = false;
      },
      error: () => {
        this.recentPrescriptions = [];
        this.prescriptionsLoading = false;
      }
    });
  }

  private loadNotifications(): void {
    this.notificationsApi.list().subscribe({
      next: (response) => {
        this.notificationCount = response.notifications.filter((item) => !item.read).length;
      },
      error: () => {
        this.notificationCount = 0;
      }
    });
  }
}
