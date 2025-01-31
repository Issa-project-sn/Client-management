import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface Props {
  cashCollection: boolean;
  cashAmount: number;
  onCashCollectionChange: (value: boolean) => void;
  onCashAmountChange: (value: number) => void;
}

export const CashCollection: React.FC<Props> = ({
  cashCollection,
  cashAmount,
  onCashCollectionChange,
  onCashAmountChange,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4 space-x-3">
        <input
          type="checkbox"
          checked={cashCollection}
          onChange={(e) => onCashCollectionChange(e.target.checked)}
          className="h-5 w-5 text-blue-600 rounded"
        />
        <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
        <label className="text-lg text-gray-700">
          Le livreur doit-il récupérer de l'argent ?
        </label>
      </div>

      {cashCollection && (
        <div className="pl-12">
          <label className="block text-sm font-medium text-gray-700 mb-2">Montant à récupérer (FCFA)</label>
          <div className="relative">
            <input
              type="number"
              value={cashAmount}
              onChange={(e) => onCashAmountChange(Number(e.target.value))}
              className="h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              min="0"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};