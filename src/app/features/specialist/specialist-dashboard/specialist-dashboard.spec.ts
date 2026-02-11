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
    listForSpecialist: vi.fn(() => of({ referrals: [] }))
  };

  const wsMock = {
    connect: vi.fn(),
    events$: NEVER
  };

  beforeEach(async () => {
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
});
