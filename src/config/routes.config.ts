import { lazy } from "react";

// Lazy load components for better performance
const DashboardPage = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const DesignSystemPreview = lazy(() => import("../pages/DesignPreview"));

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
    path: "/dashboard",
    component: DashboardPage,
    protected: true,
    roles: ["CEO", "COO", "CFO", "VP_Production", "VP_SupplyChain"],
  },

  {
    path: "/design",
    component: DesignSystemPreview,
    protected: false,
    hidden: true,
  },
];
