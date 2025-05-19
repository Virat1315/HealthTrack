import React, { createContext, useContext, useState, useEffect } from 'react';
import DeviceService from '../services/deviceService';

interface DeviceContextType {
  connectedDevices: Array<{
    id: string;
    name: string;
    type: string;
    lastConnected: Date;
    status: 'connected' | 'disconnected';
  }>;
  connectDevice: (deviceId: string, deviceName: string) => Promise<void>;
  disconnectDevice: (deviceId: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectedDevices, setConnectedDevices] = useState<DeviceContextType['connectedDevices']>([]);
  const deviceService = DeviceService.getInstance();

  useEffect(() => {
    // Load initial connected devices
    setConnectedDevices(deviceService.getConnectedDevices());
  }, []);

  const connectDevice = async (deviceId: string, deviceName: string) => {
    const device = await deviceService.connectDevice(deviceId, deviceName);
    setConnectedDevices(deviceService.getConnectedDevices());
  };

  const disconnectDevice = (deviceId: string) => {
    deviceService.disconnectDevice(deviceId);
    setConnectedDevices(deviceService.getConnectedDevices());
  };

  return (
    <DeviceContext.Provider
      value={{
        connectedDevices,
        connectDevice,
        disconnectDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}; 