import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatPanelComponent } from '../chat-panel/chat-panel';
import { WsService } from '../../../core/realtime/ws.service';

export type ConsultMode = 'video' | 'audio' | 'chat';
export type ConsultRole = 'gp' | 'patient';
export type ConsultStatus = 'connecting' | 'active' | 'completed' | 'error';

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
  @Input() mode: ConsultMode = 'video';
  @Input() role: ConsultRole = 'patient';
  @Input() patientName = '';
  @Input() gpName = '';

  @Output() endConsultation = new EventEmitter<{ notes: string }>();
  @Output() leave = new EventEmitter<void>();

  status: ConsultStatus = 'connecting';
  callActive = false;
  elapsedTime = '00:00';
  endNotes = '';
  showEndConfirm = false;
  ending = false;
  errorMessage = '';
  currentUserId = '';

  private platformId = inject(PLATFORM_ID);
  private timerInterval: any;
  private startTime = 0;
  private wsSubscription?: Subscription;

  constructor(private ws: WsService) {}

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
    return (this.mode === 'video' || this.mode === 'audio') && !!this.roomUrl && !this.callActive;
  }

  get canEscalateToCall(): boolean {
    return this.mode === 'chat' && !!this.roomUrl && !this.callActive;
  }

  get isGp(): boolean {
    return this.role === 'gp';
  }

  startCall(): void {
    if (!this.roomUrl || !isPlatformBrowser(this.platformId)) return;
    this.callActive = true;
    window.open(this.roomUrl, '_blank', 'noopener');
  }

  escalateToCall(): void {
    if (!this.roomUrl || !isPlatformBrowser(this.platformId)) return;
    this.callActive = true;
    window.open(this.roomUrl, '_blank', 'noopener');
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
