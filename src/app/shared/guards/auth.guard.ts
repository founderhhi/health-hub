import { inject, PLATFORM_ID } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

/**
 * Authentication Guard
 * 
 * Protects routes that require user authentication.
 * Redirects unauthenticated users to the login page.
 * 
 * Usage:
 * { path: 'protected', component: ProtectedComponent, canActivate: [authGuard] }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  // Check if user is authenticated
  // TODO: Replace with actual auth service check
  const isAuthenticated = checkAuthentication(platformId);
  
  if (isAuthenticated) {
    return true;
  }
  
  // Store the attempted URL for redirecting after login
  const returnUrl = state.url;
  
  // Redirect to login page with return URL
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: returnUrl }
  });
  
  return false;
};

/**
 * Check if user is authenticated
 * TODO: Replace with actual implementation using AuthService
 */
function checkAuthentication(platformId: Object): boolean {
  // Placeholder implementation
  // In production, this should check:
  // - Valid JWT token in localStorage/sessionStorage
  // - Token expiration
  // - Session validity
  
  // SSR safety: only access localStorage in browser
  if (!isPlatformBrowser(platformId)) {
    return false;
  }
  
  const token = localStorage.getItem('access_token') || localStorage.getItem('hhi_auth_token');
  if (!token) {
    return false;
  }

  const payload = parseTokenPayload(token);
  const expiresAt = typeof payload?.exp === 'number' ? payload.exp * 1000 : null;
  if (expiresAt && Date.now() >= expiresAt) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
    localStorage.removeItem('hhi_display_name');
    return false;
  }

  return true;
}

function parseTokenPayload(token: string): { exp?: number; role?: string } | null {
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
    return JSON.parse(json);
  } catch {
    return null;
  }
}
