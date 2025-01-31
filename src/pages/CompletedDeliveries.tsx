import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DeliveryDetails } from '../types/delivery';
import { CompletedDeliveryList } from '../components/completed/CompletedDeliveryList';
import { useAuth } from '../contexts/AuthContext';

export const CompletedDeliveries: React.FC = () => {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setDeliveries([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'completed_deliveries'),
      where('createdBy', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const deliveriesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            pickupAddress: data.pickupAddress || '',
            deliveryAddress: data.deliveryAddress || '',
            packageDescription: data.packageDescription || '',
            isImmediate: data.isImmediate || false,
            scheduledTime: data.scheduledTime?.toDate() || new Date(),
            cashCollection: data.cashCollection || false,
            status: 'completed',
            createdAt: data.createdAt?.toDate() || new Date(),
            completedAt: data.completedAt?.toDate() || new Date(),
            createdBy: data.createdBy || '',
            sender: {
              companyName: data.sender?.companyName || '',
              firstName: data.sender?.firstName || '',
              lastName: data.sender?.lastName || '',
              phone: data.sender?.phone || '',
              isCompany: true
            },
            receiver: {
              companyName: data.receiver?.companyName || '',
              firstName: data.receiver?.firstName || '',
              lastName: data.receiver?.lastName || '',
              phone: data.receiver?.phone || '',
              isCompany: data.receiver?.isCompany || false
            },
            selectedVehicles: data.selectedVehicles || []
          } as DeliveryDetails;
        });
        
        setDeliveries(deliveriesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching completed deliveries:', error);
        setDeliveries([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Livraisons complétées</h1>
            <p className="mt-1 text-sm text-gray-500">
              Historique des livraisons qui ont été effectuées avec succès
            </p>
          </div>
          <CompletedDeliveryList deliveries={deliveries} />
        </div>
      </div>
    </div>
  );
}