import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Zap, 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background particle-bg flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="glass-card p-8 text-center animate-slide-up">
            <div className="w-20 h-20 bg-gradient-neon rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-background" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Check Your <span className="neon-text">Email</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Link expires in 15 minutes</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Check your spam folder if you don't see it</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <NeonButton 
                variant="primary" 
                className="w-full"
                onClick={handleResendEmail}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend Email'}
              </NeonButton>
              
              <Link to="/login">
                <NeonButton variant="glass" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background particle-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="glass-card p-8 animate-slide-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
              <span className="text-2xl font-bold neon-text">Qwipo</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <NeonButton 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Send Reset Link
                </>
              )}
            </NeonButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-muted/5 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Security Notice</h3>
                <p className="text-xs text-muted-foreground">
                  For your security, password reset links expire after 15 minutes. 
                  If you don't receive the email, check your spam folder or contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default ForgotPassword;
