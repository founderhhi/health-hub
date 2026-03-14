import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

export interface ConsultationCompletionResponse {
  consultation: any;
}

@Injectable({ providedIn: 'root' })
export class ConsultationsApiService {
  constructor(private api: ApiClientService) {}

  completeConsultation(consultationId: string, notes?: string) {
    return this.api.post<ConsultationCompletionResponse>(`/consultations/${consultationId}/complete`, { notes });
  }
}
