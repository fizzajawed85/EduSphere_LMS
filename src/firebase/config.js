// Firebase Imports
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKO4Fp8IejD-F77qLXT0g_Zk7Ngv--mX0",
  authDomain: "lms-477e3.firebaseapp.com",
  projectId: "lms-477e3",
  storageBucket: "lms-477e3.firebasestorage.app",
  messagingSenderId: "1059465382410",
  appId: "1:1059465382410:web:2c6649341679e63d972df3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);                 
export const googleProvider = new GoogleAuthProvider(); 
export const db = getDatabase(app);    
export const storage = getStorage(app);           

export default app;
