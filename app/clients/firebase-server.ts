import a from 'firebase-admin';
import { FIREBASE_ADMIN_CERT } from '../constants';

export const admin = !a.apps.length
  ? a.initializeApp({
      credential: a.credential.cert(JSON.parse(FIREBASE_ADMIN_CERT)),
    })
  : a.app();
