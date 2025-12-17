import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - will be created during deployment
const firebaseConfig = {
  apiKey: "PLACEHOLDER",
  authDomain: "PLACEHOLDER.firebaseapp.com",
  projectId: "PLACEHOLDER",
  storageBucket: "PLACEHOLDER.appspot.com",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

