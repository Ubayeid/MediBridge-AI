import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Diagnosis {
  id: string;
  condition: string;
  probability: number;
  recommendations: string[];
}

interface SymptomCheckerState {
  symptoms: Symptom[];
  diagnoses: Diagnosis[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SymptomCheckerState = {
  symptoms: [],
  diagnoses: [],
  isLoading: false,
  error: null,
};

const symptomCheckerSlice = createSlice({
  name: 'symptomChecker',
  initialState,
  reducers: {
    addSymptom: (state, action: PayloadAction<Symptom>) => {
      state.symptoms.push(action.payload);
    },
    removeSymptom: (state, action: PayloadAction<string>) => {
      state.symptoms = state.symptoms.filter(symptom => symptom.id !== action.payload);
    },
    checkSymptomsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    checkSymptomsSuccess: (state, action: PayloadAction<Diagnosis[]>) => {
      state.isLoading = false;
      state.diagnoses = action.payload;
    },
    checkSymptomsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSymptoms: (state) => {
      state.symptoms = [];
      state.diagnoses = [];
      state.error = null;
    },
  },
});

export const {
  addSymptom,
  removeSymptom,
  checkSymptomsStart,
  checkSymptomsSuccess,
  checkSymptomsFailure,
  clearSymptoms,
} = symptomCheckerSlice.actions;

export default symptomCheckerSlice.reducer; 