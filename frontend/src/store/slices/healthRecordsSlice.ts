import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthRecord {
  id: string;
  type: 'medical' | 'vaccination' | 'prescription' | 'lab' | 'imaging';
  date: string;
  provider: string;
  description: string;
  attachments: string[];
  notes?: string;
}

interface HealthRecordsState {
  records: HealthRecord[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HealthRecordsState = {
  records: [],
  isLoading: false,
  error: null,
};

const healthRecordsSlice = createSlice({
  name: 'healthRecords',
  initialState,
  reducers: {
    fetchRecordsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRecordsSuccess: (state, action: PayloadAction<HealthRecord[]>) => {
      state.isLoading = false;
      state.records = action.payload;
    },
    fetchRecordsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addRecord: (state, action: PayloadAction<HealthRecord>) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action: PayloadAction<HealthRecord>) => {
      const index = state.records.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(record => record.id !== action.payload);
    },
  },
});

export const {
  fetchRecordsStart,
  fetchRecordsSuccess,
  fetchRecordsFailure,
  addRecord,
  updateRecord,
  deleteRecord,
} = healthRecordsSlice.actions;

export default healthRecordsSlice.reducer; 