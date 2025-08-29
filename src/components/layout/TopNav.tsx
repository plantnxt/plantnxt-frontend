import React, { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import type { User as UserType } from '../../data/mockData';
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface TopNavProps {
  onMenuClick: () => void;
  user: UserType;
  onLogout: () => void;
  title?: string;
  subtitle?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick, user, onLogout, title, subtitle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'OEE Alert',
      message: 'Plant A OEE dropped below 80%',
      time: '5 minutes ago',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Maintenance Due',
      message: 'Equipment #1234 maintenance scheduled',
      time: '1 hour ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Quality Alert',
      message: 'Quality metrics improved by 5%',
      time: '2 hours ago',
      type: 'success'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-gray-700/95 dark:backdrop-blur-sm shadow-sm border-b border-gray-200/50 dark:border-gray-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button and page title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Page Title */}
            <div className="hidden md:block">
              <div className="text-left">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title || "Plant Pulse"}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {subtitle || "Manufacturing Intelligence Dashboard"}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Notifications, theme toggle, user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-[9999]">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <div className="flex items-start">
                            <div className={cn(
                              "flex-shrink-0 w-2 h-2 rounded-full mt-2",
                              notification.type === 'warning' && "bg-yellow-400",
                              notification.type === 'info' && "bg-blue-400",
                              notification.type === 'success' && "bg-green-400"
                            )} />
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 ">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </header>
  );
};
