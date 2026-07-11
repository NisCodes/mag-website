import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjl6LRvJH3bfotAg7mtcb_NK5K2OetqH0",
  authDomain: "newsletter-website-7cc24.firebaseapp.com",
  projectId: "newsletter-website-7cc24",
  storageBucket: "newsletter-website-7cc24.firebasestorage.app",
  messagingSenderId: "736667809690",
  appId: "1:736667809690:web:9cff75f2fe40d1247a2c23"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);