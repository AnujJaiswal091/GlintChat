import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "projectglint-f1167.firebaseapp.com",
  projectId: "projectglint-f1167",
  storageBucket: "projectglint-f1167.appspot.com",
  messagingSenderId: "5258726899",
  appId: "1:5258726899:web:1e6d5b9dcece1425519686",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
