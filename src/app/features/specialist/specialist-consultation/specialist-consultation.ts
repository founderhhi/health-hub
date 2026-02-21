import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { ChatPanelComponent } from '../../../shared/components/chat-panel/chat-panel';

@Component({
  selector: 'app-specialist-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatPanelComponent],
  templateUrl: './specialist-consultation.html',
  styleUrl: './specialist-consultation.scss'
})
export class SpecialistConsultationComponent implements OnInit {
  referral: any;
  consultationId = '';
  dailyRoomUrl = 'https://healthhub.daily.co/demo';
  currentUserId = '';
  statusMessage = '';
  errorMessage = '';
  requestingLabs = false;
  creatingPrescription = false;

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private referralsApi: ReferralsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.consultationId = id;
      this.referralsApi.getReferral(id).subscribe({
        next: (response) => {
          this.referral = response.referral;
          this.consultationId = response.referral?.consultation_id || response.referral?.consultationId || id;
          this.dailyRoomUrl = response.referral?.daily_room_url || this.dailyRoomUrl;
        }
      });
    }
  }

  get patientName(): string {
    return this.referral?.patient_name || 'Patient';
  }

  get patientInitials(): string {
    return this.patientName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join('') || 'PT';
  }

  get patientSubtitle(): string {
    const phone = this.referral?.patient_phone;
    return phone ? `${phone}` : 'Consultation in progress';
  }

  get chiefComplaint(): string {
    return this.referral?.reason || 'No referral reason provided.';
  }

  startConsultation(): void {
    if (!this.dailyRoomUrl || !isPlatformBrowser(this.platformId)) {
      this.errorMessage = 'No consultation room available right now.';
      return;
    }

    this.errorMessage = '';
    window.open(this.dailyRoomUrl, '_blank', 'noopener');
  }

  requestLabs(): void {
    if (!this.referral?.patient_id || this.requestingLabs) {
      return;
    }

    this.requestingLabs = true;
    this.errorMessage = '';
    this.statusMessage = '';

    const tests = ['CBC', 'CRP'];
    this.labsApi.createOrder(this.referral.patient_id, tests).subscribe({
      next: () => {
        this.requestingLabs = false;
        this.statusMessage = 'Lab request submitted successfully.';
      },
      error: () => {
        this.requestingLabs = false;
        this.errorMessage = 'Unable to request labs right now.';
      }
    });
  }

  prescribe(): void {
    if (!this.referral?.patient_id || this.creatingPrescription) {
      return;
    }

    this.creatingPrescription = true;
    this.errorMessage = '';
    this.statusMessage = '';

    const items = [{ name: 'Ibuprofen', dosage: '200mg', frequency: '2x/day', duration: '3 days' }];
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe({
      next: () => {
        this.creatingPrescription = false;
        this.statusMessage = 'Prescription created successfully.';
      },
      error: () => {
        this.creatingPrescription = false;
        this.errorMessage = 'Unable to create prescription right now.';
      }
    });
  }
}
