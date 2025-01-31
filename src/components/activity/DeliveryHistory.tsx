import React, { useState } from 'react';
import { DeliveryDetails } from '../../types/delivery';
import { formatDate } from '../../utils/date';
import { DeliveryDetailsModal } from './DeliveryDetailsModal';

interface Props {
  deliveries: DeliveryDetails[];
}

export const DeliveryHistory: React.FC<Props> = ({ deliveries }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetails | null>(null);

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            <li 
              key={delivery.id}
              onClick={() => setSelectedDelivery(delivery)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {delivery.pickupAddress} → {delivery.deliveryAddress}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {delivery.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {delivery.packageDescription}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {formatDate(delivery.createdAt)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <DeliveryDetailsModal
        delivery={selectedDelivery}
        isOpen={!!selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />
    </>
  );
};