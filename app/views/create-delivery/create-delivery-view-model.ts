import { Observable } from '@nativescript/core';
import { DeliveryDetails } from '../../models/delivery.model';

export class CreateDeliveryViewModel extends Observable {
    pickupAddress: string = '';
    deliveryAddress: string = '';
    packageDescription: string = '';
    dimensions = {
        length: 0,
        width: 0,
        height: 0,
        weight: 0
    };
    vehicleTypes = ['Car', 'Motorcycle', 'Van', 'Truck'];
    selectedVehicleIndex: number = 0;
    scheduledTime: Date = new Date();
    cashCollection: boolean = false;
    specialInstructions: string = '';

    constructor() {
        super();
    }

    onCreateDelivery() {
        const delivery: DeliveryDetails = {
            id: Date.now().toString(),
            pickupAddress: this.pickupAddress,
            deliveryAddress: this.deliveryAddress,
            packageDescription: this.packageDescription,
            dimensions: this.dimensions,
            vehicleType: this.vehicleTypes[this.selectedVehicleIndex].toLowerCase(),
            scheduledTime: this.scheduledTime,
            cashCollection: this.cashCollection,
            specialInstructions: this.specialInstructions,
            status: 'pending',
            price: this.calculatePrice(),
            createdAt: new Date()
        };

        console.log('New delivery:', delivery);
        // TODO: Add delivery to the model and navigate back
    }

    private calculatePrice(): number {
        // Simple price calculation based on weight and vehicle type
        const basePrice = 10;
        const weightFactor = this.dimensions.weight * 0.5;
        const vehicleTypeFactor = this.selectedVehicleIndex + 1;
        
        return basePrice + weightFactor * vehicleTypeFactor;
    }
}