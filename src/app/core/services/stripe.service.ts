import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { ApiClientService } from '../api/api-client.service';
import { firstValueFrom } from 'rxjs';

export interface SetupResult {
  paymentMethodId: string;
}

@Injectable({ providedIn: 'root' })
export class StripeService {
  private stripe: Stripe | null = null;
  private publishableKey = '';
  private keyFetched = false;

  private platformId = inject(PLATFORM_ID);

  constructor(private api: ApiClientService) {}

  /** Fetch publishable key from backend then load Stripe.js lazily. */
  async load(): Promise<Stripe | null> {
    if (!isPlatformBrowser(this.platformId)) return null;
    if (this.stripe) return this.stripe;

    if (!this.keyFetched) {
      try {
        const res = await firstValueFrom(
          this.api.get<{ publishableKey: string }>('/payments/publishable-key')
        );
        this.publishableKey = res?.publishableKey || '';
      } catch {
        this.publishableKey = '';
      }
      this.keyFetched = true;
    }

    if (!this.publishableKey) {
      console.warn('StripeService: no publishable key configured — Stripe Elements unavailable');
      return null;
    }

    const { loadStripe } = await import('@stripe/stripe-js');
    this.stripe = await loadStripe(this.publishableKey);
    return this.stripe;
  }

  /**
   * Mount a Stripe CardElement into the given container element.
   * Returns { elements, card } so the caller can later use them to confirm.
   */
  async mountCardElement(container: HTMLElement): Promise<{
    elements: StripeElements;
    card: StripeCardElement;
  } | null> {
    const stripe = await this.load();
    if (!stripe) return null;

    const elements = stripe.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#2ECC71',
          colorBackground: 'var(--bg-primary, #ffffff)',
          colorText: 'var(--text-primary, #1a1a1a)',
          colorDanger: '#EF4444',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          borderRadius: '8px',
        },
      },
    });

    const card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: '15px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          '::placeholder': { color: '#9ca3af' },
        },
      },
    });

    card.mount(container);
    return { elements, card };
  }

  /**
   * Confirm a SetupIntent and save the card.
   * Returns the Stripe PaymentMethod ID on success.
   */
  async confirmCardSetup(
    clientSecret: string,
    card: StripeCardElement,
    billingName?: string
  ): Promise<string> {
    const stripe = await this.load();
    if (!stripe) throw new Error('Stripe not initialised');

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card,
        billing_details: billingName ? { name: billingName } : undefined,
      },
    });

    if (result.error) {
      throw new Error(result.error.message || 'Card setup failed');
    }

    const pmId = result.setupIntent?.payment_method;
    if (!pmId || typeof pmId !== 'string') {
      throw new Error('No payment method returned from Stripe');
    }

    return pmId;
  }

  /**
   * Confirm a PaymentIntent with a previously saved payment method.
   */
  async confirmPayment(
    clientSecret: string,
    paymentMethodId: string
  ): Promise<void> {
    const stripe = await this.load();
    if (!stripe) throw new Error('Stripe not initialised');

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Payment failed');
    }
  }
}
