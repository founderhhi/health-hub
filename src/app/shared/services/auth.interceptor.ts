// auth.interceptor.ts

import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => Observable<HttpEvent<unknown>> = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.accessToken || localStorage.getItem('hhi_auth_token');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('hhi_auth_token');
        localStorage.removeItem('hhi_user_role');
        localStorage.removeItem('hhi_user_id');
        localStorage.removeItem('hhi_display_name');
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
