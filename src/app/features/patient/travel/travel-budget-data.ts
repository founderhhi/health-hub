import { DELHI_TRAVEL_HOSPITALS } from '../healwell-region/healwell-region-data';

export type BudgetSeverity = 'Mild' | 'Moderate' | 'Severe';

export type BudgetHospital = (typeof DELHI_TRAVEL_HOSPITALS)[number];

export interface BudgetEstimateRow {
  id: string;
  ailment: string;
  specialty: string;
  procedure: string;
  costs: Record<BudgetHospital, Record<BudgetSeverity, number>>;
}

export const TRAVEL_BUDGET_AILMENTS = [
  'Cardiac Checkup',
  'Knee Pain',
  'Diabetes Follow-up',
  'Kidney Stone',
  'Anxiety & Sleep Issues',
] as const;

export const TRAVEL_BUDGET_SPECIALTIES = [
  'Cardiology',
  'Orthopedics',
  'Endocrinology',
  'Urology',
  'Psychiatry',
] as const;

export const TRAVEL_BUDGET_ROWS: BudgetEstimateRow[] = [
  {
    id: 'cardiac-checkup',
    ailment: 'Cardiac Checkup',
    specialty: 'Cardiology',
    procedure: 'Cardiac diagnostic package',
    costs: {
      'AIIMS New Delhi': { Mild: 12000, Moderate: 18500, Severe: 29000 },
      'Fortis Escorts Heart Institute': { Mild: 19000, Moderate: 30000, Severe: 46500 },
      'Max Super Speciality Hospital': { Mild: 17500, Moderate: 27500, Severe: 43000 },
      'Sir Ganga Ram Hospital': { Mild: 16000, Moderate: 25500, Severe: 39500 },
    },
  },
  {
    id: 'knee-pain',
    ailment: 'Knee Pain',
    specialty: 'Orthopedics',
    procedure: 'Arthroscopy / pain management',
    costs: {
      'AIIMS New Delhi': { Mild: 18000, Moderate: 42000, Severe: 92000 },
      'Fortis Escorts Heart Institute': { Mild: 26000, Moderate: 61000, Severe: 132000 },
      'Max Super Speciality Hospital': { Mild: 24500, Moderate: 57500, Severe: 124000 },
      'Sir Ganga Ram Hospital': { Mild: 23000, Moderate: 54000, Severe: 116000 },
    },
  },
  {
    id: 'diabetes-followup',
    ailment: 'Diabetes Follow-up',
    specialty: 'Endocrinology',
    procedure: 'Metabolic panel + endocrine consult',
    costs: {
      'AIIMS New Delhi': { Mild: 8000, Moderate: 13500, Severe: 23500 },
      'Fortis Escorts Heart Institute': { Mild: 13500, Moderate: 22000, Severe: 38000 },
      'Max Super Speciality Hospital': { Mild: 12500, Moderate: 20500, Severe: 35500 },
      'Sir Ganga Ram Hospital': { Mild: 11800, Moderate: 19400, Severe: 33600 },
    },
  },
  {
    id: 'kidney-stone',
    ailment: 'Kidney Stone',
    specialty: 'Urology',
    procedure: 'Stone removal (URS/laser pathway)',
    costs: {
      'AIIMS New Delhi': { Mild: 24000, Moderate: 52000, Severe: 98000 },
      'Fortis Escorts Heart Institute': { Mild: 36000, Moderate: 77000, Severe: 146000 },
      'Max Super Speciality Hospital': { Mild: 34000, Moderate: 73000, Severe: 138000 },
      'Sir Ganga Ram Hospital': { Mild: 32000, Moderate: 69000, Severe: 131000 },
    },
  },
  {
    id: 'anxiety-sleep',
    ailment: 'Anxiety & Sleep Issues',
    specialty: 'Psychiatry',
    procedure: 'Mental health evaluation + therapy plan',
    costs: {
      'AIIMS New Delhi': { Mild: 6000, Moderate: 11500, Severe: 22000 },
      'Fortis Escorts Heart Institute': { Mild: 11000, Moderate: 20500, Severe: 39000 },
      'Max Super Speciality Hospital': { Mild: 9800, Moderate: 18400, Severe: 35600 },
      'Sir Ganga Ram Hospital': { Mild: 9200, Moderate: 17200, Severe: 33500 },
    },
  },
];
