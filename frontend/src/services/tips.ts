import api from './api';
import { ApiResponse } from '../types';

interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  source?: string;
  lastUpdated: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>('/tips/categories');
  return response.data;
};

export const getTipsByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<{
  tips: HealthTip[];
  total: number;
  currentPage: number;
  totalPages: number;
}>> => {
  const response = await api.get<ApiResponse<{
    tips: HealthTip[];
    total: number;
    currentPage: number;
    totalPages: number;
  }>>('/tips', {
    params: { category, page, limit },
  });
  return response.data;
};

export const searchTips = async (
  query: string,
  tags?: string[]
): Promise<ApiResponse<HealthTip[]>> => {
  const response = await api.get<ApiResponse<HealthTip[]>>('/tips/search', {
    params: { query, tags: tags?.join(',') },
  });
  return response.data;
};

export const getTipById = async (id: string): Promise<ApiResponse<HealthTip>> => {
  const response = await api.get<ApiResponse<HealthTip>>(`/tips/${id}`);
  return response.data;
};

export const getRelatedTips = async (
  tipId: string,
  limit: number = 3
): Promise<ApiResponse<HealthTip[]>> => {
  const response = await api.get<ApiResponse<HealthTip[]>>(`/tips/${tipId}/related`, {
    params: { limit },
  });
  return response.data;
}; 