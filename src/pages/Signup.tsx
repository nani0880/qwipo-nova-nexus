import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NeonButton } from '@/components/ui/neon-button';
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
  Sparkles,
  CheckCircle,
  User,
  Phone
} from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'retailer' | 'distributor'>('retailer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const roles = [
    {
      id: 'retailer' as const,
      title: 'Retailer',
      description: 'Access personalized recommendations and browse products',
      icon: Users,
      color: 'primary',
      features: ['AI Recommendations', 'Product Catalog', 'Order Management', 'Basic Analytics']
    },
    {
      id: 'distributor' as const,
      title: 'Distributor',
      description: 'Manage inventory and view sales analytics',
      icon: Building,
      color: 'secondary',
      features: ['Advanced Analytics', 'Inventory Management', 'Sales Reports', 'API Access']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Validate terms agreement
      if (!formData.agreeToTerms) {
        alert('Please agree to the terms and conditions');
        return;
      }

      // Validate role - prevent admin role creation
      if (selectedRole === 'admin') {
        alert('Admin accounts cannot be created through signup. Please contact support.');
        return;
      }

      // Validate role is one of the allowed roles
      const allowedRoles = ['retailer', 'distributor'];
      if (!allowedRoles.includes(selectedRole)) {
        alert('Invalid role selected. Please choose a valid role.');
        return;
      }

      // Call the registration API with validation
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        password: formData.password,
        role: selectedRole
      };
      
      const result = await api.register(registrationData);
      console.log('Registration successful:', result);
      
      // Redirect to dashboard
      window.location.href = '/';
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
              Join the{' '}
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of B2B Commerce
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Create your account and start discovering AI-powered product recommendations 
              tailored to your business needs.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Setup in minutes</span>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="animate-slide-up stagger-1">
            <div className="glass-card p-8 max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
                <p className="text-muted-foreground">Start your journey with Qwipo</p>
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
                          <div className="flex-1">
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

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Your Company Inc."
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Create a strong password"
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

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      required
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:text-primary-glow transition-colors duration-300">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-primary hover:text-primary-glow transition-colors duration-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleChange}
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                    />
                    <span className="text-sm text-muted-foreground">
                      Subscribe to our newsletter for updates and tips
                    </span>
                  </label>
                </div>

                <NeonButton type="submit" variant="hero" className="w-full">
                  <span>Create Account</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NeonButton>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
                  >
                    Sign in here
                  </Link>
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

export default Signup;
