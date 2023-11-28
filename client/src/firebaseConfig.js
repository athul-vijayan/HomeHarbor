
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-harbor-37c7e.firebaseapp.com",
  projectId: "home-harbor-37c7e",
  storageBucket: "home-harbor-37c7e.appspot.com",
  messagingSenderId: "1017832069023",
  appId: "1:1017832069023:web:65648ac494387b9ff2cfaa",
  measurementId: "G-VJX3JH8DBP"
};

export const app = initializeApp(firebaseConfig);