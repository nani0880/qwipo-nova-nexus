import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NeonButton } from '@/components/ui/neon-button';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  Home, 
  Package, 
  Target, 
  ShoppingCart, 
  BarChart3, 
  User, 
  Settings,
  Menu,
  X,
  Zap,
  Search
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemCount = getTotalItems();

  // Role-based navigation
  const getNavigation = () => {
    if (!isAuthenticated || !user) {
      return [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Products', href: '/products', icon: Package },
        { name: 'About', href: '/about', icon: User },
        { name: 'Contact', href: '/contact', icon: User }
      ];
    }

    switch (user.role) {
      case 'retailer':
        return [
          { name: 'Dashboard', href: '/dashboard/retailer', icon: Home },
          { name: 'Products', href: '/products', icon: Package },
          { name: 'Recommendations', href: '/recommendations', icon: Target },
          { name: 'Cart', href: '/cart', icon: ShoppingCart },
          { name: 'Orders', href: '/orders', icon: Package },
          { name: 'Profile', href: '/profile', icon: User }
        ];
      case 'distributor':
        return [
          { name: 'Dashboard', href: '/dashboard/distributor', icon: Home },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'Orders', href: '/orders', icon: Package },
          { name: 'Profile', href: '/profile', icon: User }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/dashboard/admin', icon: Home },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'Profile', href: '/profile', icon: User }
        ];
      default:
        return [
          { name: 'Dashboard', href: '/', icon: Home },
          { name: 'Products', href: '/products', icon: Package },
          { name: 'Profile', href: '/profile', icon: User }
        ];
    }
  };

  const navigation = getNavigation();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="glass-card sticky top-0 z-50 mb-8 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-2xl font-bold neon-text">Qwipo</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                    isActive(item.href)
                      ? "text-primary bg-primary/10 shadow-glow-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-neon rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

              {/* User Profile & Settings */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && user && (
                  <>
                    {/* Cart for retailers only */}
                    {user.role === 'retailer' && (
                      <Link to="/cart" className="relative">
                        <div className="glass-card p-2 hover:glow-primary transition-all duration-300">
                          <ShoppingCart className="h-5 w-5 text-primary" />
                          {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                              {cartItemCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    )}
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Link to="/profile" className="glass-card p-2 hover:glow-primary transition-all duration-300">
                        <User className="h-5 w-5 text-primary" />
                      </Link>
                      <button 
                        onClick={logout}
                        className="glass-card p-2 hover:glow-secondary transition-all duration-300"
                        title="Logout"
                      >
                        <X className="h-5 w-5 text-secondary" />
                      </button>
                    </div>
                  </>
                )}
                
                {!isAuthenticated && (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <NeonButton variant="ghost" size="sm">
                        Login
                      </NeonButton>
                    </Link>
                    <Link to="/signup">
                      <NeonButton variant="primary" size="sm">
                        Sign Up
                      </NeonButton>
                    </Link>
                  </div>
                )}
              </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <NeonButton
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </NeonButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 animate-scale-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300",
                    isActive(item.href)
                      ? "text-primary bg-primary/10 shadow-glow-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
                {isAuthenticated && user && (
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="px-3 py-2">
                      <p className="text-base font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <div className="px-3 py-2">
                      <button 
                        onClick={logout}
                        className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
                
                {!isAuthenticated && (
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="px-3 py-2 space-y-2">
                      <Link 
                        to="/login" 
                        className="block w-full text-center py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}