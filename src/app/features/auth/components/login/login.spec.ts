import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { AuthApiService } from '../../../../core/api/auth.service';
import { LoginComponent } from './login';

const authApiMock = {
  login: vi.fn(() => of({
    token: 'spec-token',
    user: { id: 'spec-user', role: 'patient', phone: '+10000000000' }
  })),
  forgotPassword: vi.fn(),
  signup: vi.fn(),
  validate: vi.fn(),
  logout: vi.fn(),
  clearSession: vi.fn()
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            }
          }
        },
        { provide: AuthApiService, useValue: authApiMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
