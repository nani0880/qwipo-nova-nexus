import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NeonButton } from '@/components/ui/neon-button';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/services/api';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building, 
  Users, 
  Shield,
  Sparkles
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'retailer' | 'distributor'>('retailer');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();

  const roles = [
    {
      id: 'retailer' as const,
      title: 'Retailer',
      description: 'Access personalized recommendations and browse products',
      icon: Users,
      color: 'primary'
    },
    {
      id: 'distributor' as const,
      title: 'Distributor',
      description: 'Manage inventory and view sales analytics',
      icon: Building,
      color: 'secondary'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setLoading(true);

      // Call the login API
      const user = await api.login(formData.email, formData.password, selectedRole);
      
      // Store user in auth store
      login(user);
      
      // Get the appropriate dashboard path based on user role
      const dashboardPath = useAuthStore.getState().getDashboardPath();
      
      // Redirect to role-specific dashboard
      navigate(dashboardPath);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background particle-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="relative">
                <Zap className="h-12 w-12 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-md"></div>
              </div>
              <span className="text-4xl font-bold neon-text">Qwipo</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Welcome to the{' '}
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of B2B Commerce
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              AI-powered personalized recommendations. Revolutionary product discovery. 
              Seamless business transactions.
            </p>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">99.2% AI Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-slide-up stagger-1">
            <div className="glass-card p-8 max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
                <p className="text-muted-foreground">Access your personalized dashboard</p>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select your role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                          selectedRole === role.id
                            ? `bg-${role.color}/10 border-${role.color}/30 shadow-glow-${role.color}`
                            : 'bg-muted/5 border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedRole === role.id 
                              ? `bg-${role.color}/20 border border-${role.color}/30` 
                              : 'bg-muted/10 border border-border'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              selectedRole === role.id ? `text-${role.color}` : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${
                              selectedRole === role.id ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {role.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{role.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                    />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-glow transition-colors duration-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <NeonButton 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                  {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </NeonButton>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/5 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Demo credentials: admin@qwipo.ai / demo123
                </p>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Note: Admin accounts are created manually and not available for public registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Login;