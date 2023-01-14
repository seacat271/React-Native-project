// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnRkPKwyaEM8-WrNcIp8Y7FB9I8Gd25uA",
  authDomain: "rn-social-d8b04.firebaseapp.com",
  projectId: "rn-social-d8b04",
  storageBucket: "rn-social-d8b04.appspot.com",
  messagingSenderId: "1023217002277",
  appId: "1:1023217002277:web:27298a5b40d980d1575ccc",
  measurementId: "G-1D6CZ5MPJ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
