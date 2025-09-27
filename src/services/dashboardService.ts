// Dashboard-specific data services

// Helper function for simulating API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  growthRate: number;
}

export interface OrderData {
  id: string;
  productName: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  customer: string;
  trackingNumber?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  cost: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  lastUpdated: string;
  supplier: string;
  image?: string;
}

export interface RetailerData {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'retailer' | 'distributor' | 'admin';
  orders: number;
  revenue: number;
  growth: number;
  status: 'active' | 'inactive' | 'suspended';
  lastOrder: string;
  joinDate: string;
}

export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

export const dashboardService = {
  // Retailer Dashboard Services
  getRetailerStats: async (): Promise<DashboardStats> => {
    await delay(500);
    return {
      totalOrders: 24,
      totalRevenue: 45680,
      activeUsers: 1,
      conversionRate: 12.5,
      growthRate: 18.2
    };
  },

  getRetailerOrders: async (): Promise<OrderData[]> => {
    await delay(300);
    return [
      {
        id: 'ORD-001',
        productName: 'Neural Interface Headset VX-2000',
        amount: 2499.99,
        status: 'delivered',
        date: '2024-01-15',
        customer: 'TechCorp Industries',
        trackingNumber: 'TRK-789456123'
      },
      {
        id: 'ORD-002',
        productName: 'AI Analytics Engine AE-Pro',
        amount: 5499.99,
        status: 'shipped',
        date: '2024-01-12',
        customer: 'Innovate Solutions',
        trackingNumber: 'TRK-789456124'
      },
      {
        id: 'ORD-003',
        productName: 'Quantum Storage Matrix Q-Drive',
        amount: 8999.99,
        status: 'processing',
        date: '2024-01-10',
        customer: 'FutureTech Labs'
      },
      {
        id: 'ORD-004',
        productName: 'Holographic Display Array HD-360',
        amount: 15999.99,
        status: 'pending',
        date: '2024-01-08',
        customer: 'Digital Dynamics'
      }
    ];
  },

  getRecommendedProducts: async () => {
    await delay(400);
    // This would typically call the products API
    return [];
  },

  // Distributor Dashboard Services
  getDistributorStats: async (): Promise<DashboardStats> => {
    await delay(500);
    return {
      totalOrders: 89,
      totalRevenue: 245680,
      activeUsers: 1247,
      conversionRate: 8.5,
      growthRate: 22.1
    };
  },

  getInventoryItems: async (): Promise<InventoryItem[]> => {
    await delay(400);
    return [
      {
        id: '1',
        name: 'Neural Interface Headset VX-2000',
        sku: 'NIH-VX2000',
        category: 'Electronics',
        stock: 45,
        price: 2499.99,
        cost: 1800.00,
        status: 'in_stock',
        lastUpdated: '2024-01-15T10:30:00Z',
        supplier: 'NeuralTech Inc.',
        image: '/api/placeholder/100/100'
      },
      {
        id: '2',
        name: 'Quantum Storage Matrix Q-Drive',
        sku: 'QSM-QD001',
        category: 'Storage',
        stock: 12,
        price: 8999.99,
        cost: 6500.00,
        status: 'low_stock',
        lastUpdated: '2024-01-14T15:45:00Z',
        supplier: 'Quantum Solutions',
        image: '/api/placeholder/100/100'
      },
      {
        id: '3',
        name: 'AI Analytics Engine AE-Pro',
        sku: 'AAE-PRO',
        category: 'Software',
        stock: 0,
        price: 5499.99,
        cost: 4000.00,
        status: 'out_of_stock',
        lastUpdated: '2024-01-13T09:20:00Z',
        supplier: 'AI Dynamics',
        image: '/api/placeholder/100/100'
      },
      {
        id: '4',
        name: 'Holographic Display Array HD-360',
        sku: 'HDA-HD360',
        category: 'Display',
        stock: 8,
        price: 15999.99,
        cost: 12000.00,
        status: 'low_stock',
        lastUpdated: '2024-01-12T14:15:00Z',
        supplier: 'HoloTech Systems',
        image: '/api/placeholder/100/100'
      }
    ];
  },

  getRetailerNetwork: async (): Promise<RetailerData[]> => {
    await delay(400);
    return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Industries',
        role: 'retailer',
        orders: 24,
        revenue: 125000,
        growth: 15,
        status: 'active',
        lastOrder: '2024-01-15',
        joinDate: '2023-06-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@innovate.com',
        company: 'Innovate Solutions',
        role: 'distributor',
        orders: 18,
        revenue: 89000,
        growth: 8,
        status: 'active',
        lastOrder: '2024-01-12',
        joinDate: '2023-08-22'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@futuretech.io',
        company: 'FutureTech Labs',
        role: 'retailer',
        orders: 31,
        revenue: 156000,
        growth: 22,
        status: 'active',
        lastOrder: '2024-01-14',
        joinDate: '2023-04-10'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@global-dist.com',
        company: 'Global Distribution',
        role: 'distributor',
        orders: 12,
        revenue: 67000,
        growth: 5,
        status: 'inactive',
        lastOrder: '2023-12-20',
        joinDate: '2023-09-05'
      }
    ];
  },

  getSalesChartData: async (): Promise<ChartData> => {
    await delay(300);
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 18000, 25000, 32000, 28000, 45000],
          color: '#3b82f6'
        },
        {
          label: 'Orders',
          data: [45, 62, 78, 95, 88, 120],
          color: '#10b981'
        }
      ]
    };
  },

  // Admin Dashboard Services
  getAdminStats: async (): Promise<DashboardStats> => {
    await delay(500);
    return {
      totalOrders: 3456,
      totalRevenue: 1245680,
      activeUsers: 1247,
      conversionRate: 15.2,
      growthRate: 28.5
    };
  },

  getAllUsers: async (): Promise<RetailerData[]> => {
    await delay(400);
    return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Industries',
        role: 'retailer',
        orders: 24,
        revenue: 125000,
        growth: 15,
        status: 'active',
        lastOrder: '2024-01-15',
        joinDate: '2023-06-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@innovate.com',
        company: 'Innovate Solutions',
        role: 'distributor',
        orders: 18,
        revenue: 89000,
        growth: 8,
        status: 'active',
        lastOrder: '2024-01-12',
        joinDate: '2023-08-22'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@futuretech.io',
        company: 'FutureTech Labs',
        role: 'retailer',
        orders: 31,
        revenue: 156000,
        growth: 22,
        status: 'inactive',
        lastOrder: '2023-12-20',
        joinDate: '2023-04-10'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@global-dist.com',
        company: 'Global Distribution',
        role: 'distributor',
        orders: 12,
        revenue: 67000,
        growth: 5,
        status: 'suspended',
        lastOrder: '2023-11-15',
        joinDate: '2023-09-05'
      }
    ];
  },

  getSystemAlerts: async (): Promise<SystemAlert[]> => {
    await delay(300);
    return [
      {
        id: '1',
        type: 'warning',
        title: 'High CPU Usage',
        message: 'Server-02 is experiencing high CPU usage (85%)',
        timestamp: '2024-01-15T14:30:00Z',
        resolved: false,
        severity: 'medium'
      },
      {
        id: '2',
        type: 'info',
        title: 'Database Backup',
        message: 'Daily database backup completed successfully',
        timestamp: '2024-01-15T02:00:00Z',
        resolved: true,
        severity: 'low'
      },
      {
        id: '3',
        type: 'error',
        title: 'Failed Login Attempts',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: '2024-01-15T13:45:00Z',
        resolved: false,
        severity: 'high'
      },
      {
        id: '4',
        type: 'success',
        title: 'New User Registration',
        message: 'TechCorp Industries has successfully registered',
        timestamp: '2024-01-15T11:20:00Z',
        resolved: true,
        severity: 'low'
      }
    ];
  },

  getSystemMetrics: async () => {
    await delay(300);
    return {
      cpuUsage: 45,
      memoryUsage: 67,
      diskUsage: 23,
      networkIO: 156,
      uptime: 99.9,
      responseTime: 120
    };
  },

  // Action Methods
  updateInventoryItem: async (id: string, updates: Partial<InventoryItem>) => {
    await delay(500);
    console.log('Updating inventory item:', id, updates);
    return { success: true };
  },

  deleteInventoryItem: async (id: string) => {
    await delay(500);
    console.log('Deleting inventory item:', id);
    return { success: true };
  },

  updateUserStatus: async (id: string, status: string) => {
    await delay(500);
    console.log('Updating user status:', id, status);
    return { success: true };
  },

  resolveAlert: async (id: string) => {
    await delay(300);
    console.log('Resolving alert:', id);
    return { success: true };
  }
};
