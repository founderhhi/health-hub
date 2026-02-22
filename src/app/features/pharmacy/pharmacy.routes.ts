import { Routes } from '@angular/router';
import { PharmacyScannerComponent } from './pharmacy-scanner/pharmacy-scanner';
import { PharmacyHistoryComponent } from './pharmacy-history/pharmacy-history';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile';

export const PHARMACY_ROUTES: Routes = [
  {
    path: 'scanner',
    component: PharmacyScannerComponent
  },
  {
    path: '',
    component: PharmacyScannerComponent,
    pathMatch: 'full'
  },
  {
    path: 'history',
    component: PharmacyHistoryComponent
  },
  {
    path: 'prescription/:id',
    component: PrescriptionDetailsComponent
  },
  {
    path: 'profile',
    component: PharmacyProfileComponent
  }
];
