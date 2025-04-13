import { User } from '../types/user';

const API_BASE_URL = 'http://localhost:8000';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users/`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function createUser(name: string, email: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
} 