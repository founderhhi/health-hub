import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClientService } from '../../core/api/api-client.service';

export interface AiChatMessageResponse {
  reply: string;
  messageCount: number;
  limitReached: boolean;
  showGpCta: boolean;
}

export interface AiChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  createdAt: number;
}

export interface AiChatState {
  messages: AiChatMessage[];
  messagesUsed: number;
  showGpCta: boolean;
  limitReached: boolean;
}

@Injectable({ providedIn: 'root' })
export class AiChatService {
  readonly sessionLimit = 15;

  private readonly messageCounts = new Map<string, number>();
  private readonly stateSubject = new BehaviorSubject<AiChatState>(this.createEmptyState());
  private activeSessionId: string | null = null;

  readonly state$ = this.stateSubject.asObservable();

  constructor(private api: ApiClientService) {
    this.startSession();
  }

  startSession(): string {
    const sessionId = this.generateSessionId();
    this.activeSessionId = sessionId;
    this.messageCounts.set(sessionId, 0);
    this.stateSubject.next(this.createEmptyState());
    return sessionId;
  }

  sendMessage(sessionId: string, message: string): Observable<AiChatMessageResponse>;
  sendMessage(message: string): Observable<AiChatMessageResponse>;
  sendMessage(sessionIdOrMessage: string, maybeMessage?: string): Observable<AiChatMessageResponse> {
    const usingExplicitSession = typeof maybeMessage === 'string';
    const sessionId = usingExplicitSession
      ? this.resolveSessionId(sessionIdOrMessage)
      : this.resolveSessionId(this.activeSessionId || '');
    const message = (usingExplicitSession ? maybeMessage : sessionIdOrMessage)?.trim() || '';

    if (!message) {
      const messageCount = this.getMessageCount(sessionId);
      return of({
        reply: '',
        messageCount,
        limitReached: messageCount >= this.sessionLimit,
        showGpCta: this.stateSubject.value.showGpCta,
      });
    }

    this.activeSessionId = sessionId;

    // Optimistically add the user message so it appears in the UI immediately,
    // before the server round-trip completes.
    const stateBeforeSend = this.stateSubject.value;
    this.stateSubject.next({
      ...stateBeforeSend,
      messages: [...stateBeforeSend.messages, this.createMessage('user', message)],
    });

    return this.api
      .post<AiChatMessageResponse>('/ai-chat/message', {
        sessionId,
        message,
      })
      .pipe(
        tap((response) => {
          this.messageCounts.set(sessionId, response.messageCount);

          if (this.activeSessionId !== sessionId) {
            return;
          }

          // User message already in state from optimistic update; only append the AI reply.
          const latestState = this.stateSubject.value;
          this.stateSubject.next({
            messages: [
              ...latestState.messages,
              this.createMessage('assistant', response.reply),
            ],
            messagesUsed: response.messageCount,
            showGpCta: response.showGpCta,
            limitReached: response.limitReached,
          });
        })
      );
  }

  getMessageCount(sessionId: string): number {
    return this.messageCounts.get(sessionId.trim()) ?? 0;
  }

  private createEmptyState(): AiChatState {
    return {
      messages: [],
      messagesUsed: 0,
      showGpCta: false,
      limitReached: false,
    };
  }

  private resolveSessionId(sessionId: string): string {
    const normalized = sessionId.trim();
    if (normalized) {
      if (!this.messageCounts.has(normalized)) {
        this.messageCounts.set(normalized, 0);
      }
      return normalized;
    }

    return this.startSession();
  }

  private createMessage(role: AiChatMessage['role'], content: string): AiChatMessage {
    return {
      id: this.generateSessionId(),
      role,
      content,
      createdAt: Date.now(),
    };
  }

  private generateSessionId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    const rand = Math.random().toString(36).slice(2, 10);
    return `${Date.now()}-${rand}`;
  }
}
