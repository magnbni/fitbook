import { getApp, getApps, initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhwqZFryGXyUj-vf27Fiov4A182bMYZwo",
  authDomain: "pu-gruppe-3.firebaseapp.com",
  projectId: "pu-gruppe-3",
  storageBucket: "pu-gruppe-3.appspot.com",
  messagingSenderId: "49134979698",
  appId: "1:49134979698:web:1906331b240677ebd790eb",
  measurementId: "G-Y0JHY16SMF"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, firebase };