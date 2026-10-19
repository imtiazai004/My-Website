import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Only the app + Firestore live here. Auth (admin only) is in ./firebase-auth and
// Storage (blueprint uploads, admin only) is imported on demand, so public pages
// never download either SDK.
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
}

/** For writes: rethrows with context so the caller's catch can show an error. */
export function handleFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const errorInfo: FirestoreErrorInfo = {
    error: error?.message || 'Unknown Firestore error',
    operationType: operation,
    path,
  };
  throw new Error(JSON.stringify(errorInfo));
}

/** For listeners: log and carry on — a failed read must never crash the page. */
export function logFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null = null) {
  console.error('Firestore', operation, path, error?.message || error);
}

export { Timestamp };
