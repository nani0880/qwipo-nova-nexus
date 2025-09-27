import React from 'react';
import { Link } from 'react-router-dom';
import { NeonButton } from '@/components/ui/neon-button';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 text-center animate-slide-up">
          <div className="mb-8">
            <Shield className="h-20 w-20 text-red-400 mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-foreground mb-4">403</h1>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Access <span className="text-red-400">Denied</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
            </p>
          </div>

          <div className="space-y-4">
            <NeonButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </NeonButton>
            
            <Link to="/" className="block">
              <NeonButton variant="ghost" size="lg" className="w-full">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </NeonButton>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-muted/5 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              If you need access to this area, please contact your system administrator or check your account permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
