import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, HealthRecord, InsuranceInfo } from '../types';

interface AppState {
  user: User | null;
  healthRecords: HealthRecord[];
  insuranceInfo: InsuranceInfo | null;
  setUser: (user: User | null) => void;
  setHealthRecords: (records: HealthRecord[]) => void;
  setInsuranceInfo: (info: InsuranceInfo | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo | null>(null);

  const value = {
    user,
    healthRecords,
    insuranceInfo,
    setUser,
    setHealthRecords,
    setInsuranceInfo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}; 