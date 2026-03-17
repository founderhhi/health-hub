import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { NotificationsApiService } from '../../../core/api/notifications.service';
import { WsService } from '../../../core/realtime/ws.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { ThemeService, ThemeMode } from '../../../shared/services/theme.service';
import { Subscription, catchError, filter, forkJoin, map, of, timeout } from 'rxjs';

interface HealthStats {
  consultations: number;
  prescriptions: number;
  records: number;
}

interface ServiceCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  tone: 'emerald' | 'indigo' | 'amber';
  comingSoon?: boolean;
}

const GP_CONSULT_PRICE_USD = 25;

const DASHBOARD_SERVICES: ServiceCard[] = [
  { id: 'gp', title: 'Talk to a Health Expert', icon: 'pulse', description: 'Start your first guided care conversation.', tone: 'emerald' },
  { id: 'healwell', title: 'HealWell at Home', icon: 'video', description: 'Short self-care videos for common symptoms.', tone: 'indigo' },
  { id: 'specialist', title: 'Specialist', icon: 'user-md', description: 'Move into specialty care when you need it.', tone: 'amber' },
  { id: 'pharmacy', title: 'Pharmacy', icon: 'pharmacy', description: 'Track medicine support and pharmacy updates.', tone: 'emerald' },
  { id: 'diagnostics', title: 'Diagnostics', icon: 'lab', description: 'View lab orders and test progress clearly.', tone: 'indigo' },
  { id: 'travel', title: 'Travel & Care', icon: 'globe', description: 'Plan treatment travel and compare budgets.', tone: 'amber' },
  { id: 'healwell-africa', title: 'HealWell in Africa', icon: 'africa', description: 'Explore care hubs across key African cities.', tone: 'emerald' },
  { id: 'healwell-india', title: 'HealWell in India', icon: 'india', description: 'Discover specialty hospitals across India.', tone: 'indigo' },
  { id: 'insurance', title: 'Insurance', icon: 'shield', description: 'Coverage and support services.', tone: 'amber', comingSoon: true },
];

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  PATIENT_TABS = PATIENT_TABS;
  services = DASHBOARD_SERVICES;

  // User data
  userName: string = '';
  notificationCount: number = 0;
  requestingConsult = false;
  requestError = '';
  showModeSelector = false;
  showPaymentConfirm = false;
  consultationCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(GP_CONSULT_PRICE_USD);
  selectedMode: 'video' | 'audio' | 'chat' = 'video';
  recentPrescriptions: any[] = [];
  statsLoading = true;
  prescriptionsLoading = true;
  statsNotice = '';
  showPaymentModal = false;
  comingSoonMessage = '';
  private wsSubscription?: Subscription;
  private routerSub?: Subscription;

  // Health statistics
  stats: HealthStats = {
    consultations: 0,
    prescriptions: 0,
    records: 0
  };

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  currentTheme: ThemeMode = 'light';
  private themeSubscription?: Subscription;

  constructor(
    private router: Router,
    private patientApi: PatientApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private notificationsApi: NotificationsApiService,
    private ws: WsService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Load real user name from localStorage (set during login/signup)
    // SSR safety: only access localStorage in browser
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('hhi_display_name') || 'Patient';
    } else {
      this.userName = 'Patient';
    }

    this.themeSubscription = this.themeService.currentTheme$.subscribe(t => this.currentTheme = t);

    this.loadStats();
    this.loadPrescriptions();
    this.loadNotifications();
    this.prefetchPatientNavigationData();

    // Reload data when navigating back to dashboard (component reuse)
    this.routerSub = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      filter((e) => e.urlAfterRedirects.includes('/patient/dashboard'))
    ).subscribe(() => {
      if (this.statsLoading) return;
      this.loadStats();
      this.loadPrescriptions();
      this.loadNotifications();
    });

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
    this.themeSubscription?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Get greeting based on time of day
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  openGpConsult(): void {
    const gpService = this.services.find((service) => service.id === 'gp');
    if (gpService) {
      this.navigateToService(gpService);
    }
  }

  navigateToService(service: ServiceCard): void {
    if (service.comingSoon) {
      this.comingSoonMessage = `${service.title} is coming soon.`;
      setTimeout(() => {
        this.comingSoonMessage = '';
        this.cdr.detectChanges();
      }, 3000);
      return;
    }
    switch (service.id) {
      case 'gp':
        this.showPaymentConfirm = true;
        break;
      case 'healwell':
        this.router.navigate(['/heal-well/videos']);
        break;
      case 'specialist':
        this.router.navigate(['/patient/specialist']);
        break;
      case 'pharmacy':
        this.router.navigate(['/patient/pharmacy']);
        break;
      case 'diagnostics':
        this.router.navigate(['/patient/records'], {
          queryParams: { tab: 'lab-results' }
        });
        break;
      case 'travel':
        this.router.navigate(['/patient/travel']);
        break;
      case 'healwell-africa':
        this.router.navigate(['/patient/healwell-africa']);
        break;
      case 'healwell-india':
        this.router.navigate(['/patient/healwell-india']);
        break;
    }
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

    this.patientApi.requestConsult(this.selectedMode, {
      complaint: 'General consult',
      source: 'dashboard-gp',
    }).subscribe({
      next: () => {
        this.requestingConsult = false;
        this.router.navigate(['/patient/waiting']);
      },
      error: () => {
        this.requestingConsult = false;
        this.requestError = 'Unable to request a Health Expert right now.';
      }
    });
  }

  confirmPayment(): void {
    this.showPaymentConfirm = false;
    this.showModeSelector = true;
  }

  cancelPayment(): void {
    this.showPaymentConfirm = false;
    this.selectedMode = 'video';
  }

  private loadStats(): void {
    this.statsLoading = true;
    this.statsNotice = '';

    forkJoin({
      consults: this.patientApi.getConsults().pipe(
        timeout(8000),
        map((response) => ({ ok: true as const, response })),
        catchError(() => of({ ok: false as const, response: null }))
      ),
      activeConsult: this.patientApi.getActiveConsult().pipe(
        timeout(8000),
        map((response) => ({ ok: true as const, response })),
        catchError(() => of({ ok: false as const, response: null }))
      ),
      prescriptions: this.prescriptionsApi.listForPatient().pipe(
        timeout(8000),
        map((response) => ({ ok: true as const, response })),
        catchError(() => of({ ok: false as const, response: null }))
      ),
      labs: this.patientApi.getLabOrders().pipe(
        timeout(8000),
        map((response) => ({ ok: true as const, response })),
        catchError(() => of({ ok: false as const, response: null }))
      )
    }).subscribe({
      next: ({ consults, activeConsult, prescriptions, labs }) => {
        const nextStats = { ...this.stats };
        let successfulCalls = 0;

        const requests = Array.isArray(consults.response?.requests) ? consults.response?.requests : [];
        if (consults.ok) {
          const consultationsCount = requests.filter((item: any) => {
            const status = String(item?.status || '').toLowerCase();
            return status !== 'removed' && status !== 'cancelled';
          }).length;

          nextStats.consultations = activeConsult.response?.active
            ? Math.max(consultationsCount, 1)
            : consultationsCount;
          successfulCalls++;
        } else if (activeConsult.ok && activeConsult.response?.active) {
          nextStats.consultations = Math.max(nextStats.consultations, 1);
        }

        if (prescriptions.ok) {
          nextStats.prescriptions = Array.isArray(prescriptions.response?.prescriptions)
            ? prescriptions.response.prescriptions.length
            : 0;
          successfulCalls++;
        }

        if (labs.ok) {
          nextStats.records = Array.isArray(labs.response?.orders)
            ? labs.response.orders.length
            : 0;
          successfulCalls++;
        }

        if (activeConsult.ok) {
          successfulCalls++;
        }

        if (successfulCalls === 0) {
          this.statsNotice = 'Unable to refresh dashboard stats right now.';
        } else if (successfulCalls < 4) {
          this.statsNotice = 'Some dashboard stats may be temporarily outdated.';
        }

        this.stats = nextStats;
        this.statsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.statsNotice = 'Unable to refresh dashboard stats right now.';
        this.statsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadPrescriptions(): void {
    this.prescriptionsLoading = true;
    this.prescriptionsApi.listForPatient().pipe(timeout(8000)).subscribe({
      next: (response) => {
        const prescriptions = Array.isArray(response?.prescriptions) ? response.prescriptions : [];
        this.recentPrescriptions = prescriptions.slice(0, 3);
        this.prescriptionsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.recentPrescriptions = [];
        this.prescriptionsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadNotifications(): void {
    this.notificationsApi.list().subscribe({
      next: (response) => {
        this.notificationCount = (response?.notifications || []).filter((item: any) => !item.read).length;
        this.cdr.detectChanges();
      },
      error: () => {
        this.notificationCount = 0;
        this.cdr.detectChanges();
      }
    });
  }

  private prefetchPatientNavigationData(): void {
    this.patientApi.getReferrals().pipe(
      timeout(8000),
      catchError(() => of(null))
    ).subscribe();

    this.patientApi.getProfile().pipe(
      timeout(8000),
      catchError(() => of(null))
    ).subscribe();
  }
}
