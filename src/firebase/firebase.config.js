// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVFZIq_akVB_yep6z7ON0JU794m3UP66A",
  authDomain: "rentwheels-e6487.firebaseapp.com",
  projectId: "rentwheels-e6487",
  storageBucket: "rentwheels-e6487.firebasestorage.app",
  messagingSenderId: "447628524733",
  appId: "1:447628524733:web:a9b667aefdca0389a40bd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);