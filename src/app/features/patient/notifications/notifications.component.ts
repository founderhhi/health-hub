import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  private platformId = inject(PLATFORM_ID);

  constructor(
    private notificationsApi: NotificationsApiService,
    private ws: WsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    
    // SSR safety: only connect WebSocket in browser
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('hhi_user_id') || '';
      this.ws.connect('patient', userId);
      this.wsSubscription = this.ws.events$.subscribe(() => {
        this.load();
      });
    }
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
