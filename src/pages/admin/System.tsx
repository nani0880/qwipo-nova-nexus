import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { Server, Activity, Database, Settings } from 'lucide-react';

const AdminSystem = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            System <span className="neon-text">Health</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor system performance and health metrics
          </p>
        </div>

        <div className="glass-card p-8 animate-slide-up stagger-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">System Monitoring</h2>
            <NeonButton variant="primary">
              <Activity className="mr-2 h-4 w-4" />
              Refresh Status
            </NeonButton>
          </div>

          <div className="text-center py-16">
            <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">System Health</h3>
            <p className="text-muted-foreground mb-6">
              This page is accessible from the Admin Dashboard. Use the dashboard to monitor system health.
            </p>
            <NeonButton variant="primary" onClick={() => window.location.href = '/dashboard/admin'}>
              Go to Dashboard
            </NeonButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSystem;
