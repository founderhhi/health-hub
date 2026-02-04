import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  mode: 'video' | 'in-person';
  status: 'confirmed' | 'pending' | 'cancelled';
  avatar: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  activeTab: 'upcoming' | 'past' = 'upcoming';

  upcomingAppointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      date: 'Today, Feb 2',
      time: '2:30 PM',
      mode: 'video',
      status: 'confirmed',
      avatar: 'SJ'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Tomorrow, Feb 3',
      time: '10:00 AM',
      mode: 'in-person',
      status: 'confirmed',
      avatar: 'MC'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      date: 'Feb 5, 2026',
      time: '3:15 PM',
      mode: 'video',
      status: 'pending',
      avatar: 'ED'
    }
  ];

  pastAppointments: Appointment[] = [
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'General Physician',
      date: 'Jan 28, 2026',
      time: '11:00 AM',
      mode: 'video',
      status: 'confirmed',
      avatar: 'JW'
    },
    {
      id: '5',
      doctorName: 'Dr. Lisa Anderson',
      specialty: 'Gynecologist',
      date: 'Jan 20, 2026',
      time: '9:30 AM',
      mode: 'in-person',
      status: 'cancelled',
      avatar: 'LA'
    }
  ];

  constructor(public router: Router) {}

  setTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  joinCall(appointmentId: string): void {
    console.log('Joining call:', appointmentId);
    // Navigate to video call
    this.router.navigate(['/patient/consultation', appointmentId]);
  }

  reschedule(appointmentId: string): void {
    console.log('Rescheduling:', appointmentId);
    // Open reschedule modal or navigate
  }

  cancel(appointmentId: string): void {
    console.log('Cancelling:', appointmentId);
    // Show confirmation and cancel
  }

  bookNew(): void {
    this.router.navigate(['/patient-services/connect']);
  }
}
