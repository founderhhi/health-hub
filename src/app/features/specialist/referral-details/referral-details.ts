import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // [AGENT_SPECIALIST] ISS-14: needed for ngModel on request-info textarea
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './referral-details.html',
  styleUrl: './referral-details.scss',
})
export class ReferralDetailsComponent implements OnInit {
  referral: any;
  loading = true;
  errorMessage = ''; // [AGENT_SPECIALIST] ISS-08: surface error state for failed API calls
  requestInfoNotice: string | null = null;
  showRequestInfoForm = false; // [AGENT_SPECIALIST] ISS-14: toggle for request-info textarea
  requestInfoText = ''; // [AGENT_SPECIALIST] ISS-14: specialist's info request message

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralsApi: ReferralsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.referralsApi.getReferral(id).subscribe({
        next: (response) => {
          this.referral = response.referral;
          this.loading = false;
        },
        error: (err) => {
          console.error('[AGENT_SPECIALIST] failed to load referral', err);
          this.errorMessage = 'Unable to load referral details.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Referral ID is missing.';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/specialist']);
  }

  scheduleAppointment(): void {
    if (this.referral?.id) {
      this.router.navigate(['/specialist/consultation', this.referral.id]);
    }
  }

  orderTests(): void {
    if (!this.referral?.patient_id) {
      return;
    }
    const tests = ['CBC', 'Lipid Panel', 'HbA1c'];
    this.labsApi.createOrder(this.referral.patient_id, tests).subscribe({
      next: () => { this.errorMessage = ''; }, // [AGENT_SPECIALIST] ISS-08: clear error on success
      error: (err) => { console.error('[AGENT_SPECIALIST] ISS-08: lab order failed', err); this.errorMessage = 'Unable to order tests right now.'; }
    });
  }

  accept(): void {
    if (!this.referral?.id) {
      return;
    }
    this.referralsApi.updateStatus(this.referral.id, 'accepted').subscribe({
      next: (response) => {
        this.referral = response.referral;
        this.errorMessage = '';
        // Keep consultation route parameter as referral ID and resolve consultation_id from referral payload.
        this.router.navigate(['/specialist/consultation', this.referral.id]);
      },
      error: (err) => { console.error('[AGENT_SPECIALIST] ISS-08: accept referral failed', err); this.errorMessage = 'Unable to accept referral right now.'; } // [AGENT_SPECIALIST] ISS-08: error handler
    });
  }

  // [AGENT_SPECIALIST] ISS-14: show textarea for specialist to describe needed info
  requestMoreInfo(): void {
    this.showRequestInfoForm = !this.showRequestInfoForm;
    this.requestInfoNotice = null;
    this.errorMessage = '';
  }

  // [AGENT_SPECIALIST] ISS-14: submit request-info via API for persistence and notifications
  submitRequestInfo(): void {
    const message = this.requestInfoText.trim();
    if (!message || !this.referral?.id) {
      return;
    }
    this.referralsApi.requestMoreInfo(this.referral.id, message).subscribe({
      next: (response) => {
        this.referral = response.referral || this.referral;
        this.requestInfoNotice = 'Request sent to the referring provider.';
        this.showRequestInfoForm = false;
        this.requestInfoText = '';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('[AGENT_SPECIALIST] request more info failed', err);
        this.errorMessage = 'Unable to send request for more information right now.';
      }
    });
  }

  // [AGENT_SPECIALIST] ISS-14: cancel and hide the form
  cancelRequestInfo(): void {
    this.showRequestInfoForm = false;
    this.requestInfoText = '';
    this.requestInfoNotice = null;
  }

  decline(): void {
    if (!this.referral?.id) {
      return;
    }
    this.referralsApi.updateStatus(this.referral.id, 'declined').subscribe({
      next: (response) => (this.referral = response.referral),
      error: (err) => { console.error('[AGENT_SPECIALIST] ISS-08: decline referral failed', err); this.errorMessage = 'Unable to decline referral right now.'; } // [AGENT_SPECIALIST] ISS-08: error handler
    });
  }

  prescribe(): void {
    if (!this.referral?.patient_id) {
      return;
    }
    const items = [{ name: 'Vitamin D', dosage: '1000 IU', frequency: '1x/day', duration: '30 days' }];
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe({
      next: () => { this.errorMessage = ''; }, // [AGENT_SPECIALIST] ISS-08: clear error on success
      error: (err) => { console.error('[AGENT_SPECIALIST] ISS-08: prescription failed', err); this.errorMessage = 'Unable to create prescription right now.'; }
    });
  }
}
