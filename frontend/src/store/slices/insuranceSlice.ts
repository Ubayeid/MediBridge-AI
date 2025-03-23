import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InsurancePlan {
  id: string;
  provider: string;
  planName: string;
  planType: string;
  coverage: {
    inNetwork: number;
    outNetwork: number;
    prescription: number;
    dental: number;
    vision: number;
  };
  deductible: number;
  outOfPocketMax: number;
}

interface InsuranceClaim {
  id: string;
  date: string;
  provider: string;
  service: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied' | 'paid';
}

interface InsuranceState {
  plan: InsurancePlan | null;
  claims: InsuranceClaim[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InsuranceState = {
  plan: null,
  claims: [],
  isLoading: false,
  error: null,
};

const insuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    fetchInsuranceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchInsuranceSuccess: (state, action: PayloadAction<InsurancePlan>) => {
      state.isLoading = false;
      state.plan = action.payload;
    },
    fetchInsuranceFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchClaimsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchClaimsSuccess: (state, action: PayloadAction<InsuranceClaim[]>) => {
      state.isLoading = false;
      state.claims = action.payload;
    },
    fetchClaimsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    submitClaim: (state, action: PayloadAction<InsuranceClaim>) => {
      state.claims.push(action.payload);
    },
  },
});

export const {
  fetchInsuranceStart,
  fetchInsuranceSuccess,
  fetchInsuranceFailure,
  fetchClaimsStart,
  fetchClaimsSuccess,
  fetchClaimsFailure,
  submitClaim,
} = insuranceSlice.actions;

export default insuranceSlice.reducer; 