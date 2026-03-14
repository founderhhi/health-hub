import {
  Component, OnInit, OnDestroy, AfterViewChecked,
  inject, PLATFORM_ID, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { PatientApiService } from '../../../core/api/patient.service';
import { PaymentsApiService } from '../../../core/api/payments.service';
import { StripeService } from '../../../core/services/stripe.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { firstValueFrom } from 'rxjs';

type ProfileTab = 'general' | 'billing';

const CARD_BRANDS = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'Amex' },
  { id: 'discover', label: 'Discover' },
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BottomNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewChecked {
  PATIENT_TABS = PATIENT_TABS;
  CARD_BRANDS = CARD_BRANDS;

  @ViewChild('stripeCardRef') stripeCardRef?: ElementRef<HTMLDivElement>;

  activeTab: ProfileTab = 'general';
  loading = true;
  saving = false;
  saveError = '';
  saveSuccess = false;

  details = {
    name: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  };
  avatar = 'P';

  billingLoading = false;
  paymentMethods: any[] = [];
  transactions: any[] = [];

  // Add card modal
  showAddCard = false;
  addingCard = false;
  cardError = '';
  cardHolderName = '';
  makeDefault = false;

  // Stripe internals (browser-only)
  stripeLoading = false;
  stripeReady = false;
  private stripeCard: StripeCardElement | null = null;
  private stripeElements: StripeElements | null = null;
  private cardMounted = false;

  private platformId = inject(PLATFORM_ID);

  constructor(
    public router: Router,
    private patientApi: PatientApiService,
    private paymentsApi: PaymentsApiService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  ngOnDestroy(): void {
    this.destroyStripeCard();
  }

  ngAfterViewChecked(): void {
    // Mount the Stripe card element once the modal is open and the ref is available
    if (this.showAddCard && this.stripeCardRef?.nativeElement && !this.cardMounted) {
      this.cardMounted = true;
      this.mountStripeCard(this.stripeCardRef.nativeElement);
    }
  }

  switchTab(tab: ProfileTab): void {
    this.activeTab = tab;
    if (tab === 'billing' && !this.billingLoading) {
      this.loadBilling();
    }
  }

  // ── General Details ─────────────────────────────────────────────────────────

  loadDetails(): void {
    this.loading = true;
    this.patientApi.getDetails().subscribe({
      next: (res) => {
        const d = res.details;
        const ec = d.emergency_contact || {};
        this.details = {
          name: d.display_name || [d.first_name, d.last_name].filter(Boolean).join(' ') || 'Patient',
          phone: d.phone || '',
          firstName: d.first_name || '',
          lastName: d.last_name || '',
          email: d.email || '',
          dateOfBirth: d.date_of_birth ? d.date_of_birth.split('T')[0] : '',
          gender: d.gender || '',
          address: d.address || '',
          emergencyContactName: ec.name || '',
          emergencyContactPhone: ec.phone || '',
        };
        this.avatar = this.getInitials(this.details.name);
        this.loading = false;
      },
      error: () => {
        const cached = this.patientApi.getCachedProfile();
        if (cached) {
          this.details.name = cached.display_name || 'Patient';
          this.details.phone = cached.phone || '';
        } else if (isPlatformBrowser(this.platformId)) {
          this.details.name = localStorage.getItem('hhi_display_name') || 'Patient';
        }
        this.avatar = this.getInitials(this.details.name);
        this.loading = false;
      }
    });
  }

  saveDetails(): void {
    this.saving = true;
    this.saveError = '';
    this.saveSuccess = false;
    const displayName = this.details.firstName && this.details.lastName
      ? `${this.details.firstName} ${this.details.lastName}`
      : this.details.name;

    this.patientApi.updateDetails({
      displayName,
      firstName: this.details.firstName,
      lastName: this.details.lastName,
      email: this.details.email,
      dateOfBirth: this.details.dateOfBirth || undefined,
      gender: this.details.gender,
      address: this.details.address,
      emergencyContact: {
        name: this.details.emergencyContactName,
        phone: this.details.emergencyContactPhone,
      }
    }).subscribe({
      next: (res) => {
        const d = res.details;
        this.details.name = d.display_name || [d.first_name, d.last_name].filter(Boolean).join(' ') || 'Patient';
        this.avatar = this.getInitials(this.details.name);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('hhi_display_name', this.details.name);
        }
        this.saving = false;
        this.saveSuccess = true;
        setTimeout(() => { this.saveSuccess = false; }, 3000);
      },
      error: () => {
        this.saving = false;
        this.saveError = 'Unable to save changes. Please try again.';
      }
    });
  }

  // ── Billing ──────────────────────────────────────────────────────────────────

  loadBilling(): void {
    this.billingLoading = true;
    this.patientApi.getBilling().subscribe({
      next: (res) => {
        this.paymentMethods = res.paymentMethods || [];
        this.transactions = res.transactions || [];
        this.billingLoading = false;
      },
      error: () => { this.billingLoading = false; }
    });
  }

  // ── Add Card (Stripe Elements) ────────────────────────────────────────────────

  openAddCard(): void {
    this.cardHolderName = '';
    this.makeDefault = false;
    this.cardError = '';
    this.cardMounted = false;
    this.stripeReady = false;
    this.showAddCard = true;
    // ngAfterViewChecked will mount the element once the DOM is ready
  }

  closeAddCard(): void {
    this.destroyStripeCard();
    this.showAddCard = false;
    this.cardError = '';
    this.cardMounted = false;
    this.stripeReady = false;
  }

  private async mountStripeCard(container: HTMLElement): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stripeLoading = true;

    try {
      const result = await this.stripeService.mountCardElement(container);
      if (!result) {
        // Stripe not configured — fall back to manual entry
        this.stripeLoading = false;
        this.stripeReady = false;
        return;
      }
      this.stripeElements = result.elements;
      this.stripeCard = result.card;
      this.stripeReady = true;
    } catch (err) {
      console.error('Failed to mount Stripe element', err);
      this.stripeReady = false;
    } finally {
      this.stripeLoading = false;
    }
  }

  private destroyStripeCard(): void {
    if (this.stripeCard) {
      try { this.stripeCard.destroy(); } catch { /* no-op */ }
      this.stripeCard = null;
      this.stripeElements = null;
    }
  }

  async submitCard(): Promise<void> {
    if (!this.stripeCard || !this.stripeReady) {
      this.cardError = 'Card element is not ready. Please try again.';
      return;
    }
    if (!this.cardHolderName.trim()) {
      this.cardError = 'Please enter the cardholder name.';
      return;
    }

    this.addingCard = true;
    this.cardError = '';

    try {
      // 1. Get SetupIntent client secret from our server
      const { clientSecret } = await firstValueFrom(this.paymentsApi.createSetupIntent());

      // 2. Confirm the card setup with Stripe
      const paymentMethodId = await this.stripeService.confirmCardSetup(
        clientSecret,
        this.stripeCard,
        this.cardHolderName
      );

      // 3. Save to our DB via backend
      const res = await firstValueFrom(
        this.paymentsApi.confirmSetup(paymentMethodId, this.makeDefault)
      );

      if (this.makeDefault) {
        this.paymentMethods.forEach(m => m.is_default = false);
      }
      if (this.paymentMethods.length === 0) {
        res.paymentMethod.is_default = true;
      }
      this.paymentMethods = [res.paymentMethod, ...this.paymentMethods];

      this.addingCard = false;
      this.closeAddCard();
    } catch (err: any) {
      this.addingCard = false;
      this.cardError = err?.message || 'Unable to add card. Please try again.';
    }
  }

  removeCard(id: string): void {
    this.patientApi.removePaymentMethod(id).subscribe({
      next: () => { this.paymentMethods = this.paymentMethods.filter(m => m.id !== id); },
      error: () => {}
    });
  }

  // ── Utilities ────────────────────────────────────────────────────────────────

  formatAmount(cents: number, currency: string): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
    }).format(cents / 100);
  }

  cardBrandLabel(brand: string): string {
    return CARD_BRANDS.find(b => b.id === brand)?.label || brand;
  }

  getInitials(name: string): string {
    if (!name) return 'P';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      ['access_token', 'hhi_auth_token', 'hhi_user_role', 'hhi_user_id', 'hhi_display_name']
        .forEach(k => localStorage.removeItem(k));
    }
    this.router.navigate(['/landing']);
  }
}
