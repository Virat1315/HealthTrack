import React, { createContext, useContext, useState, useEffect } from 'react';
import { PatientAuthResponse } from './types';
import { patientAuthService } from './service';
import { storage } from '../../../core/utils/storage';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface PatientAuthContextType {
  user: PatientAuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
}

const PatientAuthContext = createContext<PatientAuthContextType | undefined>(undefined);

export const PatientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PatientAuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = storage.getToken();
    const userData = storage.getUserData();
    if (token && userData) {
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setUser(null);
      localStorage.setItem('isAuthenticated', 'false');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await patientAuthService.login({ email, password });
      setUser(response.user);
      storage.setUserData(response.user);
      localStorage.setItem('isAuthenticated', 'true');
      navigate(ROUTES.PATIENT_DASHBOARD);
    } catch (error) {
      setUser(null);
      localStorage.setItem('isAuthenticated', 'false');
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await patientAuthService.signup(data);
      setUser(response.user);
      storage.setUserData(response.user);
      localStorage.setItem('isAuthenticated', 'true');
      navigate(ROUTES.PATIENT_DASHBOARD);
    } catch (error) {
      setUser(null);
      localStorage.setItem('isAuthenticated', 'false');
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    patientAuthService.logout();
    setUser(null);
    storage.clearUserData();
    localStorage.setItem('isAuthenticated', 'false');
    navigate(ROUTES.HOME);
  };

  return (
    <PatientAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </PatientAuthContext.Provider>
  );
};

export const usePatientAuth = () => {
  const context = useContext(PatientAuthContext);
  if (context === undefined) {
    throw new Error('usePatientAuth must be used within a PatientAuthProvider');
  }
  return context;
}; 