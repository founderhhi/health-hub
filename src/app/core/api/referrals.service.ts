import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { tap } from 'rxjs';

export interface SpecialistDirectoryEntry {
  id: string;
  display_name: string;
  first_name?: string | null;
  last_name?: string | null;
  specialty?: string | null;
  facility_name?: string | null;
  bio?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ReferralsApiService {
  private specialistReferralsCache: any[] | null = null;

  constructor(private api: ApiClientService) {}

  createReferral(patientId: string, urgency: string, reason: string, options?: {
    toSpecialistId?: string;
    specialty?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    consultationMode?: 'online' | 'offline';
    location?: string;
  }) {
    return this.api.post<{ referral: any }>('/referrals', {
      patientId,
      urgency,
      reason,
      ...options
    });
  }

  listForSpecialist() {
    return this.api.get<{ referrals: any[] }>('/referrals/specialist').pipe(
      tap((response) => {
        this.specialistReferralsCache = Array.isArray(response?.referrals) ? response.referrals : [];
      })
    );
  }

  getReferral(id: string) {
    return this.api.get<{ referral: any }>(`/referrals/${id}`);
  }

  updateStatus(id: string, status: string) {
    return this.api.post<{ referral: any }>(`/referrals/${id}/status`, { status }).pipe(
      tap((response) => {
        this.cacheSpecialistReferral(response?.referral);
      })
    );
  }

  updateSchedule(id: string, schedule: {
    appointmentDate?: string;
    appointmentTime?: string;
    consultationMode?: 'online' | 'offline';
    location?: string;
  }) {
    return this.api.post<{ referral: any }>(`/referrals/${id}/schedule`, schedule).pipe(
      tap((response) => {
        this.cacheSpecialistReferral(response?.referral);
      })
    );
  }

  requestMoreInfo(id: string, message: string) {
    return this.api.post<{ referral: any; request: { message: string; requestedAt: string } }>(
      `/referrals/${id}/request-info`,
      { message }
    ).pipe(
      tap((response) => {
        this.cacheSpecialistReferral(response?.referral);
      })
    );
  }

  listAvailableSpecialists() {
    return this.api.get<{ specialists: SpecialistDirectoryEntry[] }>('/referrals/specialists/options');
  }

  reassignReferral(id: string, toSpecialistId: string) {
    return this.api.post<{ referral: any; targetSpecialist?: SpecialistDirectoryEntry }>(
      `/referrals/${id}/reassign`,
      { toSpecialistId }
    ).pipe(
      tap(() => {
        this.removeCachedSpecialistReferral(id);
      })
    );
  }

  getCachedSpecialistReferrals() {
    return this.specialistReferralsCache ? [...this.specialistReferralsCache] : null;
  }

  getCachedSpecialistReferral(id: string) {
    const referral = this.specialistReferralsCache?.find((item) => item?.id === id);
    return referral ? { ...referral } : null;
  }

  cacheSpecialistReferral(referral: any) {
    if (!referral?.id) {
      return;
    }

    if (!this.specialistReferralsCache) {
      this.specialistReferralsCache = [{ ...referral }];
      return;
    }

    const next = this.specialistReferralsCache.filter((item) => item?.id !== referral.id);
    next.unshift({ ...referral });
    this.specialistReferralsCache = next;
  }

  removeCachedSpecialistReferral(id: string) {
    if (!this.specialistReferralsCache) {
      return;
    }

    this.specialistReferralsCache = this.specialistReferralsCache.filter((item) => item?.id !== id);
  }
}
