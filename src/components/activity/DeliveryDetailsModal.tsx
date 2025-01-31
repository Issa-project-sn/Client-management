import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DeliveryDetails } from '../../types/delivery';
import { formatDate } from '../../utils/date';

interface Props {
  delivery: DeliveryDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryDetailsModal: React.FC<Props> = ({ delivery, isOpen, onClose }) => {
  if (!delivery) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Détails de la livraison
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Statut</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {delivery.status}
              </span>
            </div>

            {/* Addresses */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Adresse de ramassage</h3>
                <p className="mt-1 text-base">{delivery.pickupAddress}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Adresse de livraison</h3>
                <p className="mt-1 text-base">{delivery.deliveryAddress}</p>
              </div>
            </div>

            {/* Package Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description du colis</h3>
              <p className="mt-1 text-base">{delivery.packageDescription}</p>
            </div>

            {/* Scheduling */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Planification</h3>
              <p className="mt-1 text-base">
                {delivery.isImmediate ? 'Livraison immédiate' : formatDate(delivery.scheduledTime)}
              </p>
            </div>

            {/* Cash Collection */}
            {delivery.cashCollection && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Montant à récupérer</h3>
                <p className="mt-1 text-base font-medium text-green-600">
                  {delivery.cashAmount?.toLocaleString()} FCFA
                </p>
              </div>
            )}

            {/* Special Instructions */}
            {delivery.specialInstructions && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Instructions spéciales</h3>
                <p className="mt-1 text-base">{delivery.specialInstructions}</p>
              </div>
            )}

            {/* Created At */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Créé le</h3>
              <p className="mt-1 text-base">{formatDate(delivery.createdAt)}</p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};