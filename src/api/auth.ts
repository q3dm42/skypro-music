import { requestJson } from './client';
import type {
  AuthCredentials,
  SignupPayload,
  SignupResponse,
  TokenResponse,
  User,
} from '@/types/auth';

export async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
  return requestJson<SignupResponse>('/user/signup/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: AuthCredentials): Promise<User> {
  return requestJson<User>('/user/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getUserToken(
  payload: AuthCredentials,
): Promise<TokenResponse> {
  return requestJson<TokenResponse>('/user/token/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
