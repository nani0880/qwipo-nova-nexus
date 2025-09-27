import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NeonButton } from "@/components/ui/neon-button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background particle-bg">
      <div className="text-center glass-card p-12 max-w-md animate-slide-up">
        <div className="w-20 h-20 bg-gradient-neon rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-3xl font-bold text-background">404</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold neon-text">Page Not Found</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          The page you're looking for doesn't exist in our futuristic realm.
        </p>
        <div className="space-y-3">
          <NeonButton 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Return to Dashboard
          </NeonButton>
          <NeonButton 
            variant="glass" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            Go Back
          </NeonButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
