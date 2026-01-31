import { Routes } from '@angular/router';
import { PharmacyScannerComponent } from './pharmacy-scanner/pharmacy-scanner';
import { PharmacyHistoryComponent } from './pharmacy-history/pharmacy-history';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details';

export const PHARMACY_ROUTES: Routes = [
<<<<<<< HEAD
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
=======
  { path: '', component: PharmacyScannerComponent },
  { path: 'history', component: PharmacyHistoryComponent },
  { path: 'prescription/:id', component: PrescriptionDetailsComponent }
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94
];
