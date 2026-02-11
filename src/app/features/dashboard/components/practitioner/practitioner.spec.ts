import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';

import { GpApiService } from '../../../../core/api/gp.service';
import { PrescriptionsApiService } from '../../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../../core/api/referrals.service';
import { WsService } from '../../../../core/realtime/ws.service';

import { Practitioner } from './practitioner';

describe('Practitioner', () => {
  let component: Practitioner;
  let fixture: ComponentFixture<Practitioner>;
  const gpApiMock = {
    getQueue: vi.fn(() => of({ queue: [] })),
    acceptRequest: vi.fn(() => of({ consultation: null, roomUrl: '' }))
  };
  const prescriptionsApiMock = {
    create: vi.fn(() => of({ prescription: {} }))
  };
  const referralsApiMock = {
    createReferral: vi.fn(() => of({ referral: {} }))
  };
  const wsMock = {
    connect: vi.fn(),
    events$: NEVER
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Practitioner],
      providers: [
        provideRouter([]),
        { provide: GpApiService, useValue: gpApiMock },
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

    const disabledNavItems = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.bottom-nav .nav-item.nav-item-disabled')
    );
    expect(disabledNavItems.length).toBe(3);
    expect(disabledNavItems.every(item => item.disabled)).toBe(true);
  });

  it('marks quick-action TODO controls as disabled coming soon actions', () => {
    const root = fixture.nativeElement as HTMLElement;
    const quickActionButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.quick-actions .quick-action-btn')
    );

    const disabledComingSoon = quickActionButtons.filter(
      button => button.disabled && (button.textContent || '').includes('Coming soon')
    );

    expect(disabledComingSoon.length).toBeGreaterThanOrEqual(3);
  });
});
