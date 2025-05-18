import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePatientAuth } from '../../features/auth/patient/context';
import { useHospitalAuth } from '../../features/auth/hospital/context';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated: isPatientAuthenticated, isLoading: isPatientLoading } = usePatientAuth();
  const { isAuthenticated: isHospitalAuthenticated, isLoading: isHospitalLoading } = useHospitalAuth();

  const isLoading = isPatientLoading || isHospitalLoading;
  const isAuthenticated = isPatientAuthenticated || isHospitalAuthenticated;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to appropriate login page based on the current route
    const isHospitalRoute = location.pathname.startsWith('/hospital');
    return <Navigate to={isHospitalRoute ? '/hospital-login' : '/login'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
