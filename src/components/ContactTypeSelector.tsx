import React from 'react';
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline';

interface Props {
  isCompany: boolean;
  onChange: (isCompany: boolean) => void;
}

export const ContactTypeSelector: React.FC<Props> = ({ isCompany, onChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border ${
          !isCompany ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <UserIcon className={`h-6 w-6 ${!isCompany ? 'text-blue-500' : 'text-gray-400'}`} />
        <span className={`text-lg ${!isCompany ? 'text-blue-700' : 'text-gray-700'}`}>Particulier</span>
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border ${
          isCompany ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <BuildingOfficeIcon className={`h-6 w-6 ${isCompany ? 'text-blue-500' : 'text-gray-400'}`} />
        <span className={`text-lg ${isCompany ? 'text-blue-700' : 'text-gray-700'}`}>Entreprise</span>
      </button>
    </div>
  );
};