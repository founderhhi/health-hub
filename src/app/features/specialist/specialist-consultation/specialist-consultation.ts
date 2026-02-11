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
  unavailableActions = {
    refer: true,
    share: true,
    mute: true,
    video: true,
    end: true,
  };
  actionNotice: string | null = null;

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

  private setUnavailableNotice(actionLabel: string): void {
    this.actionNotice = `${actionLabel} is coming soon for specialist consultation.`;
  }

  referPatient(): void {
    this.setUnavailableNotice('Refer');
  }

  shareScreen(): void {
    this.setUnavailableNotice('Share Screen');
  }

  muteAudio(): void {
    this.setUnavailableNotice('Mute');
  }

  toggleVideo(): void {
    this.setUnavailableNotice('Video');
  }

  startConsultation(): void {
    window.open(this.dailyRoomUrl, '_blank');
  }

  endConsultation(): void {
    this.setUnavailableNotice('End Call');
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
