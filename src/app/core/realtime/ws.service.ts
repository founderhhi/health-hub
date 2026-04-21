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
  // Persistent AudioContext — browsers suspend a new context until first user gesture.
  private audioCtx: AudioContext | null = null;
  private audioUnlockListenerAdded = false;

  readonly MAX_RECONNECT_ATTEMPTS = 10;
  readonly BASE_DELAY = 1000;
  readonly NOTIFICATION_FALLBACK_INTERVAL = 5_000;

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

    this.initAudio();
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
          if (['consult.accepted', 'queue.updated', 'referral.created', 'referral.status'].includes(payload.event)) {
            this.playNotificationSound();
          }
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

    this.emitFallbackRefreshEvent();

    this.fallbackTimer = setInterval(() => {
      this.emitFallbackRefreshEvent();
    }, this.NOTIFICATION_FALLBACK_INTERVAL);
  }

  private stopFallbackRefresh() {
    if (!this.fallbackTimer) return;
    clearInterval(this.fallbackTimer);
    this.fallbackTimer = null;
  }

  private emitFallbackRefreshEvent() {
    this.zone.run(() => {
      this.eventsSubject.next({
        event: WS_NOTIFICATIONS_FALLBACK_EVENT,
        data: { source: 'ws-disconnect', ts: Date.now() }
      });
    });
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

  private initAudio(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.audioCtx) {
      try {
        this.audioCtx = new AudioCtx();
      } catch {
        return;
      }
    }

    // Browsers suspend the context until a user gesture. Resume on first interaction.
    if (!this.audioUnlockListenerAdded) {
      this.audioUnlockListenerAdded = true;
      const resume = () => {
        if (this.audioCtx?.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }
        document.removeEventListener('click', resume, true);
        document.removeEventListener('keydown', resume, true);
      };
      document.addEventListener('click', resume, true);
      document.addEventListener('keydown', resume, true);
    }
  }

  private playNotificationSound(): void {
    if (!this.audioCtx || this.audioCtx.state !== 'running') {
      return;
    }
    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Ignore if audio system is unavailable
    }
  }
}
