
import { AppLayout } from '../../components/layout/AppLayout';
import {
  // getCurrentOEE,
  // getOEEData,
  // mockOEEForecast,
  mockImpactAnalysis,
  // mockPlants
} from '../../data/mockData';
import NaturalLanguageQuery from './NaturalLanguageQuery';
import DashboardFilters from './DashboardFilters';
import MetricCardsManager from './KeyMetrics';
import { aiInsights, alertsData, plantsData, sparklineData, topLevelMetrics } from './ManufacturingData';
import AIInsightsPanel from './AiInsightsPanel';
import PlantComparisonGrid from './PlantComparisonGrid';
import LiveAlertsFeed from './LiveAlertsFeed';



// Convert all metrics to MetricCardsManager format - single row
const initialMetricCards = [
  {
    id: "oee",
    title: "Overall Equipment Effectiveness",
    value: topLevelMetrics.oee.value,
    target: topLevelMetrics.oee.target,
    trend: topLevelMetrics.oee.trend,
    change: topLevelMetrics.oee.change,
    unit: topLevelMetrics.oee.unit,
    sparklineData: sparklineData.oee,
  },
  {
    id: "productivity",
    title: "Productivity",
    value: topLevelMetrics.productivity.value,
    target: topLevelMetrics.productivity.target,
    trend: topLevelMetrics.productivity.trend,
    change: topLevelMetrics.productivity.change,
    unit: topLevelMetrics.productivity.unit,
    sparklineData: sparklineData.productivity,
  },
  {
    id: "downtime",
    title: "Downtime",
    value: topLevelMetrics.downtime.value,
    target: topLevelMetrics.downtime.target,
    trend: topLevelMetrics.downtime.trend,
    change: topLevelMetrics.downtime.change,
    unit: topLevelMetrics.downtime.unit,
  },
  {
    id: "output",
    title: "Output",
    value: topLevelMetrics.output.value,
    target: topLevelMetrics.output.target,
    trend: topLevelMetrics.output.trend,
    change: topLevelMetrics.output.change,
    unit: topLevelMetrics.output.unit,
    sparklineData: sparklineData.output,
  },
  {
    id: "quality",
    title: "Quality",
    value: topLevelMetrics.quality.value,
    target: topLevelMetrics.quality.target,
    trend: topLevelMetrics.quality.trend,
    change: topLevelMetrics.quality.change,
    unit: topLevelMetrics.quality.unit,
  },
  {
    id: "orderBacklog",
    title: "Order Backlog",
    value: topLevelMetrics.orderBacklog.value,
    target: topLevelMetrics.orderBacklog.target,
    trend: topLevelMetrics.orderBacklog.trend,
    change: topLevelMetrics.orderBacklog.change,
    unit: topLevelMetrics.orderBacklog.unit,
  },
  {
    id: "forecastAccuracy",
    title: "Forecast Accuracy",
    value: topLevelMetrics.forecastAccuracy.value,
    target: topLevelMetrics.forecastAccuracy.target,
    trend: topLevelMetrics.forecastAccuracy.trend,
    change: topLevelMetrics.forecastAccuracy.change,
    unit: topLevelMetrics.forecastAccuracy.unit,
  },
];

