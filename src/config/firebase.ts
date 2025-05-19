import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARIihv8V7-m-TR_-ajDanfm1ed9ydDjYo",
  authDomain: "healthpro-c77e1.firebaseapp.com",
  projectId: "healthpro-c77e1",
  storageBucket: "healthpro-c77e1.firebasestorage.app",
  messagingSenderId: "928342720213",
  appId: "1:928342720213:web:977839ddcf83d73eb36c5c",
  measurementId: "G-DP85H7M82X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 