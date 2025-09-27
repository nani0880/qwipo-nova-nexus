import React from 'react';
import { mockAnalytics } from '@/data/products';
import { TrendingUp, ShoppingCart, Star, Target } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'primary',
      change: '+12.5%'
    },
    {
      label: 'Total Orders',
      value: mockAnalytics.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'secondary',
      change: '+8.2%'
    },
    {
      label: 'Satisfaction',
      value: mockAnalytics.customerSatisfaction.toString(),
      icon: Star,
      color: 'accent',
      change: '+0.3'
    },
    {
      label: 'AI Accuracy',
      value: '99.2%',
      icon: Target,
      color: 'primary',
      change: '+1.1%'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Business <span className="neon-text">Analytics</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights powered by AI to help you make data-driven decisions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const staggerClass = `stagger-${Math.min(index + 1, 4)}`;
            
            return (
              <div
                key={stat.label}
                className={`glass-card group hover:glow-${stat.color} transition-all duration-500 animate-slide-up ${staggerClass} relative overflow-hidden`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-4">
                  {/* Icon and Change */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}>
                      <Icon className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                    <div className={`text-sm font-semibold text-${stat.color} flex items-center`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>

                  {/* Value and Label */}
                  <div>
                    <div className={`text-3xl font-bold ${
                      stat.color === 'primary' ? 'neon-text' : 
                      stat.color === 'secondary' ? 'neon-text-secondary' : 
                      'text-accent'
                    } mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color} to-${stat.color}-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Mini Chart Section */}
        <div className="mt-16 glass-card animate-slide-up stagger-4">
          <h3 className="text-xl font-bold text-foreground mb-6">Revenue Growth Trend</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {mockAnalytics.revenueGrowth.map((month, index) => (
              <div key={month.month} className="text-center">
                <div className="relative h-24 mb-2 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-lg relative overflow-hidden group"
                    style={{ 
                      height: `${(month.revenue / Math.max(...mockAnalytics.revenueGrowth.map(m => m.revenue))) * 100}%`,
                      minHeight: '20%'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">{month.month}</div>
                <div className="text-xs text-muted-foreground">${(month.revenue / 1000).toFixed(0)}k</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;