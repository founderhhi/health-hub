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
    consultation_mode: 'online',
    created_at: new Date().toISOString()
  };

  const referralsApiMock = {
    getReferral: () => of({ referral }),
    updateStatus: () => of({ referral }),
    updateSchedule: () => of({
      referral: {
        ...referral,
        status: 'confirmed',
        consultation_mode: 'offline',
        appointment_date: '2026-03-17',
        appointment_time: '10:30:00',
        location: 'Majolly Clinic Room 12'
      }
    }),
    requestMoreInfo: () => of({ referral })
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

  it('renders specialist bottom navigation links', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('a[routerLink="/specialist"]')).toBeTruthy();
    expect(root.querySelector('a[routerLink="/specialist/profile"]')).toBeTruthy();
  });

  it('shows a success notice after saving updated appointment details', () => {
    component.openScheduleEditor();
    component.scheduleForm = {
      appointmentDate: '2026-03-17',
      appointmentTime: '10:30',
      consultationMode: 'offline',
      location: 'Majolly Clinic Room 12'
    };

    component.saveSchedule();
    fixture.detectChanges();

    expect(component.actionNotice).toBe('Appointment details updated successfully.');
    expect(component.showScheduleForm).toBe(false);
    expect(component.referral.status).toBe('confirmed');
    expect(component.referral.consultation_mode).toBe('offline');
  });
});
