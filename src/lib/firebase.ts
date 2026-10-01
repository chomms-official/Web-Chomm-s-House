import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh0rhMNaw4vFszPfPKNn8Rhyq0moiC4co",
  authDomain: "chomm-s-house-e58e1.firebaseapp.com",
  projectId: "chomm-s-house-e58e1",
  storageBucket: "chomm-s-house-e58e1.firebasestorage.app",
  messagingSenderId: "919555554939",
  appId: "1:919555554939:web:4ad6506bf0053763382cde",
  measurementId: "G-DDNLHH86NP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
