import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./admin-profile/admin-profile').then(m => m.AdminProfileComponent)
  }
];
