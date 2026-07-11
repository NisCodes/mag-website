import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5wOuKLoqC87JKIZZQkrPVL4H-bJKoQYE",
  authDomain: "website-newsletters.firebaseapp.com",
  projectId: "website-newsletters",
  storageBucket: "website-newsletters.firebasestorage.app",
  messagingSenderId: "916563615239",
  appId: "1:916563615239:web:f1fbbb5535070bd61b54a2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);