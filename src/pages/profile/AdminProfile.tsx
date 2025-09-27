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
  BarChart3,
  Edit3,
  Save,
  X,
  Users,
  Activity,
  Database,
  Server,
  AlertTriangle
} from 'lucide-react';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: '+1 (555) 123-4567',
    address: '123 Admin Plaza, Silicon Valley, CA 94000',
    preferences: user?.preferences || []
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'system', label: 'System Overview', icon: Server },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'monitoring', label: 'System Monitoring', icon: Activity },
    { id: 'alerts', label: 'System Alerts', icon: AlertTriangle },
    { id: 'database', label: 'Database', icon: Database },
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

  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+5.2%', icon: Users },
    { label: 'Active Sessions', value: '89', change: '+2.1%', icon: Activity },
    { label: 'Database Size', value: '2.4GB', change: '+8.3%', icon: Database },
    { label: 'Server Uptime', value: '99.9%', change: '+0.1%', icon: Server }
  ];

  const recentAlerts = [
    { id: '1', type: 'warning', title: 'High CPU Usage', message: 'Server-02 is experiencing high CPU usage (85%)', timestamp: '2024-01-15T14:30:00Z' },
    { id: '2', type: 'info', title: 'Database Backup', message: 'Daily database backup completed successfully', timestamp: '2024-01-15T02:00:00Z' },
    { id: '3', type: 'error', title: 'Failed Login Attempts', message: 'Multiple failed login attempts detected', timestamp: '2024-01-15T13:45:00Z' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'warning': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'info': return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'success': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Admin <span className="neon-text-accent">Profile</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your admin account and platform operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-slide-up stagger-1">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-neon-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-background" />
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
                          ? 'bg-accent/10 text-accent border border-accent/20'
                          : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
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
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
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
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
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
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
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
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
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
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground py-3">{formData.address}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <NeonButton variant="accent" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </NeonButton>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'system' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">System Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {systemStats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="glass-card p-6 text-center hover:glow-accent transition-all duration-300">
                          <Icon className="h-8 w-8 text-accent mx-auto mb-4" />
                          <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                          <p className="text-muted-foreground mb-2">{stat.label}</p>
                          <p className="text-sm text-green-400">{stat.change}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'alerts' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">System Alerts</h2>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div key={alert.id} className={`flex items-center space-x-4 p-4 rounded-lg border border-border hover:glow-accent transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                        <div className={`p-2 rounded-lg border ${getAlertColor(alert.type)}`}>
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getAlertColor(alert.type)}`}>
                          {alert.type.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Platform Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 text-center">
                      <BarChart3 className="h-8 w-8 text-accent mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">$1,245,680</div>
                      <p className="text-muted-foreground">Total Platform Revenue</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">3,456</div>
                      <p className="text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                      <Activity className="h-8 w-8 text-secondary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">15.2%</div>
                      <p className="text-muted-foreground">Conversion Rate</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly */}
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">User Management</h2>
                  <p className="text-muted-foreground">User management interface coming soon...</p>
                </div>
              )}

              {activeTab === 'monitoring' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">System Monitoring</h2>
                  <p className="text-muted-foreground">System monitoring dashboard coming soon...</p>
                </div>
              )}

              {activeTab === 'database' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Database Management</h2>
                  <p className="text-muted-foreground">Database management tools coming soon...</p>
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

export default AdminProfile;
