import React from 'react';
import { Dialog } from '@headlessui/react';
import { CompanyProfileForm } from './CompanyProfileForm';
import { CompanyProfile } from '../../types/user';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: CompanyProfile;
  onSave: (profile: CompanyProfile) => void;
}

export const CompanyProfileModal: React.FC<Props> = ({ isOpen, onClose, profile, onSave }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Company Settings
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <CompanyProfileForm
              initialData={profile}
              onSubmit={(updatedProfile) => {
                onSave(updatedProfile);
                onClose();
              }}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};