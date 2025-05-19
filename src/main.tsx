import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { logger } from './core/utils/logger';
import { DeviceProvider } from './context/DeviceContext';

// Initialize the application
const initializeApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <DeviceProvider>
          <App />
        </DeviceProvider>
      </StrictMode>
    );

    logger.info('Application initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize application:', error);
    console.error('Application failed to initialize:', error);
  }
};

// Start the application
initializeApp();
