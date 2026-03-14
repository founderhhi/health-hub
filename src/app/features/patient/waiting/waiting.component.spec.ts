import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { WaitingComponent } from './waiting.component';
import { WsService } from '../../../core/realtime/ws.service';
import { PatientApiService } from '../../../core/api/patient.service';

describe('WaitingComponent', () => {
  let component: WaitingComponent;
  let fixture: ComponentFixture<WaitingComponent>;
  let wsEvents: Subject<{ event: string; data: unknown }>;
  let router: { navigate: ReturnType<typeof vi.fn> };
  let patientApi: {
    getActiveConsult: ReturnType<typeof vi.fn>;
    cancelConsult: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    wsEvents = new Subject<{ event: string; data: unknown }>();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
    });
    Object.defineProperty(globalThis, 'sessionStorage', {
      configurable: true,
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
    });
    router = {
      navigate: vi.fn(),
    };
    patientApi = {
      getActiveConsult: vi.fn(() => of({ active: null })),
      cancelConsult: vi.fn(() => of({ success: true })),
    };

    await TestBed.configureTestingModule({
      imports: [WaitingComponent],
      providers: [
        {
          provide: WsService,
          useValue: {
            connect: vi.fn(),
            events$: wsEvents.asObservable(),
          },
        },
        { provide: Router, useValue: router as unknown as Router },
        { provide: PatientApiService, useValue: patientApi as unknown as PatientApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('redirects waiting patients to the dashboard when the GP completes the consultation', async () => {
    vi.useFakeTimers();
    component.consultationId = 'consult-1';
    component.roomUrl = 'https://example.com/room';

    wsEvents.next({
      event: 'consult.completed',
      data: { consultation: { id: 'consult-1' } },
    });

    await vi.advanceTimersByTimeAsync(1500);

    expect(component.consultationFinished).toBe(true);
    expect(component.showConsultShell).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/patient/dashboard']);

    fixture.destroy();
  });

  it('returns patients to the dashboard after they leave a completed consult shell', () => {
    component.consultationId = 'consult-2';
    component.roomUrl = 'https://example.com/room';
    component.showConsultShell = true;

    wsEvents.next({
      event: 'consult.completed',
      data: { consultation: { id: 'consult-2' } },
    });

    expect(component.consultationFinished).toBe(true);
    expect(component.showConsultShell).toBe(true);

    component.onLeaveConsultShell();

    expect(router.navigate).toHaveBeenCalledWith(['/patient/dashboard']);

    fixture.destroy();
  });
});
