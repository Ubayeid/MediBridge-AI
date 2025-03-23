import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import costEstimatorReducer from './slices/costEstimatorSlice';
import symptomCheckerReducer from './slices/symptomCheckerSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import insuranceReducer from './slices/insuranceSlice';
import healthRecordsReducer from './slices/healthRecordsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    costEstimator: costEstimatorReducer,
    symptomChecker: symptomCheckerReducer,
    appointments: appointmentsReducer,
    insurance: insuranceReducer,
    healthRecords: healthRecordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 