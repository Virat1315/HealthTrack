import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HospitalLoginPage from '../pages/HospitalLoginPage';
import HospitalSignupPage from '../pages/HospitalSignupPage';
import LearnMorePage from '../pages/LearnMorePage';
import HowItWorksPage from '../pages/HowItWorksPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import Features from '../pages/Features';
import PatientRecords from '../pages/PatientRecords';
import UploadReport from '../pages/UploadReport';
import HospitalDashboardLayout from '../components/hospital/HospitalDashboardLayout';
import HospitalDashboard from '../components/hospital/HospitalDashboard';
import PatientsPage from '../pages/hospital/PatientsPage';
import AppointmentsPage from '../pages/hospital/AppointmentsPage';
import AnalyticsPage from '../pages/hospital/AnalyticsPage';
import PatientDashboard from '../components/patient/PatientDashboard';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'hospital-login',
        element: <HospitalLoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'hospital-signup',
        element: <HospitalSignupPage />
      },
      {
        path: 'learn-more',
        element: <LearnMorePage />
      },
      {
        path: 'how-it-works',
        element: <HowItWorksPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'features',
        element: <Features />
      },
      {
        path: 'patient-dashboard',
        element: (
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'patient-records',
        element: <PatientRecords />
      },
      {
        path: 'upload-report',
        element: <UploadReport />
      },
      {
        path: 'hospital',
        element: (
          <ProtectedRoute>
            <HospitalDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: <HospitalDashboard />
          },
          {
            path: 'patients',
            element: <PatientsPage />
          },
          {
            path: 'appointments',
            element: <AppointmentsPage />
          },
          {
            path: 'analytics',
            element: <AnalyticsPage />
          }
        ]
      }
    ]
  }
]; 