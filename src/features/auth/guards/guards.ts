import { User } from 'features/auth/authSlice';

export const isUser = (user: unknown): user is User =>
  typeof user === 'object' &&
  user !== null &&
  'username' in user &&
  'email' in user &&
  'name' in user &&
  'lastname' in user;