const DashboardPage = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  // const [selectedPlant, setSelectedPlant] = useState(mockPlants[0]);
  // const [chatMessage, setChatMessage] = useState('');
  // const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'ai', message: string, timestamp: Date; }>>([]);
  // const [isLoading, setIsLoading] = useState(false);


  // Update current time every second
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // const currentOEE = getCurrentOEE(selectedPlant.id);
  // const oeeData = getOEEData(selectedPlant.id, 7); // Last 7 days
  // const recentForecast = mockOEEForecast.slice(0, 7); // Next 7 days

  // const handleChatSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!chatMessage.trim()) return;

  //   const userMessage = chatMessage;
  //   setChatMessage('');
  //   setIsLoading(true);

  //   // Add user message to chat
  //   setChatHistory(prev => [...prev, {
  //     type: 'user',
  //     message: userMessage,
  //     timestamp: new Date()
  //   }]);

  //   // Simulate AI response
  //   setTimeout(() => {
  //     let aiResponse = '';

  //     if (userMessage.toLowerCase().includes('oee')) {
  //       if (userMessage.toLowerCase().includes('next month') || userMessage.toLowerCase().includes('forecast')) {
  //         const avgForecast = recentForecast.reduce((sum, f) => sum + f.predictedOEE, 0) / recentForecast.length;
  //         aiResponse = `Based on our analysis, your OEE is projected to average ${avgForecast.toFixed(1)}% over the next 30 days. This represents a ${(avgForecast - (currentOEE?.oee || 0)).toFixed(1)}% change from your current performance.`;
  //       } else {
  //         aiResponse = `Your current OEE is ${currentOEE?.oee}%. This breaks down to ${currentOEE?.availability}% availability, ${currentOEE?.performance}% performance, and ${currentOEE?.quality}% quality.`;
  //       }
  //     } else if (userMessage.toLowerCase().includes('downtime') && userMessage.toLowerCase().includes('profit')) {
  //       const impact = mockImpactAnalysis[0];
  //       aiResponse = `A 5% increase in downtime would reduce your OEE from ${impact.currentOEE}% to ${impact.projectedOEE}%, resulting in an estimated profit loss of $${Math.abs(impact.impact.profit).toLocaleString()}.`;
  //     } else if (userMessage.toLowerCase().includes('improve') || userMessage.toLowerCase().includes('recommendation')) {
  //       aiResponse = `Based on your current metrics, I recommend focusing on performance optimization. A 10% improvement in performance could increase your OEE to 87.2% and generate an additional $188,000 in profit.`;
  //     } else {
  //       aiResponse = `I can help you with OEE analysis, forecasting, and impact assessments. Try asking about your current OEE, future predictions, or how downtime affects profitability.`;
  //     }

  //     setChatHistory(prev => [...prev, {
  //       type: 'ai',
  //       message: aiResponse,
  //       timestamp: new Date()
  //     }]);
  //     setIsLoading(false);
  //   }, 1000);
  // };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuery = (query: string) => {
    console.log("Processing query:", query);
    // In a real implementation, this would trigger AI processing
  };




  return (
    <AppLayout
      title="Intelligent Control Tower"
      subtitle="Your AI Copilot for Operational Clarity & Confident Decisions"
    >
      <div className="space-y-6">

        {/* Natural Language Query */}
        <div className="mb-6">
          <NaturalLanguageQuery onQuery={handleQuery} />
        </div>

        {/* Impact Analysis */}
        <div className="card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Impact Analysis Scenarios</h3>
          <div className="space-y-4">
            {mockImpactAnalysis.map((scenario, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                <h4 className="font-medium text-sm  text-gray-900 dark:text-gray-100 mb-2">{scenario.scenario}</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-gray-600 dark:text-gray-400">OEE Change:</span>
                    <span className={`font-medium ${scenario.projectedOEE > scenario.currentOEE ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {scenario.currentOEE}% → {scenario.projectedOEE}%
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <span className="text-gray-600 dark:text-gray-400">Revenue Impact:</span>
                    <span className={`font-medium ${scenario.impact.revenue > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(scenario.impact.revenue)}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <span className="text-gray-600 dark:text-gray-400">Profit Impact:</span>
                    <span className={`font-medium ${scenario.impact.profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(scenario.impact.profit)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header Section with Time and Filters */}
        {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"> */}
        {/* <div>
            <h1 className="text-3xl font-bold text-gray-900">Plant Pulse</h1>
            <p className="text-gray-600 mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {currentTime.toLocaleTimeString()}
            </p>
          </div> */}

        {/* <div className="lg:w-2/3"> */}
        <DashboardFilters onFiltersChange={() => { }} />
        {/* </div> */}
        {/* </div> */}

        {/* All Metrics in Single Scrollable Row */}
        <MetricCardsManager
          initialCards={initialMetricCards}
          onCardsChange={() => { }}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - AI Insights */}
          <div className="xl:col-span-1">
            <AIInsightsPanel insights={aiInsights} />
          </div>

          {/* Middle Column - Plant Comparison */}
          <div className="xl:col-span-1">
            <PlantComparisonGrid plants={plantsData} />
          </div>

          {/* Right Column - Live Alerts */}
          <div className="xl:col-span-1">
            <LiveAlertsFeed alerts={alertsData} />
          </div>
        </div>

        {/* AI Copilot Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              AI Copilot Suggestions
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />

              <span className="text-sm text-blue-700">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Priority Focus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Charlotte Facility requires immediate attention - equipment
                failure risk detected.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                View Details →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Optimization Opportunity
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Redistribute 200 units from Detroit to Phoenix for 2.3% OEE
                improvement.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                Apply Suggestion →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Predictive Insight
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Quality trend analysis suggests supplier issue affecting 3
                facilities.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                Investigate →
              </button>
            </div>
          </div>
        </div>




        {/* AI Chat Sidebar */}
        {/* <div className="card h-fit">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">AI Copilot</h3>
            </div>

            {/* Chat History
            <div className="h-96 overflow-y-auto mb-4 space-y-3">
              {chatHistory.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>Ask me about your OEE, forecasts, or impact analysis!</p>
                </div>
              )}

              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${chat.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}>
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {chat.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input
          <form onSubmit={handleChatSubmit} className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about OEE, forecasts..."
              className="input-field flex-1 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !chatMessage.trim()}
              className="btn-primary px-3 py-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div> */}

      </div>
    </AppLayout >
  );
};

export default DashboardPage;
