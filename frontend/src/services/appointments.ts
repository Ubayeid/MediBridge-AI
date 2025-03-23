import api from './api';
import { Appointment, ApiResponse } from '../types';

export const getAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
  const response = await api.get<ApiResponse<Appointment[]>>('/appointments');
  return response.data;
};

export const getAppointment = async (id: string): Promise<ApiResponse<Appointment>> => {
  const response = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
  return response.data;
};

export const createAppointment = async (data: Omit<Appointment, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Appointment>> => {
  const response = await api.post<ApiResponse<Appointment>>('/appointments', data);
  return response.data;
};

export const updateAppointment = async (id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
  const response = await api.put<ApiResponse<Appointment>>(`/appointments/${id}`, data);
  return response.data;
};

export const cancelAppointment = async (id: string): Promise<ApiResponse<Appointment>> => {
  const response = await api.put<ApiResponse<Appointment>>(`/appointments/${id}/cancel`);
  return response.data;
};

export const getAvailableSlots = async (date: string, type: string): Promise<ApiResponse<string[]>> => {
  const response = await api.get<ApiResponse<string[]>>('/appointments/available-slots', {
    params: { date, type },
  });
  return response.data;
}; 