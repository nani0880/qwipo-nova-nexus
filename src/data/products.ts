import neuralHeadset from '@/assets/neural-headset.jpg';
import quantumStorage from '@/assets/quantum-storage.jpg';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
  features: string[];
  trending?: boolean;
  recommended?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'retailer' | 'distributor' | 'admin';
  company?: string;
  preferences: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Neural Interface Headset VX-2000',
    category: 'Electronics',
    price: 2499.99,
    description: 'Advanced neural interface technology for seamless human-computer interaction',
    image: neuralHeadset,
    rating: 4.8,
    inStock: true,
    features: ['Brain-Computer Interface', '5G Connectivity', 'AI Processing', 'Haptic Feedback'],
    trending: true,
    recommended: true
  },
  {
    id: '2',
    name: 'Quantum Storage Matrix Q-Drive',
    category: 'Storage',
    price: 8999.99,
    description: 'Revolutionary quantum storage solution with unlimited capacity potential',
    image: quantumStorage,
    rating: 4.9,
    inStock: true,
    features: ['Quantum Entanglement', 'Instant Access', 'Zero Degradation', 'Molecular Storage'],
    trending: true,
    recommended: true
  },
  {
    id: '3',
    name: 'Holographic Display Array HD-360',
    category: 'Displays',
    price: 15999.99,
    description: 'Immersive 360-degree holographic display system for presentations and visualization',
    image: '/api/placeholder/400/300',
    rating: 4.7,
    inStock: true,
    features: ['360° Projection', '8K Resolution', 'Multi-Touch Air Interface', 'Real-time Rendering'],
    recommended: true
  },
  {
    id: '4',
    name: 'AI-Powered Analytics Engine AE-Pro',
    category: 'Software',
    price: 5499.99,
    description: 'Enterprise-grade AI analytics engine for predictive business intelligence',
    image: '/api/placeholder/400/300',
    rating: 4.6,
    inStock: true,
    features: ['Machine Learning', 'Real-time Analytics', 'Predictive Modeling', 'Custom Dashboards'],
    trending: true
  },
  {
    id: '5',
    name: 'Biometric Security Scanner BS-Elite',
    category: 'Security',
    price: 3299.99,
    description: 'Multi-modal biometric security system with DNA verification capability',
    image: '/api/placeholder/400/300',
    rating: 4.9,
    inStock: true,
    features: ['DNA Verification', 'Retinal Scanning', 'Voice Recognition', 'Behavioral Analysis'],
    recommended: true
  },
  {
    id: '6',
    name: 'Fusion Power Cell FPC-1000',
    category: 'Energy',
    price: 12999.99,
    description: 'Compact fusion power cell providing clean energy for industrial applications',
    image: '/api/placeholder/400/300',
    rating: 4.8,
    inStock: true,
    features: ['Cold Fusion Technology', '1000kW Output', 'Zero Emissions', '50-Year Lifespan'],
    trending: true
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@techcorp.com',
  role: 'retailer',
  company: 'TechCorp Industries',
  preferences: ['Electronics', 'AI Technology', 'Security Solutions']
};

export const mockAnalytics = {
  totalRevenue: 145680,
  totalOrders: 89,
  customerSatisfaction: 4.8,
  topCategories: [
    { name: 'Electronics', value: 35 },
    { name: 'Software', value: 28 },
    { name: 'Security', value: 22 },
    { name: 'Energy', value: 15 }
  ],
  revenueGrowth: [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 25000 },
    { month: 'Apr', revenue: 32000 },
    { month: 'May', revenue: 28000 },
    { month: 'Jun', revenue: 45000 }
  ]
};