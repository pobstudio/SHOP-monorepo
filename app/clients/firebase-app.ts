// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRyCVXpMe9opXHe5WJ7fz3_D5P3hU1PYk',
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
