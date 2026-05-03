import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription, firstValueFrom, timeout } from 'rxjs';
import { WsService } from '../../../core/realtime/ws.service';
import { PatientApiService } from '../../../core/api/patient.service';
import { ConsultShellComponent, ConsultMode } from '../../../shared/components/consult-shell/consult-shell';

@Component({
  selector: 'app-patient-waiting',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConsultShellComponent],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent implements OnInit, OnDestroy {
  roomUrl = '';
  consultationId = '';
  consultMode: ConsultMode = 'video';
  gpName = '';

  // Post-call review state
  showReviewPage = false;
  reviewRating = 0;
  reviewComment = '';
  reviewSubmitted = false;
  submittingReview = false;
  showCloseTabPrompt = false;
  showConsultShell = false;
  showCancelConfirm = false;
  cancelPending = false;
  isRefreshing = false;
  consultationFinished = false;
  hasJoinedCall = false; // true once the patient actually opens the call window
  statusMessage = 'Waiting for a Health Expert to accept your request...';
  showAcceptedOverlay = false;
  private platformId = inject(PLATFORM_ID);
  private requestId = '';
  private activeConsultPollTimer?: ReturnType<typeof setInterval>;
  private dashboardRedirectTimer?: ReturnType<typeof setTimeout>;
  private wsSubscription?: Subscription;

  // "Check if doctor joined" button state
  checkingDoctorStatus = false;
  showDoctorNotJoinedMsg = false;

  constructor(
    private ws: WsService,
    private router: Router,
    private patientApi: PatientApiService,
    private cdr: ChangeDetectorRef
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

  async joinConsult(): Promise<void> {
    if (!this.canJoinConsultation) {
      return;
    }
    this.showAcceptedOverlay = false;

    // Chat mode: open the in-app chat shell
    if (this.consultMode === 'chat') {
      this.statusMessage = this.gpName
        ? `${this.gpName} is ready. Opening chat...`
        : 'Your Health Expert is ready. Opening chat...';
      this.showConsultShell = true;
      return;
    }

    // Video / audio: navigate directly to the Daily.co room — no extra click needed
    this.statusMessage = this.gpName
      ? `Connecting you to ${this.gpName}...`
      : 'Connecting to your Health Expert...';

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let roomUrl = this.roomUrl;

    // Fetch the authoritative room URL if we don't have one cached
    if (!roomUrl && this.consultationId) {
      try {
        const resp = await firstValueFrom(
          this.patientApi.getConsultationJoinLink(this.consultationId).pipe(timeout(8000))
        );
        roomUrl = resp.roomUrl || '';
      } catch {
        // fall through — will show error below
      }
    }

    if (!roomUrl) {
      this.statusMessage = 'Unable to join the room right now. Please try refreshing.';
      return;
    }

    window.open(roomUrl, '_blank');
    this.hasJoinedCall = true;
    // Show consult shell on the original tab so the patient can rejoin if needed
    this.showConsultShell = true;
  }

  private stopPolling(): void {
    if (this.activeConsultPollTimer) {
      clearInterval(this.activeConsultPollTimer);
      this.activeConsultPollTimer = undefined;
    }
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
    // Stop polling — patient has already been in the call, no need to re-trigger accepted overlay
    this.stopPolling();
    // Always show the review page when leaving a consultation (whether ended by GP or by patient)
    if (this.hasAcceptedConsultation || this.consultationFinished) {
      this.showReviewPage = true;
      return;
    }
    // If they hadn't actually joined yet, go back to waiting
    if (this.hasAcceptedConsultation && !this.cancelPending) {
      this.statusMessage = this.gpName
        ? `${this.gpName} is still available.`
        : 'Your consultation is still available.';
    }
  }

  confirmCancel(): void {
    if (this.cancelPending) return;
    this.cancelPending = true;
    this.showCancelConfirm = false;
    this.showAcceptedOverlay = false; // dismiss any doctor-joined popup
    this.stopPolling(); // stop poll so overlay never re-appears
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
    const gpName = data?.gpName || data?.consultation?.gp_name || data?.gp_name || '';

    if (this.cancelPending) {
      return;
    }

    // Doctor has accepted but the consultation room is not provisioned yet.
    // Update the status message so the patient knows they're not still waiting,
    // and let the poll timer retry until the room is ready.
    if (!nextConsultationId && !nextRoomUrl) {
      if (gpName) this.gpName = gpName;
      this.statusMessage = gpName
        ? `${gpName} has accepted your request. Preparing your session...`
        : 'A Health Expert has accepted your request. Preparing your session...';
      this.cdr.detectChanges();
      return;
    }

    this.clearDashboardRedirectTimer();
    this.consultationFinished = false;
    this.roomUrl = nextRoomUrl;
    this.consultationId = nextConsultationId;
    this.gpName = gpName;

    if (this.consultMode === 'chat') {
      this.statusMessage = this.gpName
        ? `${this.gpName} accepted your request. Opening the chat now.`
        : 'A Health Expert accepted your request. Opening the chat now.';
      this.showConsultShell = true;
      this.cdr.detectChanges();
      return;
    }

    // For video/audio: set the overlay flag. The button-based check
    // (checkDoctorJoined) is the reliable trigger. WS/poll also set this
    // and cdr.detectChanges() is called; if that doesn't fire the view
    // the patient can use the button as a guaranteed fallback.
    this.statusMessage = this.gpName
      ? `${this.gpName} has accepted your request.`
      : 'A Health Expert has accepted your request.';
    this.showAcceptedOverlay = true;
    this.cdr.detectChanges();
  }

  private pollActiveConsult(): void {
    // Do not poll after patient has already joined — prevents re-showing the overlay
    if (this.hasJoinedCall || this.showReviewPage || this.cancelPending) return;

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
          // Don't show accepted overlay again if patient already joined
          if (this.hasJoinedCall || this.showConsultShell) return;
          if (!this.showConsultShell && !this.consultationId) {
            const gpName = active?.gp_name || active?.gpName || this.gpName || '';
            this.statusMessage = gpName
              ? `${gpName} has accepted your request. Preparing your session...`
              : 'A Health Expert has accepted your request. Preparing your session...';
          }
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
    this.showAcceptedOverlay = false;
    this.showCancelConfirm = false;
    this.cancelPending = false;
    this.stopPolling();
    this.clearConsultationState();
    this.statusMessage = message;
    // Show review page instead of auto-redirecting
    this.showReviewPage = true;
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

  // "Check if doctor joined" button — guaranteed to work because button clicks
  // are always inside Angular's zone, so state changes immediately update the view.
  checkDoctorJoined(): void {
    if (this.checkingDoctorStatus) return;
    this.checkingDoctorStatus = true;
    this.showDoctorNotJoinedMsg = false;

    this.patientApi.getActiveConsult().subscribe({
      next: (response) => {
        this.checkingDoctorStatus = false;
        const active = response?.active;
        if (active && active.status === 'accepted') {
          this.requestId = active.id || this.requestId;
          this.applyAcceptedConsultation(active);
        } else {
          this.showDoctorNotJoinedMsg = true;
        }
      },
      error: () => {
        this.checkingDoctorStatus = false;
        this.showDoctorNotJoinedMsg = true;
      }
    });
  }

  dismissDoctorNotJoined(): void {
    this.showDoctorNotJoinedMsg = false;
  }

  setReviewRating(rating: number): void {
    this.reviewRating = rating;
  }

  submitReview(): void {
    if (this.submittingReview) return;
    this.submittingReview = true;
    // Submit review to API (fire-and-forget, non-blocking)
    this.patientApi.submitConsultationReview({
      rating: this.reviewRating,
      comment: this.reviewComment
    }).subscribe({ error: () => {} });
    setTimeout(() => {
      this.submittingReview = false;
      this.reviewSubmitted = true;
      this.showCloseTabPrompt = true;
    }, 600);
  }

  skipReview(): void {
    this.reviewSubmitted = true;
    this.showCloseTabPrompt = true;
  }

  goToDashboard(): void {
    this.navigateToDashboard();
  }

  get showRefreshButton(): boolean {
    return false; // Auto-polling handles status refresh — manual button removed (Issue 1)
  }
}
