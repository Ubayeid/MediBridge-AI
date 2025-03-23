import api from './api';
import { HealthRecord, ApiResponse } from '../types';

export const getHealthRecords = async (): Promise<ApiResponse<HealthRecord[]>> => {
  const response = await api.get<ApiResponse<HealthRecord[]>>('/health-records');
  return response.data;
};

export const getHealthRecord = async (id: string): Promise<ApiResponse<HealthRecord>> => {
  const response = await api.get<ApiResponse<HealthRecord>>(`/health-records/${id}`);
  return response.data;
};

export const createHealthRecord = async (data: Omit<HealthRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<HealthRecord>> => {
  const response = await api.post<ApiResponse<HealthRecord>>('/health-records', data);
  return response.data;
};

export const updateHealthRecord = async (id: string, data: Partial<HealthRecord>): Promise<ApiResponse<HealthRecord>> => {
  const response = await api.put<ApiResponse<HealthRecord>>(`/health-records/${id}`, data);
  return response.data;
};

export const deleteHealthRecord = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/health-records/${id}`);
  return response.data;
};

export const uploadAttachment = async (recordId: string, file: File): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post<ApiResponse<string>>(`/health-records/${recordId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}; 