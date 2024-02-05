import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  doc,
  getDoc,
  DocumentSnapshot,
  QuerySnapshot,
  Firestore,
  setDoc,
} from 'firebase/firestore';
import { complement, not } from 'ramda';

import { User } from 'features/auth/authSlice';
import { app } from 'firebase/firebase';

type RootCollection = 'users' | 'settings' | 'sensors';
type FirestorePath = `${RootCollection}` | `${RootCollection}/${string}`;

// Utility functions
const isSnapshotEmpty = (snapshot: QuerySnapshot) => snapshot.empty;
const isSnapshotNotEmpty = complement(isSnapshotEmpty);
const getSnapshotData = (snapshot: DocumentSnapshot) => snapshot.data();

// Firestore reference getters
const getDocRef = (db: Firestore) => (path: FirestorePath) => doc(db, path);
const getCollRef = (db: Firestore) => (path: FirestorePath) =>
  collection(db, path);

export class DbService {
  static #instance: DbService;
  #db;
  #getDocRef;
  #getCollRef;

  private constructor(appInstance: typeof app) {
    this.#db = getFirestore(appInstance);
    this.#getDocRef = getDocRef(this.#db);
    this.#getCollRef = getCollRef(this.#db);
  }

  public static getInstance(appInstance: typeof app = app) {
    if (not(Boolean(DbService.#instance)))
      DbService.#instance = new DbService(appInstance);
    return DbService.#instance;
  }

  /**
   * Checks if the given username is already taken.
   * @param {string} username - The username to check.
   * @returns {Promise<boolean>} - True if username is taken, false otherwise.
   */
  public isUsernameTaken = (username: string) => {
    const collectionRef = this.#getCollRef('users');
    const userQuery = query(collectionRef, where('username', '==', username));
    return getDocs(userQuery).then(isSnapshotNotEmpty);
  };

  /**
   * Retrieves user details by UID.
   * @param {string} uid - The user ID to retrieve details for.
   * @returns {Promise<any>} - User details object.
   */
  public getUserDetails = (uid: string) => {
    const userDocRef = this.#getDocRef(`users/${uid}`);
    return getDoc(userDocRef).then(getSnapshotData);
  };

  public setUserDetails = (uid: string, details: Partial<User>) => {
    const userDocRef = this.#getDocRef(`users/${uid}`);
    return setDoc(userDocRef, details);
  };
}
