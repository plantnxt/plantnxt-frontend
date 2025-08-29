# PlantNxt Frontend

Manufacturing Agentic Copilot - Frontend Application

## 🌐 Domain Setup

- **Production Domain**: `app.plantnxt.com`
- **Development**: `http://localhost:5173/`

## 🚀 Quick Start

### Development (Auto-Open Browser)

```bash
npm install
npm run dev-open    # Starts server and opens browser automatically
# OR
npm start           # Uses the start.sh script
```

### Development (Manual)

```bash
npm install
npm run dev         # Starts server only
# Then manually open: http://localhost:5173/
```

### Production Build

```bash
npm run build
# Output: ./dist/ (ready for deployment)
```

## 📋 Current Status

✅ **Completed (Step 1 - UI MVP)**

- React + TypeScript + Tailwind CSS setup
- Client-side authentication with mock data
- Login page with demo credentials
- Dashboard with OEE metrics and charts
- AI Copilot chat interface
- Responsive design
- Production build configuration
- Auto-browser opening on startup

🔄 **Next Steps (Step 2 - Backend)**

- Backend microservices (Auth, Data, AI layers)
- Real database integration
- API endpoints for OEE data
- Production deployment to `app.plantnxt.com`

## 🔐 Demo Credentials

- **CEO**: `ceo` / `ceo123`
- **COO**: `coo` / `coo123`
- **Plant Head**: `planthead` / `plant123`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   ├── hooks/         # Custom React hooks
│   ├── data/          # Mock data and interfaces
│   └── utils/         # Utility functions
├── dist/              # Production build output
├── start.sh           # Auto-start script
├── nginx.conf         # Web server configuration
├── deploy.sh          # Deployment script
└── DEPLOYMENT.md      # Detailed deployment guide
```

## 📁 File Naming & Organization Conventions

### **Component & Page Files**

#### **✅ PascalCase for Components**

```typescript
// Component files use PascalCase
LoginPage.tsx;
DashboardPage.tsx;
DesignSystemPreview.tsx;
```

#### **✅ Folder Organization with Index Files**

```typescript
// pages/Login/index.tsx
export default function LoginPage() { ... }

// pages/Dashboard/index.tsx
export default function DashboardPage() { ... }

// pages/DesignPreview/index.tsx
export default function DesignSystemPreview() { ... }
```

#### **✅ Clean Import Pattern**

```typescript
// Import using folder name (resolves to index.tsx)
import LoginPage from '../pages/Login';
import DashboardPage from '../pages/Dashboard';
import DesignSystemPreview from '../pages/DesignPreview';
```

### **File Naming Standards**

#### **React Components**

- **PascalCase**: `LoginPage.tsx`, `DashboardPage.tsx`
- **Matches Component Name**: File name = Component name
- **Index Files**: Use `index.tsx` in folders for clean imports

#### **Utility Files**

- **camelCase**: `useAuth.tsx`, `mockData.ts`
- **Descriptive**: `formatCurrency.ts`, `apiClient.ts`

#### **Configuration Files**

- **kebab-case**: `tailwind.config.js`, `postcss.config.js`
- **Standard**: `package.json`, `tsconfig.json`

### **Folder Structure Benefits**

#### **✅ Advantages of Our Approach**

- **Clean Imports**: `import LoginPage from '../pages/Login'`
- **Logical Grouping**: Related files in same folder
- **Scalability**: Easy to add more files per module
- **React Convention**: Standard pattern in React ecosystem
- **IDE Support**: Better autocomplete and navigation

#### **❌ Alternative (Not Recommended)**

```typescript
// Verbose imports without index files
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
```

### **Why PascalCase for Components?**

#### **✅ Pros**

- **React Convention**: Matches React component naming
- **TypeScript Friendly**: Aligns with TypeScript interfaces
- **IDE Support**: Better autocomplete in VS Code/WebStorm
- **Industry Standard**: What React developers expect
- **Clear Identity**: `LoginPage` immediately indicates React component

#### **❌ snake_case Alternative**

- **React Mismatch**: Components are PascalCase, files are snake_case
- **Import Confusion**: `import LoginPage from './login_page'` feels inconsistent
- **IDE Issues**: Less optimal autocomplete for React components

### **Index File Pattern**

#### **✅ Best Practice**

```typescript
// pages/Login/index.tsx
export default function LoginPage() { ... }

