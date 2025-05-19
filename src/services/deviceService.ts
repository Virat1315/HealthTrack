interface DeviceData {
  id: string;
  name: string;
  type: string;
  lastConnected: Date;
  status: 'connected' | 'disconnected';
}

class DeviceService {
  private static instance: DeviceService;
  private connectedDevices: Map<string, DeviceData> = new Map();

  private constructor() {}

  static getInstance(): DeviceService {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }
    return DeviceService.instance;
  }

  async connectDevice(deviceId: string, deviceName: string): Promise<DeviceData> {
    const deviceData: DeviceData = {
      id: deviceId,
      name: deviceName,
      type: 'bluetooth',
      lastConnected: new Date(),
      status: 'connected'
    };

    this.connectedDevices.set(deviceId, deviceData);
    return deviceData;
  }

  disconnectDevice(deviceId: string): void {
    const device = this.connectedDevices.get(deviceId);
    if (device) {
      device.status = 'disconnected';
      this.connectedDevices.set(deviceId, device);
    }
  }

  getConnectedDevices(): DeviceData[] {
    return Array.from(this.connectedDevices.values());
  }

  getDeviceStatus(deviceId: string): DeviceData | undefined {
    return this.connectedDevices.get(deviceId);
  }
}

export default DeviceService; 