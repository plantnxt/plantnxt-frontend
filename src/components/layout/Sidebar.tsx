import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Users,
  Factory,
  Package,
  MessageSquare,
  FileText,
  X,
  Activity,
  Target,
  PieChart,
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  Pin,
  PinOff
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPath, isExpanded = false, onExpandedChange }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Handle pin toggle
  const handleTogglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);

    if (newPinnedState) {
      // When pinning, expand the sidebar
      onExpandedChange?.(true);
    } else {
      // When unpinning, collapse the sidebar and reset hover
      setIsHovered(false);
      onExpandedChange?.(false);
    }
  };

  // Update expansion based on hover and pinned state
  useEffect(() => {
    if (isPinned) {
      onExpandedChange?.(true);
    } else if (isHovered) {
      onExpandedChange?.(true);
    } else {
      onExpandedChange?.(false);
    }
  }, [isPinned, isHovered, onExpandedChange]);

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview and key metrics'
      },
      {
        name: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Detailed performance analysis'
      },
      {
        name: 'OEE Tracking',
        href: '/oee',
        icon: Target,
        description: 'Overall Equipment Effectiveness'
      },
      {
        name: 'Production',
        href: '/production',
        icon: Factory,
        description: 'Production metrics and planning'
      },
      {
        name: 'Quality',
        href: '/quality',
        icon: PieChart,
        description: 'Quality metrics and control'
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Activity,
        description: 'Equipment maintenance tracking'
      },
      {
        name: 'Alerts',
        href: '/alerts',
        icon: AlertTriangle,
        description: 'System alerts and notifications'
      },
      {
        name: 'Reports',
        href: '/reports',
        icon: FileText,
        description: 'Generate and view reports'
      },
      {
        name: 'AI Copilot',
        href: '/copilot',
        icon: MessageSquare,
        description: 'AI-powered insights and recommendations'
      }
    ];

    // Add role-specific items
    if (user?.role === 'CEO' || user?.role === 'COO' || user?.role === 'CFO') {
      baseItems.push(
        {
          name: 'Financial Impact',
          href: '/financial',
          icon: TrendingUp,
          description: 'Financial metrics and ROI analysis'
        },
        {
          name: 'Strategic Planning',
          href: '/planning',
          icon: Calendar,
          description: 'Strategic planning and forecasting'
        }
      );
    }

    if (user?.role === 'VP Production' || user?.role === 'Plant Head') {
      baseItems.push(
        {
          name: 'Plant Management',
          href: '/plants',
          icon: MapPin,
          description: 'Multi-plant management'
        },
        {
          name: 'Team Management',
          href: '/team',
          icon: Users,
          description: 'Team performance and scheduling'
        }
      );
    }

    if (user?.role === 'VP Supply Chain') {
      baseItems.push(
        {
          name: 'Supply Chain',
          href: '/supply-chain',
          icon: Package,
          description: 'Supply chain optimization'
        },
        {
          name: 'Inventory',
          href: '/inventory',
          icon: Package,
          description: 'Inventory management'
        }
      );
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              P
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              PlantNxt
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors h-10",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
          isExpanded ? "lg:w-64" : "lg:w-16"
        )}
        onMouseEnter={() => {
          if (!isPinned) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isPinned) {
            setIsHovered(false);
          }
        }}
      >
        <div className="flex flex-col flex-grow bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 dark:backdrop-blur-sm shadow-lg">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              P
            </div>
            {isExpanded && <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">PlantNxt</span>}
            {(isExpanded || isHovered) && (
              <button
                onClick={handleTogglePin}
                className="ml-auto p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors h-10",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                  title={!isExpanded ? item.description : undefined}
                >
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                    )} />
                  </div>
                  {isExpanded && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              {isExpanded && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.role}</p>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </>
  );
};
