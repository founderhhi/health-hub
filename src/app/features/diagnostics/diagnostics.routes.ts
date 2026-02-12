import { Routes } from '@angular/router';
import { DiagnosticsOrdersComponent } from './diagnostics-orders/diagnostics-orders';
import { DiagnosticsOrderDetailsComponent } from './diagnostics-order-details/diagnostics-order-details';
import { DiagnosticsResultUploadComponent } from './diagnostics-result-upload/diagnostics-result-upload';
import { DiagnosticsProfileComponent } from './diagnostics-profile/diagnostics-profile';

export const DIAGNOSTICS_ROUTES: Routes = [
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
  },
  {
    path: 'profile',
    component: DiagnosticsProfileComponent
  }
];
