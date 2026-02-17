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

  deleteFromQueue(requestId: string, reason: 'timeout' | 'manual') {
    return this.api.post<{ success: boolean }>(`/gp/queue/${requestId}/delete`, { reason });
  }

  updateOperationalStatus(isOperating: boolean) {
    return this.api.post<{ success: boolean }>('/gp/status', { operational: isOperating });
  }

  getConsultationHistory() {
    return this.api.get<{ history: any[] }>('/gp/consultations/history');
  }

  deleteConsultationRecord(recordId: string) {
    return this.api.delete<{ success: boolean }>(`/gp/consultations/${recordId}`);
  }
}
