import React from 'react';
import { ContactInfo } from '../types/delivery';
import { MapPinIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  value: ContactInfo;
  address: string;
  addressLabel: string;
  addressPlaceholder: string;
  iconColor: string;
  onChange: (info: ContactInfo) => void;
  onAddressChange: (address: string) => void;
  isSender?: boolean;
  companyProfile?: {
    name: string;
    address: string;
    phone: string;
  };
}

export const ContactInfoForm: React.FC<Props> = ({
  title,
  value,
  address,
  addressLabel,
  addressPlaceholder,
  iconColor,
  onChange,
  onAddressChange,
  isSender,
  companyProfile
}) => {
  React.useEffect(() => {
    if (isSender && companyProfile) {
      onChange({
        ...value,
        isCompany: true,
        companyName: companyProfile.name,
        phone: companyProfile.phone
      });
      // Don't set the address automatically to allow custom pickup addresses
    }
  }, [isSender, companyProfile]);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      
      {!isSender && (
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={value.isCompany ? "company" : "individual"}
            onChange={(e) => onChange({ ...value, isCompany: e.target.value === "company" })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>
        </div>
      )}

      {(value.isCompany || isSender) && (
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={value.companyName || ''}
              onChange={(e) => onChange({ ...value, companyName: e.target.value })}
              className="pl-10 h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required={value.isCompany}
              disabled={isSender}
            />
          </div>
        </div>
      )}

      {!isSender && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {value.isCompany ? 'Contact First Name' : 'First Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={value.firstName}
                  onChange={(e) => onChange({ ...value, firstName: e.target.value })}
                  className="h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {value.isCompany ? 'Contact Last Name' : 'Last Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={value.lastName}
                  onChange={(e) => onChange({ ...value, lastName: e.target.value })}
                  className="h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            className="pl-10 h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
            required
            disabled={isSender}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {addressLabel}
          {isSender && (
            <span className="text-sm text-gray-500 ml-2">
              (Default: {companyProfile?.address})
            </span>
          )}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder={isSender ? companyProfile?.address : addressPlaceholder}
            className="pl-10 h-12 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
            required
          />
        </div>
      </div>
    </div>
  );
};