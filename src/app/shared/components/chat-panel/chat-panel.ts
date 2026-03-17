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
import { finalize, takeUntil } from 'rxjs/operators';
import { ApiClientService } from '../../../core/api/api-client.service';
import { WsConnectionState, WsEvent, WsService } from '../../../core/realtime/ws.service';

export interface ChatPanelMessage {
  id: string;
  consultation_id: string;
  user_id: string;
  message: string;
  created_at: string;
  sender_name?: string | null;
  sender_role?: string | null;
  client_request_id?: string | null;
  senderLabel?: string;
  senderRoleLabel?: string;
  mine?: boolean;
  pending?: boolean;
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
  private static readonly FALLBACK_POLL_INTERVAL_MS = 2000;

  @Input() consultationId = '';
  @Input() currentUserId = '';
  @Input() endpointBase = '/chat';
  @Input() title = 'Care chat';
  @Input() placeholder = 'Share an update or ask a question';
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
  connectionState: WsConnectionState = 'disconnected';

  private readonly platformId = inject(PLATFORM_ID);
  private shouldScrollToBottom = false;
  private wsSubscription?: Subscription;
  private connectionStateSubscription?: Subscription;
  private knownMessageIds = new Set<string>();
  private cancelLoad$ = new Subject<void>();
  private fallbackPollTimer: ReturnType<typeof setInterval> | null = null;
  private loadInFlight = false;
  private pendingRequestIds = new Set<string>();
  private currentUserRole = '';

