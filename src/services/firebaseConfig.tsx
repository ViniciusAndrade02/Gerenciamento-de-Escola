
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAvp1eqvH4vHWBL77yzzoas8SKqa68Nzw",
  authDomain: "chat-escola-extensao.firebaseapp.com",
  databaseURL: "https://chat-escola-extensao-default-rtdb.firebaseio.com",
  projectId: "chat-escola-extensao",
  storageBucket: "chat-escola-extensao.firebasestorage.app",
  messagingSenderId: "352697063588",
  appId: "1:352697063588:web:05249738b8d40e93feee31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);