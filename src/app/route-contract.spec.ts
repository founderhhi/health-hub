import { AUTH_ROUTES } from './features/auth/auth.routes';
import { PHARMACY_ROUTES } from './features/pharmacy/pharmacy.routes';

describe('Route contract', () => {
  it('resolves /auth/forgot-password through auth route config', () => {
    const forgotPasswordRoute = AUTH_ROUTES.find(route => route.path === 'forgot-password');

    expect(forgotPasswordRoute).toBeTruthy();
    expect(forgotPasswordRoute?.component).toBeTruthy();
  });

  it('resolves /pharmacy/scanner alias to scanner component', () => {
    const scannerAliasRoute = PHARMACY_ROUTES.find(route => route.path === 'scanner');
    const scannerRootRoute = PHARMACY_ROUTES.find(route => route.path === '');

    expect(scannerAliasRoute).toBeTruthy();
    expect(scannerRootRoute).toBeTruthy();
    expect(scannerAliasRoute?.component).toBe(scannerRootRoute?.component);
  });
});
