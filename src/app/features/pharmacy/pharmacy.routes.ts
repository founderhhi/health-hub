import { Routes } from '@angular/router';
import { PharmacyScannerComponent } from './pharmacy-scanner/pharmacy-scanner';
import { PharmacyHistoryComponent } from './pharmacy-history/pharmacy-history';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details';

export const PHARMACY_ROUTES: Routes = [
  {
    path: '',
    component: PharmacyScannerComponent
  },
  {
    path: 'history',
    component: PharmacyHistoryComponent
  },
  {
    path: 'prescription/:id',
    component: PrescriptionDetailsComponent
  }
];
