import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Eye,
  MoreHorizontal,
  MapPin,
  Calendar,
  X
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 12499.99,
      items: [
        { name: 'Neural Interface Headset VX-2000', quantity: 2, price: 2499.99 },
        { name: 'Biometric Security Scanner BS-Elite', quantity: 1, price: 3299.99 }
      ],
      shippingAddress: '123 Tech Street, San Francisco, CA 94105',
      trackingNumber: 'QW123456789',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-08',
      status: 'shipped',
      total: 8999.99,
      items: [
        { name: 'Quantum Storage Matrix Q-Drive', quantity: 1, price: 8999.99 }
      ],
      shippingAddress: '456 Innovation Ave, Austin, TX 78701',
      trackingNumber: 'QW987654321',
      estimatedDelivery: '2024-01-12'
    },
    {
      id: 'ORD-2024-003',
      date: '2023-12-22',
      status: 'processing',
      total: 15699.99,
      items: [
        { name: 'Holographic Display Array HD-360', quantity: 1, price: 15999.99 }
      ],
      shippingAddress: '789 Future Blvd, Seattle, WA 98101',
      estimatedDelivery: '2024-01-05'
    },
    {
      id: 'ORD-2023-045',
      date: '2023-12-10',
      status: 'pending',
      total: 5499.99,
      items: [
        { name: 'AI-Powered Analytics Engine AE-Pro', quantity: 1, price: 5499.99 }
      ],
      shippingAddress: '321 Data Drive, New York, NY 10001'
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-muted-foreground bg-muted/20 border-muted';
      case 'processing': return 'text-secondary bg-secondary/20 border-secondary/30';
      case 'shipped': return 'text-primary bg-primary/20 border-primary/30';
      case 'delivered': return 'text-accent bg-accent/20 border-accent/30';
      case 'cancelled': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-muted-foreground bg-muted/20 border-muted';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Order <span className="neon-text">History</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8 animate-slide-up stagger-1">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>

              <NeonButton variant="ghost">
                <Download className="h-4 w-4 mr-2" />
                Export
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 animate-slide-up stagger-2">
          {filteredOrders.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'You haven\'t placed any orders yet'}
              </p>
              <NeonButton variant="primary">Browse Products</NeonButton>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className={`glass-card p-6 hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-foreground">{order.id}</h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold neon-text-secondary">
                        ${order.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <NeonButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </NeonButton>
                      <NeonButton variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </NeonButton>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Items */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-sm text-foreground">
                          <span className="font-medium">{item.quantity}x</span> {item.name}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Shipping Address</h4>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{order.shippingAddress}</span>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Tracking</h4>
                    {order.trackingNumber ? (
                      <div className="space-y-1">
                        <div className="text-sm text-foreground font-mono">
                          {order.trackingNumber}
                        </div>
                        {order.estimatedDelivery && (
                          <div className="text-xs text-muted-foreground">
                            Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Tracking will be available once shipped
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Details Modal would go here */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
                <NeonButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="h-5 w-5" />
                </NeonButton>
              </div>
              
              {/* Order details content would go here */}
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Detailed order view coming soon!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;