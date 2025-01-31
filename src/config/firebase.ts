import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDD7IObDBJ10OmirkKchRupokI42XJFzUo",
  authDomain: "senex-livraison.firebaseapp.com",
  projectId: "senex-livraison",
  storageBucket: "senex-livraison.firebasestorage.app",
  messagingSenderId: "516916890769",
  appId: "1:516916890769:web:2ee669abc22926db2e8330",
  measurementId: "G-PMEP98H974"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Firestore with multi-tab persistence
try {
  enableMultiTabIndexedDbPersistence(db);
} catch (err: any) {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence enabled in another tab');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser doesn\'t support persistence');
  }
}

export { db, auth };
export default app;