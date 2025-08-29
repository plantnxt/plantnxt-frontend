// Application configuration constants
export const APP_CONFIG = {
  // App metadata
  name: "PlantNxt",
  version: "1.0.0",
  description: "Manufacturing Intelligence Copilot",

  // API configuration
  api: {
    baseUrl: process.env.NODE_ENV === 'production'
      ? 'https://api.plantnxt.com'
      : 'http://app.plantnxt.com:3000',
    timeout: 10000,
  },

  // Feature flags
  features: {
    darkMode: true,
    sso: true,
    analytics: false,
  },

  // Theme configuration
  theme: {
    primaryColor: "#007C91",
    borderRadius: "0.5rem",
  },

  // Route configuration
  routes: {
    defaultRedirect: "/dashboard",
    loginPath: "/login",
    protectedPaths: ["/dashboard", "/demo"],
  },
};

export default APP_CONFIG;
