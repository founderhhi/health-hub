import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiClientService } from './api-client.service';

export interface ConsultationJoinLinkResponse {
  consultationId: string;
  roomUrl: string;
  tokenStatus: 'generated' | 'fallback';
  expiresAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class PatientApiService {
  private profileCache: any | null = null;
  private referralsCache: any[] | null = null;
  private labOrdersCache: any[] | null = null;

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
    return this.api.get<{ user: any }>('/patient/me').pipe(
      tap((response) => {
        this.profileCache = response?.user || null;
      })
    );
  }

  getReferrals() {
    return this.api.get<{ referrals: any[] }>('/patient/referrals').pipe(
      tap((response) => {
        this.referralsCache = Array.isArray(response?.referrals) ? response.referrals : [];
      })
    );
  }

  getLabOrders() {
    return this.api.get<{ orders: any[] }>('/patient/lab-orders').pipe(
      tap((response) => {
        this.labOrdersCache = Array.isArray(response?.orders) ? response.orders : [];
      })
    );
  }

  getActiveConsult() {
    return this.api.get<{ active: any }>('/patient/consults/active');
  }

  cancelConsult(requestId: string) {
    return this.api.post<{ success: boolean }>(`/patient/consults/${requestId}/cancel`);
  }

  getConsultationJoinLink(consultationId: string) {
    return this.api.get<ConsultationJoinLinkResponse>(`/consultations/${consultationId}/join-link?role=patient`);
  }

  getCachedProfile() {
    return this.profileCache;
  }

  getCachedReferrals() {
    return this.referralsCache;
  }

  getCachedLabOrders() {
    return this.labOrdersCache;
  }
}
