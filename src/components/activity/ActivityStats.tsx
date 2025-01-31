import React from 'react';
import { 
  ChartBarIcon, 
  TruckIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Props {
  totalAcceptedDeliveries: number;
  totalCompletedDeliveries: number;
  totalRejectedDeliveries: number;
  totalRescheduledDeliveries: number;
}

export const ActivityStats: React.FC<Props> = ({ 
  totalAcceptedDeliveries,
  totalCompletedDeliveries,
  totalRejectedDeliveries,
  totalRescheduledDeliveries
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-primary-500">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TruckIcon className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Demandes Acceptées
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-primary-700">
                    {totalAcceptedDeliveries}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Demandes Complétées
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-green-700">
                    {totalCompletedDeliveries}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Demandes Annulées
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-red-700">
                    {totalRejectedDeliveries}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Demandes Reprogrammées
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-yellow-700">
                    {totalRescheduledDeliveries}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};