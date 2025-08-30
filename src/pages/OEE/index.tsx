
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Target } from 'lucide-react';

export default function OEETrackingPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">OEE Tracking</h1>
        <p className="text-gray-600">Monitor availability, performance, and quality in real time</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            OEE Tracking Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Coming Soon</h2>
              <p className="text-gray-500">OEE Tracking features will be available in Phase 1</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
