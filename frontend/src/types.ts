export type AppointmentType = 'checkup' | 'specialist' | 'followup' | 'emergency';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  type: AppointmentType;
  date: string;
  status: AppointmentStatus;
  doctor: string;
  location: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  type: string;
  date: string;
  provider: string;
  notes?: string;
}

export interface InsuranceCoverage {
  copay: number;
  deductible: number;
  coinsurance: number;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  coverage: InsuranceCoverage;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 