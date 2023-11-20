// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa6X-MAlSC2b7gwC_IOaCov12DgCFVNiA",
  authDomain: "netflix-gpt-fd0ab.firebaseapp.com",
  projectId: "netflix-gpt-fd0ab",
  storageBucket: "netflix-gpt-fd0ab.appspot.com",
  messagingSenderId: "647294089894",
  appId: "1:647294089894:web:d62f3e2a64377b43211267",
  measurementId: "G-LNSFZVLNV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
