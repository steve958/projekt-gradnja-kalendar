import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2KKJCRJTKNRAulI3flYQ7TALNjaDe6MY",
  authDomain: "kalendar-ea8cb.firebaseapp.com",
  projectId: "kalendar-ea8cb",
  storageBucket: "kalendar-ea8cb.appspot.com",
  messagingSenderId: "752460388408",
  appId: "1:752460388408:web:7380d365da48955eef2ecd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
