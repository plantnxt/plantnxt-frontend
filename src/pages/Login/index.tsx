import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) navigate("/dashboard");
      else setError("Invalid email or password");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
            P
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PlantNxt</h1>
          <p className="mt-2 text-sm text-gray-600">
            AI Copilot for Operational Clarity & Confident Decisions
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 rounded-xl">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Sign in to your account
            </h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    prefix={<MailIcon className="h-5 w-5 text-gray-400" />}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    prefix={<LockIcon className="h-5 w-5 text-gray-400" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 font-medium rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or sign in with
                </span>
              </div>
            </div>

            {/* SSO */}
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full flex items-center gap-3"
              >
                <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-3"
              >
                <img
                  src="/icons/microsoft.svg"
                  alt="Microsoft"
                  className="h-5 w-5"
                />
                Microsoft
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-3"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
                  O
                </div>
                Okta
              </Button>
            </div>
          </CardContent>
          {/*
          <CardFooter className="flex justify-center">
            <p className="text-xs text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:text-primary/80"
              >
                Sign up
              </Link>
            </p>
          </CardFooter> */}
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © 2025 PlantNxt. All rights reserved.
        </p>
      </div>
    </div>
  );
}
