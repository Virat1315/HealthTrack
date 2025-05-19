import { User, Patient, Hospital, Appointment, MedicalRecord } from '../types';

// API endpoints
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// Auth services
export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};

// Patient services
export const patientService = {
  getProfile: async (id: string): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`);
    return response.json();
  },

  updateProfile: async (id: string, data: Partial<Patient>): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getAppointments: async (id: string): Promise<Appointment[]> => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}/appointments`);
    return response.json();
  },
};

// Hospital services
export const hospitalService = {
  getProfile: async (id: string): Promise<Hospital> => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
    return response.json();
  },

  updateProfile: async (id: string, data: Partial<Hospital>): Promise<Hospital> => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getPatients: async (id: string): Promise<Patient[]> => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}/patients`);
    return response.json();
  },
};

// Medical records services
export const medicalRecordService = {
  getRecords: async (patientId: string): Promise<MedicalRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}/records`);
    return response.json();
  },

  createRecord: async (record: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> => {
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    return response.json();
  },
}; 