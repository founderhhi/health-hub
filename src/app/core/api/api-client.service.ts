import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

const REQUEST_TIMEOUT_MS = 30_000;

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: HttpParams) {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params }).pipe(timeout(REQUEST_TIMEOUT_MS));
  }

  post<T>(path: string, body?: unknown) {
    return this.http.post<T>(`${this.baseUrl}${path}`, body ?? {}).pipe(timeout(REQUEST_TIMEOUT_MS));
  }

  put<T>(path: string, body?: unknown) {
    return this.http.put<T>(`${this.baseUrl}${path}`, body ?? {}).pipe(timeout(REQUEST_TIMEOUT_MS));
  }

  patch<T>(path: string, body?: unknown) {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body ?? {}).pipe(timeout(REQUEST_TIMEOUT_MS));
  }

  delete<T>(path: string) {
    return this.http.delete<T>(`${this.baseUrl}${path}`).pipe(timeout(REQUEST_TIMEOUT_MS));
  }
}
