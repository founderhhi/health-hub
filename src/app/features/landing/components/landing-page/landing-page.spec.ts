import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPage } from './landing-page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns every testimonial for the All category', () => {
    component.activeStatsCategory.set(0);

    expect(component.filteredTestimonials.length).toBe(component.testimonials.length);
  });

  it('filters testimonials when the category changes', () => {
    component.setCategory(component.statsCategories.indexOf('Diagnostics'));

    expect(component.filteredTestimonials.length).toBeGreaterThan(0);
    expect(component.filteredTestimonials.every((testimonial) => testimonial.categories.includes('Diagnostics'))).toBeTrue();
  });

  it('wraps testimonial navigation for negative and overflow indexes', () => {
    component.setCategory(component.statsCategories.indexOf('Pharmacy'));

    component.setTestimonial(-1);
    expect(component.activeTestimonial()).toBe(component.filteredTestimonials.length - 1);

    component.setTestimonial(component.filteredTestimonials.length);
    expect(component.activeTestimonial()).toBe(0);
  });
});
