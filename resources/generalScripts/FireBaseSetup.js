// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCFWj9k-418VbBUYqnt4cTT1BWHFBrIF0c",
  authDomain: "burgersmasher-88e15.firebaseapp.com",
  projectId: "burgersmasher-88e15",
  storageBucket: "burgersmasher-88e15.firebasestorage.app",
  messagingSenderId: "390235511798",
  appId: "1:390235511798:web:2a54b32c476edcd67585d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class FireStoreDBCarrier {
  constructor() {
    this.db_fireStore = db;
  }
}

console.log("fire base setup loaded");

