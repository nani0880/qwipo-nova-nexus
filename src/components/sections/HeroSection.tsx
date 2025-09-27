import React from 'react';
import { NeonButton } from '@/components/ui/neon-button';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center particle-bg overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main Heading */}
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              AI-Powered B2B Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Discover{' '}
            <span className="neon-text animate-neon-flicker">Personalized</span>
            <br />
            Products with{' '}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Qwipo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Revolutionary B2B e-commerce powered by AI recommendations. 
            Find exactly what your business needs, when you need it.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 animate-slide-up stagger-2">
          <div className="glass-card p-2 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products, categories, or solutions..."
                  className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-4 text-foreground placeholder-muted-foreground text-lg"
                />
              </div>
              <NeonButton variant="hero" size="lg" className="shrink-0">
                <span>Search</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </NeonButton>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-3">
          <NeonButton variant="primary" size="hero">
            <Sparkles className="mr-2 h-5 w-5" />
            Get AI Recommendations
          </NeonButton>
          <NeonButton variant="glass" size="hero">
            Browse Products
          </NeonButton>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up stagger-4">
          {[
            { label: 'Products Available', value: '10,000+', color: 'primary' },
            { label: 'AI Accuracy', value: '99.2%', color: 'secondary' },
            { label: 'Satisfied Clients', value: '5,000+', color: 'accent' }
          ].map((stat, index) => (
            <div key={index} className="glass-card text-center group hover:glow-primary transition-all duration-300">
              <div className={`text-3xl md:text-4xl font-bold neon-text-${stat.color === 'primary' ? '' : stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;