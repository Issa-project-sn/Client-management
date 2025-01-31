import React, { useState } from 'react';
import { DeliveryDetails } from '../../types/delivery';
import { formatDate } from '../../utils/date';
import { XCircleIcon, MapPinIcon, PhoneIcon, CalendarIcon, ExclamationTriangleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { DeliveryDetailsModal } from '../DeliveryDetailsModal';

interface Props {
  deliveries: DeliveryDetails[];
}

export const RejectedDeliveryList: React.FC<Props> = ({ deliveries }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetails | null>(null);

  if (deliveries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <NoSymbolIcon className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune livraison annulée</h3>
        <p className="text-gray-500">Les livraisons annulées apparaîtront ici</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            <li 
              key={delivery.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedDelivery(delivery)}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Livraison #{delivery.id.slice(0, 8)}
                      </p>
                      <div className="flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-600">
                          De {delivery.pickupAddress} à {delivery.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-sm text-red-600">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Annulée le {formatDate(delivery.rejectedAt || new Date())}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Créée le {formatDate(delivery.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">
                        {delivery.receiver.isCompany ? 'Entreprise' : 'Particulier'}:
                      </p>
                      <p>
                        {delivery.receiver.isCompany 
                          ? delivery.receiver.companyName 
                          : `${delivery.receiver.firstName} ${delivery.receiver.lastName}`}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <p>{delivery.receiver.phone}</p>
                    </div>
                  </div>

                  {delivery.rejectionReason && (
                    <div className="mt-3 bg-red-50 p-3 rounded-md">
                      <div className="flex">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-red-800">Motif d'annulation:</h4>
                          <p className="mt-1 text-sm text-red-700">{delivery.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
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