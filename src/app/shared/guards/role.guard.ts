import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

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
  const router = inject(Router);
  
  // Get required roles from route data
  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  
  // If no roles specified, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  
  // Get current user role
  // TODO: Replace with actual auth service
  const userRole = getUserRole();
  
  // Check if user has required role
  if (requiredRoles.includes(userRole)) {
    return true;
  }
  
  // User doesn't have required role - redirect to appropriate dashboard
  const redirectPath = getRedirectPathForRole(userRole);
  router.navigate([redirectPath]);
  
  return false;
};

/**
 * Get current user role
 * TODO: Replace with actual implementation using AuthService
 */
function getUserRole(): string {
  // Placeholder implementation
  // In production, decode JWT token or fetch from user service
  return localStorage.getItem('hhi_user_role') || 'patient';
}

/**
 * Get redirect path based on user role
 * Redirects users to their appropriate portal after login
 */
function getRedirectPathForRole(role: string): string {
  const roleRoutes: Record<string, string> = {
    'patient': '/patient/dashboard',
    'doctor': '/gp',
    'gp': '/gp',
    'specialist': '/specialist',
    'pharmacist': '/pharmacy',
    'pharmacy_tech': '/pharmacy',
    'lab_tech': '/diagnostics',
    'radiologist': '/diagnostics',
    'pathologist': '/diagnostics',
    'admin': '/dashboard/admin'
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
