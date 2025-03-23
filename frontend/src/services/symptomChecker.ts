import api from './api';
import { ApiResponse } from '../types';

interface Symptom {
  id: string;
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'emergency';
}

export const searchSymptoms = async (query: string): Promise<ApiResponse<Symptom[]>> => {
  const response = await api.get<ApiResponse<Symptom[]>>('/symptoms/search', {
    params: { query },
  });
  return response.data;
};

export const analyzeSymptoms = async (symptoms: string[]): Promise<ApiResponse<Diagnosis[]>> => {
  const response = await api.post<ApiResponse<Diagnosis[]>>('/symptoms/analyze', {
    symptoms,
  });
  return response.data;
};

export const getRecommendations = async (diagnosisId: string): Promise<ApiResponse<{
  selfCare: string[];
  whenToSeekCare: string[];
  possibleCauses: string[];
  nextSteps: string[];
}>> => {
  const response = await api.get<ApiResponse<{
    selfCare: string[];
    whenToSeekCare: string[];
    possibleCauses: string[];
    nextSteps: string[];
  }>>(`/symptoms/recommendations/${diagnosisId}`);
  return response.data;
}; 