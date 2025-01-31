import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DeliveryList } from '../components/DeliveryList';
import { DeliveryDetails } from '../types/delivery';
import { convertFirestoreDate } from '../utils/firestore';

export const AcceptedDeliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'accepted_deliveries'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const deliveriesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: convertFirestoreDate(data.createdAt) || new Date(),
            scheduledTime: convertFirestoreDate(data.scheduledTime) || new Date()
          } as DeliveryDetails;
        });
        
        setDeliveries(deliveriesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching accepted deliveries:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
            <h1 className="text-2xl font-bold text-gray-900">Demandes Acceptées</h1>
            <p className="mt-1 text-sm text-gray-500">
              Liste des livraisons qui ont été acceptées par les livreurs
            </p>
          </div>
          <DeliveryList
            deliveries={deliveries}
            onDeliveryClick={(delivery) => console.log('Clicked delivery:', delivery)}
            onUpdateDelivery={() => {}}
          />
        </div>
      </div>
    </div>
  );
};