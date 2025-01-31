import React, { useState, useEffect } from 'react';
import { ContactInfoForm } from './ContactInfoForm';
import { VehicleSelector } from './VehicleSelector';
import { DeliveryScheduling } from './DeliveryScheduling';
import { CashCollection } from './CashCollection';
import { calculateDeliveryPrice } from '../utils/pricing';
import { DeliveryDetails, ContactInfo } from '../types/delivery';
import { VEHICLE_TYPES, EMPTY_CONTACT } from '../constants/delivery';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';

interface Props {
  initialData?: DeliveryDetails;
  onSubmit: (delivery: DeliveryDetails) => void;
  onCancel: () => void;
  isModal?: boolean;
}

export const CreateDeliveryForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, isModal }) => {
  const { user } = useAuth();
  const [companyProfile, setCompanyProfile] = useState<{
    name: string;
    address: string;
    phone: string;
  } | null>(null);

  const [sender, setSender] = useState<ContactInfo>(initialData?.sender || {
    ...EMPTY_CONTACT,
    isCompany: true
  });
  const [receiver, setReceiver] = useState<ContactInfo>(initialData?.receiver || EMPTY_CONTACT);
  const [pickupAddress, setPickupAddress] = useState(initialData?.pickupAddress || '');
  const [deliveryAddress, setDeliveryAddress] = useState(initialData?.deliveryAddress || '');
  const [packageDescription, setPackageDescription] = useState(initialData?.packageDescription || '');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(initialData?.selectedVehicles || []);
  const [isImmediate, setIsImmediate] = useState(initialData?.isImmediate ?? true);
  const [scheduledTime, setScheduledTime] = useState(initialData?.scheduledTime || new Date());
  const [cashCollection, setCashCollection] = useState(initialData?.cashCollection || false);
  const [cashAmount, setCashAmount] = useState(initialData?.cashAmount || 0);
  const [specialInstructions, setSpecialInstructions] = useState(initialData?.specialInstructions || '');

  useEffect(() => {
    const loadCompanyProfile = async () => {
      if (user?.uid) {
        try {
          const profile = await userService.getUserProfile(user.uid);
          if (profile?.company) {
            setCompanyProfile({
              name: profile.company.name,
              address: profile.company.address,
              phone: profile.company.phone
            });
          }
        } catch (error) {
          console.error('Error loading company profile:', error);
        }
      }
    };

    loadCompanyProfile();
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      sender,
      receiver,
      pickupAddress,
      deliveryAddress,
      packageDescription,
      selectedVehicles,
      isImmediate,
      scheduledTime,
      cashCollection,
      cashAmount: cashCollection ? cashAmount : undefined,
      specialInstructions,
      status: initialData?.status || 'pending',
      price: calculatePrice(),
      createdAt: initialData?.createdAt || new Date()
    });
  };

  const calculatePrice = () => {
    const estimatedDistance = 5;
    return calculateDeliveryPrice(
      estimatedDistance,
      selectedVehicles,
      cashCollection,
      cashAmount
    );
  };

  return (
    <form onSubmit={handleSubmit} className={`${isModal ? 'space-y-4' : 'space-y-8'}`}>
      <DeliveryScheduling
        isImmediate={isImmediate}
        scheduledTime={scheduledTime}
        onChange={(immediate, time) => {
          setIsImmediate(immediate);
          setScheduledTime(time);
        }}
        compact={isModal}
      />

      <ContactInfoForm
        title="Expéditeur"
        value={sender}
        onChange={setSender}
        address={pickupAddress}
        onAddressChange={setPickupAddress}
        addressLabel="Adresse de ramassage"
        addressPlaceholder="Entrez l'adresse de ramassage"
        iconColor="text-green-600"
        isSender={true}
        companyProfile={companyProfile || undefined}
        compact={isModal}
      />

      <ContactInfoForm
        title="Destinataire"
        value={receiver}
        onChange={setReceiver}
        address={deliveryAddress}
        onAddressChange={setDeliveryAddress}
        addressLabel="Adresse de livraison"
        addressPlaceholder="Entrez l'adresse de livraison"
        iconColor="text-red-600"
        compact={isModal}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Description du colis</label>
        <textarea
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={isModal ? 2 : 3}
          required
        />
      </div>

      <VehicleSelector
        vehicles={VEHICLE_TYPES}
        selectedVehicles={selectedVehicles}
        onChange={setSelectedVehicles}
        compact={isModal}
      />

      <CashCollection
        cashCollection={cashCollection}
        cashAmount={cashAmount}
        onCashCollectionChange={setCashCollection}
        onCashAmountChange={setCashAmount}
        compact={isModal}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Instructions spéciales</label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={isModal ? 2 : 3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm"
        >
          {initialData ? 'Mettre à jour' : 'Créer la livraison'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 text-sm"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};