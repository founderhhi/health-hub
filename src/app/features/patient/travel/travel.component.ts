import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { PatientApiService } from '../../../core/api/patient.service';
import { DELHI_TRAVEL_HOSPITALS } from '../healwell-region/healwell-region-data';
import { BudgetEstimateRow, BudgetHospital, BudgetSeverity, TRAVEL_BUDGET_AILMENTS, TRAVEL_BUDGET_ROWS } from './travel-budget-data';

type TravelTab = 'flights' | 'stay';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
})
export class TravelComponent {
  PATIENT_TABS = PATIENT_TABS;

  activeTab: TravelTab = 'flights';
  callbackSent = false;
  callbackLoading = false;
  callbackError = '';
  selectedAilment: string = TRAVEL_BUDGET_AILMENTS[0];
  selectedSeverity: BudgetSeverity = 'Moderate';
  selectedHospital: BudgetHospital = DELHI_TRAVEL_HOSPITALS[0];

  readonly budgetRows: BudgetEstimateRow[] = TRAVEL_BUDGET_ROWS;
  readonly ailmentOptions = [...TRAVEL_BUDGET_AILMENTS];
  readonly severityOptions: BudgetSeverity[] = ['Mild', 'Moderate', 'Severe'];
  readonly destinationHospitals = [...DELHI_TRAVEL_HOSPITALS];

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

  get highlightedRows(): BudgetEstimateRow[] {
    return this.budgetRows.filter((row) => row.ailment === this.selectedAilment);
  }

  get selectedAilmentEstimate(): { row: BudgetEstimateRow; amount: number } | null {
    const row = this.budgetRows.find((item) => item.ailment === this.selectedAilment);
    if (!row) {
      return null;
    }

    return {
      row,
      amount: row.costs[this.selectedHospital][this.selectedSeverity],
    };
  }

  get isStayTab(): boolean {
    return this.activeTab === 'stay';
  }

  formatInr(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  getCost(row: BudgetEstimateRow, hospital: BudgetHospital): number {
    return row.costs[hospital][this.selectedSeverity];
  }
}
