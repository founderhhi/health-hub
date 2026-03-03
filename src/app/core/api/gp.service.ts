import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

interface GpAcceptedConsultation {
  id?: string;
  consultation_id?: string;
  consultationId?: string;
  daily_room_url?: string;
  roomUrl?: string;
  patient_id?: string;
}

interface GpAcceptResponse {
  consultation?: GpAcceptedConsultation | null;
  consultationId?: string;
  roomUrl?: string;
}

export interface GpQueueDeleteResponse {
  success: boolean;
  requestId?: string;
  code?: 'NOT_FOUND' | 'NOT_WAITING' | 'SCHEMA_ERROR' | 'UNKNOWN';
  message?: string;
}

export interface GpOperationalStatusResponse {
  success?: boolean;
  operational: boolean;
}

export interface ConsultationJoinLinkResponse {
  consultationId: string;
  roomUrl: string;
  tokenStatus: 'generated' | 'fallback';
  expiresAt: string | null;
}

export interface CompleteConsultationErrorResponse {
  error: string;
  code?: 'NOT_FOUND' | 'NOT_ASSIGNED' | 'NOT_ACTIVE' | 'SCHEMA_ERROR' | 'UNKNOWN';
}

@Injectable({ providedIn: 'root' })
export class GpApiService {
  constructor(private api: ApiClientService) {}

  getQueue() {
    return this.api.get<{ queue: any[] }>('/gp/queue');
  }

  acceptRequest(requestId: string) {
    return this.api.post<GpAcceptResponse>(`/gp/queue/${requestId}/accept`);
  }

  deleteFromQueue(requestId: string, reason: 'timeout' | 'manual') {
    return this.api.post<GpQueueDeleteResponse>(`/gp/queue/${requestId}/delete`, { reason });
  }

  getOperationalStatus() {
    return this.api.get<GpOperationalStatusResponse>('/gp/status');
  }

  updateOperationalStatus(isOperating: boolean) {
    return this.api.post<GpOperationalStatusResponse>('/gp/status', { operational: isOperating });
  }

  getConsultationHistory() {
    return this.api.get<{ history: any[] }>('/gp/consultations/history');
  }

  deleteConsultationRecord(recordId: string) {
    return this.api.delete<{ success: boolean }>(`/gp/consultations/${recordId}`);
  }

  completeConsultation(consultationId: string, notes?: string) {
    return this.api.post<{ consultation: any }>(`/gp/consultations/${consultationId}/complete`, { notes });
  }

  getConsultationJoinLink(consultationId: string) {
    return this.api.get<ConsultationJoinLinkResponse>(`/consultations/${consultationId}/join-link?role=gp`);
  }
}
