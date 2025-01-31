import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserMenu } from '../UserMenu';
import { 
  Bars3Icon, 
  XMarkIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  NoSymbolIcon,
  ChartBarIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { 
      path: '/', 
      label: 'Demandes', 
      icon: InboxIcon 
    },
    { 
      path: '/accepted', 
      label: 'Acceptées', 
      icon: TruckIcon 
    },
    { 
      path: '/completed', 
      label: 'Complétées', 
      icon: CheckCircleIcon 
    },
    { 
      path: '/rescheduled', 
      label: 'Reprogrammées', 
      icon: ClockIcon 
    },
    { 
      path: '/rejected', 
      label: 'Annulées', 
      icon: NoSymbolIcon 
    },
    { 
      path: '/activity', 
      label: 'Activité', 
      icon: ChartBarIcon 
    }
  ];

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <span className="text-white text-xl font-bold">LOGO</span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive(link.path)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon 
                    className={`
                      mr-3 h-6 w-6 flex-shrink-0
                      ${isActive(link.path)
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-300'
                      }
                    `}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
          <UserMenu />
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 w-full bg-gray-900 z-10">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            className="text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <span className="text-white text-xl font-bold">LOGO</span>
          <UserMenu />
        </div>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-900">
            <div className="h-16 flex items-center justify-between px-4 bg-gray-900">
              <span className="text-white text-xl font-bold">LOGO</span>
              <button
                type="button"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive(link.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon 
                      className={`
                        mr-3 h-6 w-6 flex-shrink-0
                        ${isActive(link.path)
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-300'
                        }
                      `}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};