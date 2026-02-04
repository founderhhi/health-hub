import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationsApiService } from '../../../core/api/notifications.service';
import { WsService } from '../../../core/realtime/ws.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  loading = true;
  private wsSubscription?: Subscription;

  constructor(
    private notificationsApi: NotificationsApiService,
    private ws: WsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    const userId = localStorage.getItem('hhi_user_id') || '';
    this.ws.connect('patient', userId);
    this.wsSubscription = this.ws.events$.subscribe(() => {
      this.load();
    });
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  private load(): void {
    this.loading = true;
    this.notificationsApi.list().subscribe({
      next: (response) => {
        this.notifications = response.notifications;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
