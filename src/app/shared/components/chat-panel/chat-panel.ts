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
import { Subscription } from 'rxjs';
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

  constructor(
    private api: ApiClientService,
    private ws: WsService
  ) {}

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
  }

  loadMessages(): void {
    if (!this.consultationId || this.disabled) {
      this.messages = [];
      this.knownMessageIds.clear();
      return;
    }

    this.loading = true;
    this.error = '';

    this.api.get<ChatListResponse>(`${this.endpointBase}/${this.consultationId}`).subscribe({
      next: (response) => {
        this.messages = (response.messages || []).map((item) => this.decorateMessage(item));
        this.knownMessageIds = new Set(this.messages.map((item) => item.id));
        this.messagesLoaded.emit(this.messages);
        this.loading = false;
        this.shouldScrollToBottom = true;
      },
      error: () => {
        this.loading = false;
        this.error = 'Unable to load messages.';
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
      error: () => {
        this.sending = false;
        this.error = 'Unable to send message.';
      }
    });
  }

  trackMessage(_index: number, message: ChatPanelMessage): string {
    return message.id;
  }

  private decorateMessage(message: ChatPanelMessage): ChatPanelMessage {
    return {
      ...message,
      mine: Boolean(this.currentUserId && message.user_id === this.currentUserId)
    };
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
}
