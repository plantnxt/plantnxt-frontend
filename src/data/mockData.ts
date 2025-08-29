export interface User {
  id: string;
  username: string;
  password: string;
  role: 'CEO' | 'COO' | 'CFO' | 'Plant Head' | 'VP Production' | 'VP Supply Chain';
  name: string;
  email: string;
}

export interface Plant {
  id: string;
  name: string;
  location: string;
  type: string;
}

export interface OEEMetrics {
  date: string;
  plantId: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  downtime: number;
  production: number;
}

export interface OEEForecast {
  date: string;
  predictedOEE: number;
  confidence: number;
}

export interface ImpactAnalysis {
  scenario: string;
  currentOEE: number;
  projectedOEE: number;
  impact: {
    revenue: number;
    cost: number;
    profit: number;
  };
}

// Mock user credentials for client-side authentication
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'dharma@plantnxt.com',
    password: '123',
    role: 'CEO',
    name: 'Dharmendiran Ramasamy',
    email: 'dharma@plantnxt.com'
  },
  {
    id: '2',
    username: 'ramya@plantnxt.com',
    password: 'coo123',
    role: 'COO',
    name: 'Ramya Chandrasekaran',
    email: 'ramya@plantnxt.com'
  },
  {
    id: '3',
    username: 'founders@plantnxt.com',
    password: 'plant123',
    role: 'Plant Head',
    name: 'Mike Chen',
    email: 'founders@plantnxt.com'
  }
];

// Mock plants data
export const mockPlants: Plant[] = [
  {
    id: 'plant-001',
    name: 'Automotive Assembly Plant A',
    location: 'Detroit, MI',
    type: 'Assembly'
  },
  {
    id: 'plant-002',
    name: 'Engine Manufacturing Plant B',
    location: 'Chicago, IL',
    type: 'Manufacturing'
  }
];

// Mock OEE data for the last 30 days
export const mockOEEData: OEEMetrics[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));

  const baseOEE = 75 + Math.random() * 15; // OEE between 75-90%
  const availability = 85 + Math.random() * 10;
  const performance = 80 + Math.random() * 15;
  const quality = 90 + Math.random() * 8;

  return {
    date: date.toISOString().split('T')[0],
    plantId: 'plant-001',
    availability: Math.round(availability * 100) / 100,
    performance: Math.round(performance * 100) / 100,
    quality: Math.round(quality * 100) / 100,
    oee: Math.round(baseOEE * 100) / 100,
    downtime: Math.round((100 - availability) * 10) / 10,
    production: Math.round(1000 + Math.random() * 500)
  };
});

// Mock OEE forecast for next 30 days
export const mockOEEForecast: OEEForecast[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);

  return {
    date: date.toISOString().split('T')[0],
    predictedOEE: Math.round((78 + Math.random() * 12) * 100) / 100,
    confidence: Math.round((85 + Math.random() * 10) * 100) / 100
  };
});

// Mock impact analysis scenarios
export const mockImpactAnalysis: ImpactAnalysis[] = [
  {
    scenario: '5% Increase in Downtime',
    currentOEE: 82.5,
    projectedOEE: 78.4,
    impact: {
      revenue: -125000,
      cost: 15000,
      profit: -140000
    }
  },
  {
    scenario: '10% Improvement in Performance',
    currentOEE: 82.5,
    projectedOEE: 87.2,
    impact: {
      revenue: 180000,
      cost: -8000,
      profit: 188000
    }
  },
  {
    scenario: 'Quality Improvement to 98%',
    currentOEE: 82.5,
    projectedOEE: 85.1,
    impact: {
      revenue: 95000,
      cost: -12000,
      profit: 107000
    }
  }
];

// Helper function to authenticate user
export const authenticateUser = (username: string, password: string): User | null => {
  return mockUsers.find(user =>
    user.username === username && user.password === password
  ) || null;
};

// Helper function to get OEE data for a specific period
export const getOEEData = (plantId: string, days: number = 30): OEEMetrics[] => {
  return mockOEEData
    .filter(data => data.plantId === plantId)
    .slice(-days);
};

// Helper function to get current OEE
export const getCurrentOEE = (plantId: string): OEEMetrics | null => {
  const data = mockOEEData.filter(d => d.plantId === plantId);
  return data.length > 0 ? data[data.length - 1] : null;
};
