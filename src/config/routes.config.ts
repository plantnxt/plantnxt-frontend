import { lazy } from "react";

// Lazy load components for better performance
const DashboardPage = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const DesignSystemPreview = lazy(() => import("../pages/DesignPreview"));

// Operations Layer 1
const OEETrackingPage = lazy(() => import("../pages/OEE"));
const ProductionPage = lazy(() => import("../pages/Production"));
const QualityPage = lazy(() => import("../pages/Quality"));
const MaintenancePage = lazy(() => import("../pages/Maintenance"));
const AlertsPage = lazy(() => import("../pages/Alerts"));

// Decision Intelligence Layer
const CopilotPage = lazy(() => import("../pages/Copilot"));
const FinancialImpactPage = lazy(() => import("../pages/FinancialImpact"));
const ScenarioPlanningPage = lazy(() => import("../pages/ScenarioPlanning"));
const OptimizationPage = lazy(() => import("../pages/Optimization"));

// Financial Layer
const StatementsPage = lazy(() => import("../pages/Statements"));
const ForecastingPage = lazy(() => import("../pages/Forecasting"));

// Strategic & Governance Layer
const StrategicPlanningPage = lazy(() => import("../pages/StrategicPlanning"));
const ReportsCompliancePage = lazy(() => import("../pages/ReportsCompliance"));
const SustainabilityPage = lazy(() => import("../pages/Sustainability"));

// Admin & Ecosystem Layer
const OrganizationPage = lazy(() => import("../pages/Organization"));
const UsersRolesPage = lazy(() => import("../pages/UsersRoles"));
const IntegrationsPage = lazy(() => import("../pages/Integrations"));
const SettingsPage = lazy(() => import("../pages/Settings"));

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  protected?: boolean;
  roles?: string[]; // optional role-based access
  hidden?: boolean; // for internal/dev routes
}

export const routes: AppRoute[] = [
  {
    path: "/login",
    component: LoginPage,
    protected: false,
  },
  {
    path: "/",
    component: DashboardPage,
    protected: true,
    roles: ["CEO", "COO", "CFO", "VP_Production", "VP_SupplyChain"],
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    protected: true,
    roles: ["CEO", "COO", "CFO", "VP_Production", "VP_SupplyChain"],
  },

  // Operations Layer 1
  {
    path: "/oee",
    component: OEETrackingPage,
    protected: true,
  },
  {
    path: "/production",
    component: ProductionPage,
    protected: true,
  },
  {
    path: "/quality",
    component: QualityPage,
    protected: true,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    protected: true,
  },
  {
    path: "/alerts",
    component: AlertsPage,
    protected: true,
  },

  // Decision Intelligence Layer
  {
    path: "/copilot",
    component: CopilotPage,
    protected: true,
  },
  {
    path: "/financial-impact",
    component: FinancialImpactPage,
    protected: true,
  },
  {
    path: "/scenario-planning",
    component: ScenarioPlanningPage,
    protected: true,
  },
  {
    path: "/optimization",
    component: OptimizationPage,
    protected: true,
  },

  // Financial Layer
  {
    path: "/statements",
    component: StatementsPage,
    protected: true,
  },
  {
    path: "/forecasting",
    component: ForecastingPage,
    protected: true,
  },

  // Strategic & Governance Layer
  {
    path: "/strategic-planning",
    component: StrategicPlanningPage,
    protected: true,
  },
  {
    path: "/reports-compliance",
    component: ReportsCompliancePage,
    protected: true,
  },
  {
    path: "/sustainability",
    component: SustainabilityPage,
    protected: true,
  },

  // Admin & Ecosystem Layer
  {
    path: "/organization",
    component: OrganizationPage,
    protected: true,
  },
  {
    path: "/users-roles",
    component: UsersRolesPage,
    protected: true,
  },
  {
    path: "/integrations",
    component: IntegrationsPage,
    protected: true,
  },
  {
    path: "/settings",
    component: SettingsPage,
    protected: true,
  },

  {
    path: "/design",
    component: DesignSystemPreview,
    protected: false,
    hidden: true,
  },
];
