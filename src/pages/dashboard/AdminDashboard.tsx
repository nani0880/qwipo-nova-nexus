import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { dashboardService, SystemAlert, RetailerData, DashboardStats } from '@/services/dashboardService';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Activity,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Package,
  UserPlus,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Download
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RetailerData[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, usersData, alertsData, metricsData] = await Promise.all([
          dashboardService.getAdminStats(),
          dashboardService.getAllUsers(),
          dashboardService.getSystemAlerts(),
          dashboardService.getSystemMetrics()
        ]);
        setStats(statsData);
        setRecentUsers(usersData);
        setSystemAlerts(alertsData);
        setSystemMetrics(metricsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  const systemStats = [
    { 
      label: 'Total Users', 
      value: stats?.activeUsers.toLocaleString() || '0', 
      change: `+${stats?.growthRate.toFixed(1)}%`, 
      icon: Users, 
      color: 'primary' 
    },
    { 
      label: 'Active Sessions', 
      value: '89', 
      change: '+5%', 
      icon: Activity, 
      color: 'secondary' 
    },
    { 
      label: 'Database Size', 
      value: '2.4GB', 
      change: '+8%', 
      icon: Database, 
      color: 'accent' 
    },
    { 
      label: 'Server Uptime', 
      value: systemMetrics?.uptime ? `${systemMetrics.uptime}%` : '99.9%', 
      change: '+0.1%', 
      icon: Server, 
      color: 'primary' 
    }
  ];

  const platformMetrics = [
    { 
      label: 'Total Revenue', 
      value: `$${stats?.totalRevenue.toLocaleString() || '0'}`, 
      change: `+${stats?.growthRate.toFixed(1)}%`, 
      icon: DollarSign, 
      color: 'primary' 
    },
    { 
      label: 'Total Orders', 
      value: stats?.totalOrders.toLocaleString() || '0', 
      change: `+${stats?.conversionRate.toFixed(1)}%`, 
      icon: Package, 
      color: 'secondary' 
    },
    { 
      label: 'Active Products', 
      value: '2,847', 
      change: '+8%', 
      icon: Package, 
      color: 'accent' 
    },
    { 
      label: 'API Calls', 
      value: '1.2M', 
      change: '+25%', 
      icon: Activity, 
      color: 'primary' 
    }
  ];

  const filteredUsers = recentUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      await dashboardService.updateUserStatus(userId, newStatus);
      setRecentUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: newStatus as any } : user
      ));
      toast({
        title: "User status updated",
        description: `User status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      await dashboardService.resolveAlert(alertId);
      setSystemAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      ));
      toast({
        title: "Alert resolved",
        description: "System alert has been marked as resolved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve alert. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Health', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'success': return 'text-accent bg-accent/20 border-accent/30';
      default: return 'text-primary bg-primary/20 border-primary/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Admin <span className="neon-text">Dashboard</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage users, monitor system health, and oversee platform operations
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <NeonButton variant="ghost" size="icon">
                <Activity className="h-5 w-5" />
              </NeonButton>
              <NeonButton variant="primary">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </NeonButton>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`glass-card group hover:glow-${stat.color} transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div className={`text-sm font-semibold text-${stat.color} flex items-center`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
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

        {/* Tab Navigation */}
        <div className="glass-card p-2 mb-8 animate-slide-up stagger-1">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-accent bg-accent/10 shadow-glow-accent'
                      : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-slide-up stagger-2">
            {/* Platform Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className={`glass-card group hover:glow-${metric.color} transition-all duration-500 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${metric.color}/10 rounded-lg border border-${metric.color}/20`}>
                        <Icon className={`h-6 w-6 text-${metric.color}`} />
                      </div>
                      <div className={`text-sm font-semibold text-${metric.color} flex items-center`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {metric.change}
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold mb-1 ${
                        metric.color === 'primary' ? 'neon-text' : 
                        metric.color === 'secondary' ? 'neon-text-secondary' : 
                        'text-accent'
                      }`}>
                        {metric.value}
                      </div>
                      <div className="text-muted-foreground font-medium">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* System Alerts */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">System Alerts</h3>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => {
                  const Icon = alert.type === 'error' ? AlertTriangle : 
                             alert.type === 'warning' ? AlertTriangle :
                             alert.type === 'success' ? CheckCircle : AlertTriangle;
                  return (
                    <div key={alert.id} className={`flex items-center space-x-4 p-4 rounded-lg border border-border hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 4, 4)}`}>
                      <div className={`p-2 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!alert.resolved && (
                          <NeonButton 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </NeonButton>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.resolved 
                            ? 'bg-accent/20 text-accent border border-accent/30'
                            : getAlertColor(alert.type)
                        }`}>
                          {alert.resolved ? 'Resolved' : alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 animate-slide-up stagger-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">User Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                  />
                </div>
                <NeonButton variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </NeonButton>
                <NeonButton variant="primary">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </NeonButton>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">User</th>
                      <th className="text-left p-4 font-semibold text-foreground">Role</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground">Last Login</th>
                      <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user.id} className={`border-b border-border hover:bg-accent/5 transition-colors duration-300 animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-background" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                              <div className="text-xs text-muted-foreground">{user.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={user.status}
                            onChange={(e) => handleUpdateUserStatus(user.id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)} bg-transparent`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.lastOrder}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <NeonButton variant="ghost" size="sm" title="View Details">
                              <Eye className="h-4 w-4" />
                            </NeonButton>
                            <NeonButton variant="ghost" size="sm" title="Edit User">
                              <Edit3 className="h-4 w-4" />
                            </NeonButton>
                            <NeonButton variant="ghost" size="sm" className="text-red-400 hover:text-red-300" title="Delete User">
                              <Trash2 className="h-4 w-4" />
                            </NeonButton>
                            <NeonButton variant="ghost" size="sm" title="More Options">
                              <MoreHorizontal className="h-4 w-4" />
                            </NeonButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-8 animate-slide-up stagger-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Server Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">API Server</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-accent font-semibold">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Database</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-accent font-semibold">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cache Server</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-accent font-semibold">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">File Storage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-400 font-semibold">Warning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">CPU Usage</span>
                    <span className="text-foreground font-semibold">{systemMetrics?.cpuUsage || 45}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Memory Usage</span>
                    <span className="text-foreground font-semibold">{systemMetrics?.memoryUsage || 67}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Disk Usage</span>
                    <span className="text-foreground font-semibold">{systemMetrics?.diskUsage || 23}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Network I/O</span>
                    <span className="text-foreground font-semibold">{systemMetrics?.networkIO || 156} MB/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 animate-slide-up stagger-1">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Platform Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Enable maintenance mode to restrict access</p>
                  </div>
                  <NeonButton variant="ghost">Toggle</NeonButton>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <NeonButton variant="ghost">Toggle</NeonButton>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">API Rate Limiting</h4>
                    <p className="text-sm text-muted-foreground">Configure API request limits</p>
                  </div>
                  <NeonButton variant="ghost">Configure</NeonButton>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Backup Settings</h4>
                    <p className="text-sm text-muted-foreground">Configure automatic backups</p>
                  </div>
                  <NeonButton variant="ghost">Configure</NeonButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
