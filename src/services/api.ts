// Mock API service - replace with real API calls
import { Product } from '@/data/products'
import { mockProducts, mockAnalytics } from '@/data/products'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    await delay(500)
    return mockProducts
  },

  getProduct: async (id: string): Promise<Product | null> => {
    await delay(300)
    return mockProducts.find(p => p.id === id) || null
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(400)
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    )
  },

  // Analytics
  getAnalytics: async () => {
    await delay(600)
    return mockAnalytics
  },

  // Orders
  getOrders: async () => {
    await delay(400)
    // Mock orders data
    return [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 12499.99,
        items: [
          { name: 'Neural Interface Headset VX-2000', quantity: 2, price: 2499.99 },
        ],
      },
    ]
  },

  // Authentication
  login: async (email: string, password: string, role: string) => {
    await delay(800)
    // Mock authentication with role-based user data
    const mockUsers = {
      'admin@qwipo.ai': {
        id: '1',
        name: 'Alex Chen',
        email: 'admin@qwipo.ai',
        role: 'admin' as const,
        company: 'Qwipo Inc.',
        preferences: ['System Administration', 'User Management', 'Analytics']
      },
      'retailer@techcorp.com': {
        id: '2',
        name: 'John Smith',
        email: 'retailer@techcorp.com',
        role: 'retailer' as const,
        company: 'TechCorp Industries',
        preferences: ['Electronics', 'AI Technology', 'Security Solutions']
      },
      'distributor@innovate.com': {
        id: '3',
        name: 'Sarah Johnson',
        email: 'distributor@innovate.com',
        role: 'distributor' as const,
        company: 'Innovate Solutions',
        preferences: ['Inventory Management', 'Sales Analytics', 'Retailer Relations']
      }
    };

    const user = mockUsers[email as keyof typeof mockUsers];
    if (user && password === 'demo123') {
      return user;
    }
    throw new Error('Invalid credentials')
  },

  // Get current user profile
  getCurrentUser: async () => {
    await delay(500)
    // In a real app, this would fetch from a protected endpoint
    return {
      id: '1',
      name: 'Alex Chen',
      email: 'admin@qwipo.ai',
      role: 'admin' as const,
      company: 'Qwipo Inc.',
      preferences: ['System Administration', 'User Management', 'Analytics']
    }
  },

  // User Registration
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    password: string;
    role: 'retailer' | 'distributor';
  }) => {
    await delay(1000)
    
    // Validate role - prevent admin role creation
    if (userData.role === 'admin') {
      throw new Error('Admin accounts cannot be created through registration. Please contact support.')
    }
    
    // Validate role is one of the allowed roles
    const allowedRoles = ['retailer', 'distributor'];
    if (!allowedRoles.includes(userData.role)) {
      throw new Error('Invalid role. Only retailer and distributor roles are allowed for registration.')
    }
    
    // Mock successful registration
    return {
      id: Date.now().toString(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      company: userData.company || '',
      preferences: [],
      message: 'Account created successfully'
    }
  },
}

