import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { PatientLoginCredentials, PatientSignupData, PatientAuthResponse } from './types';
import { authStorage } from '../../../utils/storage';

export const patientAuthService = {
  login: async (credentials: PatientLoginCredentials): Promise<PatientAuthResponse> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const userDoc = await getDoc(doc(db, 'patients', userCredential.user.uid));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      const response: PatientAuthResponse = {
        token: await userCredential.user.getIdToken(),
        refreshToken: userCredential.user.refreshToken,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name: userData.name,
          role: 'patient'
        }
      };

      authStorage.setToken(response.token);
      authStorage.setRefreshToken(response.refreshToken);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  },

  signup: async (signupData: PatientSignupData): Promise<PatientAuthResponse> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );

      const userData = {
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone || '',
        dateOfBirth: signupData.dateOfBirth || '',
        gender: signupData.gender || '',
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'patients', userCredential.user.uid), userData);

      const response: PatientAuthResponse = {
        token: await userCredential.user.getIdToken(),
        refreshToken: userCredential.user.refreshToken,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name: signupData.name,
          role: 'patient'
        }
      };

      authStorage.setToken(response.token);
      authStorage.setRefreshToken(response.refreshToken);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
      authStorage.clearAuth();
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  }
}; 