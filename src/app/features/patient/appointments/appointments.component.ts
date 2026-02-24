import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

interface Referral {
  id: string;
  patient_id: string;
  from_provider_id: string;
  to_specialist_id: string;
  urgency: string;
  reason: string;
  status: string;
  appointment_date: string;
  appointment_time: string;
  consultation_mode: string;
  location: string;
  specialty: string;
  created_at: string;
  specialist_name: string | null;
  specialist_phone: string | null;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;
  activeTab: 'upcoming' | 'past' = 'upcoming';
  loading = true;
  error: string | null = null;

  upcomingAppointments: Referral[] = [];
  pastAppointments: Referral[] = [];

  constructor(
    public router: Router,
    private patientApi: PatientApiService
  ) { }

  ngOnInit(): void {
    this.loadReferrals();
  }

  loadReferrals(): void {
    this.loading = true;
    this.error = null;

    this.patientApi.getReferrals().subscribe({
      next: (res) => {
        const referrals: Referral[] = res.referrals || [];
        this.upcomingAppointments = referrals.filter(
          r => r.status === 'new' || r.status === 'accepted' || r.status === 'confirmed'
        );
        this.pastAppointments = referrals.filter(
          r => r.status === 'declined'
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load referrals:', err);
        this.error = 'Failed to load appointments. Please try again.';
        this.loading = false;
      }
    });
  }

  setTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'new': return 'Waiting for Confirmation';
      case 'accepted':
      case 'confirmed': return 'Confirmed';
      case 'declined': return 'Declined';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'new': return 'status-pending';
      case 'accepted':
      case 'confirmed': return 'status-confirmed';
      case 'declined': return 'status-declined';
      default: return '';
    }
  }

  getInitials(name: string | null): string {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'Date pending';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(timeStr: string): string {
    if (!timeStr) return 'Time pending';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  retry(): void {
    this.loadReferrals();
  }
}
