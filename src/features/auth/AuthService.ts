import type { Auth, User, NextOrObserver } from 'firebase/auth';
import { auth, onAuthStateChanged } from 'firebase/firebase';

export type AuthService = AuthServiceClass;

class AuthServiceClass {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  register = async (email: string, password: string) => {};

  login = async (email: string, password: string) => {};

  logout = async () => {};

  onAuthStateChanged = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(this.auth, callback);
}

export const authService = new AuthServiceClass();
