import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CompanyProfileModal } from './profile/CompanyProfileModal';
import { CompanyProfile } from '../types/user';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '',
    address: '',
    email: user?.email || '',
    phone: '',
    industry: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.uid) {
        try {
          const userProfile = await userService.getUserProfile(user.uid);
          if (userProfile?.company) {
            setProfile(userProfile.company);
          }
        } catch (error) {
          console.error('Error loading company profile:', error);
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleProfileUpdate = async (updatedProfile: CompanyProfile) => {
    try {
      if (user?.uid) {
        await userService.updateUserProfile(user.uid, { 
          email: user.email || '',
          company: updatedProfile,
          createdAt: new Date()
        });
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <UserCircleIcon className="h-8 w-8" />
        <span className="text-sm font-medium hidden md:block">
          {profile.name || 'Company Profile'}
        </span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 rounded-full p-2">
                <UserCircleIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-b border-gray-100">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Contact</p>
              <p className="text-sm text-gray-700">{profile.phone}</p>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-gray-500">Adresse</p>
              <p className="text-sm text-gray-700">{profile.address}</p>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Paramètres du compte
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      )}

      <CompanyProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};