import { Component, inject } from '@angular/core';
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

  private location = inject(Location);
  private patientApi = inject(PatientApiService);

  switchTab(tab: TravelTab): void {
    this.activeTab = tab;
    this.callbackSent = false;
  }

  requestCallback(): void {
    if (this.callbackLoading) return;
    this.callbackLoading = true;

    this.patientApi.requestCallback({
      type: this.activeTab === 'flights' ? 'travel_flights' : 'travel_stay',
    }).subscribe({
      next: () => {
        this.callbackLoading = false;
        this.callbackSent = true;
      },
      error: () => {
        this.callbackLoading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
