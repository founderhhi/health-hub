import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private api: ApiClientService) {}

  signup(phone: string, password: string) {
    return this.api.post<AuthResponse>('/auth/signup', { phone, password }).pipe(
      tap((response) => this.persistSession(response))
    );
  }

  login(phone: string, password: string) {
    return this.api.post<AuthResponse>('/auth/login', { phone, password }).pipe(
      tap((response) => this.persistSession(response))
    );
  }

  clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
  }

  private persistSession(response: AuthResponse) {
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('hhi_auth_token', response.token);
    localStorage.setItem('hhi_user_role', response.user.role);
    localStorage.setItem('hhi_user_id', response.user.id);
  }
}
