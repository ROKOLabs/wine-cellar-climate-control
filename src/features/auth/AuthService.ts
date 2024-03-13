import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

import { app } from 'firebase/firebase';

export class AuthService {
  static #instance: AuthService;
  #auth;
  #initialized: boolean;

  public static getInstance(appInstance: typeof app = app) {
    if (!AuthService.#instance)
      AuthService.#instance = new AuthService(appInstance);
    return AuthService.#instance;
  }

  get initialized() {
    return this.#initialized;
  }

  get authenticated() {
    return Boolean(this.#auth.currentUser);
  }

  get currentUser() {
    return this.#auth.currentUser;
  }

  get currentUserUid() {
    return this.#auth.currentUser?.uid;
  }

  private constructor(appInstance: typeof app) {
    this.#initialized = false;
    this.#auth = getAuth(appInstance);
  }

  initialize = () => {
    // return promise that resolve when auth is initialized
    return new Promise<boolean>((resolve) => {
      // if already initialized, resolve immediately
      if (this.#initialized) return resolve(true);
      const unsubscribe = this.onAuthStateChanged(() => {
        this.#initialized = true;
        unsubscribe();
        resolve(this.#initialized);
      });
    });
  };

  onAuthStateChanged = (handler: (user: User | null) => void) => {
    return onAuthStateChanged(this.#auth, handler);
  };

  register = ({ email, password }: { email: string; password: string }) => {
    return createUserWithEmailAndPassword(this.#auth, email, password);
  };

  login = ({ email, password }: { email: string; password: string }) => {
    return signInWithEmailAndPassword(this.#auth, email, password);
  };

  logout = () => {
    return signOut(this.#auth);
  };

  resetPassword = ({ email }: { email: string }) => {
    return sendPasswordResetEmail(this.#auth, email);
  };
}
