import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { NotificationsApiService } from '../../../core/api/notifications.service';
import { WsService } from '../../../core/realtime/ws.service';
import { Subscription } from 'rxjs';

interface HealthStats {
  consultations: number;
  prescriptions: number;
  records: number;
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // User data
  userName: string = 'Sarah';
  notificationCount: number = 0;
  requestingConsult = false;
  requestError = '';
  recentPrescriptions: any[] = [];
  private wsSubscription?: Subscription;

  // Health statistics
  stats: HealthStats = {
    consultations: 12,
    prescriptions: 8,
    records: 24
  };

  constructor(
    private router: Router,
    private patientApi: PatientApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private notificationsApi: NotificationsApiService,
    private ws: WsService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadPrescriptions();
    this.loadNotifications();

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
      }
    });
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
        this.requestingConsult = true;
        this.requestError = '';
        this.patientApi.requestConsult('video', { complaint: 'General consult' }).subscribe({
          next: () => {
            this.requestingConsult = false;
            this.router.navigate(['/patient/waiting']);
          },
          error: () => {
            this.requestingConsult = false;
            this.requestError = 'Unable to request a GP right now.';
          }
        });
        break;
      case 'healwell':
        this.router.navigate(['/heal-well/videos']);
        break;
      case 'specialist':
        this.router.navigate(['/patient-services/specialist']);
        break;
      case 'pharmacy':
        this.router.navigate(['/pharmacy']);
        break;
      case 'diagnostics':
        this.router.navigate(['/diagnostics']);
        break;
    }
  }

  /**
   * Show coming soon notification
   */
  showComingSoon(): void {
    alert('Coming Soon! This feature will be available shortly.');
  }

  /**
   * View notifications
   */
  viewNotifications(): void {
    this.router.navigate(['/patient/notifications']);
  }

  viewRecords(): void {
    this.router.navigate(['/patient/records']);
  }

  private loadStats(): void {
    this.patientApi.getConsults().subscribe({
      next: (response) => {
        this.stats.consultations = response.requests.length;
      }
    });
    this.prescriptionsApi.listForPatient().subscribe({
      next: (response) => {
        this.stats.prescriptions = response.prescriptions.length;
      }
    });
  }

  private loadPrescriptions(): void {
    this.prescriptionsApi.listForPatient().subscribe({
      next: (response) => {
        this.recentPrescriptions = response.prescriptions.slice(0, 3);
      }
    });
  }

  private loadNotifications(): void {
    this.notificationsApi.list().subscribe({
      next: (response) => {
        this.notificationCount = response.notifications.filter((item) => !item.read).length;
      }
    });
  }
}
