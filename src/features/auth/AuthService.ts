import {
  type Auth,
  type User,
  type NextOrObserver,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, onAuthStateChanged } from 'firebase/firebase';

export type AuthService = AuthServiceClass;

class AuthServiceClass {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  register = (email: string, password: string) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  login = (email: string, password: string) =>
    signInWithEmailAndPassword(this.auth, email, password);

  logout = () => signOut(this.auth);

  onAuthStateChanged = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(this.auth, callback);
}

export const authService = new AuthServiceClass();
