import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import type { User, NextOrObserver } from 'firebase/auth';

import { assertUserLoggedIn } from 'features/auth/assertions/assertUserLoggedIn';
import { app } from 'firebase/firebase';

export class AuthService {
  static #instance: AuthService;
  #auth;

  get user() {
    return this.#auth.currentUser;
  }

  get isUserLoggedIn() {
    return Boolean(this.#auth.currentUser);
  }

  get userUid() {
    return this.#auth.currentUser?.uid;
  }

  private constructor(appInstance: typeof app) {
    this.#auth = getAuth(appInstance);
  }

  public static getInstance(appInstance: typeof app = app) {
    if (!AuthService.#instance)
      AuthService.#instance = new AuthService(appInstance);
    return AuthService.#instance;
  }

  register = ({ email, password }: { email: string; password: string }) =>
    createUserWithEmailAndPassword(this.#auth, email, password);

  login = ({ email, password }: { email: string; password: string }) =>
    signInWithEmailAndPassword(this.#auth, email, password);

  logout = () => signOut(this.#auth);

  onAuthStateChanged = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(this.#auth, callback);

  updateUserProfile = async (details: Partial<User>) => {
    assertUserLoggedIn(this.user);
    await updateProfile(this.user, details);
  };
}
