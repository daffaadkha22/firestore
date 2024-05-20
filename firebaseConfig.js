import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc  } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhWXFrcW7H3bRjIcnSqw65mfhnxxVYGtY",
    authDomain: "fir-day-one-cae16.firebaseapp.com",
    projectId: "fir-day-one-cae16",
    storageBucket: "fir-day-one-cae16.appspot.com",
    messagingSenderId: "28534513002",
    appId: "1:28534513002:web:513041497379a61abc9913",
    measurementId: "G-0RZTC24L75"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, app , getDocs, deleteDoc, doc};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
