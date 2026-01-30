import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/landing/landing.route').then(m => m.LANDING_ROUTES)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: 'patient-services',
        loadChildren: () => import('./features/practitioner-connect/practitioner-connect.route').then(m => m.PRACTIOTIONER_ROUTES)
    },
    {
        path: 'heal-well',
        loadChildren: () => import('./features/heal-well/heal-well.route').then(m => m.HEAL_WELL_ROUTES)
    },
    {
        path: 'provider/specialist',
        loadChildren: () => import('./features/specialist/specialist.routes').then(m => m.SPECIALIST_ROUTES)
    },
    {
        path: 'provider/pharmacy',
        loadChildren: () => import('./features/pharmacy/pharmacy.routes').then(m => m.PHARMACY_ROUTES)
    },
    {
        path: 'provider/diagnostics',
        loadChildren: () => import('./features/diagnostics/diagnostics.routes').then(m => m.DIAGNOSTICS_ROUTES)
    }
];
