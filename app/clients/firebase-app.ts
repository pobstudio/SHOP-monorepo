// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { FIREBASE_API_KEY } from '../constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'shop-c9d7a.firebaseapp.com',
  projectId: 'shop-c9d7a',
  storageBucket: 'shop-c9d7a.appspot.com',
  messagingSenderId: '190336677993',
  appId: '1:190336677993:web:a742e30aff416e2652caf8',
  measurementId: 'G-1RMGSDCQ4Z',
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
export const fbAnalytics = getAnalytics(fb);
