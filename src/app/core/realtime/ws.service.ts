import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface WsEvent {
  event: string;
  data: unknown;
}

export type WsConnectionState = 'disconnected' | 'connecting' | 'connected';
export const WS_NOTIFICATIONS_REFRESH_EVENT = 'notifications.refresh';
export const WS_NOTIFICATIONS_FALLBACK_EVENT = `${WS_NOTIFICATIONS_REFRESH_EVENT}.fallback`;

@Injectable({ providedIn: 'root' })
export class WsService {
  private socket?: WebSocket;
  private readonly eventsSubject = new Subject<WsEvent>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private intentionalDisconnect = false;
  private fallbackTimer: ReturnType<typeof setInterval> | null = null;
  // WS-04: Singleton guard
  private connecting = false;
  private readonly connectionStateSubject = new BehaviorSubject<WsConnectionState>('disconnected');

  readonly MAX_RECONNECT_ATTEMPTS = 10;
  readonly BASE_DELAY = 1000;
  readonly NOTIFICATION_FALLBACK_INTERVAL = 30_000;

  events$ = this.eventsSubject.asObservable();
  connectionState$ = this.connectionStateSubject.asObservable();

  constructor(private zone: NgZone) {}

  connect(_role: string, _userId?: string) {
    // WS-04: Prevent duplicate connect() calls
    if (this.connecting) return;
    if (this.socket && this.socket.readyState <= WebSocket.OPEN) return;

    this.intentionalDisconnect = false;
    this.connecting = true;
    this.connectionStateSubject.next('connecting');
    this.doConnect();
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopFallbackRefresh();
    this.intentionalDisconnect = true;
    this.reconnectAttempts = this.MAX_RECONNECT_ATTEMPTS;
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
    this.connecting = false;
    this.connectionStateSubject.next('disconnected');
  }

  private doConnect() {
    if (typeof window === 'undefined') {
      this.connecting = false;
      this.connectionStateSubject.next('disconnected');
      return;
    }

    const wsUrl = this.buildWsUrl();
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.connecting = false;
      this.reconnectAttempts = 0;
      this.connectionStateSubject.next('connected');
      this.stopFallbackRefresh();
      this.socket?.send(JSON.stringify({ type: 'subscribe' }));
    };

    this.socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as WsEvent;
        if (payload.event) {
          this.zone.run(() => this.eventsSubject.next(payload));
        }
      } catch {
        // ignore malformed payloads
      }
    };

    // WS-02: Error handler
    this.socket.onerror = () => {
      // Error will be followed by close, reconnection handled there
    };

    // WS-01 + WS-02: Close handler with exponential-backoff reconnection
    this.socket.onclose = (event: CloseEvent) => {
      this.connecting = false;
      this.socket = undefined;
      this.connectionStateSubject.next('disconnected');
      this.startFallbackRefresh();
      if (this.intentionalDisconnect || !this.shouldReconnect(event.code)) return;
      this.scheduleReconnect();
    };
  }

  private shouldReconnect(code: number) {
    return code !== 1008;
  }

  private startFallbackRefresh() {
    if (this.fallbackTimer || this.intentionalDisconnect) return;

    this.fallbackTimer = setInterval(() => {
      this.zone.run(() => {
        this.eventsSubject.next({
          event: WS_NOTIFICATIONS_FALLBACK_EVENT,
          data: { source: 'ws-disconnect', ts: Date.now() }
        });
      });
    }, this.NOTIFICATION_FALLBACK_INTERVAL);
  }

  private stopFallbackRefresh() {
    if (!this.fallbackTimer) return;
    clearInterval(this.fallbackTimer);
    this.fallbackTimer = null;
  }

  // WS-01: Exponential backoff reconnection
  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) return;

    const delay = Math.min(
      this.BASE_DELAY * Math.pow(2, this.reconnectAttempts),
      30_000
    );
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connecting = true;
      this.doConnect();
    }, delay);
  }

  private buildWsUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = new URL(`${protocol}://${window.location.host}/ws`);
    const token = localStorage.getItem('access_token') || localStorage.getItem('hhi_auth_token');
    if (token) {
      wsUrl.searchParams.set('token', token);
    }
    return wsUrl.toString();
  }
}
