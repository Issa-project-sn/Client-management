import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ActivityStats } from '../components/activity/ActivityStats';
import { DateRangeFilter } from '../components/activity/DateRangeFilter';
import { DeliveryHistory } from '../components/activity/DeliveryHistory';
import { DeliveryChart } from '../components/activity/DeliveryChart';
import { DeliveryDetails } from '../types/delivery';
import { convertFirestoreDate } from '../utils/firestore';
import { startOfMonth, endOfMonth } from 'date-fns';

export const ActivityPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [acceptedDeliveries, setAcceptedDeliveries] = useState<DeliveryDetails[]>([]);
  const [completedDeliveries, setCompletedDeliveries] = useState<DeliveryDetails[]>([]);
  const [rejectedDeliveries, setRejectedDeliveries] = useState<DeliveryDetails[]>([]);
  const [rescheduledDeliveries, setRescheduledDeliveries] = useState<DeliveryDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(startOfMonth(new Date()).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(endOfMonth(new Date()).toISOString().split('T')[0]);

  useEffect(() => {
    // Fetch accepted deliveries
    const acceptedQuery = query(
      collection(db, 'accepted_deliveries'),
      orderBy('createdAt', 'desc')
    );

    const acceptedUnsubscribe = onSnapshot(acceptedQuery, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: convertFirestoreDate(doc.data().createdAt) || new Date(),
          scheduledTime: convertFirestoreDate(doc.data().scheduledTime) || new Date()
        } as DeliveryDetails));
        setAcceptedDeliveries(data);
      }
    );

    // Fetch completed deliveries
    const completedQuery = query(
      collection(db, 'completed_deliveries'),
      orderBy('createdAt', 'desc')
    );

    const completedUnsubscribe = onSnapshot(completedQuery, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: convertFirestoreDate(doc.data().createdAt) || new Date(),
          scheduledTime: convertFirestoreDate(doc.data().scheduledTime) || new Date()
        } as DeliveryDetails));
        setCompletedDeliveries(data);
      }
    );

    // Fetch rejected deliveries
    const rejectedQuery = query(
      collection(db, 'rejected_deliveries'),
      orderBy('createdAt', 'desc')
    );

    const rejectedUnsubscribe = onSnapshot(rejectedQuery, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: convertFirestoreDate(doc.data().createdAt) || new Date(),
          scheduledTime: convertFirestoreDate(doc.data().scheduledTime) || new Date()
        } as DeliveryDetails));
        setRejectedDeliveries(data);
      }
    );

    // Fetch rescheduled deliveries
    const rescheduledQuery = query(
      collection(db, 'rescheduled_deliveries'),
      orderBy('createdAt', 'desc')
    );

    const rescheduledUnsubscribe = onSnapshot(rescheduledQuery, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: convertFirestoreDate(doc.data().createdAt) || new Date(),
          scheduledTime: convertFirestoreDate(doc.data().scheduledTime) || new Date()
        } as DeliveryDetails));
        setRescheduledDeliveries(data);
        setLoading(false);
      }
    );

    // Combine all deliveries for the history
    const allDeliveries = [...acceptedDeliveries, ...completedDeliveries, ...rejectedDeliveries, ...rescheduledDeliveries];
    setDeliveries(allDeliveries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));

    return () => {
      acceptedUnsubscribe();
      completedUnsubscribe();
      rejectedUnsubscribe();
      rescheduledUnsubscribe();
    };
  }, []);

  const filteredDeliveries = deliveries.filter(delivery => {
    if (!startDate && !endDate) return true;
    
    const deliveryDate = delivery.createdAt;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return deliveryDate >= start && deliveryDate <= end;
    } else if (start) {
      return deliveryDate >= start;
    } else if (end) {
      return deliveryDate <= end;
    }
    
    return true;
  });

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Activité</h1>
          <p className="mt-1 text-sm text-gray-500">
            Suivez l'activité de vos livraisons et consultez les statistiques
          </p>
        </div>

        <ActivityStats 
          totalAcceptedDeliveries={acceptedDeliveries.length}
          totalCompletedDeliveries={completedDeliveries.length}
          totalRejectedDeliveries={rejectedDeliveries.length}
          totalRescheduledDeliveries={rescheduledDeliveries.length}
        />
        
        <div className="mb-8">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        <div className="mb-8">
          <DeliveryChart 
            deliveries={acceptedDeliveries}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Historique des livraisons</h2>
            <p className="mt-1 text-sm text-gray-500">
              Consultez l'historique complet de vos livraisons
            </p>
          </div>
          
          <DeliveryHistory deliveries={filteredDeliveries} />
        </div>
      </div>
    </div>
  );
};