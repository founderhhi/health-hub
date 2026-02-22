import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { Patient } from './patient';

describe('Patient', () => {
  let component: Patient;
  let fixture: ComponentFixture<Patient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patient],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Patient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('routes specialist service to a valid specialist route', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.navigateToService('specialist');

    expect(navigateSpy).toHaveBeenCalledWith(['/specialist']);
  });

  it('shows inline coming-soon message for diagnostics service', () => {
    component.navigateToService('diagnostics');

    expect(component.comingSoonMessage).toContain('coming soon');
  });
});
