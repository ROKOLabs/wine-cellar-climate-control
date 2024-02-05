import type { User } from 'firebase/auth';

export function assertUserLoggedIn(user: User | null): asserts user is User {
  if (!user) throw new Error('[AuthService] User not logged in');
}
