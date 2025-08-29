import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  target: number;
  trend: "up" | "down" | "stable";
  change: number;
  unit: string;
  sparklineData?: number[];
  className?: string;
}

export default function MetricCard({
  title,
  value,
  target,
  trend,
  change,
  unit,
  sparklineData,
  className,
}: MetricCardProps) {
  const isAboveTarget = value >= target;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-600"
        : "text-gray-500";
  const changeColor =
    change > 0
      ? "text-green-600"
      : change < 0
        ? "text-red-600"
        : "text-gray-500";

  const TrendIcon =
    trend === "up"
      ? TrendingUpIcon
      : trend === "down"
        ? TrendingDownIcon
        : MinusIcon;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {value.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">
                Target: {target.toLocaleString()}
                {unit}
              </span>
              <span
                className={cn(
                  "font-medium",
                  isAboveTarget ? "text-green-600" : "text-red-600"
                )}
              >
                ({isAboveTarget ? "+" : ""}
                {(((value - target) / target) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className={cn("flex items-center space-x-1", trendColor)}>
              <TrendIcon className="h-4 w-4" />

              <span className={cn("text-sm font-medium", changeColor)}>
                {change > 0 ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            </div>

            {sparklineData && (
              <div className="flex items-end space-x-0.5 h-8">
                {sparklineData.map((point, index) => {
                  const height = Math.max(
                    2,
                    (point / Math.max(...sparklineData)) * 32
                  );
                  return (
                    <div
                      key={index}
                      className="bg-blue-200 rounded-sm"
                      style={{
                        width: "3px",
                        height: `${height}px`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Performance indicator bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              isAboveTarget ? "bg-green-500" : "bg-red-500"
            )}
            style={{
              width: `${Math.min(100, (value / target) * 100)}%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
