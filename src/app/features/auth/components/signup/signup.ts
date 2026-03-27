import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/api/auth.service';
import { redirectAfterLogin } from '../../../../shared/guards/role.guard';

function requireUppercase(control: AbstractControl): ValidationErrors | null {
  return /[A-Z]/.test(control.value || '') ? null : { requireUppercase: true };
}
function requireLowercase(control: AbstractControl): ValidationErrors | null {
  return /[a-z]/.test(control.value || '') ? null : { requireLowercase: true };
}
function requireDigit(control: AbstractControl): ValidationErrors | null {
  return /\d/.test(control.value || '') ? null : { requireDigit: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  readonly accountTypes = [
    {
      value: 'patient',
      label: 'Patient',
      icon: '👤',
      description: 'Book consultations, track medicines, and manage your records.'
    },
    {
      value: 'doctor',
      label: 'Doctor',
      icon: '👨‍⚕️',
      description: 'Register as a GP or specialist and wait for admin verification.'
    },
    {
      value: 'pharmacist',
      label: 'Pharmacy',
      icon: '💊',
      description: 'Join as a pharmacy partner for prescription and fulfillment access.'
    },
    {
      value: 'diagnostics',
      label: 'Diagnostics',
      icon: '🔬',
      description: 'Register your diagnostics team for test and reporting workflows.'
    }
  ] as const;
  readonly doctorRoles = [
    { value: 'gp', label: 'General Practitioner' },
    { value: 'specialist', label: 'Specialist' }
  ] as const;
  readonly specialistOptions = [
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'ENT',
    'Ophthalmology',
    'General Surgery'
  ] as const;
  readonly diagnosticsRoles = [
    { value: 'lab_tech', label: 'Lab Technician' },
    { value: 'radiologist', label: 'Radiologist' },
    { value: 'pathologist', label: 'Pathologist' }
  ] as const;

  form: FormGroup;
  submitting = signal(false);
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authApi: AuthApiService
  ) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), requireUppercase, requireLowercase, requireDigit]],
      accountType: ['patient', Validators.required],
      doctorRole: ['gp'],
      specialistSpecialty: [''],
      diagnosticsRole: ['lab_tech'],
      organizationName: ['']
    });

    const initialRole = this.route.snapshot.queryParamMap.get('role');
    if (initialRole === 'provider') {
      this.form.patchValue({ accountType: 'doctor' });
    }

    this.applyDynamicValidators();
    this.form.get('accountType')?.valueChanges.subscribe(() => this.applyDynamicValidators());
    this.form.get('doctorRole')?.valueChanges.subscribe(() => this.applyDynamicValidators());
  }

  get selectedAccountType(): 'patient' | 'doctor' | 'pharmacist' | 'diagnostics' {
    return this.form.get('accountType')?.value || 'patient';
  }

  get selectedRole(): string {
    if (this.selectedAccountType === 'doctor') {
      return this.form.get('doctorRole')?.value || 'gp';
    }
    if (this.selectedAccountType === 'diagnostics') {
      return this.form.get('diagnosticsRole')?.value || 'lab_tech';
    }
    if (this.selectedAccountType === 'pharmacist') {
      return 'pharmacist';
    }
    return 'patient';
  }

  get requiresManualApproval(): boolean {
    return this.selectedAccountType !== 'patient';
  }

  get organizationLabel(): string {
    if (this.selectedAccountType === 'pharmacist') {
      return 'Pharmacy / Partner Name';
    }
    if (this.selectedAccountType === 'diagnostics') {
      return 'Diagnostics Centre / Partner Name';
    }
    if (this.selectedAccountType === 'doctor') {
      return 'Clinic / Hospital / Partner Name';
    }
    return 'Organization';
  }

  get submitLabel(): string {
    return this.requiresManualApproval ? 'Submit Verification Request' : 'Create Account';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.applyDynamicValidators();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage = '';
    this.successMessage = '';

    const displayName = this.form.get('displayName')?.value;
    const phone = `${this.form.get('countryCode')?.value}${this.form.get('phone')?.value}`;
    const password = this.form.get('password')?.value;
    const role = this.selectedRole;
    const specialty = role === 'specialist' ? this.form.get('specialistSpecialty')?.value : undefined;
    const organizationName = this.requiresManualApproval ? this.form.get('organizationName')?.value : undefined;

    this.authApi.signup(phone, password, displayName, { role, specialty, organizationName }).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if ('requiresApproval' in response) {
          this.successMessage = response.message;
          this.form.reset(this.buildFormDefaults(this.selectedAccountType));
          this.applyDynamicValidators();
          return;
        }

        redirectAfterLogin(response.user.role, this.router);
      },
      error: (err: any) => { // [AGENT_PATIENT] ISS-11: surface backend-specific password policy errors
        this.submitting.set(false);
        this.errorMessage = err?.error?.error || 'Unable to create account. Try a different phone number.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login'], {
      queryParams: this.requiresManualApproval ? { role: 'provider' } : {}
    });
  }

  selectAccountType(type: 'patient' | 'doctor' | 'pharmacist' | 'diagnostics'): void {
    if (this.selectedAccountType === type) {
      return;
    }

    this.form.patchValue(this.buildFormDefaults(type));
    this.successMessage = '';
    this.errorMessage = '';
    this.applyDynamicValidators();
  }

  private applyDynamicValidators(): void {
    const doctorRoleControl = this.form.get('doctorRole');
    const specialistControl = this.form.get('specialistSpecialty');
    const diagnosticsRoleControl = this.form.get('diagnosticsRole');
    const organizationControl = this.form.get('organizationName');

    if (this.selectedAccountType === 'doctor') {
      doctorRoleControl?.setValidators([Validators.required]);
      organizationControl?.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      doctorRoleControl?.clearValidators();
      doctorRoleControl?.setValue('gp', { emitEvent: false });
    }

    if (this.selectedRole === 'specialist') {
      specialistControl?.setValidators([Validators.required]);
    } else {
      specialistControl?.clearValidators();
      specialistControl?.setValue('', { emitEvent: false });
    }

    if (this.selectedAccountType === 'diagnostics') {
      diagnosticsRoleControl?.setValidators([Validators.required]);
      organizationControl?.setValidators([Validators.required, Validators.minLength(2)]);
    } else if (this.selectedAccountType === 'pharmacist') {
      diagnosticsRoleControl?.clearValidators();
      diagnosticsRoleControl?.setValue('lab_tech', { emitEvent: false });
      organizationControl?.setValidators([Validators.required, Validators.minLength(2)]);
    } else if (this.selectedAccountType === 'patient') {
      diagnosticsRoleControl?.clearValidators();
      diagnosticsRoleControl?.setValue('lab_tech', { emitEvent: false });
      organizationControl?.clearValidators();
      organizationControl?.setValue('', { emitEvent: false });
    }

    if (this.selectedAccountType !== 'diagnostics') {
      diagnosticsRoleControl?.setValue('lab_tech', { emitEvent: false });
    }

    doctorRoleControl?.updateValueAndValidity({ emitEvent: false });
    specialistControl?.updateValueAndValidity({ emitEvent: false });
    diagnosticsRoleControl?.updateValueAndValidity({ emitEvent: false });
    organizationControl?.updateValueAndValidity({ emitEvent: false });
  }

  private buildFormDefaults(type: 'patient' | 'doctor' | 'pharmacist' | 'diagnostics') {
    return {
      displayName: '',
      countryCode: this.form.get('countryCode')?.value || '+1',
      phone: '',
      password: '',
      accountType: type,
      doctorRole: 'gp',
      specialistSpecialty: '',
      diagnosticsRole: 'lab_tech',
      organizationName: ''
    };
  }
}
