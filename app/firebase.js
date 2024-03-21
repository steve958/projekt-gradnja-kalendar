import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuPHJCqYu7fGbOObCqMo6mMELix9xfH_Q",
  authDomain: "kalendar21-3.firebaseapp.com",
  projectId: "kalendar21-3",
  storageBucket: "kalendar21-3.appspot.com",
  messagingSenderId: "209531253674",
  appId: "1:209531253674:web:373f4422a68773de67b1d3",
  measurementId: "G-RQSSJZ6MJR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
