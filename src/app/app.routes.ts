import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  // 1. Public routes - No authentication required
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'signup', redirectTo: 'auth/signup', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/landing.route').then(m => m.LANDING_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // 2. Protected Feature paths - Authentication required
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'gp',
    loadComponent: () => import('./features/dashboard/components/practitioner/practitioner').then(m => m.Practitioner),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['doctor', 'gp'] }
  },
  {
    path: 'patient-services',
    loadChildren: () => import('./features/practitioner-connect/practitioner-connect.route').then(m => m.PRACTIOTIONER_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'heal-well',
    loadChildren: () => import('./features/heal-well/heal-well.route').then(m => m.HEAL_WELL_ROUTES),
    canActivate: [authGuard]
  },
  
  // 3. Provider Portal Routes - Authentication + Role-based access
  {
    path: 'provider/specialist',
    loadChildren: () => import('./features/specialist/specialist.routes').then(m => m.SPECIALIST_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['specialist', 'doctor'] }
  },
  {
    path: 'specialist',
    loadChildren: () => import('./features/specialist/specialist.routes').then(m => m.SPECIALIST_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['specialist', 'doctor'] }
  },
  {
    path: 'provider/pharmacy',
    loadChildren: () => import('./features/pharmacy/pharmacy.routes').then(m => m.PHARMACY_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['pharmacist', 'pharmacy_tech'] }
  },
  {
    path: 'pharmacy',
    loadChildren: () => import('./features/pharmacy/pharmacy.routes').then(m => m.PHARMACY_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['pharmacist', 'pharmacy_tech'] }
  },
  {
    path: 'provider/diagnostics',
    loadChildren: () => import('./features/diagnostics/diagnostics.routes').then(m => m.DIAGNOSTICS_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['lab_tech', 'radiologist', 'pathologist'] }
  },
  {
    path: 'diagnostics',
    loadChildren: () => import('./features/diagnostics/diagnostics.routes').then(m => m.DIAGNOSTICS_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['lab_tech', 'radiologist', 'pathologist'] }
  },

  // 4. Patient Portal Route
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.routes').then(m => m.PATIENT_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['patient'] }
  },

  // 5. Default path - Redirect to landing page (FIXED)
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  
  // 6. Wildcard route - Redirect unknown paths to landing
  { path: '**', redirectTo: 'landing' }
];
