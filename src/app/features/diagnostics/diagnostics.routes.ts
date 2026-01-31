import { Routes } from '@angular/router';
import { DiagnosticsOrdersComponent } from './diagnostics-orders/diagnostics-orders';
import { DiagnosticsOrderDetailsComponent } from './diagnostics-order-details/diagnostics-order-details';
import { DiagnosticsResultUploadComponent } from './diagnostics-result-upload/diagnostics-result-upload';

export const DIAGNOSTICS_ROUTES: Routes = [
<<<<<<< HEAD
  {
    path: '',
    component: DiagnosticsOrdersComponent
  },
  {
    path: 'order/:id',
    component: DiagnosticsOrderDetailsComponent
  },
  {
    path: 'upload/:id',
    component: DiagnosticsResultUploadComponent
  }
=======
  { path: '', component: DiagnosticsOrdersComponent },
  { path: 'order/:id', component: DiagnosticsOrderDetailsComponent },
  { path: 'upload/:id', component: DiagnosticsResultUploadComponent }
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94
];
