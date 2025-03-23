import api from './api';
import { ApiResponse } from '../types';

interface ProcedureCode {
  code: string;
  description: string;
  category: string;
}

interface CostEstimate {
  procedureCode: string;
  description: string;
  estimatedCost: number;
  insuranceCoverage: number;
  outOfPocketCost: number;
  facilityFees?: number;
  additionalFees?: {
    description: string;
    amount: number;
  }[];
}

export const searchProcedureCodes = async (query: string): Promise<ApiResponse<ProcedureCode[]>> => {
  const response = await api.get<ApiResponse<ProcedureCode[]>>('/costs/procedures', {
    params: { query },
  });
  return response.data;
};

export const getEstimate = async (
  procedureCode: string,
  insuranceId?: string
): Promise<ApiResponse<CostEstimate>> => {
  const response = await api.post<ApiResponse<CostEstimate>>('/costs/estimate', {
    procedureCode,
    insuranceId,
  });
  return response.data;
};

export const getComparativeCosts = async (
  procedureCode: string,
  zipCode: string,
  radius: number
): Promise<ApiResponse<{
  averageCost: number;
  facilities: {
    name: string;
    distance: number;
    cost: number;
    rating: number;
  }[];
}>> => {
  const response = await api.get<ApiResponse<{
    averageCost: number;
    facilities: {
      name: string;
      distance: number;
      cost: number;
      rating: number;
    }[];
  }>>('/costs/compare', {
    params: { procedureCode, zipCode, radius },
  });
  return response.data;
}; 