// Usage
import LoginPage from '../pages/Login'  // Clean!
```

#### **Module Boundaries**

- Each folder becomes a logical module
- Index file represents the main export
- Related files can be added to the same folder
- Clean separation of concerns

## 🌍 Deployment to app.plantnxt.com

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Upload to server:**

   - Upload `./dist/` contents to your web server
   - Configure nginx using provided `nginx.conf`

3. **Configure DNS:**

   - Point `app.plantnxt.com` to your server IP

4. **SSL Certificate:**
   ```bash
   sudo certbot --nginx -d app.plantnxt.com
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Custom CSS (Tailwind-inspired)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Static files (nginx/Apache)

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Cursor Companion](../CURSOR-COMPANION.md) - Developer Q&A
- [Project README](../README.md) - Overall project vision

---

**PlantNxt** - Shifting leaders from dashboards to decisions

## Addltional - to be appropriately merged with above

## 🔑 Key Concepts

### 1. **Provider Structure & Best Practices**

The application follows React best practices with a clean provider hierarchy:

#### **main.tsx - Entry Point**

```tsx
// Clean and minimal - only handles React rendering
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

#### **App.tsx - Complete Provider Stack**

```tsx
// All providers and routing logic in one place
<ThemeProvider>
	<AuthProvider>
		<Router>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>{/* All routes */}</Routes>
			</Suspense>
		</Router>
	</AuthProvider>
</ThemeProvider>
```

#### **Provider Order (Correct)**

```tsx
ThemeProvider (outermost - affects entire app)
  ↓
AuthProvider (authentication context)
  ↓
Router (routing)
  ↓
Suspense (loading states)
  ↓
Routes (actual components)
```

#### **Benefits**

- ✅ **No provider conflicts**
- ✅ **Cleaner code structure**
- ✅ **Easier debugging**
- ✅ **Better performance** (no duplicate providers)
- ✅ **Follows React best practices**

### 2. **Theming**

- Light/Dark mode supported via CSS variables in `index.css`.
- ThemeProvider allows switching and future brand customization.
- Global teal gradient background using CSS variables.

### 3. **Authentication**

- AuthProvider manages login state, JWT storage, role-based access.
- Example: CEO, COO, Production VP each get different landing views.
- Protected routes with automatic redirects.

### 4. **Routing & Lazy Loading**

- Routes are loaded on demand with `React.lazy` + `Suspense`.
- Improves performance for large enterprise modules.
- Centralized route configuration in `routes.config.ts`.

### 5. **Error Handling**

- Wrapped with `ErrorBoundary` to catch runtime crashes.
- Fallback UI ensures users never see a blank screen.

### 6. **Deployment**

- Optimized static assets built via Vite → deployed to AWS S3 + CloudFront.
- Backend microservices hosted on Azure (Data, AI, Decision, Impact layers).

---

## 🎨 Brand Assets & Icons

### **Current Placeholder Icons**

The application currently uses placeholder icons that should be replaced with official brand assets:

#### **SSO Provider Icons**

- **Location**: `/public/icons/`
- **Files**:
  - `google.svg` - Google SSO button icon
  - `microsoft.svg` - Microsoft SSO button icon
- **Status**: ✅ Placeholder icons created with official colors
- **Action**: Replace with official brand-compliant versions

#### **App Icons**

- **Location**: `/public/icons/`
- **Files**:
  - `apple-touch-icon.svg` - iOS home screen icon (180x180)
  - `vite.svg` - Browser favicon (currently using Vite default)
- **Status**: ✅ Placeholder with PlantNxt "P" logo
- **Action**: Replace with official PlantNxt logo

#### **Web App Manifest**

- **Location**: `/public/manifest.json`
- **Status**: ✅ Configured with placeholder icon
- **Action**: Update icon references when brand assets are ready

### **Brand Asset Requirements**

When official brand assets are available, replace the following:

1. **Primary Logo**: Replace the "P" placeholder in `apple-touch-icon.svg`
2. **Favicon**: Replace `vite.svg` with PlantNxt favicon
3. **SSO Icons**: Ensure Google/Microsoft icons follow brand guidelines
4. **Color Scheme**: Update CSS variables in `src/index.css` if needed

### **Icon Specifications**

- **Apple Touch Icon**: 180x180px SVG (for iOS home screen)
- **Favicon**: 32x32px SVG (browser tab icon)
- **SSO Icons**: 24x24px SVG (displayed at 20x20px in buttons)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

```

src/
├── App.tsx # Root app with routes
├── main.tsx # Entry point
├── index.css # Tailwind + global CSS vars
├── components/ # Reusable UI components
│ ├── core/ # Loader, ErrorBoundary, Layout
│ └── ui/ # Buttons, Inputs, Cards
├── providers/ # Context Providers (Auth, Theme)
├── pages/ # Role-based pages (CEO, COO, etc.)
└── assets/ # Icons, logos, images
