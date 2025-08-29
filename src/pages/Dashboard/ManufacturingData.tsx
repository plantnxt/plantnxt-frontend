export interface MetricData {
  value: number;
  target: number;
  trend: "up" | "down" | "stable";
  change: number;
  unit: string;
}

export interface PlantData {
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
  imageUrl?: string;
  equipmentImages?: string[];
}

export interface AlertData {
  id: string;
  timestamp: string;
  type: "failure" | "quality" | "maintenance" | "production";
  severity: "high" | "medium" | "low";
  plant: string;
  line: string;
  message: string;
  status: "active" | "acknowledged" | "resolved";
  imageUrl?: string;
  equipmentPhoto?: string;
}

export interface AIInsight {
  id: string;
  type: "prediction" | "recommendation" | "summary" | "alert";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  actionRequired: boolean;
  timestamp: string;
}

export const topLevelMetrics: Record<string, MetricData> = {
  oee: {
    value: 84.2,
    target: 85.0,
    trend: "down",
    change: -1.3,
    unit: "%",
  },
  productivity: {
    value: 92.8,
    target: 90.0,
    trend: "up",
    change: 2.1,
    unit: "%",
  },
  downtime: {
    value: 4.2,
    target: 3.5,
    trend: "up",
    change: 0.7,
    unit: "hrs",
  },
  output: {
    value: 15420,
    target: 16000,
    trend: "down",
    change: -3.6,
    unit: "units",
  },
  quality: {
    value: 99.1,
    target: 99.5,
    trend: "stable",
    change: 0.0,
    unit: "%",
  },
  orderBacklog: {
    value: 847,
    target: 800,
    trend: "up",
    change: 5.9,
    unit: "orders",
  },
  forecastAccuracy: {
    value: 87.3,
    target: 90.0,
    trend: "up",
    change: 1.8,
    unit: "%",
  },
};

export const plantsData: PlantData[] = [
  {
    id: "plant-1",
    name: "Austin Manufacturing",
    location: "Austin, TX",
    oee: 87.2,
    productivity: 94.1,
    downtime: 3.1,
    output: 4200,
    quality: 99.3,
    status: "good",
    deltaFromTarget: 2.2,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "plant-2",
    name: "Detroit Assembly",
    location: "Detroit, MI",
    oee: 82.8,
    productivity: 89.7,
    downtime: 5.2,
    output: 3800,
    quality: 98.9,
    status: "warning",
    deltaFromTarget: -2.2,
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "plant-3",
    name: "Phoenix Production",
    location: "Phoenix, AZ",
    oee: 91.1,
    productivity: 96.3,
    downtime: 2.8,
    output: 4800,
    quality: 99.6,
    status: "excellent",
    deltaFromTarget: 6.1,
    imageUrl:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "plant-4",
    name: "Charlotte Facility",
    location: "Charlotte, NC",
    oee: 79.3,
    productivity: 85.2,
    downtime: 6.7,
    output: 3200,
    quality: 98.1,
    status: "critical",
    deltaFromTarget: -5.7,
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "plant-5",
    name: "Seattle Operations",
    location: "Seattle, WA",
    oee: 85.9,
    productivity: 91.4,
    downtime: 4.1,
    output: 4100,
    quality: 99.2,
    status: "good",
    deltaFromTarget: 0.9,
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "plant-6",
    name: "Miami Complex",
    location: "Miami, FL",
    oee: 88.4,
    productivity: 93.8,
    downtime: 3.6,
    output: 4400,
    quality: 99.4,
    status: "good",
    deltaFromTarget: 3.4,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
    equipmentImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop",
    ],
  },
];

