import client from './client';
import type { UserPublic } from '../types/user';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface LoginResult {
  token: string;
  user: UserPublic;
}

export const loginApi = async (username: string, password: string): Promise<LoginResult> => {
  const res = await client.post<ApiResponse<LoginResult>>('/auth/login', { username, password });
  return res.data.data;
};

export const getMeApi = async (): Promise<UserPublic> => {
  const res = await client.get<ApiResponse<UserPublic>>('/auth/me');
  return res.data.data;
};
