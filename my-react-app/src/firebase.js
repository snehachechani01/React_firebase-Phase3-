// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Qqp3NI8BFQ4PqFwnEqCEwbJjnxbTZrY",
  authDomain: "first-project-7fdf6.firebaseapp.com",
  projectId: "first-project-7fdf6",
  storageBucket: "first-project-7fdf6.appspot.com",
  messagingSenderId: "709598280917",
  appId: "1:709598280917:web:936c94568232288229765c",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

export { app, auth };