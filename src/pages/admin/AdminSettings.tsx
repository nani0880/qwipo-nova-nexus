import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { Settings, Save, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Admin <span className="neon-text">Settings</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure system settings and preferences
          </p>
        </div>

        <div className="glass-card p-8 animate-slide-up stagger-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
            <div className="flex items-center space-x-4">
              <NeonButton variant="ghost">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </NeonButton>
              <NeonButton variant="primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </NeonButton>
            </div>
          </div>

          <div className="text-center py-16">
            <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Admin Settings</h3>
            <p className="text-muted-foreground mb-6">
              This page is accessible from the Admin Dashboard. Use the dashboard to manage system settings.
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

export default AdminSettings;
