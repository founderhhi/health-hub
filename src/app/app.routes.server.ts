import { RenderMode, ServerRoute } from '@angular/ssr';

const clientOnlyProtectedRoutes: ServerRoute[] = [
  { path: 'gp', renderMode: RenderMode.Client },
  { path: 'gp/**', renderMode: RenderMode.Client },
  { path: 'specialist', renderMode: RenderMode.Client },
  { path: 'specialist/**', renderMode: RenderMode.Client },
  { path: 'provider/specialist', renderMode: RenderMode.Client },
  { path: 'provider/specialist/**', renderMode: RenderMode.Client },
  { path: 'pharmacy', renderMode: RenderMode.Client },
  { path: 'pharmacy/**', renderMode: RenderMode.Client },
  { path: 'provider/pharmacy', renderMode: RenderMode.Client },
  { path: 'provider/pharmacy/**', renderMode: RenderMode.Client },
  { path: 'diagnostics', renderMode: RenderMode.Client },
  { path: 'diagnostics/**', renderMode: RenderMode.Client },
  { path: 'provider/diagnostics', renderMode: RenderMode.Client },
  { path: 'provider/diagnostics/**', renderMode: RenderMode.Client },
  { path: 'patient', renderMode: RenderMode.Client },
  { path: 'patient/**', renderMode: RenderMode.Client },
  { path: 'patient-services', renderMode: RenderMode.Client },
  { path: 'patient-services/**', renderMode: RenderMode.Client },
  { path: 'heal-well', renderMode: RenderMode.Client },
  { path: 'heal-well/**', renderMode: RenderMode.Client },
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client }
];

export const serverRoutes: ServerRoute[] = [
  ...clientOnlyProtectedRoutes,
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
