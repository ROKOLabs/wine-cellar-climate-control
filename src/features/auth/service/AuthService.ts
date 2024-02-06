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

export type RegisterParams = { email: string; password: string };
export type LoginParams = { email: string; password: string };
export type LogOutParams = void;

export class AuthService {
  static #instance: AuthService;
  #auth;

  get user() {
    return this.#auth.currentUser;
  }

  get isUserLoggedIn() {
    return Boolean(this.#auth.currentUser);
  }

  private constructor(appInstance: typeof app) {
    this.#auth = getAuth(appInstance);
  }

  public static getInstance(appInstance: typeof app = app) {
    if (!AuthService.#instance)
      AuthService.#instance = new AuthService(appInstance);
    return AuthService.#instance;
  }

  register = ({ email, password }: RegisterParams) =>
    createUserWithEmailAndPassword(this.#auth, email, password);

  login = ({ email, password }: LoginParams) =>
    signInWithEmailAndPassword(this.#auth, email, password);

  logout = () => signOut(this.#auth);

  onAuthStateChanged = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(this.#auth, callback);

  updateUserProfile = async (details: Partial<User>) => {
    assertUserLoggedIn(this.user);
    await updateProfile(this.user, details);
  };
}
