import { Observable, Frame } from '@nativescript/core';
import { DeliveryModel, DeliveryDetails } from '../../models/delivery.model';

export class DeliveriesViewModel extends Observable {
  private deliveryModel: DeliveryModel;

  constructor() {
    super();
    this.deliveryModel = new DeliveryModel();
    
    // Add some mock data
    this.deliveryModel.addDelivery({
      id: '1',
      pickupAddress: '123 Pickup St',
      deliveryAddress: '456 Delivery Ave',
      packageDescription: 'Small package',
      dimensions: {
        length: 10,
        width: 10,
        height: 10,
        weight: 1
      },
      vehicleType: 'car',
      scheduledTime: new Date(),
      cashCollection: false,
      status: 'pending',
      price: 15.99,
      createdAt: new Date()
    });
  }

  get pendingDeliveries(): DeliveryDetails[] {
    return this.deliveryModel.getFilteredDeliveries('pending');
  }

  get activeDeliveries(): DeliveryDetails[] {
    return this.deliveryModel.getFilteredDeliveries('in_progress');
  }

  get completedDeliveries(): DeliveryDetails[] {
    return this.deliveryModel.getFilteredDeliveries('completed');
  }

  onCreateDelivery() {
    Frame.topmost().navigate({
      moduleName: '/app/views/create-delivery/create-delivery-page',
      clearHistory: false
    });
  }

  onDeliveryTap(args: any) {
    const delivery = args.view.bindingContext as DeliveryDetails;
    console.log('Delivery tapped:', delivery.id);
  }
}