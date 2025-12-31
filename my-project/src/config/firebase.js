// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcHbxPIl2mkKTaWTuBSNILlY2Jfg0u7Ys",
  authDomain: "remad-d6495.firebaseapp.com",
  projectId: "remad-d6495",
  storageBucket: "remad-d6495.firebasestorage.app",
  messagingSenderId: "757671667798",
  appId: "1:757671667798:web:5e132f3fa275d19c9fb3f7",
  measurementId: "G-GX6CN6ZBR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)