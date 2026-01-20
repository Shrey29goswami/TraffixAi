
import { VehicleRecord } from './types';

export let MOCK_DATABASE: VehicleRecord[] = [
  { 
    plateNumber: "ABC-1234", 
    ownerName: "John Doe", 
    email: "john@example.com", 
    phone: "+123456789", 
    vehicleType: "SUV",
    registrationDate: "2021-05-12",
    history: [
      { id: 'F-101', date: '2023-10-15', location: 'Main St Crossing', type: 'Speeding', amount: 500, status: 'paid' }
    ]
  },
  { 
    plateNumber: "MH-12-DE-4532", 
    ownerName: "Raj Malhotra", 
    email: "raj.m@citymail.com", 
    phone: "+91 9876543210", 
    vehicleType: "SUV",
    registrationDate: "2022-01-20",
    history: []
  },
  { 
    plateNumber: "DL-3C-AS-1102", 
    ownerName: "Sarah Smith", 
    email: "sarah.s@gmail.com", 
    phone: "+1 445566778", 
    vehicleType: "Sedan",
    registrationDate: "2020-11-05",
    history: [
      { id: 'F-202', date: '2023-12-01', location: 'Highway 101', type: 'Illegal Parking', amount: 300, status: 'paid' }
    ]
  }
];

export const registerVehicleIfNew = (plate: string, type: string = 'Unknown') => {
  const exists = MOCK_DATABASE.find(v => v.plateNumber === plate);
  if (!exists) {
    MOCK_DATABASE.push({
      plateNumber: plate,
      ownerName: "System Registered",
      email: "pending@city.gov",
      phone: "N/A",
      vehicleType: type,
      registrationDate: new Date().toISOString().split('T')[0],
      history: []
    });
    return true;
  }
  return false;
};

export const deleteVehicle = (plate: string) => {
  const index = MOCK_DATABASE.findIndex(v => v.plateNumber === plate);
  if (index !== -1) {
    MOCK_DATABASE.splice(index, 1);
    return true;
  }
  return false;
};

export const APP_THEME = {
  primary: 'yellow-400',
  secondary: 'black',
  danger: 'rose-500',
  success: 'emerald-500',
};
