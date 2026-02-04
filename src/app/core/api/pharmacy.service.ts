import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class PharmacyApiService {
  constructor(private api: ApiClientService) {}

  lookupByCode(code: string) {
    return this.api.get<{ prescription: any }>(`/pharmacy/prescriptions/${code}`);
  }

  claim(prescriptionId: string, dispensedItems: unknown[] = []) {
    return this.api.post<{ prescription: any }>(`/pharmacy/prescriptions/${prescriptionId}/claim`, {
      dispensedItems
    });
  }
}
