import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationsApiService } from '../../../core/api/notifications.service';
import { WsService } from '../../../core/realtime/ws.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  PATIENT_TABS = PATIENT_TABS;
  notifications: any[] = [];
  loading = true;
  errorMessage = '';
  private wsSubscription?: Subscription;
  private loadTimeoutRef?: ReturnType<typeof setTimeout>;
  private readonly MAX_LOADING_MS = 8000;

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
      this.wsSubscription = this.notificationsApi.refreshTriggers$.subscribe(() => {
        this.load();
      });
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    if (this.loadTimeoutRef) {
      clearTimeout(this.loadTimeoutRef);
      this.loadTimeoutRef = undefined;
    }
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notification: any): void {
    if (notification.read) return;
    notification.read = true;
    this.notificationsApi.markRead(notification.id).subscribe({
      next: () => {},
      error: () => {
        notification.read = false;
        this.errorMessage = 'Unable to mark notification as read. Please try again.';
      }
    });
  }

  markAllAsRead(): void {
    const previousStates = this.notifications.map(n => n.read);
    this.notifications.forEach(n => n.read = true);
    this.notificationsApi.markAllRead().subscribe({
      next: () => {},
      error: () => {
        this.notifications.forEach((n, i) => n.read = previousStates[i]);
        this.errorMessage = 'Unable to mark all as read. Please try again.';
      }
    });
  }

  retry(): void {
    this.load();
  }

  private load(): void {
    if (this.loadTimeoutRef) {
      clearTimeout(this.loadTimeoutRef);
      this.loadTimeoutRef = undefined;
    }

    this.loading = true;
    this.errorMessage = '';
    this.loadTimeoutRef = setTimeout(() => {
      this.loading = false;
      this.errorMessage = 'Notifications are taking longer than expected. Please retry.';
    }, this.MAX_LOADING_MS);

    this.notificationsApi.list().subscribe({
      next: (response) => {
        if (this.loadTimeoutRef) {
          clearTimeout(this.loadTimeoutRef);
          this.loadTimeoutRef = undefined;
        }
        this.notifications = Array.isArray(response?.notifications) ? response.notifications : [];
        this.loading = false;
      },
      error: () => {
        if (this.loadTimeoutRef) {
          clearTimeout(this.loadTimeoutRef);
          this.loadTimeoutRef = undefined;
        }
        this.notifications = [];
        this.errorMessage = 'Unable to load notifications right now. Please retry.';
        this.loading = false;
      }
    });
  }
}
