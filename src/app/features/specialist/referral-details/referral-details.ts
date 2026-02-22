import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './referral-details.html',
  styleUrl: './referral-details.scss',
})
export class ReferralDetailsComponent implements OnInit {
  referral: any;
  loading = true;
  requestInfoNotice: string | null = null;

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
        error: () => {
          this.loading = false;
        }
      });
    } else {
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
    this.labsApi.createOrder(this.referral.patient_id, tests).subscribe();
  }

  accept(): void {
    if (!this.referral?.id) {
      return;
    }
    this.referralsApi.updateStatus(this.referral.id, 'accepted').subscribe({
      next: (response) => (this.referral = response.referral)
    });
  }

  requestMoreInfo(): void {
    this.requestInfoNotice = 'Request more info is coming soon. You can accept or decline this referral for now.';
  }

  decline(): void {
    if (!this.referral?.id) {
      return;
    }
    this.referralsApi.updateStatus(this.referral.id, 'declined').subscribe({
      next: (response) => (this.referral = response.referral)
    });
  }

  prescribe(): void {
    if (!this.referral?.patient_id) {
      return;
    }
    const items = [{ name: 'Vitamin D', dosage: '1000 IU', frequency: '1x/day', duration: '30 days' }];
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe();
  }
}
