import React, { useState } from 'react';

interface ConnectDeviceProps {
  onConnect?: (deviceId: string) => void;
}

const ConnectDevice: React.FC<ConnectDeviceProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      // Check if Web Bluetooth API is available
      if (!navigator.bluetooth) {
        throw new Error('Web Bluetooth API is not available in your browser');
      }

      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        // Accept all Bluetooth devices
        acceptAllDevices: true,
        // Optional: Filter for specific services
        optionalServices: ['heart_rate', 'battery_service']
      });

      console.log('Connected to device:', device.name);
      
      if (onConnect) {
        onConnect(device.id);
      }
    } catch (error) {
      console.error('Error connecting to device:', error);
      alert('Failed to connect to device. Please make sure Bluetooth is enabled and try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {isConnecting ? 'Connecting...' : 'Connect Device'}
    </button>
  );
};

export default ConnectDevice; 