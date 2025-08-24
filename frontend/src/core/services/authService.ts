import { API_CONFIG } from './api';
import { httpClient } from './httpClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  disabled: boolean;
}

export class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await fetch(`${API_CONFIG.baseURL}/token`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  }

  async register(userData: RegisterRequest): Promise<User> {
    return httpClient.post<User>('/register', userData);
  }

  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/me');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
  }
}

export const authService = new AuthService();
