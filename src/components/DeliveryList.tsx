import React, { useState } from 'react';
import { DeliveryDetails } from '../types/delivery';
import { DeliveryDetailsModal } from './DeliveryDetailsModal';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, TruckIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../utils/date';

interface Props {
  deliveries: DeliveryDetails[];
  onDeliveryClick: (delivery: DeliveryDetails) => void;
  onUpdateDelivery: (delivery: DeliveryDetails) => void;
}

export const DeliveryList: React.FC<Props> = ({ deliveries, onDeliveryClick, onUpdateDelivery }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetails | null>(null);

  if (deliveries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
          <TruckIcon className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune livraison en cours</h3>
        <p className="text-gray-500">Créez une nouvelle demande de livraison pour commencer</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            onClick={() => setSelectedDelivery(delivery)}
            className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all duration-200"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  delivery.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  delivery.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {delivery.status}
                </span>
                <span className="text-sm text-gray-500">{formatDate(delivery.createdAt)}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">De</p>
                      <p className="text-gray-900">{delivery.pickupAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">À</p>
                      <p className="text-gray-900">{delivery.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      {delivery.isImmediate ? 'Livraison immédiate' : formatDate(delivery.scheduledTime)}
                    </p>
                  </div>

                  {delivery.cashCollection && delivery.cashAmount && (
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-green-600">
                        {delivery.cashAmount.toLocaleString()} FCFA
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">{delivery.packageDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeliveryDetailsModal
        delivery={selectedDelivery}
        isOpen={!!selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
        onUpdate={onUpdateDelivery}
      />
    </>
  );
};