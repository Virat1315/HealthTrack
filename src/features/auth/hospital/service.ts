import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  getAuth
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { HospitalLoginCredentials, HospitalSignupData, HospitalAuthResponse } from './types';
import { authStorage } from '../../../utils/storage';

export const hospitalAuthService = {
  login: async (credentials: HospitalLoginCredentials): Promise<HospitalAuthResponse> => {
    try {
      console.log('Attempting login with email:', credentials.email);

      // First try to authenticate with Firebase
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log('Firebase authentication successful');

      // Then check if the user exists in our hospitals collection
      const userDoc = await getDoc(doc(db, 'hospitals', userCredential.user.uid));
      console.log('Checking hospital document:', userDoc.exists() ? 'Found' : 'Not found');

      if (!userDoc.exists()) {
        console.error('Hospital document not found for user:', userCredential.user.uid);
        // Try to recover the hospital data
        try {
          console.log('Attempting to recover hospital data...');
          const recoveredData = {
            name: userCredential.user.displayName || 'Hospital',
            email: userCredential.user.email!,
            address: 'Address not set',
            phone: userCredential.user.phoneNumber || '',
            specialization: [],
            licenseNumber: 'TEMP-' + userCredential.user.uid.substring(0, 8),
            createdAt: new Date().toISOString(),
            status: 'active',
            needsUpdate: true
          };

          await setDoc(doc(db, 'hospitals', userCredential.user.uid), recoveredData);
          console.log('Recovered hospital data saved successfully');
          
          const response: HospitalAuthResponse = {
            token: await userCredential.user.getIdToken(),
            refreshToken: userCredential.user.refreshToken,
            user: {
              id: userCredential.user.uid,
              email: userCredential.user.email!,
              name: recoveredData.name,
              role: 'hospital',
              address: recoveredData.address,
              specialization: recoveredData.specialization
            }
          };

          authStorage.setToken(response.token);
          authStorage.setRefreshToken(response.refreshToken);
          
          return response;
        } catch (recoveryError) {
          console.error('Failed to recover hospital data:', recoveryError);
          throw new Error('Hospital account not found. Please sign up first.');
        }
      }

      const userData = userDoc.data();
      console.log('Retrieved hospital data:', { ...userData, email: '[REDACTED]' });

      const response: HospitalAuthResponse = {
        token: await userCredential.user.getIdToken(),
        refreshToken: userCredential.user.refreshToken,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name: userData.name,
          role: 'hospital',
          address: userData.address,
          specialization: userData.specialization || []
        }
      };

      // Store auth tokens
      authStorage.setToken(response.token);
      authStorage.setRefreshToken(response.refreshToken);
      
      console.log('Login successful, returning response');
      return response;
    } catch (error: any) {
      console.error('Login error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });

      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      }
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email format.');
      }
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  },

  signup: async (signupData: HospitalSignupData): Promise<HospitalAuthResponse> => {
    try {
      console.log('Starting signup process with data:', { ...signupData, password: '[REDACTED]' });

      // Validate required fields
      if (!signupData.email || !signupData.password || !signupData.name || !signupData.licenseNumber) {
        console.error('Missing required fields:', {
          email: !!signupData.email,
          password: !!signupData.password,
          name: !!signupData.name,
          licenseNumber: !!signupData.licenseNumber
        });
        throw new Error('All required fields must be filled');
      }

      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(signupData.email)) {
        console.error('Invalid email format:', signupData.email);
        throw new Error('Invalid email format');
      }

      // Validate password strength (Firebase requires minimum 6 characters)
      if (signupData.password.length < 6) {
        console.error('Password too short:', signupData.password.length);
        throw new Error('Password must be at least 6 characters long');
      }

      console.log('Creating user in Firebase Auth...');
      // Create user in Firebase Auth
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      console.log('User created successfully in Firebase Auth');

      // Prepare hospital data
      const userData = {
        name: signupData.name,
        email: signupData.email,
        address: signupData.address,
        phone: signupData.phone,
        specialization: signupData.specialization || [],
        licenseNumber: signupData.licenseNumber,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      console.log('Saving hospital data to Firestore...');
      // Save hospital data to Firestore
      await setDoc(doc(db, 'hospitals', userCredential.user.uid), userData);
      console.log('Hospital data saved successfully to Firestore');

      // Verify the data was saved
      const savedDoc = await getDoc(doc(db, 'hospitals', userCredential.user.uid));
      if (!savedDoc.exists()) {
        throw new Error('Failed to save hospital data. Please try again.');
      }
      console.log('Verified hospital data was saved successfully');

      // Generate response
      const response: HospitalAuthResponse = {
        token: await userCredential.user.getIdToken(),
        refreshToken: userCredential.user.refreshToken,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name: signupData.name,
          role: 'hospital',
          address: signupData.address,
          specialization: signupData.specialization || []
        }
      };

      // Store auth tokens
      authStorage.setToken(response.token);
      authStorage.setRefreshToken(response.refreshToken);
      
      console.log('Signup completed successfully');
      return response;
    } catch (error: any) {
      console.error('Signup error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email is already registered');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email format');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password must be at least 6 characters long');
      }
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error(error.message || 'Signup failed. Please try again.');
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