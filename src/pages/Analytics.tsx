import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { NeonButton } from '@/components/ui/neon-button';
import { mockAnalytics } from '@/data/products';
import { useAuthStore } from '@/stores/authStore';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Star,
  Package
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const { user } = useAuthStore();

  // Only show analytics for distributor and admin roles
  if (user?.role === 'retailer') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-12 text-center animate-slide-up">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Access Restricted</h2>
            <p className="text-muted-foreground mb-6">
              Analytics are only available for Distributor and Admin accounts.
            </p>
            <NeonButton variant="primary">Upgrade Account</NeonButton>
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      id: 'revenue',
      label: 'Revenue',
      value: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'primary'
    },
    {
      id: 'orders',
      label: 'Orders',
      value: mockAnalytics.totalOrders.toString(),
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'secondary'
    },
    {
      id: 'customers',
      label: 'Active Customers',
      value: '1,247',
      change: '+15.3%',
      icon: Users,
      color: 'accent'
    },
    {
      id: 'satisfaction',
      label: 'Satisfaction',
      value: mockAnalytics.customerSatisfaction.toString(),
      change: '+0.3',
      icon: Star,
      color: 'primary'
    }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #ORD-2024-001 from TechCorp', time: '2 minutes ago', icon: Package },
    { type: 'customer', message: 'New customer registration: Digital Solutions Inc.', time: '15 minutes ago', icon: Users },
    { type: 'product', message: 'Neural Interface Headset stock running low', time: '1 hour ago', icon: Package },
    { type: 'revenue', message: 'Daily revenue target achieved', time: '3 hours ago', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-12 animate-slide-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Business <span className="neon-text">Analytics</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time insights and performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-input border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <NeonButton variant="ghost" size="icon">
              <RefreshCw className="h-5 w-5" />
            </NeonButton>
            
            <NeonButton variant="primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </NeonButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const staggerClass = `stagger-${Math.min(index + 1, 4)}`;
            
            return (
              <div
                key={metric.id}
                onClick={() => setActiveMetric(metric.id)}
                className={`glass-card group cursor-pointer transition-all duration-500 animate-slide-up ${staggerClass} ${
                  activeMetric === metric.id ? `glow-${metric.color}` : `hover:glow-${metric.color}`
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${metric.color}/10 rounded-lg border border-${metric.color}/20`}>
                    <Icon className={`h-6 w-6 text-${metric.color}`} />
                  </div>
                  <div className={`text-sm font-semibold text-${metric.color} flex items-center`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
                
                <div>
                  <div className={`text-3xl font-bold mb-1 ${
                    metric.color === 'primary' ? 'neon-text' : 
                    metric.color === 'secondary' ? 'neon-text-secondary' : 
                    'text-accent'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 animate-slide-up stagger-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Revenue Trend</h2>
                <div className="flex items-center space-x-2">
                  <NeonButton variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </NeonButton>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-80 relative">
                <div className="absolute inset-0 flex items-end justify-between space-x-2">
                  {mockAnalytics.revenueGrowth.map((month, index) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-lg relative group overflow-hidden"
                           style={{ 
                             height: `${(month.revenue / Math.max(...mockAnalytics.revenueGrowth.map(m => m.revenue))) * 100}%`,
                             minHeight: '20px'
                           }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background/90 text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          ${month.revenue.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-foreground mt-2">{month.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="animate-slide-up stagger-2">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="mt-12">
          <div className="glass-card p-8 animate-slide-up stagger-3">
            <h2 className="text-2xl font-bold text-foreground mb-6">Category Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockAnalytics.topCategories.map((category, index) => (
                <div key={category.name} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2.51 * category.value} 251.2`}
                        className="drop-shadow-[0_0_6px_hsl(var(--primary))]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">{category.value}%</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;