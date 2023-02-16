import { getApp, getApps, initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhQr0dTy7G4xt8PBM1sLVvo8CyxcUmxpU",
  authDomain: "fitbook-185ea.firebaseapp.com",
  projectId: "fitbook-185ea",
  storageBucket: "fitbook-185ea.appspot.com",
  messagingSenderId: "1088574431559",
  appId: "1:1088574431559:web:ad54c2e52bf3bdc7daac62",
  measurementId: "G-GR35WNG8C9"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, firebase };