import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductCarousel from '@/components/sections/ProductCarousel';
import { NeonButton } from '@/components/ui/neon-button';
import { mockProducts } from '@/data/products';
import { dashboardService, OrderData, DashboardStats } from '@/services/dashboardService';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';
import LineChart from '@/components/charts/LineChart';
import { 
  ShoppingCart, 
  Package, 
  Target, 
  TrendingUp, 
  Star,
  Zap,
  Heart,
  Filter,
  Search,
  Bell
} from 'lucide-react';

const RetailerDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const { getTotalItems, getTotalPrice } = useCartStore();
  const { toast } = useToast();

  const recommendedProducts = mockProducts.filter(p => p.recommended);
  const trendingProducts = mockProducts.filter(p => p.trending);
  const cartItemCount = getTotalItems();
  const cartTotal = getTotalPrice();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, ordersData] = await Promise.all([
          dashboardService.getRetailerStats(),
          dashboardService.getRetailerOrders()
        ]);
        setStats(statsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  const quickStats = [
    { 
      label: 'Total Orders', 
      value: stats?.totalOrders.toString() || '0', 
      change: `+${stats?.growthRate.toFixed(1)}%`, 
      icon: Package, 
      color: 'primary' 
    },
    { 
      label: 'Cart Items', 
      value: cartItemCount.toString(), 
      change: cartItemCount > 0 ? `$${cartTotal.toLocaleString()}` : 'Empty', 
      icon: ShoppingCart, 
      color: 'secondary' 
    },
    { 
      label: 'Saved Products', 
      value: savedProducts.length.toString(), 
      change: '+2', 
      icon: Heart, 
      color: 'accent' 
    },
    { 
      label: 'AI Score', 
      value: '94%', 
      change: '+3%', 
      icon: Target, 
      color: 'primary' 
    }
  ];

  const handleSaveProduct = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast({
      title: "Product saved",
      description: "Product has been added to your saved items.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-accent/20 text-accent border-accent/30';
      case 'shipped': return 'bg-primary/20 text-primary border-primary/30';
      case 'processing': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'cancelled': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Welcome back, <span className="neon-text">Retailer</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover personalized products and manage your business efficiently
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <NeonButton variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </NeonButton>
              <NeonButton variant="primary">
                <Search className="mr-2 h-4 w-4" />
                Search Products
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`glass-card group hover:glow-${stat.color} transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div className={`text-sm font-semibold text-${stat.color} flex items-center`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold mb-1 ${
                    stat.color === 'primary' ? 'neon-text' : 
                    stat.color === 'secondary' ? 'neon-text-secondary' : 
                    'text-accent'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Recommendations Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                <span className="neon-text">AI Recommendations</span> for You
              </h2>
              <p className="text-muted-foreground">Personalized products based on your preferences and behavior</p>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">94% Match</span>
            </div>
          </div>
          
          <ProductCarousel
            title=""
            subtitle=""
            products={recommendedProducts}
          />
        </div>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 animate-slide-up stagger-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Recent Orders</h3>
              <NeonButton variant="ghost" size="sm">
                View All
              </NeonButton>
            </div>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={order.id} className={`flex items-center justify-between p-4 rounded-lg border border-border hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{order.productName}</p>
                      <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                      {order.trackingNumber && (
                        <p className="text-xs text-primary">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${order.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-8 animate-slide-up stagger-2">
            <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <NeonButton variant="primary" className="w-full justify-start">
                <ShoppingCart className="mr-3 h-5 w-5" />
                View Cart (3 items)
              </NeonButton>
              <NeonButton variant="glass" className="w-full justify-start">
                <Package className="mr-3 h-5 w-5" />
                Track Orders
              </NeonButton>
              <NeonButton variant="glass" className="w-full justify-start">
                <Heart className="mr-3 h-5 w-5" />
                Saved Products
              </NeonButton>
              <NeonButton variant="glass" className="w-full justify-start">
                <Filter className="mr-3 h-5 w-5" />
                Advanced Search
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Trending Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Trending <span className="neon-text">Products</span>
              </h2>
              <p className="text-muted-foreground">Most popular products in your industry</p>
            </div>
            <NeonButton variant="ghost">
              View All Products
            </NeonButton>
          </div>
          
          <ProductCarousel
            title=""
            subtitle=""
            products={trendingProducts}
          />
        </div>

        {/* AI Insights */}
        <div className="glass-card p-8 animate-slide-up stagger-3">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">AI <span className="neon-text">Insights</span></h2>
            <p className="text-lg text-muted-foreground">
              Personalized recommendations based on your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Perfect Match</h3>
              <p className="text-muted-foreground">
                Our AI found 94% compatibility with your business profile and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Growth Potential</h3>
              <p className="text-muted-foreground">
                These recommendations could increase your operational efficiency by 23%.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 w-fit mx-auto mb-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Quality Assured</h3>
              <p className="text-muted-foreground">
                All recommended products have 4.5+ star ratings and proven track records.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RetailerDashboard;
