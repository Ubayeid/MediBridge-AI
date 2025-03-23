import api from './api';
import { InsuranceInfo, ApiResponse } from '../types';

export const getInsuranceInfo = async (): Promise<ApiResponse<InsuranceInfo>> => {
  const response = await api.get<ApiResponse<InsuranceInfo>>('/insurance');
  return response.data;
};

export const updateInsuranceInfo = async (data: Partial<InsuranceInfo>): Promise<ApiResponse<InsuranceInfo>> => {
  const response = await api.put<ApiResponse<InsuranceInfo>>('/insurance', data);
  return response.data;
};

export const verifyInsurance = async (policyNumber: string, groupNumber: string): Promise<ApiResponse<boolean>> => {
  const response = await api.post<ApiResponse<boolean>>('/insurance/verify', {
    policyNumber,
    groupNumber,
  });
  return response.data;
};

export const getCoverageDetails = async (procedureCode: string): Promise<ApiResponse<{
  covered: boolean;
  estimatedCost: number;
  outOfPocketCost: number;
  coveragePercentage: number;
}>> => {
  const response = await api.get<ApiResponse<{
    covered: boolean;
    estimatedCost: number;
    outOfPocketCost: number;
    coveragePercentage: number;
  }>>('/insurance/coverage', {
    params: { procedureCode },
  });
  return response.data;
}; 