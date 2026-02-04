import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface WsEvent {
  event: string;
  data: unknown;
}

@Injectable({ providedIn: 'root' })
export class WsService {
  private socket?: WebSocket;
  private readonly eventsSubject = new Subject<WsEvent>();

  events$ = this.eventsSubject.asObservable();

  connect(role: string, userId?: string) {
    if (this.socket && this.socket.readyState <= WebSocket.OPEN) {
      return;
    }

    const wsUrl = this.buildWsUrl();
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.socket?.send(
        JSON.stringify({
          type: 'subscribe',
          role,
          userId
        })
      );
    };

    this.socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as WsEvent;
        if (payload.event) {
          this.eventsSubject.next(payload);
        }
      } catch {
        // ignore malformed payloads
      }
    };
  }

  private buildWsUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${protocol}://${window.location.host}/ws`;
  }
}
