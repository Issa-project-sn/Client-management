import React, { useState } from 'react';
import { UserProfile, UserProfileFormData } from '../../types/user';
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline';

interface Props {
  initialData: UserProfile;
  onSubmit: (profile: UserProfile) => void;
}

export const UserProfileForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<UserProfileFormData>({
    ...initialData,
    isCompany: !!initialData.company
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData: UserProfile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      ...(formData.isCompany && {
        company: {
          name: formData.company?.name || '',
          address: formData.company?.address || ''
        }
      })
    };
    onSubmit(profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, isCompany: false })}
          className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border ${
            !formData.isCompany ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <UserIcon className={`h-6 w-6 ${!formData.isCompany ? 'text-blue-500' : 'text-gray-400'}`} />
          <span>Individual</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, isCompany: true })}
          className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border ${
            formData.isCompany ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <BuildingOfficeIcon className={`h-6 w-6 ${formData.isCompany ? 'text-blue-500' : 'text-gray-400'}`} />
          <span>Company</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {formData.isCompany && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={formData.company?.name || ''}
              onChange={(e) => setFormData({
                ...formData,
                company: { ...formData.company, name: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required={formData.isCompany}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Address</label>
            <input
              type="text"
              value={formData.company?.address || ''}
              onChange={(e) => setFormData({
                ...formData,
                company: { ...formData.company, address: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required={formData.isCompany}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};