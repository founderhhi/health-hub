import { Routes } from '@angular/router';
import { SpecialistDashboardComponent } from './specialist-dashboard/specialist-dashboard';
import { SpecialistConsultationComponent } from './specialist-consultation/specialist-consultation';
import { ReferralDetailsComponent } from './referral-details/referral-details';
<<<<<<< HEAD
import { SpecialistProfileComponent } from './specialist-profile/specialist-profile';

export const SPECIALIST_ROUTES: Routes = [
  {
    path: '',
    component: SpecialistDashboardComponent
  },
  {
    path: 'consultation/:id',
    component: SpecialistConsultationComponent
  },
  {
    path: 'referral/:id',
    component: ReferralDetailsComponent
  },
  {
    path: 'profile',
    component: SpecialistProfileComponent
  }
=======

export const SPECIALIST_ROUTES: Routes = [
  { path: '', component: SpecialistDashboardComponent },
  { path: 'consultation/:id', component: SpecialistConsultationComponent },
  { path: 'referral/:id', component: ReferralDetailsComponent }
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94
];
