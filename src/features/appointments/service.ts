import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface NewAppointmentData {
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  patientName: string;
  doctorName: string;
  hospitalName: string;
}

export const appointmentService = {
  saveAppointment: async (appointmentData: NewAppointmentData): Promise<string> => {
    try {
      console.log('Saving appointment to Firestore...', appointmentData);
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
      console.log('Appointment saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving appointment:', error);
      throw new Error('Failed to save appointment');
    }
  },

  // We will add fetch functionality later
  // fetchAppointments: async () => { ... }
}; 