// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW7Yenl3NO2hvFWcw1gIL40hCR410JHd8",
  authDomain: "username-dc1d8.firebaseapp.com",
  projectId: "username-dc1d8",
  storageBucket: "username-dc1d8.appspot.com",
  messagingSenderId: "795561837717",
  appId: "1:795561837717:web:e0eeb4c6dfa8d392cdc79c",
  measurementId: "G-BFS6RTSK73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore=getFirestore(app);