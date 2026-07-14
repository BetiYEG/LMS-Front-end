import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { getLogoUrl, getOrgName } from "@/utils/config";

import loginImage from "@/assets/images/photologin.jpg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logoUrl = getLogoUrl();
  const orgName = getOrgName();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("🚀 Attempting login with RTK Query...");
      console.log("📡 Credentials:", { user_name: username, password });

      const result = await login({
        user_name: username,
        password: password,
      });

      console.log("✅ Login successful:", result);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Login error:", err);

      if (err?.status === 404) {
        setError("Login endpoint not found (404). Please contact support.");
      } else if (err?.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else if (err?.message?.includes('user_name')) {
        setError("Please enter your username.");
      } else if (err?.message?.includes('Network error')) {
        setError("Network error. Please check your internet connection.");
      } else if (err?.data?.message) {
        setError(err.data.message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
      <div className="grid lg:grid-cols-2 h-full w-full">
        <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden h-full">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />

          <div className="relative flex flex-col w-full h-full p-8 lg:p-10">
            {/* Logo - Top Left */}
            <div className="flex items-center gap-3 flex-shrink-0 mb-6">
              <img
                src={logoUrl}
                alt="Logo"
                className="w-10 h-10 rounded-xl shadow-md"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                  {orgName}
                </h2>
                <p className="text-xs text-gray-500" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                  Learning Management System
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-left mb-2">
                <h1 
                  className="font-extrabold leading-tight"
                  style={{ 
                    fontFamily: '"Fira Sans", sans-serif',
                    fontSize: '22px',
                    color: '#4f46e5' 
                  }}
                >
                  Learn today,
                </h1>
                <h1 
                  className="font-extrabold leading-tight"
                  style={{ 
                    fontFamily: '"Fira Sans", sans-serif',
                    fontSize: '26px',
                    color: '#020202' 
                  }}
                >
                  Lead tomorrow.
                </h1>
              </div>

              <div className="w-full flex justify-start -mt-12 ml-[-20px]">
                <img
                  src={loginImage}
                  alt="Learning Illustration"
                  className="w-[85%] object-contain"
                />
              </div>
            </div>

            <div className="pt-3 text-xs text-gray-400 flex-shrink-0 text-center" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
              © {new Date().getFullYear()} {orgName}. All rights reserved.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-4 lg:px-8 h-full overflow-y-auto">
          <div className="w-full max-w-sm lg:max-w-md">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-10 w-10 rounded-xl"
                />
                <span className="text-xl font-bold text-gray-900" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                  {orgName}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                Welcome Back 👋
              </h2>
              <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                Sign in to continue your learning journey.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading || authLoading}
                  required
                  className="h-10 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || authLoading}
                  required
                  className="h-10 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="h-4 w-4"
                    disabled={isLoading || authLoading}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-xs text-gray-600"
                    style={{ fontFamily: '"Fira Sans", sans-serif' }}
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading || authLoading}
                className="h-10 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm"
                style={{ fontFamily: '"Fira Sans", sans-serif' }}
              >
                {isLoading || authLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-3 text-xs text-gray-400 bg-white px-2" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={isLoading || authLoading}
                className="w-full h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm"
                style={{ fontFamily: '"Fira Sans", sans-serif' }}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.24 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.996 10.996 0 0012 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09A6.58 6.58 0 015.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 001 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.61 0 3.06.55 4.2 1.63l3.15-3.15C17.45 2.09 14.97 1 12 1A10.99 10.99 0 002.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                  style={{ fontFamily: '"Fira Sans", sans-serif' }}
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center text-[10px] leading-4 text-gray-400" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-gray-500 hover:text-indigo-600">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-gray-500 hover:text-indigo-600">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;