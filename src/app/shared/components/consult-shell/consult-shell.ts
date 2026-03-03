import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, firstValueFrom } from 'rxjs';
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
    this.startTime = Date.now();
    this.startTimer();

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

      if (this.consultationId) {
        try {
          const response = await firstValueFrom(
            this.api.get<JoinLinkResponse>(`/consultations/${this.consultationId}/join-link?role=${this.role}`)
          );
          resolvedRoomUrl = response.roomUrl || resolvedRoomUrl;
        } catch (error: any) {
          const backendError = String(error?.error?.error || '');
          const fallbackError = backendError || 'Unable to prepare call link right now.';
          if (!resolvedRoomUrl) {
            this.errorMessage = fallbackError;
            this.callActive = false;
            return;
          }
          this.errorMessage = `${fallbackError} Using last known call link.`;
        }
      }

      if (!resolvedRoomUrl) {
        this.errorMessage = 'Consultation room is unavailable right now.';
        this.callActive = false;
        return;
      }

      const popup = window.open(resolvedRoomUrl, '_blank', 'noopener,noreferrer');
      if (!popup) {
        this.errorMessage = 'Popup blocked. Tap Start Call to join consultation.';
        this.callActive = false;
        return;
      }

      this.callActive = true;
    } finally {
      this.joiningCall = false;
    }
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
