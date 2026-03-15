import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

interface NearbyPharmacy {
  name: string;
  address: string;
  hours: string;
  distance: string;
}

const NAIROBI_PHARMACIES: NearbyPharmacy[] = [
  { name: 'Goodlife Pharmacy - Westlands', address: 'Westlands Rd, Nairobi', hours: '8am - 10pm', distance: '0.8 km' },
  { name: 'Haltons Pharmacy - CBD', address: 'Kenyatta Ave, Nairobi', hours: '7am - 9pm', distance: '1.2 km' },
  { name: 'Pharmart Pharmacy', address: 'Ngong Rd, Nairobi', hours: '8am - 8pm', distance: '2.1 km' },
  { name: 'Aga Khan Pharmacy', address: '3rd Parklands Ave, Nairobi', hours: '24 Hours', distance: '3.4 km' },
  { name: 'Portal Pharmacy - Kilimani', address: 'Argwings Kodhek Rd, Nairobi', hours: '8am - 9pm', distance: '1.9 km' },
];

@Component({
  selector: 'app-patient-pharmacy',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.scss',
})
export class PatientPharmacyComponent {
  PATIENT_TABS = PATIENT_TABS;
  pharmacies = NAIROBI_PHARMACIES;
  directionMessage = '';

  private location = inject(Location);

  getDirections(pharmacy: NearbyPharmacy): void {
    this.directionMessage = `Directions to ${pharmacy.name} coming soon.`;
    setTimeout(() => { this.directionMessage = ''; }, 3000);
  }

  goBack(): void {
    this.location.back();
  }
}
