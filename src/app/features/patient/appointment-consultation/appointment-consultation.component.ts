import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { ConsultMode, ConsultShellComponent } from '../../../shared/components/consult-shell/consult-shell';

@Component({
  selector: 'app-appointment-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, ConsultShellComponent],
  templateUrl: './appointment-consultation.component.html',
  styleUrl: './appointment-consultation.component.scss'
})
export class AppointmentConsultationComponent implements OnInit {
  referral: any;
  consultationId = '';
  roomUrl = '';
  consultMode: ConsultMode = 'video';
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralsApi: ReferralsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const referralId = this.route.snapshot.paramMap.get('id');
    if (!referralId) {
      this.loading = false;
      this.errorMessage = 'Appointment reference is missing.';
      return;
    }

    this.referralsApi.getReferral(referralId).subscribe({
      next: (response) => {
        this.referral = response.referral;
        this.consultationId = response.referral?.consultation_id || '';
        this.roomUrl = response.referral?.daily_room_url || '';
        this.consultMode = 'video';
        this.loading = false;

        if (!this.consultationId) {
          this.errorMessage = 'This specialist appointment is not ready to join yet.';
        } else if (response.referral?.consultation_mode === 'offline') {
          this.errorMessage = 'This specialist appointment is scheduled in person. Please attend at the listed location.';
        } else if (
          response.referral?.consultation_status
          && !['ready', 'active'].includes(String(response.referral.consultation_status))
        ) {
          this.errorMessage = 'This specialist consultation is no longer active.';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load this specialist appointment right now.';
        this.cdr.detectChanges();
      }
    });
  }

  get specialistName(): string {
    return this.referral?.specialist_name || 'Your specialist';
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

  get canJoin(): boolean {
    const consultationStatus = String(this.referral?.consultation_status || '').toLowerCase();
    return this.referral?.consultation_mode === 'online'
      && Boolean(this.consultationId)
      && (consultationStatus === 'ready' || consultationStatus === 'active');
  }

  goBack(): void {
    this.router.navigate(['/patient/appointments']);
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
}
