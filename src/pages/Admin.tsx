import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { NeonButton } from '@/components/ui/neon-button';
import { mockUser } from '@/data/products';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  UserCheck, 
  UserX, 
  Crown,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Trash2,
  Plus,
  AlertTriangle,
  Activity,
  Database,
  Server
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'retailer' | 'distributor' | 'admin';
  company: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  // Only allow admin access
  if (mockUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-12 text-center animate-slide-up">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              Admin panel is restricted to administrators only.
            </p>
            <NeonButton variant="primary">Contact Support</NeonButton>
          </div>
        </div>
      </div>
    );
  }

  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      role: 'retailer',
      company: 'TechCorp Industries',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      joinDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@innovate.com',
      role: 'distributor',
      company: 'Innovate Solutions',
      status: 'active',
      lastLogin: '2024-01-14T15:22:00Z',
      joinDate: '2023-06-10'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@futuretech.io',
      role: 'retailer',
      company: 'FutureTech Labs',
      status: 'inactive',
      lastLogin: '2024-01-10T09:15:00Z',
      joinDate: '2023-12-01'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@global-dist.com',
      role: 'distributor',
      company: 'Global Distribution Inc',
      status: 'suspended',
      lastLogin: '2024-01-05T14:45:00Z',
      joinDate: '2023-03-20'
    }
  ];

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'monitoring', label: 'System Health', icon: Activity }
  ];

  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'primary' },
    { label: 'Active Sessions', value: '89', change: '+5%', icon: Activity, color: 'secondary' },
    { label: 'Database Size', value: '2.4GB', change: '+8%', icon: Database, color: 'accent' },
    { label: 'Server Uptime', value: '99.9%', change: '+0.1%', icon: Server, color: 'primary' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'distributor': return <Shield className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-accent bg-accent/20 border-accent/30';
      case 'distributor': return 'text-secondary bg-secondary/20 border-secondary/30';
      default: return 'text-primary bg-primary/20 border-primary/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent bg-accent/20 border-accent/30';
      case 'suspended': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-muted-foreground bg-muted/20 border-muted/30';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-accent animate-pulse" />
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Administrator Panel
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            System <span className="neon-text">Administration</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage users, monitor system health, and configure platform settings
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            const staggerClass = `stagger-${Math.min(index + 1, 4)}`;
            
            return (
              <div
                key={stat.label}
                className={`glass-card group hover:glow-${stat.color} transition-all duration-500 animate-slide-up ${staggerClass}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div className={`text-sm font-semibold text-${stat.color}`}>
                    {stat.change}
                  </div>
                </div>
                
                <div>
                  <div className={`text-3xl font-bold mb-1 ${
                    stat.color === 'primary' ? 'neon-text' : 
                    stat.color === 'secondary' ? 'neon-text-secondary' : 
                    'text-accent'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 animate-slide-up">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-accent/10 text-accent border border-accent/20 shadow-glow-accent'
                          : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 animate-slide-up stagger-1">
              {/* User Management Tab */}
              {activeTab === 'users' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">User Management</h2>
                    <NeonButton variant="accent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </NeonButton>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                    </div>
                    <select className="bg-input border border-border rounded-lg px-4 py-3 text-foreground">
                      <option>All Roles</option>
                      <option>Retailers</option>
                      <option>Distributors</option>
                      <option>Admins</option>
                    </select>
                    <NeonButton variant="ghost" size="icon">
                      <Filter className="h-5 w-5" />
                    </NeonButton>
                  </div>

                  {/* Users Table */}
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="glass-card p-4 hover:glow-accent transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-neon rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-background" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">{user.company}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                                {getRoleIcon(user.role)}
                                <span className="capitalize">{user.role}</span>
                              </div>
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(user.status)}`}>
                                <span className="capitalize">{user.status}</span>
                              </div>
                            </div>

                            <div className="text-right text-sm text-muted-foreground">
                              <p>Last login:</p>
                              <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <NeonButton variant="ghost" size="sm">
                                <Edit3 className="h-4 w-4" />
                              </NeonButton>
                              <NeonButton variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </NeonButton>
                              <NeonButton variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </NeonButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs content */}
              {activeTab !== 'users' && (
                <div className="text-center py-12">
                  {activeTab === 'analytics' && <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />}
                  {activeTab === 'settings' && <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />}
                  {activeTab === 'monitoring' && <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-muted-foreground">This section is coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
