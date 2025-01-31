import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface Props {
  pickupAddress: string;
  deliveryAddress: string;
  onChange: (pickup: string, delivery: string) => void;
}

export const DeliveryRoute: React.FC<Props> = ({
  pickupAddress,
  deliveryAddress,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 inset-y-0 flex items-center">
          <MapPinIcon className="h-5 w-5 text-green-600" />
        </div>
        <input
          type="text"
          value={pickupAddress}
          onChange={(e) => onChange(e.target.value, deliveryAddress)}
          placeholder="Adresse de ramassage"
          className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute left-4 inset-y-0 flex items-center">
          <MapPinIcon className="h-5 w-5 text-red-600" />
        </div>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => onChange(pickupAddress, e.target.value)}
          placeholder="Adresse de livraison"
          className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="h-20 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Carte en cours de chargement...</span>
      </div>
    </div>
  );
};