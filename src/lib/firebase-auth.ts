import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { app } from './firebase';

// Admin-only. Imported by the admin route, never by public pages.
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { onAuthStateChanged, signInWithPopup };
export type { User };
