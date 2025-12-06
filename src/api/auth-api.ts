import axios from 'axios';

const API_URL = process.env.REACT_APP_NEST_API;

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await axios.post(`${API_URL}/auth/login`, payload);  
  return data;
}

export async function signup(payload: SignUpPayload) {
  const { data } = await axios.post(`${API_URL}/auth/register`, payload);
  return data;
} 

export type ForgotPasswordPayload = { email: string };
export type ForgotPasswordResponse = { message?: string; token?: string };

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const { data } = await axios.post<ForgotPasswordResponse>(`${API_URL}/auth/forgot-password`, payload);
  return data;
}

export type ResetPasswordPayload = { token: string; password: string };

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await axios.post(`${API_URL}/auth/reset-password`, payload);
  return data;
}