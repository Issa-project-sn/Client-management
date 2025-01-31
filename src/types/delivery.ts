export type DeliveryStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  isCompany: boolean;
  companyName?: string;
}

export interface VehicleType {
  id: string;
  label: string;
}

export interface DeliveryDetails {
  id: string;
  sender: ContactInfo;
  receiver: ContactInfo;
  pickupAddress: string;
  deliveryAddress: string;
  packageDescription: string;
  selectedVehicles: string[];
  isImmediate?: boolean;
  scheduledTime: Date;
  cashCollection: boolean;
  cashAmount?: number;
  specialInstructions?: string;
  status: DeliveryStatus;
  price: number;
  driverId?: string;
  createdAt: Date;
  completedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  rejectedBy?: string;
}