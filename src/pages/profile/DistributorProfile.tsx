import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { useAuthStore } from '@/stores/authStore';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  Package,
  BarChart3,
  Edit3,
  Save,
  X,
  Users,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const DistributorProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, New York, NY 10001',
    preferences: user?.preferences || []
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'retailers', label: 'Retailer Network', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const handleSave = () => {
    if (user) {
      updateUser({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        preferences: formData.preferences
      });
    }
    setIsEditing(false);
  };

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: 12499.99, status: 'Completed', retailer: 'TechCorp Industries' },
    { id: 'ORD-002', date: '2024-01-12', total: 8999.99, status: 'Processing', retailer: 'Innovate Solutions' },
    { id: 'ORD-003', date: '2024-01-10', total: 15699.99, status: 'Completed', retailer: 'FutureTech Labs' }
  ];

  const topRetailers = [
    { name: 'TechCorp Industries', orders: 24, revenue: 125000, growth: 15 },
    { name: 'Innovate Solutions', orders: 18, revenue: 89000, growth: 8 },
    { name: 'FutureTech Labs', orders: 31, revenue: 156000, growth: 22 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-accent/20 text-accent border-accent/30';
      case 'Processing': return 'bg-primary/20 text-primary border-primary/30';
      case 'Pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Distributor <span className="neon-text-secondary">Profile</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your distributor account and business operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-slide-up stagger-1">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-neon-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-10 w-10 text-background" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>
                <p className="text-muted-foreground capitalize">{user?.role}</p>
                <p className="text-sm text-muted-foreground">{user?.company}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-secondary/10 text-secondary border border-secondary/20'
                          : 'text-muted-foreground hover:text-secondary hover:bg-secondary/5'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 animate-slide-up stagger-2">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
                    <NeonButton
                      variant="ghost"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                      {isEditing ? 'Cancel' : 'Edit'}
                    </NeonButton>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.address}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <NeonButton variant="secondary" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </NeonButton>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Business Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-card p-6 text-center">
                      <DollarSign className="h-8 w-8 text-secondary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">$245,680</div>
                      <p className="text-muted-foreground">Total Revenue</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                      <Package className="h-8 w-8 text-primary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">89</div>
                      <p className="text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                      <Users className="h-8 w-8 text-accent mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">1,247</div>
                      <p className="text-muted-foreground">Active Retailers</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'retailers' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Top Retailers</h2>
                  <div className="space-y-4">
                    {topRetailers.map((retailer, index) => (
                      <div key={retailer.name} className={`flex items-center justify-between p-4 rounded-lg border border-border hover:glow-secondary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-secondary/10 rounded-lg border border-secondary/20">
                            <Users className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{retailer.name}</p>
                            <p className="text-sm text-muted-foreground">{retailer.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">${retailer.revenue.toLocaleString()}</p>
                          <p className="text-sm text-green-400">+{retailer.growth}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'revenue' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Revenue Overview</h2>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={order.id} className={`flex items-center justify-between p-4 rounded-lg border border-border hover:glow-secondary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-secondary/10 rounded-lg border border-secondary/20">
                            <DollarSign className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date} • {order.retailer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">${order.total.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly */}
              {activeTab === 'company' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Company Information</h2>
                  <p className="text-muted-foreground">Company details coming soon...</p>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Inventory Management</h2>
                  <p className="text-muted-foreground">Inventory management coming soon...</p>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Notification Settings</h2>
                  <p className="text-muted-foreground">Notification preferences coming soon...</p>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Security Settings</h2>
                  <p className="text-muted-foreground">Security settings coming soon...</p>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Billing Information</h2>
                  <p className="text-muted-foreground">Billing information coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DistributorProfile;
