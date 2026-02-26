import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class PatientApiService {
  constructor(private api: ApiClientService) {}

  requestConsult(mode: 'video' | 'audio' | 'chat', symptoms: Record<string, unknown>) {
    return this.api.post<{ request: any }>('/patient/consults', {
      mode,
      symptoms
    });
  }

  getConsults() {
    return this.api.get<{ requests: any[] }>('/patient/consults');
  }

  getProfile() {
    return this.api.get<{ user: any }>('/patient/me');
  }

  getReferrals() {
    return this.api.get<{ referrals: any[] }>('/patient/referrals');
  }

  getLabOrders() {
    return this.api.get<{ orders: any[] }>('/patient/lab-orders');
  }

  getActiveConsult() {
    return this.api.get<{ active: any }>('/patient/consults/active');
  }

  cancelConsult(requestId: string) {
    return this.api.post<{ success: boolean }>(`/patient/consults/${requestId}/cancel`);
  }
}
