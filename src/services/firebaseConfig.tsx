import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBAvp1eqvH4vHWBL77yzzoas8SKqa68Nzw",
  authDomain: "chat-escola-extensao.firebaseapp.com",
  databaseURL: "https://chat-escola-extensao-default-rtdb.firebaseio.com",
  projectId: "chat-escola-extensao",
  storageBucket: "chat-escola-extensao.firebasestorage.app",
  messagingSenderId: "352697063588",
  appId: "1:352697063588:web:641de51740ca7408feee31"

  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,

};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
