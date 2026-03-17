export interface HealwellHospital {
  name: string;
}

export interface HealwellCity {
  name: string;
  description?: string;
  hospitals: HealwellHospital[];
}

export interface HealwellRegionConfig {
  title: string;
  kicker: string;
  intro: string;
  highlights: string[];
  cities: HealwellCity[];
}

export const DELHI_TRAVEL_HOSPITALS = [
  'AIIMS New Delhi',
  'Fortis Escorts Heart Institute',
  'Max Super Speciality Hospital',
  'Sir Ganga Ram Hospital',
] as const;

export const HEALWELL_REGIONS: Record<string, HealwellRegionConfig> = {
  india: {
    title: 'Heal Well in India',
    kicker: 'Specialty care pathways',
    intro: 'A calmer way to explore leading Indian hospital hubs for cardiac, oncology, orthopaedic, and advanced specialty care.',
    highlights: ['Minimal planning flow', 'Trusted city hubs', 'Callback support when you are ready'],
    cities: [
      {
        name: 'Delhi',
        description: 'National referral hospitals and advanced tertiary care.',
        hospitals: DELHI_TRAVEL_HOSPITALS.map((name) => ({ name })),
      },
      {
        name: 'Chennai',
        description: 'Cardiac, transplant, and multispecialty excellence.',
        hospitals: [
          { name: 'Apollo Hospital Chennai' },
          { name: 'MIOT International' },
          { name: 'Fortis Malar Hospital' },
          { name: 'Sri Ramachandra Medical Centre' },
        ],
      },
      {
        name: 'Hyderabad',
        description: 'High-volume specialty care and modern tertiary centres.',
        hospitals: [
          { name: 'Apollo Jubilee Hills' },
          { name: 'KIMS Hospital' },
          { name: 'Yashoda Hospitals' },
          { name: 'Care Hospitals' },
        ],
      },
      {
        name: 'Bangalore',
        description: 'Technology-led care networks and leading specialty hospitals.',
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
    kicker: 'Regional care discovery',
    intro: 'Explore major care hubs across Africa with a softer, clearer path to hospital discovery and callback support.',
    highlights: ['Regional referral hubs', 'Care coordination callback', 'Simple city-by-city discovery'],
    cities: [
      {
        name: 'Nairobi',
        description: 'East African referral centres for multispecialty care.',
        hospitals: [
          { name: 'Kenyatta National Hospital' },
          { name: 'Nairobi Hospital' },
          { name: 'Aga Khan University Hospital' },
          { name: 'MP Shah Hospital' },
        ],
      },
      {
        name: 'Addis Ababa',
        description: 'Specialised public and private hospitals for advanced care.',
        hospitals: [
          { name: 'Tikur Anbessa Specialized Hospital' },
          { name: 'St. Paul’s Hospital Millennium Medical College' },
          { name: 'Adera Medical Center' },
          { name: 'Myungsung Christian Medical Center' },
        ],
      },
      {
        name: 'Johannesburg',
        description: 'High-capacity private and academic hospital networks.',
        hospitals: [
          { name: 'Charlotte Maxeke Hospital' },
          { name: 'Netcare Milpark Hospital' },
          { name: 'Wits Donald Gordon Medical Centre' },
          { name: 'Life Fourways Hospital' },
        ],
      },
      {
        name: 'Cape Town',
        description: 'Renowned surgical, cardiac, and referral institutions.',
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
