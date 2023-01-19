import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCnRkPKwyaEM8-WrNcIp8Y7FB9I8Gd25uA",
//   authDomain: "rn-social-d8b04.firebaseapp.com",
//   projectId: "rn-social-d8b04",
//   storageBucket: "rn-social-d8b04.appspot.com",
//   messagingSenderId: "1023217002277",
//   appId: "1:1023217002277:web:27298a5b40d980d1575ccc",
//   measurementId: "G-1D6CZ5MPJ4",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDGDWC2TkZ3Jrara33Yr-aegPIDvLijhq4",
  authDomain: "social-rn-31776.firebaseapp.com",
  projectId: "social-rn-31776",
  storageBucket: "social-rn-31776.appspot.com",
  messagingSenderId: "29178340453",
  appId: "1:29178340453:web:8fd0c8c40c2c93b51f128c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const dataBase = getFirestore(app);
