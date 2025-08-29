import { useState, useEffect } from "react";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  FilterIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { cn } from "../../lib/utils";

interface AlertData {
  id: string;
  timestamp: string;
  type: "failure" | "quality" | "maintenance" | "production";
  severity: "high" | "medium" | "low";
  plant: string;
  line: string;
  message: string;
  status: "active" | "acknowledged" | "resolved";
}

interface LiveAlertsFeedProps {
  alerts: AlertData[];
  className?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "failure":
      return XCircleIcon;
    case "quality":
      return AlertTriangleIcon;
    case "maintenance":
      return ClockIcon;
    case "production":
      return CheckCircleIcon;
    default:
      return AlertTriangleIcon;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800";
    case "acknowledged":
      return "bg-yellow-100 text-yellow-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "failure":
      return "text-red-600";
    case "quality":
      return "text-orange-600";
    case "maintenance":
      return "text-blue-600";
    case "production":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export default function LiveAlertsFeed({
  alerts,
  className,
}: LiveAlertsFeedProps) {
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    let filtered = alerts;

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((alert) => alert.type === typeFilter);
    }

    // Sort by timestamp (newest first) and severity
    filtered.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      const severityDiff =
        severityOrder[b.severity as keyof typeof severityOrder] -
        severityOrder[a.severity as keyof typeof severityOrder];
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    setFilteredAlerts(filtered);
  }, [alerts, severityFilter, statusFilter, typeFilter]);

  const handleAcknowledge = (alertId: string) => {
    // In a real app, this would update the alert status
    console.log("Acknowledging alert:", alertId);
  };

  const handleResolve = (alertId: string) => {
    // In a real app, this would resolve the alert
    console.log("Resolving alert:", alertId);
  };

  const activeAlertsCount = alerts.filter(
    (alert) => alert.status === "active"
  ).length;
  const highSeverityCount = alerts.filter(
    (alert) => alert.severity === "high"
  ).length;

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="h-5 w-5 text-orange-600" />

            <span>Live Alerts</span>
            <div className="flex space-x-2">
              <Badge variant="destructive" className="animate-pulse">
                {activeAlertsCount} Active
              </Badge>
              {highSeverityCount > 0 && (
                <Badge
                  variant="outline"
                  className="border-red-500 text-red-700"
                >
                  {highSeverityCount} High Priority
                </Badge>
              )}
            </div>
          </div>
          <FilterIcon className="h-4 w-4 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="failure">Failure</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert) => {
            const IconComponent = getTypeIcon(alert.type);
            const isActive = alert.status === "active";

            return (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  isActive
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200",
                  alert.severity === "high" && isActive && "ring-2 ring-red-200"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent
                      className={cn("h-4 w-4", getTypeColor(alert.type))}
                    />

                    <Badge
                      variant="outline"
                      className={getSeverityColor(alert.severity)}
                    >
                      {alert.severity}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getStatusColor(alert.status)}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                    <span className="font-medium">{alert.plant}</span>
                    <span>•</span>
                    <span>{alert.line}</span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium">
                    {alert.message}
                  </p>
                </div>

                {alert.status === "active" && (
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => handleAcknowledge(alert.id)}
                      className="text-xs"
                    >
                      Acknowledge
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleResolve(alert.id)}
                      className="text-xs"
                    >
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangleIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />

              <p>No alerts match the current filters</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-red-600">
                {alerts.filter((a) => a.status === "active").length}
              </div>
              <div className="text-gray-600">Active</div>
            </div>
            <div>
              <div className="font-semibold text-yellow-600">
                {alerts.filter((a) => a.status === "acknowledged").length}
              </div>
              <div className="text-gray-600">Acknowledged</div>
            </div>
            <div>
              <div className="font-semibold text-green-600">
                {alerts.filter((a) => a.status === "resolved").length}
              </div>
              <div className="text-gray-600">Resolved</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
