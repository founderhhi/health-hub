import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  {
    path: 'appointments/:id/consultation',
    loadComponent: () => import('./appointment-consultation/appointment-consultation.component').then(m => m.AppointmentConsultationComponent)
  },
  {
    path: 'records',
    loadComponent: () => import('./records/records.component').then(m => m.RecordsComponent)
  },
  {
    path: 'waiting',
    loadComponent: () => import('./waiting/waiting.component').then(m => m.WaitingComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'ai-chat',
    loadComponent: () => import('./ai-chat/ai-chat.component').then(m => m.AiChatComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'healwell-africa',
    loadComponent: () => import('./healwell-region/healwell-region.component').then(m => m.HealwellRegionComponent),
    data: { region: 'africa' }
  },
  {
    path: 'healwell-india',
    loadComponent: () => import('./healwell-region/healwell-region.component').then(m => m.HealwellRegionComponent),
    data: { region: 'india' }
  },
  {
    path: 'travel',
    loadComponent: () => import('./travel/travel.component').then(m => m.TravelComponent)
  },
  {
    path: 'pharmacy',
    loadComponent: () => import('./pharmacy/pharmacy.component').then(m => m.PatientPharmacyComponent)
  },
  {
    path: 'specialist',
    loadComponent: () => import('./specialist/specialist.component').then(m => m.PatientSpecialistComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
