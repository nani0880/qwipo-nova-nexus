import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import HeroSection from '@/components/sections/HeroSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import StatsSection from '@/components/sections/StatsSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { mockProducts } from '@/data/products';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  BarChart3, 
  Users, 
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  Star,
  ShoppingCart,
  Package,
  Heart,
  Bell,
  Activity,
  DollarSign,
  Building,
  Database,
  Server,
  AlertTriangle,
  Eye,
  Edit3,
  Plus,
  Search,
  Filter,
  Download,
  MessageSquare,
  Calendar,
  Clock,
  Award,
  TrendingDown,
  RefreshCw,
  Settings,
  CreditCard
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuthStore();
  const recommendedProducts = mockProducts.filter(p => p.recommended);
  const trendingProducts = mockProducts.filter(p => p.trending);

  // Role-specific data
  const retailerQuickStats = [
    { label: 'Cart Items', value: '3', icon: ShoppingCart, color: 'primary', change: '+2' },
    { label: 'Saved Items', value: '12', icon: Heart, color: 'secondary', change: '+3' },
    { label: 'Orders', value: '8', icon: Package, color: 'accent', change: '+1' },
    { label: 'AI Score', value: '94%', icon: Target, color: 'primary', change: '+5%' }
  ];

  const distributorQuickStats = [
    { label: 'Revenue', value: '$24,568', icon: DollarSign, color: 'primary', change: '+12%' },
    { label: 'Orders', value: '89', icon: Package, color: 'secondary', change: '+8%' },
    { label: 'Retailers', value: '1,247', icon: Users, color: 'accent', change: '+15%' },
    { label: 'Inventory', value: '2,847', icon: Database, color: 'primary', change: '+5%' }
  ];

  const adminQuickStats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'primary', change: '+5%' },
    { label: 'Active Sessions', value: '89', icon: Activity, color: 'secondary', change: '+2%' },
    { label: 'System Health', value: '99.9%', icon: Server, color: 'accent', change: '+0.1%' },
    { label: 'Alerts', value: '3', icon: AlertTriangle, color: 'primary', change: '-1' }
  ];

  const recentActivities = {
    retailer: [
      { id: 1, action: 'Added to cart', item: 'Neural Interface Headset VX-2000', time: '2 min ago', icon: ShoppingCart },
      { id: 2, action: 'Saved item', item: 'AI Analytics Engine AE-Pro', time: '1 hour ago', icon: Heart },
      { id: 3, action: 'Order placed', item: 'Quantum Storage Matrix Q-Drive', time: '3 hours ago', icon: Package }
    ],
    distributor: [
      { id: 1, action: 'New order received', item: 'ORD-001 from TechCorp', time: '5 min ago', icon: Package },
      { id: 2, action: 'Inventory updated', item: 'Neural Interface Headset VX-2000', time: '1 hour ago', icon: Edit3 },
      { id: 3, action: 'Retailer registered', item: 'FutureTech Labs', time: '2 hours ago', icon: Users }
    ],
    admin: [
      { id: 1, action: 'System alert resolved', item: 'High CPU Usage - Server-02', time: '10 min ago', icon: CheckCircle },
      { id: 2, action: 'User status updated', item: 'Mike Chen - Active', time: '30 min ago', icon: Users },
      { id: 3, action: 'Database backup completed', item: 'Daily backup successful', time: '2 hours ago', icon: Database }
    ]
  };

  const quickActions = {
    retailer: [
      { name: 'Browse Products', href: '/products', icon: Search, color: 'primary' },
      { name: 'View Cart', href: '/cart', icon: ShoppingCart, color: 'secondary' },
      { name: 'Checkout', href: '/checkout', icon: CreditCard, color: 'accent' },
      { name: 'AI Recommendations', href: '/recommendations', icon: Target, color: 'primary' }
    ],
    distributor: [
      { name: 'Manage Inventory', href: '/dashboard/distributor', icon: Package, color: 'primary' },
      { name: 'View Analytics', href: '/analytics', icon: BarChart3, color: 'secondary' },
      { name: 'Retailer Network', href: '/dashboard/distributor', icon: Users, color: 'accent' },
      { name: 'Add Product', href: '/dashboard/distributor', icon: Plus, color: 'primary' }
    ],
    admin: [
      { name: 'User Management', href: '/dashboard/admin', icon: Users, color: 'primary' },
      { name: 'System Monitoring', href: '/dashboard/admin', icon: Activity, color: 'secondary' },
      { name: 'Platform Analytics', href: '/analytics', icon: BarChart3, color: 'accent' },
      { name: 'System Settings', href: '/dashboard/admin', icon: Settings, color: 'primary' }
    ]
  };

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized product suggestions based on your business needs and preferences.',
      color: 'primary'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance with real-time insights and data-driven decision making.',
      color: 'secondary'
    },
    {
      icon: Users,
      title: 'B2B Network',
      description: 'Connect with distributors, retailers, and suppliers in our secure ecosystem.',
      color: 'accent'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control and data protection.',
      color: 'primary'
    }
  ];

  const benefits = [
    'Reduce procurement time by 60%',
    'Increase order accuracy by 95%',
    'Save up to 40% on operational costs',
    'Access to 10,000+ verified suppliers'
  ];

  // Render role-specific home page for authenticated users
  if (isAuthenticated && user) {
    const quickStats = user.role === 'retailer' ? retailerQuickStats : 
                      user.role === 'distributor' ? distributorQuickStats : 
                      adminQuickStats;
    
    const activities = recentActivities[user.role as keyof typeof recentActivities];
    const actions = quickActions[user.role as keyof typeof quickActions];

    return (
      <div className="min-h-screen bg-background">
        <main>
          <Navbar />
          
          {/* Personalized Welcome Section */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 animate-slide-up">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                  <span className="text-accent font-semibold tracking-wide uppercase text-sm">
                    Welcome back, {user.name}!
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Your <span className="neon-text capitalize">{user.role}</span> Dashboard
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {user.role === 'retailer' && "Discover personalized products and manage your orders with AI-powered recommendations."}
                  {user.role === 'distributor' && "Manage your inventory, track sales, and connect with retailers in your network."}
                  {user.role === 'admin' && "Monitor platform health, manage users, and oversee system operations."}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up stagger-1">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className={`glass-card p-6 text-center hover:glow-${stat.color} transition-all duration-300`}>
                      <Icon className={`h-10 w-10 text-${stat.color} mx-auto mb-4`} />
                      <div className="text-3xl font-bold neon-text mb-2">{stat.value}</div>
                      <p className="text-muted-foreground mb-2">{stat.label}</p>
                      <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-muted-foreground'}`}>
                        {stat.change}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-8 mb-12 animate-slide-up stagger-2">
                <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link key={index} to={action.href}>
                        <div className={`glass-card p-6 text-center hover:glow-${action.color} transition-all duration-300 group`}>
                          <Icon className={`h-8 w-8 text-${action.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                          <p className="font-semibold text-foreground">{action.name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-8 mb-12 animate-slide-up stagger-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Recent Activity</h3>
                  <NeonButton variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </NeonButton>
                </div>
                <div className="space-y-4">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className={`flex items-center space-x-4 p-4 rounded-lg border border-border hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 4, 4)}`}>
                        <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.item}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role-specific content sections */}
              {user.role === 'retailer' && (
                <>
                  <ProductCarousel
                    title="AI Recommendations"
                    subtitle="Personalized picks based on your preferences and business needs"
                    products={recommendedProducts}
                  />
                  <ProductCarousel
                    title="Trending Now"
                    subtitle="Most popular products in your industry"
                    products={trendingProducts}
                  />
                </>
              )}

              {user.role === 'distributor' && (
                <>
                  <div className="glass-card p-8 mb-12 animate-slide-up stagger-4">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Sales Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">$24,568</div>
                        <p className="text-muted-foreground">This Month</p>
                        <p className="text-sm text-green-400">+12% from last month</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-secondary mb-2">89</div>
                        <p className="text-muted-foreground">Orders</p>
                        <p className="text-sm text-green-400">+8% from last month</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">1,247</div>
                        <p className="text-muted-foreground">Active Retailers</p>
                        <p className="text-sm text-green-400">+15% from last month</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <div className="glass-card p-8 mb-12 animate-slide-up stagger-4">
                    <h3 className="text-2xl font-bold text-foreground mb-6">System Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">1,247</div>
                        <p className="text-muted-foreground">Total Users</p>
                        <p className="text-sm text-green-400">+5% this week</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary mb-2">89</div>
                        <p className="text-muted-foreground">Active Sessions</p>
                        <p className="text-sm text-green-400">+2% this hour</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="text-sm text-green-400">+0.1% improvement</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400 mb-2">3</div>
                        <p className="text-muted-foreground">Active Alerts</p>
                        <p className="text-sm text-red-400">-1 resolved today</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Analytics Dashboard for all roles */}
              <StatsSection />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Render public home page for non-authenticated users
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Navbar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose <span className="neon-text">Qwipo</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your B2B operations with our cutting-edge AI platform designed for modern businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={`glass-card p-8 text-center hover:glow-${feature.color} transition-all duration-300 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                    <div className={`w-16 h-16 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-${feature.color}/20`}>
                      <Icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Transform Your <span className="neon-text-secondary">Business</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of businesses already using Qwipo to streamline their procurement, 
                  reduce costs, and accelerate growth with AI-powered insights.
                </p>
                
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 animate-slide-up stagger-2">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <NeonButton variant="primary" size="lg">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </NeonButton>
                  </Link>
                  <Link to="/login">
                    <NeonButton variant="secondary" size="lg">
                      Sign In
                    </NeonButton>
                  </Link>
                </div>
              </div>

              <div className="animate-slide-up stagger-2">
                <div className="glass-card p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-10 w-10 text-background" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Real Results</h3>
                    <p className="text-muted-foreground">See what our customers achieve</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div>
                        <p className="font-semibold text-foreground">Average ROI</p>
                        <p className="text-sm text-muted-foreground">Within 6 months</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">340%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                      <div>
                        <p className="font-semibold text-foreground">Time Saved</p>
                        <p className="text-sm text-muted-foreground">Per month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-secondary">45hrs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <div>
                        <p className="font-semibold text-foreground">Cost Reduction</p>
                        <p className="text-sm text-muted-foreground">Average savings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">28%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Recommendations Carousel */}
        <ProductCarousel
          title="AI Recommendations"
          subtitle="Personalized picks based on your preferences and business needs"
          products={recommendedProducts}
        />
        
        {/* Trending Products */}
        <ProductCarousel
          title="Trending Now"
          subtitle="Most popular products in your industry"
          products={trendingProducts}
        />
        
        {/* Analytics Dashboard */}
        <StatsSection />

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-card p-12 animate-slide-up">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Ready to <span className="neon-text">Transform</span>?
                </h2>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the future of B2B commerce. Start your journey with Qwipo today and experience 
                the power of AI-driven business solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <NeonButton variant="hero" size="lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </NeonButton>
                </Link>
                <Link to="/products">
                  <NeonButton variant="secondary" size="lg">
                    Browse Products
                  </NeonButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
