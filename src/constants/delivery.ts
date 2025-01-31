import { VehicleType } from '../types/delivery';

export const VEHICLE_TYPES: VehicleType[] = [
  { id: 'bike', label: 'Vélo' },
  { id: 'scooter', label: 'Scooter' },
  { id: 'car', label: 'Voiture' },
  { id: 'van', label: 'Camionnette' },
  { id: 'truck', label: 'Camion' }
];

export const EMPTY_CONTACT = {
  firstName: '',
  lastName: '',
  phone: '',
  isCompany: false,
  companyName: ''
};