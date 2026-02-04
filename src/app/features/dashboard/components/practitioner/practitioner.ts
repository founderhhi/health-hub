import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  prescribe(patientId?: string): void {
    if (!patientId) {
      return;
    }
    const items = [
      { name: 'Amoxicillin', dosage: '500mg', frequency: '2x/day', duration: '5 days' }
    ];
    this.prescriptionsApi.create(patientId, items).subscribe();
  }

  referToSpecialist(patientId?: string): void {
    if (!patientId) {
      return;
    }
    this.referralsApi.createReferral(patientId, 'routine', 'Specialist consultation recommended.').subscribe();
  }

  /**
   * View patient details
   */
  viewDetails(patientId: string): void {
    console.log('Viewing details for patient:', patientId);
    this.router.navigate(['/patient', patientId]);
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
   * View schedule
   */
  viewSchedule(): void {
    this.router.navigate(['/dashboard/practitioner/schedule']);
  }

  /**
   * View patients
   */
  viewPatients(): void {
    this.router.navigate(['/dashboard/practitioner/patients']);
  }

  /**
   * Open settings
   */
  openSettings(): void {
    this.router.navigate(['/dashboard/practitioner/settings']);
  }

  /**
   * View history
   */
  viewHistory(): void {
    this.router.navigate(['/dashboard/practitioner/history']);
  }
}
