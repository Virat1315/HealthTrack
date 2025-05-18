import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from '../config/firebase.config';

class FirebaseService {
  private static instance: FirebaseService;
  public app;
  public analytics;
  public auth;
  public db;
  public storage;
  public googleProvider;

  private constructor() {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.googleProvider = new GoogleAuthProvider();
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public async signInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('patientId', result.user.uid);
      return {
        success: true,
        message: 'Login successful',
        user: result.user
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to sign in with Google'
      };
    }
  }
}

export const firebaseService = FirebaseService.getInstance(); 