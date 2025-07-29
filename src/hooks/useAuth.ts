import { useMutation } from '@tanstack/react-query';
import { login, signup, LoginPayload, SignUpPayload } from '../api/auth';

//login is handled separately in AuthContext.tsx
export function useLogin() {
  return useMutation<any, any, LoginPayload>({ mutationFn: login });
}

export function useSignUp() {
  return useMutation<any, any, SignUpPayload>({ mutationFn: signup });
} 