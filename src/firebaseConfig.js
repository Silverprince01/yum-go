import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC5lVdoFJ8mXYbAoTesgy7ALR8_Z4w9YPk",
  authDomain: "yum-go.firebaseapp.com",
  projectId: "yum-go",
  storageBucket: "yum-go.appspot.com",
  messagingSenderId: "929659263876",
  appId: "1:929659263876:web:53953329ce0c2820ccdbd1",
  measurementId: "G-LD95TZ567Y",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);
export const database = firebase.firestore();

// export const auth = firebase.auth();
