import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "promptopia-v4d92",
  "appId": "1:9851860826:web:6fbd3613e7f3dd3ab0a563",
  "storageBucket": "promptopia-v4d92.firebasestorage.app",
  "apiKey": "AIzaSyA20cIqHnCw7xh-cxfD1CGUb9E46OS5OPk",
  "authDomain": "promptopia-v4d92.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "9851860826"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
