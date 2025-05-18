import { dummyPatients, Patient } from '../data/dummyPatientData';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  patient?: Patient;
}

export const mockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const patient = dummyPatients.find(
    p => p.email === credentials.email && p.password === credentials.password
  );

  if (patient) {
    // Store patient ID in localStorage
    localStorage.setItem('patientId', patient.id);
    localStorage.setItem('isAuthenticated', 'true');
    
    return {
      success: true,
      message: 'Login successful',
      patient
    };
  }

  return {
    success: false,
    message: 'Invalid email or password'
  };
};

export const mockLogout = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  localStorage.removeItem('patientId');
  localStorage.removeItem('isAuthenticated');
};

export const getCurrentPatient = (): Patient | null => {
  const patientId = localStorage.getItem('patientId');
  if (!patientId) return null;
  
  return dummyPatients.find(p => p.id === patientId) || null;
};
