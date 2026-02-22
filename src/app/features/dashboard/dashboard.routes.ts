import { Routes } from '@angular/router';
import { Practitioner } from './components/practitioner/practitioner';
import { Patient } from './components/patient/patient';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Patient,
    children: [
      {
        path: 'doctors',
        component: Practitioner
      },
      {
        path: 'patient',
        component: Patient
      }
    ]
  }
];
