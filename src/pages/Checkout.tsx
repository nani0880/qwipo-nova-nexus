import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ShoppingBag, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Package,
  AlertCircle,
  Banknote,
  Smartphone,
  Coins,
  Apple,
  Chrome
} from 'lucide-react';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentMethod {
  type: 'card' | 'bank' | 'paypal' | 'crypto' | 'apple' | 'google';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  bankAccount?: string;
  routingNumber?: string;
  paypalEmail?: string;
  cryptoAddress?: string;
  cryptoType?: 'bitcoin' | 'ethereum' | 'usdc';
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    company: user?.company || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.name || '',
    billingAddress: '',
    bankAccount: '',
    routingNumber: '',
    paypalEmail: '',
    cryptoAddress: '',
    cryptoType: 'bitcoin'
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 10000 ? 0 : 299;
  const total = subtotal + tax + shipping;

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck, description: 'Delivery information' },
    { id: 2, title: 'Payment', icon: CreditCard, description: 'Payment method' },
    { id: 3, title: 'Review', icon: CheckCircle, description: 'Order confirmation' },
    { id: 4, title: 'Complete', icon: Shield, description: 'Order placed' }
  ];

  const validateStep = (step: number) => {
    if (step === 1) {
      // Validate shipping address
      const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone'];
      for (const field of requiredFields) {
        if (!shippingAddress[field as keyof ShippingAddress]) {
          toast({
            title: "Missing Information",
            description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
            variant: "destructive"
          });
          return false;
        }
      }
      return true;
    }
    
    if (step === 2) {
      // Validate payment method based on type
      if (paymentMethod.type === 'card') {
        if (!paymentMethod.cardholderName || !paymentMethod.cardNumber || !paymentMethod.expiryDate || !paymentMethod.cvv) {
          toast({
            title: "Missing Information",
            description: "Please fill in all credit card details.",
            variant: "destructive"
          });
          return false;
        }
        if (paymentMethod.cardNumber.replace(/\s/g, '').length !== 16) {
          toast({
            title: "Invalid Card Number",
            description: "Credit card number must be 16 digits.",
            variant: "destructive"
          });
          return false;
        }
      } else if (paymentMethod.type === 'bank') {
        if (!paymentMethod.cardholderName || !paymentMethod.bankAccount || !paymentMethod.routingNumber) {
          toast({
            title: "Missing Information",
            description: "Please fill in all bank transfer details.",
            variant: "destructive"
          });
          return false;
        }
      } else if (paymentMethod.type === 'paypal') {
        if (!paymentMethod.paypalEmail) {
          toast({
            title: "Missing Information",
            description: "Please enter your PayPal email address.",
            variant: "destructive"
          });
          return false;
        }
      } else if (paymentMethod.type === 'crypto') {
        if (!paymentMethod.cryptoAddress) {
          toast({
            title: "Missing Information",
            description: "Please enter your wallet address.",
            variant: "destructive"
          });
          return false;
        }
      }
      return true;
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/cart');
    }
  };

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const newOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      // Move to completion step
      setCurrentStep(4);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${newOrderId} has been confirmed.`,
      });
      
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
  };

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-12 text-center animate-slide-up">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before proceeding to checkout.
            </p>
            <NeonButton variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </NeonButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Checkout
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your order securely
          </p>
        </div>

        {/* Progress Steps */}
        <div className="glass-card p-6 mb-8 animate-slide-up stagger-1">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${
                    isActive ? 'text-primary' : isCompleted ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    <div className={`p-3 rounded-lg border ${
                      isActive 
                        ? 'bg-primary/10 border-primary/30 shadow-glow-primary' 
                        : isCompleted
                        ? 'bg-accent/10 border-accent/30'
                        : 'bg-muted/10 border-border'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="hidden sm:block">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-accent' : isActive ? 'bg-primary' : 'bg-border'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="glass-card p-8 animate-slide-up stagger-2">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Truck className="h-6 w-6 mr-3 text-primary" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <input
                      type="text"
                      value={shippingAddress.company}
                      onChange={(e) => setShippingAddress({...shippingAddress, company: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="glass-card p-8 animate-slide-up stagger-2">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <CreditCard className="h-6 w-6 mr-3 text-primary" />
                  Payment Information
                </h2>
                
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Choose Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { type: 'card', label: 'Credit Card', icon: CreditCard, color: 'primary' },
                      { type: 'bank', label: 'Bank Transfer', icon: Banknote, color: 'secondary' },
                      { type: 'paypal', label: 'PayPal', icon: Smartphone, color: 'accent' },
                      { type: 'crypto', label: 'Cryptocurrency', icon: Coins, color: 'primary' },
                      { type: 'apple', label: 'Apple Pay', icon: Apple, color: 'secondary' },
                      { type: 'google', label: 'Google Pay', icon: Chrome, color: 'accent' }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.type}
                          type="button"
                          onClick={() => setPaymentMethod({...paymentMethod, type: method.type as any})}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            paymentMethod.type === method.type
                              ? `border-${method.color} bg-${method.color}/10 shadow-glow-${method.color}`
                              : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          <Icon className={`h-8 w-8 mx-auto mb-2 text-${method.color}`} />
                          <span className="text-sm font-medium text-foreground">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Method Specific Forms */}
                <div className="space-y-6">
                  {/* Credit Card Form */}
                  {paymentMethod.type === 'card' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Credit Card Details</span>
                        <Shield className="h-4 w-4 text-accent ml-auto" />
                        <span className="text-sm text-muted-foreground">Secure</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          value={paymentMethod.cardholderName}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cardholderName: e.target.value})}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Card Number *</label>
                        <input
                          type="text"
                          value={paymentMethod.cardNumber}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cardNumber: formatCardNumber(e.target.value)})}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            value={paymentMethod.expiryDate}
                            onChange={(e) => setPaymentMethod({...paymentMethod, expiryDate: formatExpiryDate(e.target.value)})}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">CVV *</label>
                          <input
                            type="text"
                            value={paymentMethod.cvv}
                            onChange={(e) => setPaymentMethod({...paymentMethod, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                            placeholder="123"
                            maxLength={4}
                            className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Form */}
                  {paymentMethod.type === 'bank' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Banknote className="h-5 w-5 text-secondary" />
                        <span className="font-medium text-foreground">Bank Transfer Details</span>
                        <Shield className="h-4 w-4 text-accent ml-auto" />
                        <span className="text-sm text-muted-foreground">Secure</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Account Holder Name *</label>
                        <input
                          type="text"
                          value={paymentMethod.cardholderName}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cardholderName: e.target.value})}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number *</label>
                        <input
                          type="text"
                          value={paymentMethod.bankAccount || ''}
                          onChange={(e) => setPaymentMethod({...paymentMethod, bankAccount: e.target.value})}
                          placeholder="Enter your bank account number"
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Routing Number *</label>
                        <input
                          type="text"
                          value={paymentMethod.routingNumber || ''}
                          onChange={(e) => setPaymentMethod({...paymentMethod, routingNumber: e.target.value})}
                          placeholder="Enter your bank routing number"
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* PayPal Form */}
                  {paymentMethod.type === 'paypal' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Smartphone className="h-5 w-5 text-accent" />
                        <span className="font-medium text-foreground">PayPal Account</span>
                        <Shield className="h-4 w-4 text-accent ml-auto" />
                        <span className="text-sm text-muted-foreground">Secure</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">PayPal Email Address *</label>
                        <input
                          type="email"
                          value={paymentMethod.paypalEmail || ''}
                          onChange={(e) => setPaymentMethod({...paymentMethod, paypalEmail: e.target.value})}
                          placeholder="your.email@example.com"
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <p className="text-sm text-foreground">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cryptocurrency Form */}
                  {paymentMethod.type === 'crypto' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Coins className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Cryptocurrency Payment</span>
                        <Shield className="h-4 w-4 text-accent ml-auto" />
                        <span className="text-sm text-muted-foreground">Secure</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Select Cryptocurrency *</label>
                        <select
                          value={paymentMethod.cryptoType || 'bitcoin'}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cryptoType: e.target.value as any})}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        >
                          <option value="bitcoin">Bitcoin (BTC)</option>
                          <option value="ethereum">Ethereum (ETH)</option>
                          <option value="usdc">USD Coin (USDC)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Wallet Address *</label>
                        <input
                          type="text"
                          value={paymentMethod.cryptoAddress || ''}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cryptoAddress: e.target.value})}
                          placeholder="Enter your wallet address"
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm text-foreground">
                          Payment will be processed using {paymentMethod.cryptoType?.toUpperCase()}. 
                          You will receive payment instructions after order confirmation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Apple Pay / Google Pay */}
                  {(paymentMethod.type === 'apple' || paymentMethod.type === 'google') && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {paymentMethod.type === 'apple' ? <Apple className="h-5 w-5 text-secondary" /> : <Chrome className="h-5 w-5 text-accent" />}
                        <span className="font-medium text-foreground">
                          {paymentMethod.type === 'apple' ? 'Apple Pay' : 'Google Pay'}
                        </span>
                        <Shield className="h-4 w-4 text-accent ml-auto" />
                        <span className="text-sm text-muted-foreground">Secure</span>
                      </div>
                      
                      <div className="bg-muted/10 border border-border rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          {paymentMethod.type === 'apple' ? <Apple className="h-8 w-8 text-secondary" /> : <Chrome className="h-8 w-8 text-accent" />}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {paymentMethod.type === 'apple' ? 'Apple Pay' : 'Google Pay'} Ready
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Your {paymentMethod.type === 'apple' ? 'Apple Pay' : 'Google Pay'} will be used for this transaction.
                        </p>
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                          <p className="text-sm text-foreground">
                            You will be redirected to complete the payment using your device's secure payment method.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="billingSame"
                        checked={billingSameAsShipping}
                        onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <label htmlFor="billingSame" className="text-sm text-muted-foreground">
                        Billing address same as shipping address
                      </label>
                    </div>
                    
                    {!billingSameAsShipping && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-foreground mb-2">Billing Address *</label>
                        <input
                          type="text"
                          value={paymentMethod.billingAddress}
                          onChange={(e) => setPaymentMethod({...paymentMethod, billingAddress: e.target.value})}
                          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="glass-card p-8 animate-slide-up stagger-2">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                  Order Review
                </h2>
                
                <div className="space-y-6">
                  {/* Shipping Address Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Address</h3>
                    <div className="bg-muted/10 rounded-lg p-4">
                      <p className="text-foreground">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      {shippingAddress.company && <p className="text-foreground">{shippingAddress.company}</p>}
                      <p className="text-foreground">{shippingAddress.address}</p>
                      <p className="text-foreground">
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p className="text-foreground">{shippingAddress.country}</p>
                      <p className="text-foreground">{shippingAddress.phone}</p>
                    </div>
                  </div>
                  
                  {/* Payment Method Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Payment Method</h3>
                    <div className="bg-muted/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {paymentMethod.type === 'card' && <CreditCard className="h-5 w-5 text-primary" />}
                        {paymentMethod.type === 'bank' && <Banknote className="h-5 w-5 text-secondary" />}
                        {paymentMethod.type === 'paypal' && <Smartphone className="h-5 w-5 text-accent" />}
                        {paymentMethod.type === 'crypto' && <Coins className="h-5 w-5 text-primary" />}
                        {paymentMethod.type === 'apple' && <Apple className="h-5 w-5 text-secondary" />}
                        {paymentMethod.type === 'google' && <Chrome className="h-5 w-5 text-accent" />}
                        <span className="font-semibold text-foreground capitalize">
                          {paymentMethod.type === 'card' && 'Credit Card'}
                          {paymentMethod.type === 'bank' && 'Bank Transfer'}
                          {paymentMethod.type === 'paypal' && 'PayPal'}
                          {paymentMethod.type === 'crypto' && 'Cryptocurrency'}
                          {paymentMethod.type === 'apple' && 'Apple Pay'}
                          {paymentMethod.type === 'google' && 'Google Pay'}
                        </span>
                      </div>
                      
                      {paymentMethod.type === 'card' && (
                        <>
                          <p className="text-foreground">{paymentMethod.cardholderName}</p>
                          <p className="text-foreground">
                            **** **** **** {paymentMethod.cardNumber.slice(-4)}
                          </p>
                          <p className="text-foreground">{paymentMethod.expiryDate}</p>
                        </>
                      )}
                      
                      {paymentMethod.type === 'bank' && (
                        <>
                          <p className="text-foreground">{paymentMethod.cardholderName}</p>
                          <p className="text-foreground">
                            Account: ****{paymentMethod.bankAccount?.slice(-4)}
                          </p>
                          <p className="text-foreground">
                            Routing: ****{paymentMethod.routingNumber?.slice(-4)}
                          </p>
                        </>
                      )}
                      
                      {paymentMethod.type === 'paypal' && (
                        <p className="text-foreground">{paymentMethod.paypalEmail}</p>
                      )}
                      
                      {paymentMethod.type === 'crypto' && (
                        <>
                          <p className="text-foreground">
                            {paymentMethod.cryptoType?.toUpperCase()} Wallet
                          </p>
                          <p className="text-foreground font-mono text-sm">
                            {paymentMethod.cryptoAddress?.slice(0, 8)}...{paymentMethod.cryptoAddress?.slice(-8)}
                          </p>
                        </>
                      )}
                      
                      {(paymentMethod.type === 'apple' || paymentMethod.type === 'google') && (
                        <p className="text-foreground">
                          {paymentMethod.type === 'apple' ? 'Apple Pay' : 'Google Pay'} will be used for this transaction
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Order Items Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Package className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-semibold text-foreground">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-foreground">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="/terms" className="text-primary hover:text-primary-glow transition-colors duration-300">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-primary hover:text-primary-glow transition-colors duration-300">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Order Complete */}
            {currentStep === 4 && (
              <div className="glass-card p-8 text-center animate-slide-up stagger-2">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
                {orderId && (
                  <div className="bg-muted/10 rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="text-2xl font-bold text-primary">{orderId}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NeonButton variant="primary" onClick={() => navigate('/orders')}>
                    View Order Status
                  </NeonButton>
                  <NeonButton variant="secondary" onClick={() => navigate('/products')}>
                    Continue Shopping
                  </NeonButton>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="animate-slide-up stagger-3">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal ({items.length} items)</span>
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

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="space-y-3">
                  <NeonButton 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    onClick={currentStep === 3 ? handlePlaceOrder : handleNext}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : currentStep === 3 ? (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Place Order
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </NeonButton>
                  <NeonButton variant="ghost" className="w-full" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </NeonButton>
                </div>
              )}

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>PCI DSS compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
