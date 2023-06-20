// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA5_GGB3mGCc_svbCiwu2SVucMg9qK38o',
  authDomain: 'test-project-29061.firebaseapp.com',
  projectId: 'test-project-29061',
  storageBucket: 'test-project-29061.appspot.com',
  messagingSenderId: '412132881524',
  appId: '1:412132881524:web:c5da888f0ea10c11f60d21',
  measurementId: 'G-LRHJS7QQNM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
