
export interface FineRecord {
  id: string;
  date: string;
  location: string;
  type: string;
  amount: number;
  status: 'paid' | 'pending';
}

export interface VehicleRecord {
  plateNumber: string;
  ownerName: string;
  email: string;
  phone: string;
  vehicleType: string;
  registrationDate: string;
  history: FineRecord[];
}

export interface DetectedVehicle {
  id: string;
  plateNumber: string;
  timestamp: string;
  status: 'tracked' | 'violating' | 'processed';
  confidence: number;
  location?: string;
}

export interface TrafficStats {
  totalVehicles: number;
  violationsDetected: number;
  avgFlowRate: number;
  activeCameras: number;
}
