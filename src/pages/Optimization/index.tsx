
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function OptimizationPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimization Opportunities</h1>
        <p className="text-gray-600">AI-driven workload, capacity, and scheduling improvements</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Optimization Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Coming Soon</h2>
              <p className="text-gray-500">Optimization features will be available in Phase 2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
