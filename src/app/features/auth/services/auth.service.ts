import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthTokens } from '../models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly client = new CognitoIdentityProviderClient({
    region: 'eu-north-1',
    maxAttempts: 3
  });

  private readonly platformId = inject(PLATFORM_ID); // [AGENT_AUTH] ISS-02: SSR guard
  private readonly _tokens = signal<AuthTokens | null>(null);

  get instance(): CognitoIdentityProviderClient {
    return this.client;
  }

  get accessToken(): string | null {
    return this._tokens()?.accessToken
      ?? (isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : null); // [AGENT_AUTH] ISS-02: SSR guard
  }

  setTokens(tokens: AuthTokens): void {
    this._tokens.set(tokens);

    // [AGENT_AUTH] ISS-02: SSR guard — only persist to localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', tokens.accessToken);
      localStorage.setItem('id_token', tokens.idToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
    }
  }

  clear(): void {
    this._tokens.set(null);
    // [AGENT_AUTH] ISS-02: SSR guard — only clear localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  
}