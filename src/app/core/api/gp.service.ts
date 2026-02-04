import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class GpApiService {
  constructor(private api: ApiClientService) {}

  getQueue() {
    return this.api.get<{ queue: any[] }>('/gp/queue');
  }

  acceptRequest(requestId: string) {
    return this.api.post<{ consultation: any; roomUrl: string }>(`/gp/queue/${requestId}/accept`);
  }
}
