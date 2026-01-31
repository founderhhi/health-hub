import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './specialist-dashboard.html',
  styleUrl: './specialist-dashboard.scss',
})
export class SpecialistDashboardComponent {}
=======
  imports: [CommonModule],
  templateUrl: './specialist-dashboard.html'
})
export class SpecialistDashboardComponent {
  // TODO: wire in data for Pending Referrals
  // TODO: wire in data for Today's Appointments
  // TODO: wire in data for Active Consultations
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94
