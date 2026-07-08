import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photoLogin from "../../assets/images/photologin.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('token', 'demo-token');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-between bg-[#F7F6FF] p-12 relative">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="logo"
                className="w-12 h-12"
              />

              <div>
                <h2 className="font-bold text-lg">
                  LMS Platform
                </h2>

                <p className="text-sm text-gray-500">
                  Learn • Grow • Achieve
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Learn today,
              <br />
              <span className="text-[#5B3CC4]">
                Lead tomorrow.
              </span>
            </h1>

            <img
              src={photoLogin}
              alt="Login Illustration"
              className="mt-12 w-full"
            />
          </div>

        </div>
        <div className="flex items-center justify-center p-10 lg:p-16">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold mb-2">
              Welcome back
            </h2>

            <p className="text-gray-500 mb-8">
              Log in to continue your learning journey
            </p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-semibold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-[#5B3CC4] outline-none"
                />
              </div>
              <div className="mb-5">
                <label className="block font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-[#5B3CC4] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#5B3CC4] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                disabled={loading}
                className="w-full h-12 rounded-md bg-[#5B3CC4] text-white font-semibold hover:bg-[#4C31AE] transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t"></div>
              <span className="text-sm text-gray-500">
                or continue with
              </span>
              <div className="flex-1 border-t"></div>
            </div>
            <button className="w-full h-12 border rounded-md flex justify-center items-center gap-3 hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-8 text-gray-600">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 font-semibold text-[#5B3CC4]"
              >
                Sign up
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;