import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import photologin from "../../assets/images/auth/photologin.jpg";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mock users for testing
  const mockUsers = [
    {
      id: 1,
      user_name: 'OSU985240',
      email: 'osu@example.com',
      password: '2030',
      name: 'OSU User',
      role: 'student',
      token: 'mock-jwt-token-12345'
    },
    {
      id: 2,
      user_name: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      token: 'mock-jwt-admin-12345'
    },
    {
      id: 3,
      user_name: 'teacher',
      email: 'teacher@example.com',
      password: 'teacher123',
      name: 'Teacher User',
      role: 'teacher',
      token: 'mock-jwt-teacher-12345'
    },
    {
      id: 4,
      user_name: 'student',
      email: 'student@example.com',
      password: 'student123',
      name: 'Student User',
      role: 'student',
      token: 'mock-jwt-student-12345'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const user = mockUsers.find(
        u => (u.email === email || u.user_name === email) && u.password === password
      );

      if (user) {
        const response = {
          success: true,
          token: user.token,
          user: {
            id: user.id,
            user_name: user.user_name,
            email: user.email,
            name: user.name,
            role: user.role
          }
        };

        dispatch(setCredentials(response));
        
        if (rememberMe) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        toast.success('Login successful!', {
          description: `Welcome back, ${user.name}!`,
        });

        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        toast.error('Login failed', {
          description: 'Invalid email or password. Please try again.',
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Login failed', {
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section - Illustration */}
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
          
          <div className="flex-1 flex flex-col justify-center -mt-4">
            <h1 className="text-5xl font-bold leading-tight">
              Learn today,
              <br />
              <span className="text-[#5B3CC4]">
                Lead tomorrow.
              </span>
            </h1>
            
            <div className="mt-6">
              <img
                src={photologin}
                alt="Login Illustration"
                className="w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex items-center justify-center p-10 lg:p-16">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 mb-8">
              Log in to continue your learning journey
            </p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-semibold mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or username"
                  className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-[#5B3CC4] outline-none transition"
                  disabled={loading}
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
                    className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-[#5B3CC4] outline-none transition pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#5B3CC4] focus:ring-[#5B3CC4]"
                    disabled={loading}
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#5B3CC4] font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-md bg-[#5B3CC4] text-white font-semibold hover:bg-[#4C31AE] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button className="w-full h-12 border rounded-md flex justify-center items-center gap-3 hover:bg-gray-50 transition">
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
                to="/register"
                className="ml-2 font-semibold text-[#5B3CC4] hover:underline"
              >
                Sign up
              </Link>
            </p>

            {/* Test Credentials Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Test Credentials:
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>OSU User:</span>
                  <span className="font-mono">OSU985240 / 2030</span>
                </div>
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <span className="font-mono">admin / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span>Teacher:</span>
                  <span className="font-mono">teacher / teacher123</span>
                </div>
                <div className="flex justify-between">
                  <span>Student:</span>
                  <span className="font-mono">student / student123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;