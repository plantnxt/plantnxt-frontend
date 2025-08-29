# PlantNxt Frontend - Application Render Flow

## 📋 Table of Contents

1. [Application Entry Point](#application-entry-point)
2. [Authentication System](#authentication-system)
3. [Theme System](#theme-system)
4. [Routing Architecture](#routing-architecture)
5. [Component Hierarchy](#component-hierarchy)
6. [Styling & Infrastructure](#styling--infrastructure)
7. [Development Workflow](#development-workflow)

---

## 🚀 Application Entry Point

### 1. `index.html`

- **Location**: `/public/index.html`
- **Purpose**: HTML entry point for the React application
- **Key Elements**:
  - Mounts React app at `<div id="root"></div>`
  - Loads `src/main.tsx` as the JavaScript entry point
  - Sets up basic HTML structure and meta tags

### 2. `src/main.tsx`

- **Purpose**: React application bootstrap
- **Functionality**:
  - Creates React root using `createRoot()`
  - Renders the main `<App />` component
  - Imports global styles from `src/index.css`

---

## 🔐 Authentication System

### Architecture Overview

The authentication system is split into three files for optimal Fast Refresh compatibility:

### 1. `src/hooks/auth-context.ts`

- **Purpose**: Defines the authentication context interface
- **Exports**: `AuthContext` (React Context)
- **Type**: TypeScript interface for auth state

### 2. `src/hooks/AuthContext.tsx`

- **Purpose**: Authentication provider component
- **Exports**: `AuthProvider` component
- **Functionality**:
  - Manages user login/logout state
  - Stores user data in localStorage
  - Provides authentication methods to child components
  - Uses React Context API for global state management

### 3. `src/hooks/useAuth.tsx`

- **Purpose**: Custom hook for accessing auth context
- **Exports**: `useAuth()` hook
- **Functionality**:
  - Provides easy access to auth context
  - Includes error handling for context usage
  - Returns user state and auth methods

### 4. `src/components/ProtectedRoute.tsx`

- **Purpose**: Route protection component
- **Functionality**:
  - Checks if user is authenticated
  - Redirects to `/login` if not authenticated
  - Renders protected content if authenticated

---

## 🌓 Theme System

### Architecture Overview

The theme system is split into three files for optimal Fast Refresh compatibility and provides light/dark mode functionality:

### 1. `src/hooks/theme-context.ts`

- **Purpose**: Defines the theme context interface
- **Exports**: `ThemeContext` (React Context)
- **Type**: TypeScript interface for theme state

### 2. `src/hooks/ThemeProvider.tsx`

- **Purpose**: Theme provider component
- **Exports**: `ThemeProvider` component
- **Functionality**:
  - Manages light/dark theme state
  - Stores theme preference in localStorage
  - Detects system theme preference
  - Applies theme classes to document root
  - Provides theme switching methods

### 3. `src/hooks/useTheme.tsx`

- **Purpose**: Custom hook for accessing theme context
- **Exports**: `useTheme()` hook
- **Functionality**:
  - Provides easy access to theme context
  - Includes error handling for context usage
  - Returns theme state and switching methods

### 4. `src/components/ThemeToggle.tsx`

- **Purpose**: Theme toggle button component
- **Functionality**:
  - Renders sun/moon icons based on current theme
  - Handles theme switching on click
  - Provides accessible button with proper ARIA labels

### Theme Selection Logic

The theme selection follows this priority order:

1. **User Preference**: Checks localStorage for saved theme choice
2. **System Preference**: Falls back to OS theme (`prefers-color-scheme`)
3. **Default**: Uses light mode if no preference found

### CSS Theme Variables

Theme colors are defined in `src/index.css`:

#### Light Mode (Default)

- **Background Gradient**: Slate-50 → Blue-50 → Indigo-100
- **Primary Colors**: Blue-based palette
- **Text Colors**: Dark gray tones

#### Dark Mode

- **Background Gradient**: Slate-900 → Slate-800 → Slate-700
- **Primary Colors**: Adjusted for dark backgrounds
- **Text Colors**: Light gray tones

### Theme Integration Points

- **App.tsx**: Wraps entire app with `ThemeProvider`
- **Dashboard Headers**: Include `ThemeToggle` component
- **Global CSS**: Uses CSS variables for theme-aware styling

---

## 🗺️ Routing Architecture

### Router Setup (`src/App.tsx`)

The application uses React Router v6 with the following structure:

```typescript
<AuthProvider>
	<Router>
		<Routes>{/* Route definitions */}</Routes>
	</Router>
</AuthProvider>
```

### Route Definitions

| URL Path              | Component                | Protection   | Description                  |
| --------------------- | ------------------------ | ------------ | ---------------------------- |
| `/`                   | `Navigate`               | None         | Redirects to `/dashboard`    |
| `/login`              | `LoginPageNew`           | None         | Authentication page          |
| `/dashboard`          | `DashboardPage`          | ✅ Protected | Main application dashboard   |
| `/demo/manufacturing` | `ManufacturingDashboard` | ✅ Protected | Demo manufacturing dashboard |

### Router Components Explained

#### 🔐 **AuthProvider**

- **Purpose**: Provides authentication context to entire application
- **Scope**: Wraps entire app for global auth state access
- **Key Features**:
  - User state management
  - Login/logout functionality
  - localStorage persistence
  - Context-based state sharing

#### 🌐 **Router (BrowserRouter)**

- **Purpose**: Enables client-side routing
- **Features**:
  - URL-based navigation without page reloads
  - Browser history management
  - HTML5 History API integration
  - Deep linking support

#### 🗺️ **Routes**

- **Purpose**: Container for route definitions
- **Functionality**:
  - Groups multiple Route components
  - Handles route matching logic
  - Manages component rendering based on URL

#### 🛣️ **Route**

- **Purpose**: Individual route definition
- **Properties**:
  - `path`: URL pattern to match
  - `element`: Component to render
  - `children`: Nested routes (if applicable)

#### 🛡️ **ProtectedRoute**

- **Purpose**: Authentication guard for routes
- **Behavior**:
  - Intercepts route access
  - Validates authentication status
  - Redirects unauthenticated users
  - Renders protected content for authenticated users

#### 🔄 **Navigate**

- **Purpose**: Programmatic navigation/redirects
- **Usage**: Redirects users between routes
- **Options**: `replace` prop for history management

---

## 🏗️ Component Hierarchy

### Page Components

#### 1. `src/pages/LoginPageNew.tsx`

- **Purpose**: Modern authentication interface
- **Features**:
  - SSO integration (Google, Microsoft, Okta)
  - Email/password authentication
  - Remember me functionality
  - Password visibility toggle
  - Responsive design with shadcn/ui components

#### 2. `src/pages/DashboardPage.tsx`

- **Purpose**: Main application dashboard
- **Features**:
  - Overview of key metrics
  - Navigation to demo pages
  - Basic dashboard layout
  - Quick access to manufacturing demo

#### 3. `src/pages/demo/manufacturing-dashboard.tsx`

- **Purpose**: Advanced manufacturing dashboard demo
- **Features**:
  - Real-time metrics display
  - AI insights panel
  - Plant comparison grid
  - Live alerts feed
  - Natural language query interface
  - Responsive design for mobile/desktop

### Supporting Components

#### UI Components (`src/components/ui/`)

- **Purpose**: Reusable UI primitives
- **Components**: Button, Card, Input, Label, Dialog, Select, Badge, etc.
- **Framework**: shadcn/ui with Radix UI primitives

#### Demo Components (`src/pages/demo/components/`)

- **Purpose**: Specialized dashboard components
- **Components**:
  - `MetricCardsManager`: Dynamic metric display
  - `AIInsightsPanel`: AI-powered insights
  - `PlantComparisonGrid`: Multi-plant comparison
  - `NaturalLanguageQuery`: Query interface
  - `LiveAlertsFeed`: Real-time alerts
  - `DashboardFilters`: Filter controls

---

## 🎨 Styling & Infrastructure

### CSS Architecture

#### `src/index.css`

- **Purpose**: Global styles and design tokens
- **Features**:
  - Tailwind CSS directives
  - shadcn/ui CSS variables
  - Custom design system tokens
  - Dark/light theme support
  - Responsive utilities

### Build Configuration

#### `vite.config.ts`

- **Purpose**: Vite build and development configuration
- **Features**:
  - Development server setup
  - Hot Module Replacement (HMR)
  - Build optimization
  - Port and host configuration
  - Source map settings

#### `tailwind.config.js`

- **Purpose**: Tailwind CSS configuration
- **Features**:
  - Custom color palette
  - Component variants
  - Animation utilities
  - shadcn/ui integration

#### `postcss.config.js`

- **Purpose**: PostCSS processing configuration
- **Features**:
  - Tailwind CSS processing
  - Autoprefixer support
  - CSS optimization

---

## 🛠️ Development Workflow

### Development Scripts

#### `start.sh`

- **Purpose**: Automated development server startup
- **Features**:
  - Starts Vite development server
  - Automatically opens browser
  - Waits for server readiness
  - Supports custom domain (`app.plantnxt.com`)

#### `package.json` Scripts

- `npm run dev`: Starts development server
- `npm run build`: Creates production build
- `npm run preview`: Previews production build
- `npm start`: Runs start.sh script

### Development Tools

#### VS Code Configuration (`.vscode/settings.json`)

- **Purpose**: IDE optimization
- **Features**:
  - Word wrap enabled by default
  - Format on save
  - Consistent indentation
  - TypeScript support

#### ESLint Configuration (`eslint.config.js`)

- **Purpose**: Code quality and consistency
- **Features**:
  - TypeScript linting
  - React best practices
  - Import/export validation
  - Multiple tsconfig support

---

## 🔄 Data Flow Summary

```
1. User visits URL
   ↓
2. Router matches path to route
   ↓
3. ProtectedRoute checks authentication
   ↓
4. Component renders with auth context
   ↓
5. User interacts with application
   ↓
6. State updates trigger re-renders
```

## 📚 Key Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Context API
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Development**: Hot Module Replacement (HMR)

---

_Last Updated: December 2024_
_Version: 1.0.0_
