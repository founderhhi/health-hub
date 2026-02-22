import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { AuthApiService } from '../../../core/api/auth.service';
import { ProviderProfileService } from '../../../core/services/provider-profile.service';
import { SpecialistProfileComponent } from './specialist-profile';

const authApiMock = {
  logout: vi.fn(() => of({ ok: true })),
  clearSession: vi.fn()
};

const providerProfileMock = {
  getProfile: vi.fn(() => ({
    username: 'spec-user',
    facilityName: 'Specialist Clinic',
    registrationNumber: 'SP-TEST-001',
    address: 'Cardiology',
    phoneNumber: '+254700000000',
    operational: true
  })),
  setOperationalStatus: vi.fn()
};

describe('SpecialistProfileComponent', () => {
  let component: SpecialistProfileComponent;
  let fixture: ComponentFixture<SpecialistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistProfileComponent],
      providers: [
        provideRouter([]),
        { provide: AuthApiService, useValue: authApiMock },
        { provide: ProviderProfileService, useValue: providerProfileMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not render specialist patient nav shortcut', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('a[routerLink="/specialist/patients"]')).toBeNull();
    expect(root.textContent).not.toContain('Coming soon');
  });
});
