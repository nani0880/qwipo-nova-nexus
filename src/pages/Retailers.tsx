import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { Users, Plus, Search, Filter } from 'lucide-react';

const Retailers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Retailer <span className="neon-text">Network</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your retailer relationships and partnerships
          </p>
        </div>

        <div className="glass-card p-8 animate-slide-up stagger-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Retailer Network</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search retailers..."
                  className="bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
              </div>
              <NeonButton variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </NeonButton>
              <NeonButton variant="primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Retailer
              </NeonButton>
            </div>
          </div>

          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Retailer Management</h3>
            <p className="text-muted-foreground mb-6">
              This page is accessible from the Distributor Dashboard. Use the dashboard to manage your retailer network.
            </p>
            <NeonButton variant="primary" onClick={() => window.location.href = '/dashboard/distributor'}>
              Go to Dashboard
            </NeonButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Retailers;
