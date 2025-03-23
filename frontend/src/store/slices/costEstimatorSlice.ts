import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CostEstimate {
  id: string;
  service: string;
  estimatedCost: number;
  insuranceCoverage: number;
  outOfPocket: number;
}

interface CostEstimatorState {
  estimates: CostEstimate[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CostEstimatorState = {
  estimates: [],
  isLoading: false,
  error: null,
};

const costEstimatorSlice = createSlice({
  name: 'costEstimator',
  initialState,
  reducers: {
    fetchEstimatesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchEstimatesSuccess: (state, action: PayloadAction<CostEstimate[]>) => {
      state.isLoading = false;
      state.estimates = action.payload;
    },
    fetchEstimatesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEstimatesStart,
  fetchEstimatesSuccess,
  fetchEstimatesFailure,
} = costEstimatorSlice.actions;

export default costEstimatorSlice.reducer; 