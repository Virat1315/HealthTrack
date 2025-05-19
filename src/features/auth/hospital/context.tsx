import React, { createContext, useContext, useState, useEffect } from 'react';
import { HospitalAuthResponse } from './types';
import { hospitalAuthService } from './service';
import { authStorage } from '../../../utils/storage';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface HospitalAuthContextType {
  user: HospitalAuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
}

const HospitalAuthContext = createContext<HospitalAuthContextType | undefined>(undefined);

export const HospitalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<HospitalAuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      // Verify token and get user data
      // This would typically be an API call to validate the token
      // For now, we'll just set loading to false
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await hospitalAuthService.login({ email, password });
      setUser(response.user);
      navigate(ROUTES.HOSPITAL_DASHBOARD);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await hospitalAuthService.signup(data);
      setUser(response.user);
      navigate(ROUTES.HOSPITAL_DASHBOARD);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    hospitalAuthService.logout();
    setUser(null);
    navigate(ROUTES.HOME);
  };

  return (
    <HospitalAuthContext.Provider
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
    </HospitalAuthContext.Provider>
  );
};

export const useHospitalAuth = () => {
  const context = useContext(HospitalAuthContext);
  if (context === undefined) {
    throw new Error('useHospitalAuth must be used within a HospitalAuthProvider');
  }
  return context;
}; 