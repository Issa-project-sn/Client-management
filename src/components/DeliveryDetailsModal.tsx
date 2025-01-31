import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { DeliveryDetails } from '../types/delivery';
import { formatDate } from '../utils/date';
import { CreateDeliveryForm } from './CreateDeliveryForm';

interface Props {
  delivery: DeliveryDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (delivery: DeliveryDetails) => void;
}

export const DeliveryDetailsModal: React.FC<Props> = ({ delivery, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!delivery) return null;

  const isPending = delivery.status === 'pending';

  const handleUpdate = (updatedDelivery: DeliveryDetails) => {
    if (onUpdate) {
      onUpdate({
        ...updatedDelivery,
        id: delivery.id,
        status: delivery.status,
        createdAt: delivery.createdAt
      });
    }
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? 'Modifier la livraison' : 'Détails de la livraison'}
            </Dialog.Title>
            <div className="flex items-center gap-2">
              {isPending && !isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">Modifier</span>
                </button>
              )}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
            {isEditing ? (
              <div className="p-4">
                <CreateDeliveryForm
                  initialData={delivery}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                  isModal={true}
                />
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Statut</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    delivery.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    delivery.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {delivery.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Expéditeur</h3>
                  <p className="text-gray-900">{delivery.sender.companyName}</p>
                  <p className="text-sm text-gray-600">{delivery.sender.phone}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Destinataire</h3>
                  <p className="text-gray-900">
                    {delivery.receiver.isCompany 
                      ? delivery.receiver.companyName 
                      : `${delivery.receiver.firstName} ${delivery.receiver.lastName}`}
                  </p>
                  <p className="text-sm text-gray-600">{delivery.receiver.phone}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Adresses</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">De: {delivery.pickupAddress}</p>
                    <p className="text-sm text-gray-600 mt-2">À: {delivery.deliveryAddress}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-gray-900">{delivery.packageDescription}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Planification</h3>
                  <p className="text-gray-900">
                    {delivery.isImmediate ? 'Livraison immédiate' : formatDate(delivery.scheduledTime)}
                  </p>
                </div>

                {delivery.cashCollection && delivery.cashAmount && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Montant à récupérer</h3>
                    <p className="text-lg font-medium text-green-600">
                      {delivery.cashAmount.toLocaleString()} FCFA
                    </p>
                  </div>
                )}

                {delivery.specialInstructions && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Instructions spéciales</h3>
                    <p className="text-gray-900">{delivery.specialInstructions}</p>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    Créé le {formatDate(delivery.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};