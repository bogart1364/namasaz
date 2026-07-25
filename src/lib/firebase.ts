import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_idFa6S5MjIeMQ8wLk_hfqI4HX7L_EGs",
  authDomain: "namasaz-review.firebaseapp.com",
  projectId: "namasaz-review",
  storageBucket: "namasaz-review.firebasestorage.app",
  messagingSenderId: "1088115783364",
  appId: "1:1088115783364:web:3e8dd3835c13750eadfb91"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
