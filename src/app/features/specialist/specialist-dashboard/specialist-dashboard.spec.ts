import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';

import { ReferralsApiService } from '../../../core/api/referrals.service';
import { WsService } from '../../../core/realtime/ws.service';
import { SpecialistDashboardComponent } from './specialist-dashboard';

describe('SpecialistDashboardComponent', () => {
  let component: SpecialistDashboardComponent;
  let fixture: ComponentFixture<SpecialistDashboardComponent>;

  const referralsApiMock = {
    listForSpecialist: vi.fn(() => of({ referrals: [] as any[] }))
  };

  const wsMock = {
    connect: vi.fn(),
    events$: NEVER
  };

  beforeEach(async () => {
    referralsApiMock.listForSpecialist.mockReset();
    referralsApiMock.listForSpecialist.mockReturnValue(of({ referrals: [] }));

    await TestBed.configureTestingModule({
      imports: [SpecialistDashboardComponent],
      providers: [
        provideRouter([]),
        { provide: ReferralsApiService, useValue: referralsApiMock },
        { provide: WsService, useValue: wsMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables specialist patient navigation when no route is implemented', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('a[routerLink="/specialist/patients"]')).toBeNull();

    const disabledPatientsNav = root.querySelector<HTMLButtonElement>(
      '.hhi-bottom-nav__item.hhi-bottom-nav__item--disabled'
    );
    expect(disabledPatientsNav).toBeTruthy();
    expect(disabledPatientsNav?.disabled).toBe(true);
    expect(disabledPatientsNav?.textContent).toContain('Coming soon');
  });

  it('computes live specialist stats from referral data', async () => {
    referralsApiMock.listForSpecialist.mockReturnValue(of({
      referrals: [
        {
          id: 'ref-1',
          patient_id: 'patient-1',
          patient_name: 'John Doe',
          urgency: 'routine',
          status: 'new',
          created_at: new Date().toISOString(),
          appointment_date: new Date().toISOString(),
          appointment_time: '10:00:00',
          referring_provider_role: 'gp',
          consultation_status: null
        },
        {
          id: 'ref-2',
          patient_id: 'patient-2',
          patient_name: 'Jane Doe',
          urgency: 'urgent',
          status: 'accepted',
          created_at: new Date().toISOString(),
          appointment_date: new Date().toISOString(),
          appointment_time: '11:30:00',
          referring_provider_role: 'specialist',
          consultation_status: 'active'
        }
      ]
    }));

    fixture = TestBed.createComponent(SpecialistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.stats.pending).toBe(1);
    expect(component.stats.appointments).toBe(2);
    expect(component.stats.active).toBe(1);
    expect(component.stats.patients).toBe(2);
    expect(component.gpCount).toBe(1);
    expect(component.specialistCount).toBe(1);
  });
});
