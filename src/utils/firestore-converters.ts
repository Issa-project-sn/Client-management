import { Timestamp } from 'firebase/firestore';
import { DeliveryDetails } from '../types/delivery';

export const sanitizeData = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (obj instanceof Date) {
    return Timestamp.fromDate(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeData);
  }

  if (typeof obj === 'object') {
    const sanitized: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        sanitized[key] = sanitizeData(value);
      }
    }
    return sanitized;
  }

  return obj;
};

export const convertToFirestoreData = (delivery: DeliveryDetails) => {
  const baseData = {
    sender: delivery.sender,
    receiver: delivery.receiver,
    pickupAddress: delivery.pickupAddress,
    deliveryAddress: delivery.deliveryAddress,
    packageDescription: delivery.packageDescription,
    selectedVehicles: delivery.selectedVehicles,
    isImmediate: delivery.isImmediate,
    scheduledTime: delivery.scheduledTime,
    cashCollection: delivery.cashCollection,
    cashAmount: delivery.cashAmount,
    specialInstructions: delivery.specialInstructions,
    status: delivery.status,
    createdAt: new Date()
  };

  return sanitizeData(baseData);
};