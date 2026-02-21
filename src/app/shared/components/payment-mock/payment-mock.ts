import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type PaymentState = 'idle' | 'processing' | 'success' | 'error';

@Component({
  selector: 'app-payment-mock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-mock.html',
  styleUrl: './payment-mock.scss',
})
export class PaymentMockComponent {
  @Output() paymentComplete = new EventEmitter<{ success: boolean }>();

  state: PaymentState = 'idle';
  cardNumber = '';
  cardExpiry = '';
  cardCvc = '';
  errorMessage = '';

  get formattedCardNumber(): string {
    return this.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  get isFormValid(): boolean {
    const digits = this.cardNumber.replace(/\s/g, '');
    return digits.length === 16 && this.cardExpiry.length >= 4 && this.cardCvc.length >= 3;
  }

  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardNumber = input.value.replace(/\D/g, '').slice(0, 16);
  }

  onExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    this.cardExpiry = value;
  }

  onCvcInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardCvc = input.value.replace(/\D/g, '').slice(0, 4);
  }

  submitPayment(): void {
    if (!this.isFormValid || this.state === 'processing') return;

    this.state = 'processing';
    this.errorMessage = '';

    // Simulate payment processing
    setTimeout(() => {
      // Mock: card numbers ending in 0000 fail
      if (this.cardNumber.endsWith('0000')) {
        this.state = 'error';
        this.errorMessage = 'Payment declined. Please try a different card.';
        this.paymentComplete.emit({ success: false });
      } else {
        this.state = 'success';
        this.paymentComplete.emit({ success: true });
      }
    }, 2000);
  }

  reset(): void {
    this.state = 'idle';
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCvc = '';
    this.errorMessage = '';
  }
}
