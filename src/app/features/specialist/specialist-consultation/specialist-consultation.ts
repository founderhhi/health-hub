import { Component, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConsultationsApiService } from '../../../core/api/consultations.service';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { ConsultMode, ConsultShellComponent } from '../../../shared/components/consult-shell/consult-shell';

@Component({
  selector: 'app-specialist-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, ConsultShellComponent],
  templateUrl: './specialist-consultation.html',
  styleUrl: './specialist-consultation.scss'
})
export class SpecialistConsultationComponent implements OnInit {
  @ViewChild(ConsultShellComponent) consultShellRef?: ConsultShellComponent;

  referral: any;
  referralId = '';
  consultationId = '';
  roomUrl = '';
  currentUserId = '';
  consultMode: ConsultMode = 'video';
  statusMessage = '';
  errorMessage = '';
  loading = true;
  accepting = false;
  requestingLabs = false;
  creatingPrescription = false;

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralsApi: ReferralsApiService,
    private consultationsApi: ConsultationsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.errorMessage = 'Referral ID is missing.';
      return;
    }

    this.referralId = id;
    this.loadReferral(id);
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
    if (this.referral?.patient_phone) {
      return this.referral.patient_phone;
    }
    return this.consultationId ? 'Consultation ready' : 'Awaiting consultation link';
  }

  get chiefComplaint(): string {
    return this.referral?.reason || 'No referral reason provided.';
  }

  get appointmentSummary(): string {
    const parts: string[] = [];
    if (this.referral?.appointment_date) {
      parts.push(new Date(this.referral.appointment_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }));
    }
    if (this.referral?.appointment_time) {
      parts.push(this.formatTime(this.referral.appointment_time));
    }
    if (this.referral?.consultation_mode === 'offline' && this.referral?.location) {
      parts.push(this.referral.location);
    } else if (this.referral?.consultation_mode === 'online') {
      parts.push('Online consultation');
    }
    return parts.join(' • ') || 'Scheduling details pending';
  }

  get consultationReady(): boolean {
    return Boolean(this.consultationId);
  }

  get canOpenConsultationShell(): boolean {
    return this.referral?.consultation_mode === 'online' && this.consultationReady;
  }

  get canAcceptReferral(): boolean {
    return this.referral?.status === 'new';
  }

  get consultationBadgeStatus(): string {
    if (this.referral?.consultation_status === 'ready') {
      return 'Ready';
    }
    if (this.referral?.consultation_status === 'active') {
      return 'Live';
    }
    if (this.referral?.consultation_status === 'completed' || this.referral?.consultation_status === 'ended') {
      return 'Completed';
    }
    return this.referral?.status ? this.titleCase(this.referral.status) : 'Pending';
  }

  goBack(): void {
    this.router.navigate(['/specialist/referral', this.referralId]);
  }

  acceptReferral(): void {
    if (!this.referralId || this.accepting) {
      return;
    }

    this.accepting = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.referralsApi.updateStatus(this.referralId, 'accepted').subscribe({
      next: (response) => {
        this.accepting = false;
        this.applyReferral(response.referral);
        this.statusMessage = response.referral?.consultation_mode === 'online'
          ? 'Referral accepted. Consultation is ready.'
          : 'Referral accepted. This appointment is scheduled in person.';
      },
      error: () => {
        this.accepting = false;
        this.errorMessage = 'Unable to accept referral right now.';
      }
    });
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

  onEndConsultation(event: { notes: string }): void {
    if (!this.consultationId) {
      return;
    }

    this.consultationsApi.completeConsultation(this.consultationId, event.notes).subscribe({
      next: () => {
        this.referral = {
          ...this.referral,
          consultation_status: 'completed',
          consultation_completed_at: new Date().toISOString()
        };
        this.statusMessage = event.notes?.trim()
          ? 'Consultation ended. Notes saved.'
          : 'Consultation ended successfully.';
        this.consultShellRef?.onEndComplete();
      },
      error: (err) => {
        const message = err?.error?.error || 'Unable to end consultation right now.';
        this.errorMessage = message;
        this.consultShellRef?.onEndError(message);
      }
    });
  }

  private loadReferral(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.referralsApi.getReferral(id).subscribe({
      next: (response) => {
        this.applyReferral(response.referral);
        this.loading = false;
        if (!this.consultationId && response.referral?.status === 'accepted') {
          this.errorMessage = 'Consultation is not linked yet. Please reopen this referral in a moment.';
        } else if (response.referral?.consultation_mode === 'offline') {
          this.errorMessage = 'This referral is scheduled as an in-person visit, so there is no in-app consultation room.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load referral details.';
      }
    });
  }

  private applyReferral(referral: any): void {
    this.referral = referral;
    this.consultationId = referral?.consultation_id || referral?.consultationId || '';
    this.roomUrl = referral?.daily_room_url || referral?.roomUrl || '';
    this.consultMode = 'video';
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const suffix = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
  }

  private titleCase(value: string): string {
    return value
      .split('_')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
