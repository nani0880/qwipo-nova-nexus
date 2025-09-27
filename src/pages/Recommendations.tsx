import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/products/ProductCard';
import { NeonButton } from '@/components/ui/neon-button';
import { mockProducts, mockUser } from '@/data/products';
import { Sparkles, Target, Brain, TrendingUp, Zap } from 'lucide-react';

const Recommendations = () => {
  const recommendedProducts = mockProducts.filter(p => p.recommended);
  const similarProducts = mockProducts.filter(p => !p.recommended).slice(0, 3);

  const aiInsights = [
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Based on your purchase history and preferences, these products align with your business needs.',
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Perfect Match',
      description: 'Our algorithm found 94% compatibility with your company profile and requirements.',
      color: 'secondary'
    },
    {
      icon: TrendingUp,
      title: 'Growth Potential',
      description: 'These recommendations could increase your operational efficiency by 23%.',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              AI-Powered Recommendations
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Personalized for{' '}
            <span className="neon-text">{mockUser.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzed your business profile, purchase history, and market trends to curate these perfect matches
          </p>
        </div>

        {/* User Preferences */}
        <div className="glass-card p-6 mb-12 animate-slide-up stagger-1">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Target className="h-5 w-5 text-primary mr-2" />
            Your Preferences
          </h2>
          <div className="flex flex-wrap gap-3">
            {mockUser.preferences.map((preference, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 text-sm font-medium"
              >
                {preference}
              </span>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up stagger-2">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className={`glass-card group hover:glow-${insight.color} transition-all duration-500`}>
                <div className={`p-3 bg-${insight.color}/10 rounded-lg border border-${insight.color}/20 w-fit mb-4`}>
                  <Icon className={`h-6 w-6 text-${insight.color}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{insight.title}</h3>
                <p className="text-muted-foreground text-sm">{insight.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Recommendations */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 animate-slide-up stagger-3">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                <span className="neon-text">Top Picks</span> for You
              </h2>
              <p className="text-muted-foreground">AI-curated products with 94% compatibility score</p>
            </div>
            <div className="hidden md:block">
              <div className="glass-card p-3">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-accent animate-pulse" />
                  <span className="text-sm font-medium text-foreground">AI Score: 94%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up stagger-4">
            {recommendedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 animate-slide-up">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up stagger-1">
            {similarProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* Recommendation Settings */}
        <div className="glass-card p-8 animate-slide-up stagger-2">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Improve Your Recommendations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help our AI learn more about your preferences to provide even better product suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Update Preferences</h3>
              <div className="space-y-3">
                {['AI Technology', 'Security Solutions', 'Energy Systems', 'Display Technology'].map((category) => (
                  <label key={category} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      defaultChecked={mockUser.preferences.includes(category)}
                    />
                    <span className="text-foreground">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Budget Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground w-20">Budget:</span>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    defaultValue="15000"
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground w-20">$15,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <NeonButton variant="primary" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Update Recommendations
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;