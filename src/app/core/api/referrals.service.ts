import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class ReferralsApiService {
  constructor(private api: ApiClientService) {}

  createReferral(patientId: string, urgency: string, reason: string) {
    return this.api.post<{ referral: any }>('/referrals', {
      patientId,
      urgency,
      reason
    });
  }

  listForSpecialist() {
    return this.api.get<{ referrals: any[] }>('/referrals/specialist');
  }

  getReferral(id: string) {
    return this.api.get<{ referral: any }>(`/referrals/${id}`);
  }

  updateStatus(id: string, status: string) {
    return this.api.post<{ referral: any }>(`/referrals/${id}/status`, { status });
  }
}
