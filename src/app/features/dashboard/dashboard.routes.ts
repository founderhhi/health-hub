import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin';
import { Practitioner } from './components/practitioner/practitioner';
import { Patient } from './components/patient/patient';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      },
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
