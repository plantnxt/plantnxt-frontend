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
      // Operations Layer 1
      {
        name: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        description: 'One-screen clarity of operations, insights, and actions',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      {
        name: 'OEE Tracking',
        href: '/oee',
        icon: Target,
        description: 'Monitor availability, performance, and quality in real time',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      {
        name: 'Production',
        href: '/production',
        icon: Factory,
        description: 'Throughput, schedules, and bottleneck tracking',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      {
        name: 'Quality',
        href: '/quality',
        icon: PieChart,
        description: 'Defect trends, first-pass yield, and scrap analysis',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      {
        name: 'Maintenance',
        href: '/maintenance',
        icon: Activity,
        description: 'Preventive, predictive, and corrective maintenance insights',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      {
        name: 'Alerts',
        href: '/alerts',
        icon: AlertTriangle,
        description: 'Central hub for downtime, quality, and risk alerts',
        phase: 'Phase 1',
        group: 'Operations Layer 1'
      },
      // Decision Intelligence Layer
      {
        name: 'AI Copilot',
        href: '/copilot',
        icon: MessageSquare,
        description: 'Ask anything, get root-cause answers and recommendations',
        phase: 'Phase 1',
        group: 'Decision Intelligence Layer'
      },
      {
        name: 'Financial Impact',
        href: '/financial-impact',
        icon: TrendingUp,
        description: 'Translate operational changes into revenue, profit, and cash impact',
        phase: 'Phase 1',
        group: 'Decision Intelligence Layer'
      },
      {
        name: 'Scenario Planning',
        href: '/scenario-planning',
        icon: BarChart3,
        description: '"What-if" simulations for OEE, downtime, and demand shifts',
        phase: 'Phase 2',
        group: 'Decision Intelligence Layer'
      },
      {
        name: 'Optimization Opportunities',
        href: '/optimization',
        icon: TrendingUp,
        description: 'AI-driven workload, capacity, and scheduling improvements',
        phase: 'Phase 2',
        group: 'Decision Intelligence Layer'
      },
      // Financial Layer
      {
        name: 'Statements',
        href: '/statements',
        icon: FileText,
        description: 'View P&L, Balance Sheet, and Cashflow linked to ops performance',
        phase: 'Phase 2',
        group: 'Financial Layer'
      },
      {
        name: 'Forecasting',
        href: '/forecasting',
        icon: TrendingUp,
        description: 'Predict financial outcomes based on operational scenarios',
        phase: 'Phase 3',
        group: 'Financial Layer'
      },
      // Strategic & Governance Layer
      {
        name: 'Strategic Planning',
        href: '/strategic-planning',
        icon: Calendar,
        description: 'Align plant performance with long-term goals',
        phase: 'Phase 2',
        group: 'Strategic & Governance Layer'
      },
      {
        name: 'Reports & Compliance',
        href: '/reports-compliance',
        icon: FileText,
        description: 'Standard exports, audit trails, and compliance packs',
        phase: 'Phase 2',
        group: 'Strategic & Governance Layer'
      },
      {
        name: 'Sustainability & Energy',
        href: '/sustainability',
        icon: BarChart3,
        description: 'CO₂ footprint, energy per unit, ESG compliance',
        phase: 'Phase 3',
        group: 'Strategic & Governance Layer'
      },
      // Admin & Ecosystem Layer
      {
        name: 'Organization & Plants',
        href: '/organization',
        icon: MapPin,
        description: 'Multi-plant, multi-BU structure and hierarchy',
        phase: 'Phase 1',
        group: 'Admin & Ecosystem Layer'
      },
      {
        name: 'Users & Roles',
        href: '/users-roles',
        icon: Users,
        description: 'Enterprise-grade access control and SSO',
        phase: 'Phase 1',
        group: 'Admin & Ecosystem Layer'
      },
      {
        name: 'Integrations',
        href: '/integrations',
        icon: Package,
        description: 'Connect ERP, MES, PLC, and data lakes',
        phase: 'Phase 2',
        group: 'Admin & Ecosystem Layer'
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: BarChart3,
        description: 'Notifications, preferences, and AI configurations',
        phase: 'Phase 1',
        group: 'Admin & Ecosystem Layer'
      }
    ];

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
          <div className="space-y-4">
            {(() => {
              const groupedItems = navigationItems.reduce((groups, item) => {
                if (!groups[item.group]) {
                  groups[item.group] = [];
                }
                groups[item.group].push(item);
                return groups;
              }, {} as Record<string, typeof navigationItems>);

              return Object.entries(groupedItems).map(([groupName, items]) => (
                <div key={groupName}>
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {groupName}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {items.map((item) => {
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
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-xs text-gray-400 ml-2">{item.phase}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
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
          <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
            {(() => {
              const groupedItems = navigationItems.reduce((groups, item) => {
                if (!groups[item.group]) {
                  groups[item.group] = [];
                }
                groups[item.group].push(item);
                return groups;
              }, {} as Record<string, typeof navigationItems>);

              return Object.entries(groupedItems).map(([groupName, items]) => (
                <div key={groupName}>
                  {isExpanded && (
                    <div className="px-3 mb-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {groupName}
                      </h3>
                    </div>
                  )}
                  <div className="space-y-1">
                    {items.map((item) => {
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
                          title={!isExpanded ? `${item.description} (${item.phase})` : undefined}
                        >
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <item.icon className={cn(
                              "h-5 w-5",
                              isActive ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                            )} />
                          </div>
                          {isExpanded && (
                            <div className="ml-3 flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="whitespace-nowrap">{item.name}</span>
                                <span className="text-xs text-gray-400 ml-2">{item.phase}</span>
                              </div>
                              <p className="text-xs text-gray-500 truncate">{item.description}</p>
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
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
