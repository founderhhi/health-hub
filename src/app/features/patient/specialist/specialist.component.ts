import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { PatientApiService } from '../../../core/api/patient.service';

interface SpecialistProfile {
  id?: string | null;
  display_name: string;
  first_name?: string | null;
  last_name?: string | null;
  specialty: string;
  facility_name?: string | null;
  bio?: string | null;
}

@Component({
  selector: 'app-patient-specialist',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
})
export class PatientSpecialistComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;

  specialists: SpecialistProfile[] = [];
  filteredSpecialists: SpecialistProfile[] = [];
  searchQuery = '';
  loadError = '';
  loading = true;
  showAvailabilityNotice = true;
  readonly availabilityNotice = 'This feature is not yet active for personal specialist consultation — we will notify you as soon as it is live.';

  private location = inject(Location);
  private patientApi = inject(PatientApiService);

  ngOnInit(): void {
    this.loadSpecialists();
  }

  private loadSpecialists(): void {
    this.loading = true;
    this.loadError = '';

    this.patientApi.getSpecialists().subscribe({
      next: (res) => {
        this.specialists = this.normalizeSpecialists(res?.specialists);
        this.applySearchFilter();
        this.loading = false;
      },
      error: () => {
        this.specialists = [];
        this.filteredSpecialists = [];
        this.loadError = 'Unable to load specialists right now. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.applySearchFilter();
  }

  private applySearchFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSpecialists = this.specialists;
      return;
    }

    this.filteredSpecialists = this.specialists.filter(s =>
      String(s.display_name || '').toLowerCase().includes(query) ||
      String(s.specialty || '').toLowerCase().includes(query) ||
      String(s.facility_name || '').toLowerCase().includes(query)
    );
  }

  private normalizeSpecialists(rawList: unknown): SpecialistProfile[] {
    if (!Array.isArray(rawList)) {
      return [];
    }

    return rawList.map((item: any) => {
      const fallbackName = [item?.first_name, item?.last_name]
        .filter((part: unknown) => typeof part === 'string' && part.trim())
        .join(' ')
        .trim();

      return {
        id: item?.id || null,
        display_name: (item?.display_name || fallbackName || 'Specialist').trim(),
        first_name: item?.first_name || null,
        last_name: item?.last_name || null,
        specialty: (item?.specialty || 'General Specialist').trim(),
        facility_name: item?.facility_name || null,
        bio: item?.bio || null,
      };
    });
  }

  getInitials(name: string): string {
    return String(name || 'S')
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  dismissAvailabilityNotice(): void {
    this.showAvailabilityNotice = false;
  }

  goBack(): void {
    this.location.back();
  }
}
