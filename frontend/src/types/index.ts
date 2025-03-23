export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  studentId: string;
  dateOfBirth: string;
  nationality: string;
  phoneNumber: string;
  address: string;
}

export interface HealthRecord {
  id: string;
  userId: string;
  type: string;
  date: string;
  provider: string;
  description: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  type: 'checkup' | 'followup' | 'specialist' | 'emergency';
  date: string;
  time: string;
  provider: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceInfo {
  id: string;
  userId: string;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  startDate: string;
  endDate: string;
  coverageType: string;
  coverageDetails: {
    deductible: number;
    copay: number;
    coinsurance: number;
    outOfPocketMax: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
} 