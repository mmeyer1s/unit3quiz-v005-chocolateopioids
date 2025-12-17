import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for Chocolate Opioid Initiative
const firebaseConfig = {
  apiKey: "AIzaSyA4TkghRZxyJzppDOMVV5nfZ2qdDovrVk0",
  authDomain: "chocolate-opioid-initiative.firebaseapp.com",
  projectId: "chocolate-opioid-initiative",
  storageBucket: "chocolate-opioid-initiative.firebasestorage.app",
  messagingSenderId: "284201278476",
  appId: "1:284201278476:web:e84610feb706ef88d5e229"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

