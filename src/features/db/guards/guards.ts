import { FirebaseError } from 'firebase/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFirebaseError = (error: any): error is FirebaseError => {
  return error instanceof FirebaseError;
};