export const alertsData: AlertData[] = [
  {
    id: "alert-1",
    timestamp: "2024-01-15T14:32:00Z",
    type: "failure",
    severity: "high",
    plant: "Charlotte Facility",
    line: "Line 3",
    message: "Conveyor belt motor failure detected",
    status: "active",
    equipmentPhoto:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
  },
  {
    id: "alert-2",
    timestamp: "2024-01-15T14:28:00Z",
    type: "quality",
    severity: "medium",
    plant: "Detroit Assembly",
    line: "Line 1",
    message: "Quality threshold breach - 3 consecutive defects",
    status: "acknowledged",
    equipmentPhoto:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=200&fit=crop",
  },
  {
    id: "alert-3",
    timestamp: "2024-01-15T14:15:00Z",
    type: "maintenance",
    severity: "low",
    plant: "Austin Manufacturing",
    line: "Line 2",
    message: "Scheduled maintenance due in 2 hours",
    status: "active",
    equipmentPhoto:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=300&h=200&fit=crop",
  },
  {
    id: "alert-4",
    timestamp: "2024-01-15T13:45:00Z",
    type: "production",
    severity: "medium",
    plant: "Phoenix Production",
    line: "Line 4",
    message: "Production rate 15% below target",
    status: "resolved",
    equipmentPhoto:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
  },
  {
    id: "alert-5",
    timestamp: "2024-01-15T13:22:00Z",
    type: "failure",
    severity: "high",
    plant: "Seattle Operations",
    line: "Line 1",
    message: "Temperature sensor malfunction",
    status: "acknowledged",
    equipmentPhoto:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
  },
];

// Additional image data for enhanced TV dashboard
export const dashboardImages = {
  companyLogo:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop",
  facilityOverview:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
  controlRoom:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
  productionLine:
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=300&fit=crop",
  qualityControl:
    "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=300&fit=crop",
  maintenanceTeam:
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop",
  backgroundPattern:
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&h=1080&fit=crop&crop=center",
};

export const aiInsights: AIInsight[] = [
  {
    id: "insight-1",
    type: "prediction",
    title: "Potential Equipment Failure",
    description:
      "Line 3 at Charlotte Facility shows vibration patterns indicating bearing failure within 48 hours.",
    confidence: 87,
    impact: "high",
    actionRequired: true,
    timestamp: "2024-01-15T14:30:00Z",
  },
  {
    id: "insight-2",
    type: "recommendation",
    title: "Optimize Production Schedule",
    description:
      "Shifting 200 units from Detroit to Phoenix could improve overall OEE by 2.3%.",
    confidence: 92,
    impact: "medium",
    actionRequired: false,
    timestamp: "2024-01-15T14:25:00Z",
  },
  {
    id: "insight-3",
    type: "summary",
    title: "Daily Performance Summary",
    description:
      "Overall performance down 1.8% due to Charlotte facility issues. Phoenix exceeding targets.",
    confidence: 95,
    impact: "medium",
    actionRequired: false,
    timestamp: "2024-01-15T14:00:00Z",
  },
  {
    id: "insight-4",
    type: "alert",
    title: "Quality Trend Alert",
    description:
      "Quality scores trending down across 3 facilities. Root cause analysis suggests supplier issue.",
    confidence: 78,
    impact: "high",
    actionRequired: true,
    timestamp: "2024-01-15T13:45:00Z",
  },
];

export const sparklineData = {
  oee: [82, 84, 83, 85, 84, 86, 84, 83, 85, 84],
  productivity: [89, 91, 90, 92, 93, 91, 92, 94, 93, 93],
  output: [
    14800, 15200, 15100, 15800, 15600, 15900, 15400, 15200, 15600, 15420,
  ],
};

export const filterOptions = {
  plants: plantsData.map((plant) => ({ value: plant.id, label: plant.name })),
  shifts: [
    { value: "day", label: "Day Shift" },
    { value: "night", label: "Night Shift" },
    { value: "all", label: "All Shifts" },
  ],

  productFamilies: [
    { value: "automotive", label: "Automotive" },
    { value: "electronics", label: "Electronics" },
    { value: "industrial", label: "Industrial" },
    { value: "consumer", label: "Consumer Goods" },
  ],

  timeRanges: [
    { value: "1h", label: "Last Hour" },
    { value: "8h", label: "Last 8 Hours" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
  ],
};

// Helper function to get plant image by ID
export const getPlantImage = (plantId: string): string | undefined => {
  const plant = plantsData.find((p) => p.id === plantId);
  return plant?.imageUrl;
};

// Helper function to get equipment images for a plant
export const getPlantEquipmentImages = (plantId: string): string[] => {
  const plant = plantsData.find((p) => p.id === plantId);
  return plant?.equipmentImages || [];
};

// Helper function to get alert equipment photo
export const getAlertEquipmentPhoto = (alertId: string): string | undefined => {
  const alert = alertsData.find((a) => a.id === alertId);
  return alert?.equipmentPhoto;
};
