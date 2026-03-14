import { inject, PLATFORM_ID } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

/**
 * Role-based Authorization Guard
 * 
 * Protects routes that require specific user roles.
 * Redirects unauthorized users to their appropriate dashboard.
 * 
 * Usage:
 * { 
 *   path: 'admin', 
 *   component: AdminComponent, 
 *   canActivate: [authGuard, roleGuard],
 *   data: { roles: ['admin', 'superadmin'] }
 * }
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // [AGENT_AUTH] ISS-01: restored guard logic — SSR returns false, browser checks role
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const userRole = getUserRole(platformId);
  const allowedRoles: string[] = route.data?.['roles'] ?? [];

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const redirectPath = getRedirectPathForRole(userRole);
    router.navigate([redirectPath]);
    return false;
  }

  return true;
};

/**
 * Get current user role
 * TODO: Replace with actual implementation using AuthService
 */
function getUserRole(platformId: Object): string {
  // Placeholder implementation
  // In production, decode JWT token or fetch from user service

  // SSR safety: only access localStorage in browser
  if (!isPlatformBrowser(platformId)) {
    return 'patient';
  }

  const persistedRole = localStorage.getItem('hhi_user_role');
  if (persistedRole) {
    return persistedRole;
  }

  const token = localStorage.getItem('access_token') || localStorage.getItem('hhi_auth_token');
  if (!token) {
    return 'patient';
  }

  const roleFromToken = parseRoleFromToken(token);
  if (roleFromToken) {
    localStorage.setItem('hhi_user_role', roleFromToken);
    return roleFromToken;
  }

  return 'patient';
}

function parseRoleFromToken(token: string): string | null {
  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) {
      return null;
    }

    const normalized = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    const payload = JSON.parse(json) as { role?: string };
    return payload.role || null;
  } catch {
    return null;
  }
}

/**
 * Get redirect path based on user role
 * Redirects users to their appropriate portal after login
 */
function getRedirectPathForRole(role: string): string {
  const roleRoutes: Record<string, string> = {
    'patient': '/patient/dashboard',
    'gp': '/gp',
    'specialist': '/specialist',
    'pharmacist': '/pharmacy',
    'pharmacy_tech': '/pharmacy',
    'lab_tech': '/diagnostics',
    'radiologist': '/diagnostics',
    'pathologist': '/diagnostics',
    'admin': '/admin'
  };

  return roleRoutes[role] || '/landing';
}

/**
 * Role-based redirect service
 * Can be used after successful login to redirect to appropriate portal
 */
export function redirectAfterLogin(role: string, router: Router): void {
  const redirectPath = getRedirectPathForRole(role);
  router.navigate([redirectPath]);
}
