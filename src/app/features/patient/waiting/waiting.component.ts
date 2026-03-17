import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WsService } from '../../../core/realtime/ws.service';
import { PatientApiService } from '../../../core/api/patient.service';
import { ConsultShellComponent, ConsultMode } from '../../../shared/components/consult-shell/consult-shell';

@Component({
  selector: 'app-patient-waiting',
  standalone: true,
  imports: [CommonModule, RouterModule, ConsultShellComponent],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent implements OnInit, OnDestroy {
  roomUrl = '';
  consultationId = '';
  consultMode: ConsultMode = 'video';
  gpName = '';
  showConsultShell = false;
  showCancelConfirm = false;
  cancelPending = false;
  isRefreshing = false;
  consultationFinished = false;
  statusMessage = 'Waiting for a Health Expert to accept your request...';

  private platformId = inject(PLATFORM_ID);
  private requestId = '';
  private activeConsultPollTimer?: ReturnType<typeof setInterval>;
  private dashboardRedirectTimer?: ReturnType<typeof setTimeout>;
  private wsSubscription?: Subscription;

  constructor(
    private ws: WsService,
    private router: Router,
    private patientApi: PatientApiService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve requested mode from sessionStorage (set by patient dashboard)
      const savedMode = sessionStorage.getItem('hhi_consult_mode');
      if (savedMode === 'audio' || savedMode === 'chat') {
        this.consultMode = savedMode;
      }

      const userId = localStorage.getItem('hhi_user_id') || '';
      this.ws.connect('patient', userId);

      this.wsSubscription = this.ws.events$.subscribe((event) => {
        if (event.event === 'consult.accepted') {
          this.applyAcceptedConsultation(event.data);
        }
        if (event.event === 'consult.completed') {
          const data = event.data as any;
          const id = data?.consultationId || data?.consultation?.id;
          if (id === this.consultationId) {
            this.handleConsultationCompleted('Consultation has been completed by your Health Expert.');
          }
        }
        if (event.event === 'consult.removed') {
          this.finishWaitingFlow('Your request was removed from the queue.');
        }
      });

      // Recover from missed websocket events (refresh/WS drop) while user is waiting.
      this.pollActiveConsult();
      this.activeConsultPollTimer = setInterval(() => this.pollActiveConsult(), 5000);
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    if (this.activeConsultPollTimer) {
      clearInterval(this.activeConsultPollTimer);
      this.activeConsultPollTimer = undefined;
    }
    this.clearDashboardRedirectTimer();
  }

  joinConsult(): void {
    if (!this.canJoinConsultation) {
      return;
    }

    this.statusMessage = this.gpName
      ? `${this.gpName} is ready. Joining consultation...`
      : 'Your Health Expert is ready. Joining consultation...';
    this.showConsultShell = true;
  }

  refreshStatus(): void {
    if (this.isRefreshing) {
      return;
    }
    this.isRefreshing = true;
    this.patientApi.getActiveConsult().subscribe({
      next: (response) => {
        const active = response?.active;
        if (active) {
          this.requestId = active.id || this.requestId;
          if (active.status === 'accepted') {
            this.applyAcceptedConsultation(active);
          }
        } else {
          if (this.hasAcceptedConsultation || this.showConsultShell || this.consultationFinished) {
            this.finishWaitingFlow('Consultation is no longer active.');
          } else {
            this.statusMessage = 'No active consultation found. Your Health Expert may not have accepted yet.';
          }
        }
        this.isRefreshing = false;
      },
      error: () => {
        this.isRefreshing = false;
      }
    });
  }

  requestCancel(): void {
    if (this.cancelPending) {
      return;
    }
    if (this.consultationFinished) {
      this.navigateToDashboard();
      return;
    }
    this.showCancelConfirm = true;
  }

  closeCancelConfirm(): void {
    if (this.cancelPending) {
      return;
    }
    this.showCancelConfirm = false;
  }

  onLeaveConsultShell(): void {
    this.showConsultShell = false;
    if (this.consultationFinished) {
      this.navigateToDashboard();
      return;
    }
    if (this.hasAcceptedConsultation && !this.cancelPending) {
      this.statusMessage = this.gpName
        ? `${this.gpName} is still available. Tap join when you are ready.`
        : 'Your consultation is ready. Tap join when you are ready.';
    }
  }

  confirmCancel(): void {
    if (this.cancelPending) {
      return;
    }

    this.cancelPending = true;
    this.showCancelConfirm = false;
    this.statusMessage = 'Cancelling your consultation request...';

    if (this.requestId) {
      this.cancelRequest(this.requestId);
      return;
    }

    // If request id is missing locally, resolve active request first and cancel it.
    this.patientApi.getActiveConsult().subscribe({
      next: (response) => {
        const fallbackRequestId = response?.active?.id;
        if (fallbackRequestId) {
          this.cancelRequest(fallbackRequestId);
          return;
        }
        this.cancelPending = false;
        this.router.navigate(['/patient/dashboard']);
      },
      error: () => {
        this.cancelPending = false;
        this.router.navigate(['/patient/dashboard']);
      }
    });
  }

  private cancelRequest(requestId: string): void {
    this.patientApi.cancelConsult(requestId).subscribe({
      next: () => {
        this.cancelPending = false;
        this.router.navigate(['/patient/dashboard']);
      },
      error: () => {
        this.cancelPending = false;
        this.router.navigate(['/patient/dashboard']);
      }
    });
  }

  private applyAcceptedConsultation(payload: unknown): void {
    const data = payload as any;
    const requestId = this.extractRequestId(data);
    if (requestId) {
      if (this.requestId && requestId !== this.requestId) {
        return;
      }
      this.requestId = requestId;
    }

    const nextConsultationId = this.extractConsultationId(data);
    const nextRoomUrl = this.extractRoomUrl(data);
    if (!nextConsultationId) {
      return;
    }

    if (this.cancelPending) {
      return;
    }

    this.clearDashboardRedirectTimer();
    this.consultationFinished = false;
    this.roomUrl = nextRoomUrl;
    this.consultationId = nextConsultationId;
    this.gpName = data?.gpName || data?.consultation?.gp_name || data?.gp_name || '';
    this.statusMessage = this.gpName
      ? `${this.gpName} accepted your request. Tap join when you are ready.`
      : 'A Health Expert accepted your request. Tap join when you are ready.';
  }

  private pollActiveConsult(): void {
    this.patientApi.getActiveConsult().subscribe({
      next: (response) => {
        const active = response?.active;

        if (!active) {
          if (this.consultationFinished && this.showConsultShell) {
            return;
          }
          if (this.consultationId || this.roomUrl) {
            this.finishWaitingFlow('Consultation is no longer active.');
          }
          return;
        }

        this.requestId = active.id || this.requestId;

        if (active.status === 'accepted') {
          this.applyAcceptedConsultation(active);
        } else if (!this.roomUrl) {
          this.statusMessage = 'Waiting for a Health Expert to accept your request...';
        }
      },
      error: () => {
        // Keep current UI state and wait for next poll cycle.
      }
    });
  }

  private extractConsultationId(payload: any): string {
    return (
      payload?.consultation_id ||
      payload?.consultation?.consultation_id ||
      payload?.consultation?.consultationId ||
      payload?.consultation?.id ||
      payload?.consultationId ||
      payload?.id ||
      ''
    );
  }

  private extractRequestId(payload: any): string {
    return (
      payload?.requestId ||
      payload?.request_id ||
      payload?.id ||
      payload?.consultation?.request_id ||
      payload?.consultation?.requestId ||
      ''
    );
  }

  private extractRoomUrl(payload: any): string {
    return (
      payload?.daily_room_url ||
      payload?.consultation?.daily_room_url ||
      payload?.consultation?.roomUrl ||
      payload?.roomUrl ||
      ''
    );
  }

  private handleConsultationCompleted(message: string): void {
    this.consultationFinished = true;
    this.showCancelConfirm = false;
    this.cancelPending = false;
    this.statusMessage = message;

    if (this.showConsultShell) {
      return;
    }

    this.finishWaitingFlow(message);
  }

  private finishWaitingFlow(message: string): void {
    this.consultationFinished = true;
    this.showConsultShell = false;
    this.showCancelConfirm = false;
    this.cancelPending = false;
    this.clearConsultationState();
    this.statusMessage = `${message} Returning you to dashboard...`;
    this.scheduleDashboardRedirect();
  }

  private clearConsultationState(): void {
    this.roomUrl = '';
    this.consultationId = '';
    this.requestId = '';
    this.gpName = '';
  }

  private scheduleDashboardRedirect(): void {
    this.clearDashboardRedirectTimer();
    this.dashboardRedirectTimer = setTimeout(() => {
      this.navigateToDashboard();
    }, 1500);
  }

  private clearDashboardRedirectTimer(): void {
    if (this.dashboardRedirectTimer) {
      clearTimeout(this.dashboardRedirectTimer);
      this.dashboardRedirectTimer = undefined;
    }
  }

  private navigateToDashboard(): void {
    this.clearDashboardRedirectTimer();
    void this.router.navigate(['/patient/dashboard']);
  }

  get hasAcceptedConsultation(): boolean {
    return Boolean(this.consultationId || this.roomUrl);
  }

  get canJoinConsultation(): boolean {
    return this.hasAcceptedConsultation && !this.cancelPending;
  }

  get showRefreshButton(): boolean {
    return !this.hasAcceptedConsultation && !this.cancelPending && !this.consultationFinished;
  }
}
