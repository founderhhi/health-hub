import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, firstValueFrom, timeout } from 'rxjs';
import { ChatPanelComponent } from '../chat-panel/chat-panel';
import { WsService } from '../../../core/realtime/ws.service';
import { ApiClientService } from '../../../core/api/api-client.service';

export type ConsultMode = 'video' | 'audio' | 'chat';
export type ConsultRole = 'gp' | 'patient';
export type ConsultStatus = 'connecting' | 'active' | 'completed' | 'error';

interface JoinLinkResponse {
  roomUrl: string;
  tokenStatus?: 'generated' | 'fallback';
}

@Component({
  selector: 'app-consult-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatPanelComponent],
  templateUrl: './consult-shell.html',
  styleUrl: './consult-shell.scss'
})
export class ConsultShellComponent implements OnInit, OnDestroy {
  private static readonly JOIN_LINK_TIMEOUT_MS = 8000;

  @Input() consultationId = '';
  @Input() roomUrl = '';
  @Input() autoStartCall = false;
  @Input() mode: ConsultMode = 'video';
  @Input() role: ConsultRole = 'patient';
  @Input() patientName = '';
  @Input() gpName = '';

  @Output() endConsultation = new EventEmitter<{ notes: string }>();
  @Output() prescribe = new EventEmitter<void>();
  @Output() refer = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();

  status: ConsultStatus = 'connecting';
  callActive = false;
  elapsedTime = '00:00';
  endNotes = '';
  showEndConfirm = false;
  ending = false;
  errorMessage = '';
  currentUserId = '';
  joiningCall = false;
  fallbackRoomUrl = '';
  private autoStartConsumed = false;

  private platformId = inject(PLATFORM_ID);
  private timerInterval: any;
  private startTime = 0;
  private wsSubscription?: Subscription;

  constructor(
    private ws: WsService,
    private api: ApiClientService
  ) {}

  ngOnInit(): void {
    this.status = 'active';
    if (this.mode === 'chat') {
      this.startElapsedTimer();
    }

    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
      this.wsSubscription = this.ws.events$.subscribe((event) => {
        if (event.event === 'consult.completed') {
          const data = event.data as any;
          const id = data?.consultationId || data?.consultation?.id;
          if (id === this.consultationId) {
            this.status = 'completed';
            this.stopTimer();
          }
        }
      });

      if (this.autoStartCall && !this.autoStartConsumed && (this.mode === 'video' || this.mode === 'audio')) {
        this.autoStartConsumed = true;
        setTimeout(() => {
          this.startCall();
        }, 0);
      }
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.wsSubscription?.unsubscribe();
  }

  get modeLabel(): string {
    switch (this.mode) {
      case 'video': return 'Video Call';
      case 'audio': return 'Audio Call';
      case 'chat': return 'Chat';
    }
  }

  get modeIcon(): string {
    switch (this.mode) {
      case 'video': return 'video';
      case 'audio': return 'phone';
      case 'chat': return 'message';
    }
  }

  get otherPartyName(): string {
    return this.role === 'gp' ? (this.patientName || 'Patient') : (this.gpName || 'Your GP');
  }

  get canStartCall(): boolean {
    return (this.mode === 'video' || this.mode === 'audio')
      && (!!this.roomUrl || !!this.consultationId)
      && !this.callActive
      && !this.joiningCall;
  }

  get canEscalateToCall(): boolean {
    return this.mode === 'chat'
      && (!!this.roomUrl || !!this.consultationId)
      && !this.callActive
      && !this.joiningCall;
  }

  get isGp(): boolean {
    return this.role === 'gp';
  }

  startCall(): void {
    void this.openCallWindow();
  }

  escalateToCall(): void {
    void this.openCallWindow();
  }

  openEndConfirm(): void {
    this.showEndConfirm = true;
  }

  cancelEnd(): void {
    this.showEndConfirm = false;
    this.endNotes = '';
  }

  confirmEnd(): void {
    this.ending = true;
    this.endConsultation.emit({ notes: this.endNotes });
  }

  onPrescribe(): void {
    this.prescribe.emit();
  }

  onRefer(): void {
    this.refer.emit();
  }

  onEndComplete(): void {
    this.ending = false;
    this.showEndConfirm = false;
    this.status = 'completed';
    this.stopTimer();
  }

  onEndError(message: string): void {
    this.ending = false;
    this.errorMessage = message;
    setTimeout(() => { this.errorMessage = ''; }, 5000);
  }

  goBack(): void {
    this.leave.emit();
  }

  private async openCallWindow(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.joiningCall) {
      return;
    }

    this.joiningCall = true;
    this.errorMessage = '';

    try {
      let resolvedRoomUrl = this.roomUrl;
      const popup = window.open('', '_blank', 'noopener,noreferrer');
      const popupBlocked = !popup;

      if (this.consultationId) {
        try {
          const response = await firstValueFrom(
            this.api
              .get<JoinLinkResponse>(`/consultations/${this.consultationId}/join-link?role=${this.role}`)
              .pipe(timeout(ConsultShellComponent.JOIN_LINK_TIMEOUT_MS))
          );
          resolvedRoomUrl = response.roomUrl || resolvedRoomUrl;
        } catch (error: any) {
          const timedOut = error?.name === 'TimeoutError';
          const backendError = String(error?.error?.error || '');
          const fallbackError = timedOut
            ? 'Timed out while preparing call link.'
            : backendError || 'Unable to prepare call link right now.';
          if (!resolvedRoomUrl) {
            this.errorMessage = fallbackError;
            this.callActive = false;
            if (popup && !popup.closed) {
              popup.close();
            }
            return;
          }
          this.errorMessage = `${fallbackError} Using last known call link.`;
        }
      }

      if (!resolvedRoomUrl) {
        this.errorMessage = 'Consultation room is unavailable right now.';
        this.callActive = false;
        if (popup && !popup.closed) {
          popup.close();
        }
        return;
      }

      this.fallbackRoomUrl = resolvedRoomUrl;
      this.roomUrl = resolvedRoomUrl;

      if (popupBlocked) {
        this.errorMessage = 'Popup blocked. Use Open Here or Copy Link to continue.';
        this.callActive = false;
        return;
      }

      try {
        popup.location.replace(resolvedRoomUrl);
      } catch {
        if (!popup.closed) {
          popup.close();
        }
        this.callActive = true;
        this.startElapsedTimer();
        window.location.href = resolvedRoomUrl;
        return;
      }

      this.callActive = true;
      this.startElapsedTimer();
    } finally {
      this.joiningCall = false;
    }
  }

  openCallInSameTab(): void {
    if (!isPlatformBrowser(this.platformId) || !this.fallbackRoomUrl) {
      return;
    }

    this.callActive = true;
    this.startElapsedTimer();
    window.location.href = this.fallbackRoomUrl;
  }

  copyCallLink(): void {
    if (!isPlatformBrowser(this.platformId) || !this.fallbackRoomUrl) {
      return;
    }

    const clipboard = navigator?.clipboard;
    if (!clipboard?.writeText) {
      this.errorMessage = 'Copy is not supported in this browser. Use Open Here to continue.';
      return;
    }

    void clipboard.writeText(this.fallbackRoomUrl).then(() => {
      this.errorMessage = 'Consultation link copied. Open it in a new tab if needed.';
    }).catch(() => {
      this.errorMessage = 'Unable to copy link right now. Use Open Here to continue.';
    });
  }

  private startElapsedTimer(): void {
    if (this.startTime > 0 || this.timerInterval) {
      return;
    }

    this.startTime = Date.now();
    this.startTimer();
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      this.elapsedTime = `${minutes}:${seconds}`;
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
