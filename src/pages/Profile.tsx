import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { User, ArrowRight, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    // Redirect to role-specific profile based on user role
    switch (user.role) {
      case 'retailer':
        navigate('/profile/retailer', { replace: true });
        break;
      case 'distributor':
        navigate('/profile/distributor', { replace: true });
        break;
      case 'admin':
        navigate('/profile/admin', { replace: true });
        break;
      default:
        navigate('/unauthorized', { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-card p-12 text-center animate-slide-up">
          <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Redirecting to Profile</h2>
          <p className="text-muted-foreground mb-6">
            Taking you to your role-specific profile page...
          </p>
          <NeonButton variant="primary" onClick={() => navigate('/')}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Go to Dashboard
          </NeonButton>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;