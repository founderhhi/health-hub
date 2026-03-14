import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({ providedIn: 'root' })
export class PaymentsApiService {
  constructor(private api: ApiClientService) {}

  createSetupIntent() {
    return this.api.post<{ clientSecret: string }>('/payments/setup-intent', {});
  }

  confirmSetup(paymentMethodId: string, makeDefault = false) {
    return this.api.post<{ paymentMethod: any }>('/payments/confirm-setup', {
      paymentMethodId,
      makeDefault,
    });
  }

  createPaymentIntent(amountCents: number, opts: {
    currency?: string;
    description?: string;
    serviceType?: string;
  } = {}) {
    return this.api.post<{ clientSecret: string }>('/payments/payment-intent', {
      amountCents,
      ...opts,
    });
  }

  confirmPayment(paymentIntentId: string, opts: {
    serviceType?: string;
    description?: string;
  } = {}) {
    return this.api.post<{ transaction: any }>('/payments/confirm-payment', {
      paymentIntentId,
      ...opts,
    });
  }
}
