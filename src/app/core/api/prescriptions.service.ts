import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class PrescriptionsApiService {
  constructor(private api: ApiClientService) {}

  listForPatient(patientId?: string) {
    const params = patientId ? new URLSearchParams({ patientId }) : undefined;
    const query = params ? `?${params.toString()}` : '';
    return this.api.get<{ prescriptions: any[] }>(`/prescriptions${query}`);
  }

  getById(id: string) {
    return this.api.get<{ prescription: any }>(`/prescriptions/${id}`);
  }

  create(patientId: string, items: unknown[]) {
    return this.api.post<{ prescription: any }>('/prescriptions', { patientId, items });
  }
}
