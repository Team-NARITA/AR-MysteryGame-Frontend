// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo1GzHNUlZuRqg6cs2KABfKBengMJf_Oc",
  authDomain: "ar-mysterygame.firebaseapp.com",
  projectId: "ar-mysterygame",
  storageBucket: "ar-mysterygame.appspot.com",
  messagingSenderId: "367620269870",
  appId: "1:367620269870:web:9d50986c8b3692eade7cbf",
  measurementId: "G-213WCM4944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);