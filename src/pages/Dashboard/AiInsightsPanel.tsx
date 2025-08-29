import {
  BrainIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  FileTextIcon,
  ZapIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface AIInsight {
  id: string;
  type: "prediction" | "recommendation" | "summary" | "alert";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  actionRequired: boolean;
  timestamp: string;
}

interface AIInsightsPanelProps {
  insights: AIInsight[];
  className?: string;
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case "prediction":
      return TrendingUpIcon;
    case "recommendation":
      return ZapIcon;
    case "summary":
      return FileTextIcon;
    case "alert":
      return AlertTriangleIcon;
    default:
      return BrainIcon;
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "prediction":
      return "bg-blue-100 text-blue-800";
    case "recommendation":
      return "bg-purple-100 text-purple-800";
    case "summary":
      return "bg-gray-100 text-gray-800";
    case "alert":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AIInsightsPanel({
  insights,
  className,
}: AIInsightsPanelProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BrainIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <span>AI Insights</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {insights.filter((i) => i.actionRequired).length} Action Required
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);

            return (
              <div
                key={insight.id}
                className={cn(
                  "p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
                  insight.actionRequired
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <IconComponent className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <Badge
                      variant="outline"
                      className={cn(getTypeColor(insight.type), "text-xs")}
                    >
                      {insight.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(getImpactColor(insight.impact), "text-xs")}
                    >
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {insight.confidence}% confidence
                    </span>
                    {insight.actionRequired && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                    )}
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {insight.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    {new Date(insight.timestamp).toLocaleTimeString()}
                  </span>
                  {insight.actionRequired && (
                    <Button size="small" variant="outline" className="text-xs w-full sm:w-auto">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="small" className="flex-1 text-xs">
              What changed today?
            </Button>
            <Button variant="outline" size="small" className="flex-1 text-xs">
              Suggest focus areas
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
