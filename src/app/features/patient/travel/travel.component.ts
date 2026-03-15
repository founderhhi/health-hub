import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { PatientApiService } from '../../../core/api/patient.service';

type TravelTab = 'flights' | 'stay';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
})
export class TravelComponent {
  PATIENT_TABS = PATIENT_TABS;

  activeTab: TravelTab = 'flights';
  callbackSent = false;
  callbackLoading = false;
  callbackError = '';

  private location = inject(Location);
  private patientApi = inject(PatientApiService);
  private cdr = inject(ChangeDetectorRef);

  switchTab(tab: TravelTab): void {
    this.activeTab = tab;
    this.callbackSent = false;
    this.callbackError = '';
  }

  requestCallback(): void {
    if (this.callbackLoading) return;
    this.callbackLoading = true;
    this.callbackError = '';

    this.patientApi.requestCallback({
      type: this.activeTab === 'flights' ? 'travel_flights' : 'travel_stay',
    }).subscribe({
      next: () => {
        this.callbackLoading = false;
        this.callbackSent = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.callbackLoading = false;
        this.callbackError = 'Unable to submit your callback request right now. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
