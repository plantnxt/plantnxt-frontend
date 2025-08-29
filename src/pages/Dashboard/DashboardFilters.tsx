import { useState } from "react";
import {
  FilterIcon,
  CalendarIcon,
  FactoryIcon,
  UsersIcon,
  PackageIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

// interface FilterOption {
//   value: string;
//   label: string;
// }

interface DashboardFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  plants: string[];
  shifts: string[];
  productFamilies: string[];
  timeRange: string;
  customerOrders: string[];
}

const filterOptions = {
  plants: [
    { value: "austin", label: "Austin Manufacturing" },
    { value: "detroit", label: "Detroit Assembly" },
    { value: "phoenix", label: "Phoenix Production" },
    { value: "charlotte", label: "Charlotte Facility" },
    { value: "seattle", label: "Seattle Operations" },
    { value: "miami", label: "Miami Complex" },
  ],

  shifts: [
    { value: "day", label: "Day Shift (6AM-2PM)" },
    { value: "evening", label: "Evening Shift (2PM-10PM)" },
    { value: "night", label: "Night Shift (10PM-6AM)" },
    { value: "all", label: "All Shifts" },
  ],

  productFamilies: [
    { value: "automotive", label: "Automotive Components" },
    { value: "electronics", label: "Electronics" },
    { value: "industrial", label: "Industrial Equipment" },
    { value: "consumer", label: "Consumer Goods" },
    { value: "aerospace", label: "Aerospace Parts" },
  ],

  timeRanges: [
    { value: "1h", label: "Last Hour" },
    { value: "8h", label: "Last 8 Hours" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "custom", label: "Custom Range" },
  ],

  customerOrders: [
    { value: "ford", label: "Ford Motor Co." },
    { value: "gm", label: "General Motors" },
    { value: "tesla", label: "Tesla Inc." },
    { value: "boeing", label: "Boeing" },
    { value: "apple", label: "Apple Inc." },
  ],
};

export default function DashboardFilters({
  onFiltersChange,
  className,
}: DashboardFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    plants: [],
    shifts: ["all"],
    productFamilies: [],
    timeRange: "24h",
    customerOrders: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      plants: [],
      shifts: ["all"],
      productFamilies: [],
      timeRange: "24h",
      customerOrders: [],
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.plants.length > 0) count++;
    if (filters.shifts.length > 0 && !filters.shifts.includes("all")) count++;
    if (filters.productFamilies.length > 0) count++;
    if (filters.timeRange !== "24h") count++;
    if (filters.customerOrders.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />

              <span className="font-medium text-gray-900 dark:text-gray-100">Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount} active</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="ghost"
                size="small"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </Button>
            </div>
          </div>

          {/* Quick Filters - Always Visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <CalendarIcon className="h-3 w-3" />

                <span>Time Range</span>
              </label>
              <Select
                value={filters.timeRange}
                onValueChange={(value) => updateFilters("timeRange", value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.timeRanges.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <UsersIcon className="h-3 w-3" />

                <span>Shift</span>
              </label>
              <Select
                value={filters.shifts[0] || "all"}
                onValueChange={(value) => updateFilters("shifts", [value])}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.shifts.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <FactoryIcon className="h-3 w-3" />

                <span>Plant</span>
              </label>
              <Select
                value={filters.plants[0] || "all"}
                onValueChange={(value) =>
                  updateFilters("plants", value === "all" ? [] : [value])
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="All Plants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plants</SelectItem>
                  {filterOptions.plants.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <PackageIcon className="h-3 w-3" />

                <span>Product</span>
              </label>
              <Select
                value={filters.productFamilies[0] || "all"}
                onValueChange={(value) =>
                  updateFilters(
                    "productFamilies",
                    value === "all" ? [] : [value]
                  )
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {filterOptions.productFamilies.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="pt-4 border-t space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600">
                  Customer Orders
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.customerOrders.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        filters.customerOrders.includes(option.value)
                          ? "default"
                          : "outline"
                      }
                      size="small"
                      onClick={() => {
                        const newCustomerOrders =
                          filters.customerOrders.includes(option.value)
                            ? filters.customerOrders.filter(
                              (c) => c !== option.value
                            )
                            : [...filters.customerOrders, option.value];
                        updateFilters("customerOrders", newCustomerOrders);
                      }}
                      className="text-xs h-7"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600">
                  Multiple Plant Selection
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.plants.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        filters.plants.includes(option.value)
                          ? "default"
                          : "outline"
                      }
                      size="small"
                      onClick={() => {
                        const newPlants = filters.plants.includes(option.value)
                          ? filters.plants.filter((p) => p !== option.value)
                          : [...filters.plants, option.value];
                        updateFilters("plants", newPlants);
                      }}
                      className="text-xs h-7"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="pt-3 border-t">
              <div className="flex flex-wrap gap-2">
                {filters.timeRange !== "24h" && (
                  <Badge variant="secondary" className="text-xs">
                    Time:{" "}
                    {
                      filterOptions.timeRanges.find(
                        (t) => t.value === filters.timeRange
                      )?.label
                    }
                  </Badge>
                )}
                {filters.plants.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Plants: {filters.plants.length}
                  </Badge>
                )}
                {filters.productFamilies.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Products: {filters.productFamilies.length}
                  </Badge>
                )}
                {filters.customerOrders.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Customers: {filters.customerOrders.length}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
