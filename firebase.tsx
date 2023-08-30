// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCnpZYTlpkzbPedFk8ZmdndPtEiO4MH4I",
  authDomain: "tamaguiproject.firebaseapp.com",
  projectId: "tamaguiproject",
  storageBucket: "tamaguiproject.appspot.com",
  messagingSenderId: "310700876354",
  appId: "1:310700876354:web:d665fbd3ebb4116f8503db",
  measurementId: "G-57VKJK7P3L"
};

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };