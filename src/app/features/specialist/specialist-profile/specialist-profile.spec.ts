import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SpecialistProfileComponent } from './specialist-profile';

describe('SpecialistProfileComponent', () => {
  let component: SpecialistProfileComponent;
  let fixture: ComponentFixture<SpecialistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistProfileComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses disabled patient nav action with coming soon label', () => {
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
