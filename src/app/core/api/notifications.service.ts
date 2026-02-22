import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { ApiClientService } from './api-client.service';
import {
  WsService,
  WsEvent,
  WS_NOTIFICATIONS_FALLBACK_EVENT,
  WS_NOTIFICATIONS_REFRESH_EVENT
} from '../realtime/ws.service';

@Injectable({ providedIn: 'root' })
export class NotificationsApiService {
  readonly refreshTriggers$: Observable<number>;

  constructor(
    private api: ApiClientService,
    private ws: WsService
  ) {
    this.refreshTriggers$ = this.ws.events$.pipe(
      filter((event: WsEvent) => this.isRefreshTriggerEvent(event.event)),
      map(() => Date.now())
    );
  }

  list() {
    return this.api.get<{ notifications: any[] }>('/notifications');
  }

  markRead(id: string) {
    return this.api.patch<{ notification: any }>(`/notifications/${id}/read`, {});
  }

  markAllRead() {
    return this.api.post<{ updated: number }>('/notifications/read-all', {});
  }

  private isRefreshTriggerEvent(eventName: string) {
    return (
      eventName === WS_NOTIFICATIONS_REFRESH_EVENT ||
      eventName === WS_NOTIFICATIONS_FALLBACK_EVENT ||
      eventName === 'prescription.created' ||
      eventName === 'prescription.claimed' ||
      eventName === 'prescription.dispensed' ||
      eventName === 'lab.status.updated' ||
      eventName === 'referral.created' ||
      eventName === 'referral.status' ||
      eventName === 'consult.accepted' ||
      eventName === 'consult.completed'
    );
  }
}
