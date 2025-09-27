import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { NeonButton } from '@/components/ui/neon-button';
import { useCartStore } from '@/stores/cartStore';
import { mockProducts } from '@/data/products';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';

interface CartItem {
  id: string;
  product: typeof mockProducts[0];
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, addItem } = useCartStore();
  
  // Use cart store items directly
  const cartItems = items;

  // Add some sample items if cart is empty (for demo purposes)
  useEffect(() => {
    if (items.length === 0) {
      // Add a sample product to demonstrate the cart functionality
      const sampleProduct = mockProducts[0];
      if (sampleProduct) {
        addItem(sampleProduct, 2);
      }
    }
  }, [items.length, addItem]);

  const handleUpdateQuantity = (productId: string, change: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 10000 ? 0 : 299;
  const total = subtotal + tax + shipping;

  const checkoutSteps = [
    { icon: ShoppingBag, title: 'Cart Review', active: true },
    { icon: CreditCard, title: 'Payment', active: false },
    { icon: Truck, title: 'Shipping', active: false },
    { icon: Shield, title: 'Confirmation', active: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shopping <span className="neon-text">Cart</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Review your selected products and proceed to checkout
          </p>
        </div>

        {/* Checkout Steps */}
        <div className="glass-card p-6 mb-8 animate-slide-up stagger-1">
          <div className="flex items-center justify-between">
            {checkoutSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${
                    step.active ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    <div className={`p-3 rounded-lg border ${
                      step.active 
                        ? 'bg-primary/10 border-primary/30 shadow-glow-primary' 
                        : 'bg-muted/10 border-border'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium hidden sm:inline">{step.title}</span>
                  </div>
                  {index < checkoutSteps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      step.active ? 'bg-primary' : 'bg-border'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up stagger-2">
            {cartItems.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some products to get started with your order
                </p>
                <NeonButton variant="primary">Browse Products</NeonButton>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={item.id} className={`glass-card p-6 hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.product.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-primary/30" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.category}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.product.features?.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                          >
                            {feature}
                          </span>
                        )) || []}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <NeonButton
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.product.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </NeonButton>
                      <span className="text-lg font-bold text-foreground w-8 text-center">
                        {item.quantity}
                      </span>
                      <NeonButton
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </NeonButton>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold neon-text-secondary">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${item.product.price.toLocaleString()} each
                      </div>
                    </div>

                    {/* Remove Button */}
                    <NeonButton
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </NeonButton>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="animate-slide-up stagger-3">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                {shipping === 0 && (
                  <div className="text-sm text-accent">
                    🎉 Free shipping on orders over $10,000!
                  </div>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="neon-text">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <NeonButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={cartItems.length === 0}
                  onClick={handleProceedToCheckout}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </NeonButton>
                <NeonButton 
                  variant="glass" 
                  className="w-full"
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </NeonButton>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;