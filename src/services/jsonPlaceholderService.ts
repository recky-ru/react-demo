import { Post, User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (signal: AbortSignal): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json() as Promise<Post[]>;
};

export const fetchUsers = async (signal: AbortSignal): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json() as Promise<User[]>;
};