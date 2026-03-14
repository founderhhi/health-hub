import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiClientService } from '../../../core/api/api-client.service';
import { WsEvent, WsService } from '../../../core/realtime/ws.service';

export interface ChatPanelMessage {
  id: string;
  consultation_id: string;
  user_id: string;
  message: string;
  created_at: string;
  sender_name?: string | null;
  sender_role?: string | null;
  senderLabel?: string;
  mine?: boolean;
}

interface ChatListResponse {
  messages: ChatPanelMessage[];
}

interface ChatSendResponse {
  message: ChatPanelMessage;
}

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-panel.html',
  styleUrl: './chat-panel.scss'
})
export class ChatPanelComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() consultationId = '';
  @Input() currentUserId = '';
  @Input() endpointBase = '/chat';
  @Input() title = 'Chat';
  @Input() placeholder = 'Type a message';
  @Input() sendButtonLabel = 'Send';
  @Input() disabled = false;

  @Output() messageSent = new EventEmitter<ChatPanelMessage>();
  @Output() messagesLoaded = new EventEmitter<ChatPanelMessage[]>();

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  loading = false;
  sending = false;
  error = '';
  draft = '';
  messages: ChatPanelMessage[] = [];

  private readonly platformId = inject(PLATFORM_ID);
  private shouldScrollToBottom = false;
  private wsSubscription?: Subscription;
  private knownMessageIds = new Set<string>();
  private cancelLoad$ = new Subject<void>();

  constructor(
    private api: ApiClientService,
    private ws: WsService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.currentUserId) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
    }

    this.wsSubscription = this.ws.events$.subscribe((event) => {
      this.handleRealtimeEvent(event);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultationId'] && this.consultationId) {
      this.loadMessages();
      return;
    }

    if (changes['consultationId'] && !this.consultationId) {
      this.messages = [];
      this.knownMessageIds.clear();
    }
  }

  ngAfterViewChecked(): void {
    if (!this.shouldScrollToBottom) {
      return;
    }

    this.scrollToBottom();
    this.shouldScrollToBottom = false;
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.cancelLoad$.next();
    this.cancelLoad$.complete();
  }

  loadMessages(): void {
    if (!this.consultationId || this.disabled) {
      this.messages = [];
      this.knownMessageIds.clear();
      return;
    }

    this.cancelLoad$.next();
    this.loading = true;
    this.error = '';

    this.api.get<ChatListResponse>(`${this.endpointBase}/${this.consultationId}`).pipe(takeUntil(this.cancelLoad$)).subscribe({
      next: (response) => {
        this.messages = (response.messages || []).map((item) => this.decorateMessage(item));
        this.knownMessageIds = new Set(this.messages.map((item) => item.id));
        this.messagesLoaded.emit(this.messages);
        this.loading = false;
        this.shouldScrollToBottom = true;
      },
      error: (error) => {
        this.loading = false;
        this.error = this.resolveChatError(error, 'load');
      }
    });
  }

  sendMessage(): void {
    if (this.disabled || this.sending) {
      return;
    }

    const message = this.draft.trim();
    if (!message || !this.consultationId) {
      return;
    }

    this.sending = true;
    this.error = '';

    this.api.post<ChatSendResponse>(`${this.endpointBase}/${this.consultationId}`, { message }).subscribe({
      next: (response) => {
        const savedMessage = this.decorateMessage(response.message);
        this.upsertMessage(savedMessage);
        this.messageSent.emit(savedMessage);
        this.draft = '';
        this.sending = false;
        this.shouldScrollToBottom = true;
      },
      error: (error) => {
        this.sending = false;
        this.error = this.resolveChatError(error, 'send');
      }
    });
  }

  trackMessage(_index: number, message: ChatPanelMessage): string {
    return message.id;
  }

  private decorateMessage(message: ChatPanelMessage): ChatPanelMessage {
    const mine = Boolean(this.currentUserId && message.user_id === this.currentUserId);
    return {
      ...message,
      mine,
      senderLabel: this.resolveSenderLabel(message, mine)
    };
  }

  private resolveSenderLabel(message: ChatPanelMessage, mine: boolean): string {
    if (mine) {
      return 'You';
    }

    const senderName = String(message.sender_name || '').trim();
    const senderRole = String(message.sender_role || '').trim().toLowerCase();

    if (senderRole === 'gp' || senderRole === 'doctor') {
      if (senderName) {
        return senderName.toLowerCase().startsWith('dr ') ? senderName : `Dr ${senderName}`;
      }
      return 'GP';
    }

    if (senderRole === 'specialist') {
      if (senderName) {
        return senderName.toLowerCase().startsWith('dr ') ? senderName : `Dr ${senderName}`;
      }
      return 'Specialist';
    }

    if (senderName) {
      return senderName;
    }

    if (senderRole === 'patient') {
      return 'Patient';
    }

    return 'Participant';
  }

  private upsertMessage(message: ChatPanelMessage): void {
    if (!message.id || this.knownMessageIds.has(message.id)) {
      return;
    }

    this.knownMessageIds.add(message.id);
    this.messages = [...this.messages, message];
    this.shouldScrollToBottom = true;
  }

  private handleRealtimeEvent(event: WsEvent): void {
    if (event.event !== 'chat.message' || this.disabled || !this.consultationId) {
      return;
    }

    const payload = (event.data || {}) as {
      consultationId?: string;
      message?: ChatPanelMessage;
    };
    if (payload.consultationId !== this.consultationId || !payload.message) {
      return;
    }

    const incoming = this.decorateMessage(payload.message);
    this.upsertMessage(incoming);
    this.messagesLoaded.emit(this.messages);
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer?.nativeElement;
    if (!container) {
      return;
    }
    container.scrollTop = container.scrollHeight;
  }

  private resolveChatError(error: any, action: 'load' | 'send'): string {
    const code = String(error?.error?.code || '').toUpperCase();
    const status = Number(error?.status || 0);

    if (code === 'NOT_ACTIVE') {
      return 'Chat is closed because the consultation has ended.';
    }

    if (code === 'SCHEMA_ERROR') {
      return 'Chat server is unavailable right now. Please retry shortly.';
    }

    if (status === 0) {
      return 'Chat request timed out. Check your connection and retry.';
    }

    if (status >= 500) {
      return 'Chat server error. Please retry in a moment.';
    }

    if (code === 'NOT_PARTICIPANT' || status === 403) {
      return 'You are no longer allowed to access this chat.';
    }

    return action === 'send' ? 'Unable to send message.' : 'Unable to load messages.';
  }
}
