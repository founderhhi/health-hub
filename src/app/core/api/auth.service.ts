import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { ApiClientService } from './api-client.service';

interface AuthUser {
  id: string;
  role: string;
  phone: string;
  display_name?: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly platformId = inject(PLATFORM_ID); // [AGENT_AUTH] ISS-02: SSR guard
  constructor(private api: ApiClientService) {}

  signup(phone: string, password: string, displayName?: string) {
    return this.api.post<AuthResponse>('/auth/signup', { phone, password, displayName }).pipe(
      tap((response) => this.persistSession(response))
    );
  }

  login(phone: string, password: string) {
    return this.api.post<AuthResponse>('/auth/login', { phone, password }).pipe(
      tap((response) => this.persistSession(response))
    );
  }

  forgotPassword(phone: string) {
    return this.api.post<ForgotPasswordResponse>('/auth/forgot-password', { phone });
  }

  validate() {
    return this.api.get<{ valid: boolean; user: AuthUser }>('/auth/validate');
  }

  logout() {
    return this.api.post<{ ok: boolean }>('/auth/logout', {}).pipe(
      catchError(() => of({ ok: true }))
    );
  }

  clearSession() {
    // [AGENT_AUTH] ISS-02: SSR guard — only access localStorage in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
    localStorage.removeItem('hhi_display_name');
  }

  private persistSession(response: AuthResponse) {
    // [AGENT_AUTH] ISS-02: SSR guard — only access localStorage in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('hhi_auth_token', response.token);
    localStorage.setItem('hhi_user_role', response.user.role);
    localStorage.setItem('hhi_user_id', response.user.id);
    if (response.user.display_name) {
      localStorage.setItem('hhi_display_name', response.user.display_name);
    }
  }
}
