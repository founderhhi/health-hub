import { randomInt } from 'node:crypto';

let patientCounter = 0;

export interface GeneratedPatient {
  displayName: string;
  localPhone: string;
  phone: string;
  password: string;
  runTag: string;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function normalizeTail(seed: string): string {
  const digits = onlyDigits(seed).padEnd(7, '0');
  return digits.slice(-7);
}

export function createPatientSeed(runId: string, password: string): GeneratedPatient {
  patientCounter += 1;
  const entropy = `${Date.now()}${process.pid}${patientCounter}${randomInt(0, 10_000_000)}`;
  const tail = normalizeTail(`${runId}${entropy}`);
  const localPhone = `555${tail}`;
  const runTag = `${runId}-${patientCounter}`;

  return {
    displayName: `PW ${runTag}`,
    localPhone,
    phone: `+1${localPhone}`,
    password,
    runTag
  };
}
