import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class LabsApiService {
  constructor(private api: ApiClientService) {}

  createOrder(patientId: string, tests: string[]) {
    return this.api.post<{ order: any }>('/labs', { patientId, tests });
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
