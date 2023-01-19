import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnRkPKwyaEM8-WrNcIp8Y7FB9I8Gd25uA",
  authDomain: "rn-social-d8b04.firebaseapp.com",
  projectId: "rn-social-d8b04",
  storageBucket: "rn-social-d8b04.appspot.com",
  messagingSenderId: "1023217002277",
  appId: "1:1023217002277:web:27298a5b40d980d1575ccc",
  measurementId: "G-1D6CZ5MPJ4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const dataBase = getFirestore(app);
