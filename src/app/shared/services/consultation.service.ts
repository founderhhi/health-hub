import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, delay, catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiClientService } from '../../core/api/api-client.service';

export interface ConsultationSession {
  consultation_id: string;
  symptoms: string[];
  duration: string;
  severity: number;
  notes: string;
  patient_status: 'form' | 'waiting' | 'ready' | 'in_call';
  doctor_status: 'pending' | 'reviewing' | 'joined';
  created_at: string;
}

const STORAGE_KEY = 'hhi_consultation_session';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private platformId = inject(PLATFORM_ID);
  private router     = inject(Router);
  private http       = inject(HttpClient);
  private api        = inject(ApiClientService);

  private sessionSubject = new BehaviorSubject<ConsultationSession | null>(
    this.loadFromStorage()
  );

  session$: Observable<ConsultationSession | null> = this.sessionSubject.asObservable();

  private loadFromStorage(): ConsultationSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ConsultationSession) : null;
    } catch { return null; }
  }

  private saveToStorage(session: ConsultationSession): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(session)); }
    catch { /* degrade gracefully */ }
  }

  private clearStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
  }

  get currentSession(): ConsultationSession | null {
    return this.sessionSubject.value;
  }

  submitConsultation(data: {
    symptoms: string[];
    duration: string;
    severity: number;
    notes: string;
  }): Observable<ConsultationSession> {
    const existing = this.currentSession;

    // Task #14: /patient/consults is the canonical endpoint that writes into
    // consult_requests. It expects `{ mode, symptoms }` where `symptoms` is a
    // jsonb blob. We send the structured triage fields AND a computed
    // `complaint` string so downstream summary panels keep working.
    const mode = this.resolveMode();
    const complaint = (data.notes && data.notes.trim())
      ? data.notes.trim()
      : (data.symptoms.length ? data.symptoms.join(', ') : 'General consult');
    const symptomsPayload = {
      source: 'pre-consultation-form',
      complaint,
      symptoms: data.symptoms,
      duration: data.duration,
      severity: data.severity,
      notes: data.notes,
    };

    return this.api
      .post<{ request: { id?: string | number; created_at?: string } }>(
        '/patient/consults',
        { mode, symptoms: symptomsPayload }
      )
      .pipe(
        map(res => {
          const req = res?.request ?? null;
          const session: ConsultationSession = {
            consultation_id: req?.id != null
              ? String(req.id)
              : (existing?.consultation_id ?? this.generateId()),
            ...data,
            patient_status: 'waiting',
            doctor_status: 'pending',
            created_at: req?.created_at
              ?? existing?.created_at
              ?? new Date().toISOString(),
          };
          this.saveToStorage(session);
          this.sessionSubject.next(session);
          return session;
        }),
        catchError(() => {
          const local: ConsultationSession = {
            consultation_id: existing?.consultation_id ?? this.generateId(),
            ...data,
            patient_status: 'waiting',
            doctor_status: 'pending',
            created_at: existing?.created_at ?? new Date().toISOString(),
          };
          this.saveToStorage(local);
          this.sessionSubject.next(local);
          return of(local).pipe(delay(300));
        })
      );
  }

  private resolveMode(): 'video' | 'audio' | 'chat' {
    if (!isPlatformBrowser(this.platformId)) return 'video';
    try {
      const stored = sessionStorage.getItem('hhi_consult_mode');
      if (stored === 'audio' || stored === 'chat' || stored === 'video') {
        return stored;
      }
    } catch { /* degrade gracefully */ }
    return 'video';
  }

  markDoctorReviewing(): void {
    const session = this.currentSession;
    if (!session) return;
    this.http.patch(`/api/consultations/${session.consultation_id}/doctor-status`, { doctor_status: 'reviewing' })
      .pipe(catchError(() => of(null))).subscribe();
    const updated = { ...session, doctor_status: 'reviewing' as const };
    this.saveToStorage(updated);
    this.sessionSubject.next(updated);
  }

  doctorJoinsCall(zoomUrl: string, specialistId?: number): void {
    const session = this.currentSession;
    if (!session) return;
    this.http.patch(`/api/consultations/${session.consultation_id}/doctor-status`, { doctor_status: 'joined', specialist_id: specialistId })
      .pipe(catchError(() => of(null))).subscribe();
    const updated = { ...session, doctor_status: 'joined' as const, patient_status: 'ready' as const };
    this.saveToStorage(updated);
    this.sessionSubject.next(updated);
    if (isPlatformBrowser(this.platformId)) {
      window.open(zoomUrl, '_blank');
    }
  }

  refreshSessionFromStorage(): void {
    const session = this.currentSession;
    if (!session) return;
    this.http.get<ConsultationSession>(`/api/consultations/${session.consultation_id}`).pipe(
      tap(fresh => { this.saveToStorage(fresh); this.sessionSubject.next(fresh); }),
      catchError(() => {
        const fresh = this.loadFromStorage();
        if (fresh) this.sessionSubject.next(fresh);
        return of(null);
      })
    ).subscribe();
  }

  toSummaryString(session: ConsultationSession): string {
    const symptomList = session.symptoms.join(' and ').toLowerCase();
    const severityLabel = session.severity <= 3 ? 'mild' : session.severity <= 6 ? 'moderate' : session.severity <= 8 ? 'severe' : 'very severe';
    return `Patient reports ${symptomList} for ${session.duration} with ${severityLabel} severity${session.notes ? ': ' + session.notes : ''}.`;
  }

  resetForNewConsultation(): void {
    this.clearStorage();
    this.sessionSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      try { sessionStorage.removeItem('hhi_consult_mode'); } catch { }
    }
  }

  endSession(): void {
    this.clearStorage();
    this.sessionSubject.next(null);
    this.router.navigate(['/']);
  }

  private generateId(): string {
    return 'cons_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  }
}
