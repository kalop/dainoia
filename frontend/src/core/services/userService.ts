import { httpClient } from './httpClient';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  disabled: boolean;
}

export class UserService {
  async getUsers(): Promise<User[]> {
    return httpClient.get<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return httpClient.get<User>(`/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return httpClient.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return httpClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();