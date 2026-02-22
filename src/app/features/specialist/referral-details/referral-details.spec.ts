import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { ReferralDetailsComponent } from './referral-details';

describe('ReferralDetailsComponent', () => {
  let component: ReferralDetailsComponent;
  let fixture: ComponentFixture<ReferralDetailsComponent>;

  const referral = {
    id: 'referral-1',
    patient_id: 'patient-1',
    patient_name: 'Patient',
    urgency: 'routine',
    status: 'new',
    created_at: new Date().toISOString()
  };

  const referralsApiMock = {
    getReferral: () => of({ referral }),
    updateStatus: () => of({ referral })
  };

  const labsApiMock = {
    createOrder: () => of({ order: { id: 'order-1' } })
  };

  const prescriptionsApiMock = {
    create: () => of({ prescription: { id: 'rx-1' } })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralDetailsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'referral-1' })
            }
          }
        },
        { provide: ReferralsApiService, useValue: referralsApiMock },
        { provide: LabsApiService, useValue: labsApiMock },
        { provide: PrescriptionsApiService, useValue: prescriptionsApiMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables patient nav shortcut in bottom navigation', () => {
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
