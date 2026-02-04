import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class NotificationsApiService {
  constructor(private api: ApiClientService) {}

  list() {
    return this.api.get<{ notifications: any[] }>('/notifications');
  }
}
