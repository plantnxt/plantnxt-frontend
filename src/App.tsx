import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "./hooks/AuthContext";
import { ThemeProvider } from "./hooks/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { routes } from "./config/routes.config";

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {routes.map(({ path, component: Component, protected: isProtected }) => {
                const wrappedElement = isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                );

                return <Route key={path} path={path} element={wrappedElement} />;
              })}

              {/* 🌍 Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* ⚠️ Catch-all 404 */}
              <Route
                path="*"
                element={
                  <h1 className="text-center mt-10 text-2xl text-red-500">
                    404 - Page Not Found
                  </h1>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
