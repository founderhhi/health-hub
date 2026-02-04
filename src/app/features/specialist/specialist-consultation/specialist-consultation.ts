import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';

@Component({
  selector: 'app-specialist-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './specialist-consultation.html',
  styleUrl: './specialist-consultation.scss',
})
export class SpecialistConsultationComponent implements OnInit {
  referral: any;
  dailyRoomUrl = 'https://healthhub.daily.co/demo';

  constructor(
    private route: ActivatedRoute,
    private referralsApi: ReferralsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.referralsApi.getReferral(id).subscribe({
        next: (response) => (this.referral = response.referral)
      });
    }
  }

  referPatient(): void {
    console.log('TODO: referPatient');
  }

  shareScreen(): void {
    console.log('TODO: shareScreen');
  }

  muteAudio(): void {
    console.log('TODO: muteAudio');
  }

  toggleVideo(): void {
    console.log('TODO: toggleVideo');
  }

  startConsultation(): void {
    window.open(this.dailyRoomUrl, '_blank');
  }

  endConsultation(): void {
    // TODO: implement end consultation action
    console.log('TODO: endConsultation');
  }

  requestLabs(): void {
    if (!this.referral?.patient_id) {
      return;
    }
    const tests = ['CBC', 'CRP'];
    this.labsApi.createOrder(this.referral.patient_id, tests).subscribe();
  }

  prescribe(): void {
    if (!this.referral?.patient_id) {
      return;
    }
    const items = [{ name: 'Ibuprofen', dosage: '200mg', frequency: '2x/day', duration: '3 days' }];
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe();
  }
}
