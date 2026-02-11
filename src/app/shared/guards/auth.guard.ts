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
  return !!token;
}
