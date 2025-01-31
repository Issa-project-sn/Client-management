import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { DeliveryList } from '../components/DeliveryList';
import { CreateDeliveryForm } from '../components/CreateDeliveryForm';
import { DeliveryDetails } from '../types/delivery';
import { deliveryService } from '../services/deliveryService';
import { PlusIcon } from '@heroicons/react/24/outline';

export const DeliveryRequests: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setDeliveries([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'delivery_requests'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const deliveriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          scheduledTime: doc.data().scheduledTime?.toDate() || new Date(),
        } as DeliveryDetails));
        
        setDeliveries(deliveriesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
        setDeliveries([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateDelivery = async (delivery: DeliveryDetails) => {
    try {
      await deliveryService.createDelivery(delivery);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };

  const handleUpdateDelivery = async (delivery: DeliveryDetails) => {
    try {
      await deliveryService.updateDelivery(delivery.id, delivery);
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Demande de livraison</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez vos demandes de livraison et suivez leur statut
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Nouvelle livraison
              </button>
            </div>
          </div>

          {showCreateForm ? (
            <div className="bg-gray-50 rounded-lg border border-gray-200">
              <div className="p-6">
                <CreateDeliveryForm
                  onSubmit={handleCreateDelivery}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            </div>
          ) : (
            <DeliveryList
              deliveries={deliveries}
              onDeliveryClick={(delivery) => console.log('Clicked delivery:', delivery)}
              onUpdateDelivery={handleUpdateDelivery}
            />
          )}
        </div>
      </div>
    </div>
  );
};