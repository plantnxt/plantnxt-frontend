import { MapPinIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

interface PlantData {
  id: string;
  name: string;
  location: string;
  oee: number;
  productivity: number;
  downtime: number;
  output: number;
  quality: number;
  status: "excellent" | "good" | "warning" | "critical";
  deltaFromTarget: number;
}

interface PlantComparisonGridProps {
  plants: PlantData[];
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-white text-green-600 border-green-300";
    case "good":
      return "bg-white text-green-500 border-green-200";
    case "warning":
      return "bg-white text-yellow-600 border-yellow-300";
    case "critical":
      return "bg-white text-red-600 border-red-300";
    default:
      return "bg-white text-gray-600 border-gray-300";
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-50 text-green-700 border-green-200";
    case "good":
      return "bg-green-50 text-green-600 border-green-200";
    case "warning":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "critical":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

// const getDeltaColor = (delta: number) => {
//   if (delta > 3) return "text-green-600";
//   if (delta > 0) return "text-green-500";
//   if (delta > -3) return "text-yellow-600";
//   return "text-red-600";
// };

export default function PlantComparisonGrid({
  plants,
  className,
}: PlantComparisonGridProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5 text-blue-600" />

          <span>Plant Performance Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className={cn(
                "relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg cursor-pointer",
                getStatusColor(plant.status)
              )}
            >
              {/* Header - Plant Name and Location */}
              <div className="mb-3">
                <h3 className="font-semibold text-lg leading-tight truncate">
                  {plant.name}
                </h3>
                <p className="text-sm opacity-90 truncate">{plant.location}</p>
              </div>

              {/* Status Badge Row */}
              <div className="mb-4 flex justify-center">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-3 py-1",
                    getStatusBadgeColor(plant.status)
                  )}
                >
                  {plant.status}
                </Badge>
              </div>

              {/* Delta from Target */}
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <div
                    className={cn(
                      "flex items-center justify-center space-x-1",
                      plant.deltaFromTarget > 0
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {plant.deltaFromTarget > 0 ? (
                      <TrendingUpIcon className="h-4 w-4" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4" />
                    )}
                    <span className="text-2xl font-bold">
                      {plant.deltaFromTarget > 0 ? "+" : ""}
                      {plant.deltaFromTarget.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">vs Target</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center min-w-0">
                  <div className="font-semibold">{plant.oee.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500 truncate">OEE</div>
                </div>
                <div className="text-center min-w-0">
                  <div className="font-semibold">
                    {plant.productivity.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Productivity
                  </div>
                </div>
                <div className="text-center min-w-0">
                  <div className="font-semibold">
                    {plant.quality.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 truncate">Quality</div>
                </div>
                <div className="text-center min-w-0">
                  <div className="font-semibold">
                    {plant.output.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 truncate">Output</div>
                </div>
              </div>

              {/* Downtime Indicator */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Downtime</span>
                  <span className="font-semibold text-red-600">
                    {plant.downtime.toFixed(1)}h
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-red-500 rounded-full h-1 transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (plant.downtime / 8) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {plants.filter((p) => p.status === "excellent").length}
              </div>
              <div className="text-sm text-gray-600">Excellent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {plants.filter((p) => p.status === "good").length}
              </div>
              <div className="text-sm text-gray-600">Good</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {plants.filter((p) => p.status === "warning").length}
              </div>
              <div className="text-sm text-gray-600">Warning</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {plants.filter((p) => p.status === "critical").length}
              </div>
              <div className="text-sm text-gray-600">Critical</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
