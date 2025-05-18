import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routes';
import { PatientAuthProvider } from './features/auth/patient/context';
import { HospitalAuthProvider } from './features/auth/hospital/context';
import { logger } from './core/utils/logger';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  logger.info('Application starting...');

  return (
    <Router>
      <HospitalAuthProvider>
        <PatientAuthProvider>
          <div className="min-h-screen flex flex-col">
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <AppRoutes />
          </div>
        </PatientAuthProvider>
      </HospitalAuthProvider>
    </Router>
  );
};

export default App;