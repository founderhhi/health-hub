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

  getDetails() {
    return this.api.get<{ details: any }>('/patient/details');
  }

  updateDetails(data: {
    displayName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    emergencyContact?: Record<string, unknown>;
  }) {
    return this.api.put<{ details: any }>('/patient/details', data);
  }

  getBilling() {
    return this.api.get<{ paymentMethods: any[]; transactions: any[] }>('/patient/billing');
  }

  addPaymentMethod(data: {
    cardBrand: string;
    cardLast4: string;
    cardExpiry: string;
    cardHolder?: string;
    makeDefault?: boolean;
  }) {
    return this.api.post<{ paymentMethod: any }>('/patient/billing/methods', data);
  }

  removePaymentMethod(id: string) {
    return this.api.delete<{ ok: boolean }>(`/patient/billing/methods/${id}`);
  }

  requestCallback(data: Record<string, unknown>) {
    return this.api.post<{ ok: boolean; request: any }>('/patient/service-requests', data);
  }

  getSpecialists() {
    return this.api.get<{ specialists: any[] }>('/patient/specialists');
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
