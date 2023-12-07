// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-5uvEh7WRORU7GnGMW6LUufideKn8oYg",
  authDomain: "kaiwafinder.firebaseapp.com",
  projectId: "kaiwafinder",
  storageBucket: "kaiwafinder.appspot.com",
  messagingSenderId: "400681784943",
  appId: "1:400681784943:web:b793f85ea0889ee4ca5f9a",
  measurementId: "G-GPZV1LBXV6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