  constructor(
    private api: ApiClientService,
    private ws: WsService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.currentUserId) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
      this.currentUserRole = String(localStorage.getItem('hhi_user_role') || '').trim().toLowerCase();
    }

    if (isPlatformBrowser(this.platformId)) {
      const accessToken = localStorage.getItem('access_token') || localStorage.getItem('hhi_auth_token');
      if (accessToken) {
        this.ws.connect('consultation-chat');
      }
    }

    this.wsSubscription = this.ws.events$.subscribe((event) => {
      this.handleRealtimeEvent(event);
    });
    this.connectionStateSubscription = this.ws.connectionState$.subscribe((state) => {
      this.connectionState = state;
      this.syncFallbackPolling();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultationId'] && this.consultationId) {
      this.loadMessages();
      this.syncFallbackPolling();
      return;
    }

    if (changes['consultationId'] && !this.consultationId) {
      this.messages = [];
      this.knownMessageIds.clear();
      this.pendingRequestIds.clear();
      this.stopFallbackPolling();
    }

    if (changes['disabled']) {
      this.syncFallbackPolling();
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
    this.connectionStateSubscription?.unsubscribe();
    this.cancelLoad$.next();
    this.cancelLoad$.complete();
    this.stopFallbackPolling();
  }

  loadMessages(options: { silent?: boolean } = {}): void {
    if (!this.consultationId) {
      this.messages = [];
      this.knownMessageIds.clear();
      return;
    }

    const silent = options.silent === true;
    if (silent && this.loadInFlight) {
      return;
    }

    this.cancelLoad$.next();
    this.loadInFlight = true;
    if (!silent) {
      this.loading = true;
      this.error = '';
    }

    this.api.get<ChatListResponse>(`${this.endpointBase}/${this.consultationId}`).pipe(
      takeUntil(this.cancelLoad$),
      finalize(() => {
        this.loadInFlight = false;
        if (!silent) {
          this.loading = false;
        }
      })
    ).subscribe({
      next: (response) => {
        this.messages = this.mergeLoadedMessages((response.messages || []).map((item) => this.decorateMessage(item)));
        this.knownMessageIds = new Set(this.messages.map((item) => item.id));
        this.messagesLoaded.emit(this.messages);
        if (this.messages.length > 0) {
          this.shouldScrollToBottom = true;
        }
      },
      error: (error) => {
        if (!silent) {
          this.error = this.resolveChatError(error, 'load');
        }
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
    this.draft = '';

    const clientRequestId = this.createClientRequestId();
    this.pendingRequestIds.add(clientRequestId);
    this.appendPendingMessage(this.createPendingMessage(message, clientRequestId));

    this.api.post<ChatSendResponse>(`${this.endpointBase}/${this.consultationId}`, {
      message,
      clientRequestId
    }).subscribe({
      next: (response) => {
        const savedMessage = this.decorateMessage(response.message);
        this.pendingRequestIds.delete(clientRequestId);
        this.reconcileIncomingMessage(savedMessage);
        this.messageSent.emit(savedMessage);
        this.sending = false;
        this.messagesLoaded.emit(this.messages);
      },
      error: (error) => {
        this.pendingRequestIds.delete(clientRequestId);
        this.removePendingMessage(clientRequestId);
        this.draft = message;
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
      senderLabel: this.resolveSenderLabel(message, mine),
      senderRoleLabel: this.resolveSenderRoleLabel(message, mine)
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
      return 'Health Expert';
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

  private resolveSenderRoleLabel(message: ChatPanelMessage, mine: boolean): string {
    const role = String(message.sender_role || '').trim().toLowerCase();
    if (!role && !mine) {
      return '';
    }

    if (mine) {
      if (this.currentUserRole === 'gp' || this.currentUserRole === 'doctor') {
        return 'Health Expert';
      }
      if (this.currentUserRole === 'specialist') {
        return 'Specialist';
      }
      if (this.currentUserRole === 'patient') {
        return 'Patient';
      }
      return 'You';
    }

    if (role === 'gp' || role === 'doctor') {
      return 'Health Expert';
    }
    if (role === 'specialist') {
      return 'Specialist';
    }
    if (role === 'patient') {
      return 'Patient';
    }
    return 'Participant';
  }

  private upsertMessage(message: ChatPanelMessage): void {
    if (!message.id) {
      return;
    }

    const existingIndex = this.messages.findIndex((item) => item.id === message.id);
    if (existingIndex >= 0) {
      this.messages = this.messages.map((item, index) => index === existingIndex ? message : item);
      return;
    }

    if (this.knownMessageIds.has(message.id)) {
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
    this.reconcileIncomingMessage(incoming);
    this.messagesLoaded.emit(this.messages);
  }

  private mergeLoadedMessages(loadedMessages: ChatPanelMessage[]): ChatPanelMessage[] {
    const pendingMessages = this.messages.filter((item) => item.pending);
    if (pendingMessages.length === 0) {
      return loadedMessages;
    }

    const unmatchedPending = pendingMessages.filter((pendingMessage) => !loadedMessages.some((loadedMessage) =>
      loadedMessage.user_id === pendingMessage.user_id
      && loadedMessage.message === pendingMessage.message
      && Math.abs(this.getMessageTimestamp(loadedMessage) - this.getMessageTimestamp(pendingMessage)) < 30000
    ));

    return [...loadedMessages, ...unmatchedPending].sort((left, right) =>
      this.getMessageTimestamp(left) - this.getMessageTimestamp(right)
    );
  }

  private reconcileIncomingMessage(message: ChatPanelMessage): void {
    const clientRequestId = this.resolveClientRequestId(message);
    if (clientRequestId && this.replacePendingMessage(clientRequestId, message)) {
      this.shouldScrollToBottom = true;
      return;
    }

    this.upsertMessage(message);
  }

  private appendPendingMessage(message: ChatPanelMessage): void {
    this.knownMessageIds.add(message.id);
    this.messages = [...this.messages, message];
    this.shouldScrollToBottom = true;
  }

  private replacePendingMessage(clientRequestId: string, message: ChatPanelMessage): boolean {
    const index = this.messages.findIndex((item) =>
      item.pending && this.resolveClientRequestId(item) === clientRequestId
    );
    if (index < 0) {
      return false;
    }

    const pendingId = this.messages[index]?.id;
    if (pendingId) {
      this.knownMessageIds.delete(pendingId);
    }
    this.knownMessageIds.add(message.id);
    this.messages = this.messages.map((item, itemIndex) => itemIndex === index ? message : item);
    return true;
  }

  private removePendingMessage(clientRequestId: string): void {
    const pendingMessage = this.messages.find((item) =>
      item.pending && this.resolveClientRequestId(item) === clientRequestId
    );
    if (!pendingMessage) {
      return;
    }

    this.knownMessageIds.delete(pendingMessage.id);
    this.messages = this.messages.filter((item) => item.id !== pendingMessage.id);
  }

  private createPendingMessage(message: string, clientRequestId: string): ChatPanelMessage {
    return this.decorateMessage({
      id: `pending-${clientRequestId}`,
      consultation_id: this.consultationId,
      user_id: this.currentUserId || 'pending-user',
      message,
      created_at: new Date().toISOString(),
      sender_name: null,
      sender_role: null,
      client_request_id: clientRequestId,
      pending: true
    });
  }

  private createClientRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  private resolveClientRequestId(message: ChatPanelMessage): string {
    return String(message.client_request_id || '').trim();
  }

  private getMessageTimestamp(message: ChatPanelMessage): number {
    const timestamp = new Date(message.created_at).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  private syncFallbackPolling(): void {
    if (!this.consultationId || this.disabled || this.connectionState === 'connected') {
      this.stopFallbackPolling();
      return;
    }

    if (this.fallbackPollTimer) {
      return;
    }

    this.fallbackPollTimer = setInterval(() => {
      if (this.pendingRequestIds.size > 0 || this.loadInFlight) {
        return;
      }
      this.loadMessages({ silent: true });
    }, ChatPanelComponent.FALLBACK_POLL_INTERVAL_MS);
  }

  private stopFallbackPolling(): void {
    if (!this.fallbackPollTimer) {
      return;
    }

    clearInterval(this.fallbackPollTimer);
    this.fallbackPollTimer = null;
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
