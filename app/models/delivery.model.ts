import { Observable } from '@nativescript/core';

export interface DeliveryStatus {
  pending: 'pending';
  inProgress: 'in_progress';
  completed: 'completed';
  cancelled: 'cancelled';
}

export interface DeliveryDetails {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  packageDescription: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  vehicleType: string;
  scheduledTime: Date;
  cashCollection: boolean;
  specialInstructions?: string;
  status: keyof DeliveryStatus;
  price: number;
  driverId?: string;
  createdAt: Date;
}

export class DeliveryModel extends Observable {
  private _deliveries: DeliveryDetails[] = [];

  constructor() {
    super();
  }

  get deliveries(): DeliveryDetails[] {
    return this._deliveries;
  }

  set deliveries(value: DeliveryDetails[]) {
    if (this._deliveries !== value) {
      this._deliveries = value;
      this.notifyPropertyChange('deliveries', value);
    }
  }

  addDelivery(delivery: DeliveryDetails) {
    this._deliveries.push(delivery);
    this.notifyPropertyChange('deliveries', this._deliveries);
  }

  getFilteredDeliveries(status: keyof DeliveryStatus): DeliveryDetails[] {
    return this._deliveries.filter(delivery => delivery.status === status);
  }
}