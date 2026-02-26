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
  statusMessage = 'Waiting for a GP to accept your request...';

  private platformId = inject(PLATFORM_ID);
  private requestId = '';
  private autoOpenedConsultationId = '';
  private activeConsultPollTimer?: ReturnType<typeof setInterval>;
  private wsSubscription?: Subscription;

  constructor(
    private ws: WsService,
    private router: Router,
    private patientApi: PatientApiService
  ) {}

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
            this.statusMessage = 'Consultation has been completed by your GP.';
            this.showConsultShell = false;
            this.roomUrl = '';
            this.consultationId = '';
          }
        }
        if (event.event === 'consult.removed') {
          this.statusMessage = 'Your request was removed from the queue.';
          this.showConsultShell = false;
          this.roomUrl = '';
          this.consultationId = '';
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
  }

  joinConsult(): void {
    this.showConsultShell = true;
  }

  onLeaveConsultShell(): void {
    this.showConsultShell = false;
  }

  cancel(): void {
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
        this.router.navigate(['/patient/dashboard']);
      },
      error: () => {
        this.router.navigate(['/patient/dashboard']);
      }
    });
  }

  private cancelRequest(requestId: string): void {
    this.patientApi.cancelConsult(requestId).subscribe({
      next: () => this.router.navigate(['/patient/dashboard']),
      error: () => this.router.navigate(['/patient/dashboard'])
    });
  }

  private applyAcceptedConsultation(payload: unknown): void {
    const data = payload as any;
    this.roomUrl = this.extractRoomUrl(data);
    this.consultationId = this.extractConsultationId(data);
    this.gpName = data?.gpName || data?.consultation?.gp_name || data?.gp_name || '';

    if (!this.roomUrl || !this.consultationId) {
      return;
    }

    this.statusMessage = 'GP accepted. Joining consultation...';

    // Auto-open consultation shell once per consultation so handoff does not stall on waiting page.
    if (this.autoOpenedConsultationId !== this.consultationId) {
      this.showConsultShell = true;
      this.autoOpenedConsultationId = this.consultationId;
    }
  }

  private pollActiveConsult(): void {
    this.patientApi.getActiveConsult().subscribe({
      next: (response) => {
        const active = response?.active;

        if (!active) {
          if (this.consultationId || this.roomUrl) {
            this.statusMessage = 'Consultation is no longer active.';
            this.showConsultShell = false;
            this.consultationId = '';
            this.roomUrl = '';
          }
          return;
        }

        this.requestId = active.id || this.requestId;

        if (active.status === 'accepted') {
          this.applyAcceptedConsultation(active);
        } else if (!this.roomUrl) {
          this.statusMessage = 'Waiting for a GP to accept your request...';
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
      ''
    );
  }

  private extractRoomUrl(payload: any): string {
    return payload?.daily_room_url || payload?.consultation?.daily_room_url || payload?.consultation?.roomUrl || payload?.roomUrl || '';
  }
}
