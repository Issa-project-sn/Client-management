import React, { useState, useEffect } from 'react';
import { DeliveryList } from '../components/DeliveryList';
import { CreateDeliveryForm } from '../components/CreateDeliveryForm';
import { DeliveryDetails } from '../types/delivery';
import { deliveryService } from '../services/deliveryService';

export const ActiveDeliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActiveDeliveries();
  }, []);

  const loadActiveDeliveries = async () => {
    try {
      const active = await deliveryService.getActiveDeliveries();
      setDeliveries(active);
    } catch (error) {
      console.error('Error loading active deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDelivery = async (delivery: DeliveryDetails) => {
    try {
      await deliveryService.createDelivery(delivery);
      setShowCreateForm(false);
      loadActiveDeliveries();
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Active Deliveries</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + New Delivery
          </button>
        </div>

        {showCreateForm ? (
          <div className="bg-white rounded-lg shadow p-6">
            <CreateDeliveryForm
              onSubmit={handleCreateDelivery}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        ) : (
          <DeliveryList
            deliveries={deliveries}
            onDeliveryClick={(delivery) => console.log('Clicked delivery:', delivery)}
          />
        )}
      </div>
    </div>
  );
};