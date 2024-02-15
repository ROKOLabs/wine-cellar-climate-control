import type { DocumentData, Timestamp } from 'firebase/firestore';
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
  orderBy,
  limit,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { complement, not } from 'ramda';

import { app } from 'firebase/firebase';

export type User = {
  email: string;
  lastname: string;
  name: string;
  username: string;
};

export type GetUserDetailsResponse = User | undefined;
export type GetUserDetailsArg = string;
export type SetUserDetailsArg = Partial<User> & { uid: string };
export type SetUserDetailsResponse = void;
export type GetSettingsResponse = Settings | undefined;
export type GetSettingsArg = string;
export type SetSettingsResponse = void;
export type SetSettingsArg = { arduinoId: string; settings: Settings };

export type SensorData = {
  arduino: number;
  date: number;
  co2: number;
  humidity: number;
  temperature: number;
};
export type SensorDataWithDate = Omit<SensorData, 'date'> & { date: Date };
type SensorDataWithTimestamp = Omit<SensorData, 'date'> & {
  date: Timestamp;
};

type SensorSettings = { min: number; max: number };
export type Settings = {
  led: number;
  fan: number;
  updateInterval: number;
  co2: SensorSettings;
  humidity: SensorSettings;
  temperature: SensorSettings;
};

type RootCollection = 'users' | 'settings' | 'sensors';
type FirestorePath = `${RootCollection}` | `${RootCollection}/${string}`;

// Utility functions
const isSnapshotEmpty = (snapshot: QuerySnapshot) => snapshot.empty;
const isSnapshotNotEmpty = complement(isSnapshotEmpty);
const getSnapshotData = <T = DocumentData>(snapshot: DocumentSnapshot) =>
  snapshot.data() as T | undefined;

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
   * @returns {Promise<User | undefined>} - User details object.
   */
  public getUserDetails = (uid: string) => {
    const userDocRef = this.#getDocRef(`users/${uid}`);

    // TODO: Verify user details retrieved
    return getDoc(userDocRef).then(getSnapshotData<User>);
  };

  /**
   * Sets user details by UID.
   * @param {SetUserDetailsArg} param0 - The user ID and details to set.
   * @returns - A promise that resolves when the details are set.
   */
  public setUserDetails = ({ uid, ...details }: SetUserDetailsArg) => {
    const userDocRef = this.#getDocRef(`users/${uid}`);
    return setDoc(userDocRef, details);
  };

  /**
   * Get sensor data from Firestore.
   * @param listener - The callback to call when new sensor data is available.
   * @returns - The unsubscribe function.
   */
  public getSensorData(listener: (snapshot: SensorData) => void) {
    const q = query(
      this.#getCollRef('sensors'),
      orderBy('date', 'desc'),
      limit(10),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data() as SensorDataWithTimestamp;
            // Convert date to milliseconds
            const date = data.date.seconds * 1000;
            listener({ ...data, date });
          }
        });
      },
      (error) => {
        console.error('Error getting sensor data:', error);
      },
    );
  }

  /**
   * Add sensor data to Firestore.
   * @param {SensorDataWithDate} data - The sensor data to add.
   * @returns - A promise that resolves when the data is added.
   */
  addSensorData(data: SensorDataWithDate) {
    const collRef = this.#getCollRef('sensors');
    return addDoc(collRef, data);
  }

  /**
   * Get settings for a given Arduino ID.
   * @param arduinoId The Arduino ID to get settings for.
   * @returns A promise that resolves with the settings object.
   */
  getSettings = (arduinoId: string) => {
    const settingsDocRef = this.#getDocRef(`settings/${arduinoId}`);
    return getDoc(settingsDocRef).then(getSnapshotData<Settings>);
  };

  /**
   * Set settings for a given Arduino ID.
   * @param arduinoId The Arduino ID to set settings for.
   * @param settings The settings object to set.
   * @returns A promise that resolves when the settings are set.
   */
  setSettings = ({ arduinoId, settings }: SetSettingsArg) => {
    const settingsDocRef = this.#getDocRef(`settings/${arduinoId}`);
    return setDoc(settingsDocRef, settings);
  };
}
