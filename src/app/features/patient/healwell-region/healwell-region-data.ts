export interface HealwellHospital {
  name: string;
}

export interface HealwellCity {
  name: string;
  hospitals: HealwellHospital[];
}

export interface HealwellRegionConfig {
  title: string;
  cities: HealwellCity[];
}

export const HEALWELL_REGIONS: Record<string, HealwellRegionConfig> = {
  india: {
    title: 'Heal Well in India',
    cities: [
      {
        name: 'Delhi',
        hospitals: [
          { name: 'AIIMS New Delhi' },
          { name: 'Fortis Escorts Heart Institute' },
          { name: 'Max Super Speciality Hospital' },
          { name: 'Sir Ganga Ram Hospital' },
        ],
      },
      {
        name: 'Chennai',
        hospitals: [
          { name: 'Apollo Hospital Chennai' },
          { name: 'MIOT International' },
          { name: 'Fortis Malar Hospital' },
          { name: 'Sri Ramachandra Medical Centre' },
        ],
      },
      {
        name: 'Hyderabad',
        hospitals: [
          { name: 'Apollo Jubilee Hills' },
          { name: 'KIMS Hospital' },
          { name: 'Yashoda Hospitals' },
          { name: 'Care Hospitals' },
        ],
      },
      {
        name: 'Bangalore',
        hospitals: [
          { name: 'Manipal Hospital' },
          { name: 'Narayana Health' },
          { name: 'Fortis Hospital Bannerghatta' },
          { name: 'Columbia Asia Hospital' },
        ],
      },
    ],
  },
  africa: {
    title: 'Heal Well in Africa',
    cities: [
      {
        name: 'Nairobi',
        hospitals: [
          { name: 'Kenyatta National Hospital' },
          { name: 'Nairobi Hospital' },
          { name: 'Aga Khan University Hospital' },
          { name: 'MP Shah Hospital' },
        ],
      },
      {
        name: 'Addis Ababa',
        hospitals: [
          { name: 'Tikur Anbessa Specialized Hospital' },
          { name: 'St. Paul’s Hospital Millennium Medical College' },
          { name: 'Adera Medical Center' },
          { name: 'Myungsung Christian Medical Center' },
        ],
      },
      {
        name: 'Johannesburg',
        hospitals: [
          { name: 'Charlotte Maxeke Hospital' },
          { name: 'Netcare Milpark Hospital' },
          { name: 'Wits Donald Gordon Medical Centre' },
          { name: 'Life Fourways Hospital' },
        ],
      },
      {
        name: 'Cape Town',
        hospitals: [
          { name: 'Groote Schuur Hospital' },
          { name: 'Netcare Christiaan Barnard Memorial Hospital' },
          { name: 'Mediclinic Cape Town' },
          { name: 'Life Vincent Pallotti Hospital' },
        ],
      },
    ],
  },
};
