import React from 'react';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface Props {
  isImmediate: boolean;
  scheduledTime: Date;
  onChange: (isImmediate: boolean, scheduledTime: Date) => void;
}

export const DeliveryScheduling: React.FC<Props> = ({ 
  isImmediate, 
  scheduledTime, 
  onChange 
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <label className="block text-xl font-semibold text-gray-800 mb-4">Planification</label>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="immediate"
              checked={isImmediate}
              onChange={() => onChange(true, scheduledTime)}
              className="h-5 w-5 text-blue-600"
            />
            <ClockIcon className="h-6 w-6 text-blue-500" />
            <label htmlFor="immediate" className="text-lg">Livraison immédiate</label>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="scheduled"
              checked={!isImmediate}
              onChange={() => onChange(false, scheduledTime)}
              className="h-5 w-5 text-blue-600"
            />
            <CalendarIcon className="h-6 w-6 text-blue-500" />
            <label htmlFor="scheduled" className="text-lg">Planifier la livraison</label>
          </div>
        </div>
        {!isImmediate && (
          <div className="pl-12">
            <input
              type="datetime-local"
              value={scheduledTime.toISOString().slice(0, 16)}
              onChange={(e) => onChange(false, new Date(e.target.value))}
              className="mt-2 h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};