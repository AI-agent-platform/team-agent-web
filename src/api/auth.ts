import axios from 'axios';

const API_URL = 'http://localhost:3020';  

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