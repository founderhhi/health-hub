import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { NEVER, of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GpApiService } from '../../../../core/api/gp.service';
import { ProviderProfileService } from '../../../../core/services/provider-profile.service';
import { PrescriptionsApiService } from '../../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../../core/api/referrals.service';
import { WsService } from '../../../../core/realtime/ws.service';

import { Practitioner } from './practitioner';

const ANGULAR_TEST_ENV_KEY = '__health_hub_angular_test_env__';

if (!(globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY]) {
  getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  (globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY] = true;
}

describe('Practitioner', () => {
  let component: Practitioner;
  let fixture: ComponentFixture<Practitioner>;
  const gpApiMock = {
    getQueue: vi.fn(() => of({ queue: [] })),
    acceptRequest: vi.fn(() => of({ consultation: null, roomUrl: '' })),
    deleteFromQueue: vi.fn(() => of({ success: true })),
    getOperationalStatus: vi.fn(() => of({ operational: true })),
    getConsultationHistory: vi.fn(() => of({ history: [] })),
    deleteConsultationRecord: vi.fn(() => of({ success: true })),
    updateOperationalStatus: vi.fn(() => of({ success: true, operational: true }))
  };
  const prescriptionsApiMock = {
    create: vi.fn(() => of({ prescription: {} }))
  };
  const providerProfileServiceMock = {
    setOperationalStatus: vi.fn(),
    getProfile: vi.fn(() => ({ operational: true }))
  };
  const referralsApiMock = {
    createReferral: vi.fn(() => of({ referral: {} }))
  };
  const wsMock = {
    connect: vi.fn(),
    events$: NEVER
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Practitioner],
      providers: [
        provideRouter([]),
        { provide: GpApiService, useValue: gpApiMock },
        { provide: ProviderProfileService, useValue: providerProfileServiceMock },
        { provide: PrescriptionsApiService, useValue: prescriptionsApiMock },
        { provide: ReferralsApiService, useValue: referralsApiMock },
        { provide: WsService, useValue: wsMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Practitioner);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removes practitioner dead-link routes from bottom nav', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('a[routerLink="/dashboard/practitioner/patients"]')).toBeNull();
    expect(root.querySelector('a[routerLink="/dashboard/practitioner/schedule"]')).toBeNull();
    expect(root.querySelector('a[routerLink="/dashboard/practitioner/profile"]')).toBeNull();

    const mobileActionButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.bottom-nav button.nav-item')
    );
    expect(mobileActionButtons.length).toBe(2);
    expect(mobileActionButtons.some((item) => (item.textContent || '').includes('Patients'))).toBe(true);
    expect(mobileActionButtons.some((item) => (item.textContent || '').includes('Schedule'))).toBe(true);
  });

  it('renders quick-action controls as active buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const quickActionButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.quick-actions .quick-action-btn')
    );

    expect(quickActionButtons.length).toBeGreaterThanOrEqual(4);
    expect(quickActionButtons.every((button) => button.disabled === false)).toBe(true);
    expect(quickActionButtons.some((button) => (button.textContent || '').includes('My Schedule'))).toBe(true);
    expect(quickActionButtons.some((button) => (button.textContent || '').includes('My Patients'))).toBe(true);
    expect(quickActionButtons.some((button) => (button.textContent || '').includes('Profile'))).toBe(true);
  });

  it('shows history section when explicitly requested while online', () => {
    component.isOperating = true;
    component.showHistory = true;

    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.history-section')).not.toBeNull();
    expect((root.textContent || '').includes('Past Consultations')).toBe(true);
  });

  it('refreshes both queue and consultation history from refresh control', () => {
    component.refreshQueue();
    fixture.detectChanges();

    expect(gpApiMock.getQueue).toHaveBeenCalledTimes(2);
    expect(gpApiMock.getConsultationHistory).toHaveBeenCalledTimes(2);
  });

  it('maps structured AI triage data into the provider queue', async () => {
    gpApiMock.getQueue.mockReturnValueOnce(of({
      queue: [
        {
          id: 'request-1',
          patient_id: 'patient-1',
          display_name: 'Jane Doe',
          first_name: 'Jane',
          last_name: 'Doe',
          mode: 'video',
          status: 'waiting',
          created_at: new Date().toISOString(),
          symptoms: {
            source: 'ai-triage',
            complaint: 'Persistent headache',
            triageAnswers: ['Started yesterday', 'No weakness', 'Light sensitivity present'],
            triageSummary: 'Possible conditions:\n- migraine\nRecommended next step:\n- Connect to GP today.',
            recommendedNextStep: 'Connect to GP today.'
          }
        }
      ]
    }));

    component.refreshQueue();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.queue[0]?.symptoms).toBe('Persistent headache');
    expect(component.queue[0]?.aiSummary).toContain('Possible conditions:');
    expect(component.queue[0]?.triageAnswers).toEqual([
      'Started yesterday',
      'No weakness',
      'Light sensitivity present'
    ]);
    expect(component.queue[0]?.recommendedNextStep).toBe('Connect to GP today.');
  });
});
