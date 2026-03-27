import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

export interface DiagnosticCentre {
  id: string;
  name: string;
  display_distance: string;
}

@Injectable({ providedIn: 'root' })
export class LabsApiService {
  constructor(private api: ApiClientService) {}

  getCentres() {
    return this.api.get<{ centres: DiagnosticCentre[] }>('/labs/centres');
  }

  createOrder(patientId: string, tests: string[], centreId?: string) {
    return this.api.post<{ order: any }>('/labs', { patientId, tests, centreId });
  }

  listDiagnosticsOrders() {
    return this.api.get<{ orders: any[] }>('/labs/diagnostics');
  }

  updateOrderStatus(orderId: string, status: string, resultNotes?: string) {
    return this.api.post<{ order: any }>(`/labs/diagnostics/${orderId}/status`, {
      status,
      resultNotes
    });
  }
}
