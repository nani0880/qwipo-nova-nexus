import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { dashboardService, InventoryItem, RetailerData, DashboardStats, ChartData } from '@/services/dashboardService';
import { useToast } from '@/hooks/use-toast';
import InventoryModal from '@/components/modals/InventoryModal';
import BarChart from '@/components/charts/BarChart';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  Upload,
  Download,
  Filter,
  Search,
  Bell,
  Target,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [retailerInsights, setRetailerInsights] = useState<RetailerData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, inventoryData, retailersData, chartDataResult] = await Promise.all([
          dashboardService.getDistributorStats(),
          dashboardService.getInventoryItems(),
          dashboardService.getRetailerNetwork(),
          dashboardService.getSalesChartData()
        ]);
        setStats(statsData);
        setInventoryItems(inventoryData);
        setRetailerInsights(retailersData);
        setChartData(chartDataResult);
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

  const quickStats = [
    { 
      label: 'Total Revenue', 
      value: `$${stats?.totalRevenue.toLocaleString() || '0'}`, 
      change: `+${stats?.growthRate.toFixed(1)}%`, 
      icon: DollarSign, 
      color: 'primary' 
    },
    { 
      label: 'Active Orders', 
      value: stats?.totalOrders.toString() || '0', 
      change: `+${stats?.conversionRate.toFixed(1)}%`, 
      icon: ShoppingCart, 
      color: 'secondary' 
    },
    { 
      label: 'Retailers', 
      value: stats?.activeUsers.toString() || '0', 
      change: '+8%', 
      icon: Users, 
      color: 'accent' 
    },
    { 
      label: 'Inventory Items', 
      value: inventoryItems.length.toString(), 
      change: '+5%', 
      icon: Package, 
      color: 'primary' 
    }
  ];

  const filteredInventory = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setShowInventoryModal(true);
  };

  const handleAddItem = () => {
    setEditingItem(undefined);
    setShowInventoryModal(true);
  };

  const handleSaveItem = async (itemData: Partial<InventoryItem>) => {
    try {
      if (editingItem) {
        await dashboardService.updateInventoryItem(editingItem.id, itemData);
        setInventoryItems(prev => prev.map(item => 
          item.id === editingItem.id ? { ...item, ...itemData } : item
        ));
        toast({
          title: "Item updated",
          description: "Inventory item has been updated successfully.",
        });
      } else {
        // In a real app, this would create a new item
        const newItem: InventoryItem = {
          id: Date.now().toString(),
          ...itemData as InventoryItem,
          lastUpdated: new Date().toISOString()
        };
        setInventoryItems(prev => [...prev, newItem]);
        toast({
          title: "Item added",
          description: "New inventory item has been added successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save inventory item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await dashboardService.deleteInventoryItem(itemId);
      setInventoryItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Item deleted",
        description: "Inventory item has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete inventory item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-accent/20 text-accent border-accent/30';
      case 'low_stock': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'out_of_stock': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'discontinued': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
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
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'retailers', label: 'Retailers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Distributor <span className="neon-text">Dashboard</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your inventory, track sales, and grow your distribution network
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <NeonButton variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </NeonButton>
              <NeonButton variant="primary">
                <Upload className="mr-2 h-4 w-4" />
                Upload Inventory
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => {
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
                      ? 'text-primary bg-primary/10 shadow-glow-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
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
            {/* Revenue Chart */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Revenue Trend</h3>
              {chartData ? (
                <BarChart data={chartData} height={300} />
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-muted-foreground">Loading chart data...</div>
                </div>
              )}
            </div>

            {/* Top Retailers */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Top Retailers</h3>
              <div className="space-y-4">
                {retailerInsights.map((retailer, index) => (
                  <div key={retailer.name} className={`flex items-center justify-between p-4 rounded-lg border border-border hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-background" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{retailer.name}</p>
                        <p className="text-sm text-muted-foreground">{retailer.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">${retailer.revenue.toLocaleString()}</p>
                      <span className="text-sm text-accent font-medium">{retailer.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-slide-up stagger-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Inventory Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  />
                </div>
                <NeonButton variant="primary" onClick={handleAddItem}>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Product
                </NeonButton>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Product</th>
                      <th className="text-left p-4 font-semibold text-foreground">SKU</th>
                      <th className="text-left p-4 font-semibold text-foreground">Stock</th>
                      <th className="text-left p-4 font-semibold text-foreground">Price</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item, index) => (
                      <tr key={item.id} className={`border-b border-border hover:bg-primary/5 transition-colors duration-300 animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.category}</div>
                        </td>
                        <td className="p-4 text-muted-foreground font-mono text-sm">{item.sku}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            item.stock > 20 ? 'bg-accent/20 text-accent border-accent/30' :
                            item.stock > 0 ? 'bg-secondary/20 text-secondary border-secondary/30' :
                            'bg-red-400/20 text-red-400 border-red-400/30'
                          }`}>
                            {item.stock} units
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-foreground">${item.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <NeonButton variant="ghost" size="sm" title="View Details">
                              <Eye className="h-4 w-4" />
                            </NeonButton>
                            <NeonButton 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditItem(item)}
                              title="Edit Item"
                            >
                              <Edit3 className="h-4 w-4" />
                            </NeonButton>
                            <NeonButton 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteItem(item.id)}
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
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

        {activeTab === 'retailers' && (
          <div className="space-y-6 animate-slide-up stagger-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Retailer Network</h3>
              <NeonButton variant="primary">
                <Users className="mr-2 h-4 w-4" />
                Add Retailer
              </NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retailerInsights.map((retailer, index) => (
                <div key={retailer.name} className={`glass-card p-6 hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-neon rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{retailer.name}</h4>
                      <p className="text-sm text-muted-foreground">Active Partner</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orders:</span>
                      <span className="font-semibold text-foreground">{retailer.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-semibold text-foreground">${retailer.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="text-accent font-semibold">{retailer.growth}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <NeonButton variant="ghost" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </NeonButton>
                    <NeonButton variant="ghost" size="sm" className="flex-1">
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </NeonButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-slide-up stagger-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Sales Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="text-2xl font-bold neon-text">$45,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Last Month</span>
                    <span className="text-xl font-semibold text-foreground">$28,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Growth</span>
                    <span className="text-accent font-semibold">+60.7%</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Top Categories</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Electronics</span>
                    <span className="text-xl font-bold text-foreground">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Software</span>
                    <span className="text-xl font-bold text-foreground">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Security</span>
                    <span className="text-xl font-bold text-foreground">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Energy</span>
                    <span className="text-xl font-bold text-foreground">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Modal */}
      <InventoryModal
        item={editingItem}
        isOpen={showInventoryModal}
        onClose={() => {
          setShowInventoryModal(false);
          setEditingItem(undefined);
        }}
        onSave={handleSaveItem}
      />

      <Footer />
    </div>
  );
};

export default DistributorDashboard;
