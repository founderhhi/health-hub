import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { HEALWELL_REGIONS, HealwellCity, HealwellHospital, HealwellRegionConfig } from './healwell-region-data';
import { PatientApiService } from '../../../core/api/patient.service';

type ViewState = 'cities' | 'hospitals' | 'callback';

@Component({
  selector: 'app-healwell-region',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  templateUrl: './healwell-region.component.html',
  styleUrl: './healwell-region.component.scss',
})
export class HealwellRegionComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;

  regionConfig!: HealwellRegionConfig;
  view: ViewState = 'cities';
  selectedCity: HealwellCity | null = null;
  selectedHospital: HealwellHospital | null = null;
  callbackSent = false;
  callbackLoading = false;
  callbackError = '';

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private patientApi = inject(PatientApiService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const region = this.route.snapshot.data['region'] || 'india';
    this.regionConfig = HEALWELL_REGIONS[region] || HEALWELL_REGIONS['india'];
  }

  get totalHospitals(): number {
    return this.regionConfig?.cities.reduce((count, city) => count + city.hospitals.length, 0) ?? 0;
  }

  get pageSubtitle(): string {
    switch (this.view) {
      case 'cities':
        return 'Choose a city to begin your next-step planning.';
      case 'hospitals':
        return `Hospitals in ${this.selectedCity?.name}`;
      case 'callback':
        return `${this.selectedHospital?.name}`;
      default:
        return '';
    }
  }

  selectCity(city: HealwellCity): void {
    this.selectedCity = city;
    this.view = 'hospitals';
  }

  selectHospital(hospital: HealwellHospital): void {
    this.selectedHospital = hospital;
    this.view = 'callback';
    this.callbackSent = false;
    this.submitCallbackRequest();
  }

  retryCallback(): void {
    if (!this.selectedHospital || this.callbackLoading) {
      return;
    }

    this.submitCallbackRequest();
  }

  private submitCallbackRequest(): void {
    this.callbackLoading = true;
    this.callbackError = '';

    this.patientApi.requestCallback({
      type: 'healwell_callback',
      region: this.regionConfig.title,
      city: this.selectedCity?.name || '',
      hospital: this.selectedHospital?.name || '',
    }).subscribe({
      next: () => {
        this.callbackLoading = false;
        this.callbackSent = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.callbackLoading = false;
        this.callbackError = 'Unable to submit your request right now. Please try again shortly.';
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    if (this.view === 'callback') {
      this.view = 'hospitals';
      this.selectedHospital = null;
    } else if (this.view === 'hospitals') {
      this.view = 'cities';
      this.selectedCity = null;
    } else {
      this.location.back();
    }
  }
}
