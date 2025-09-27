import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Shield, AlertTriangle, Scale, Users, Zap } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: 'By accessing and using Qwipo, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: 'Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account.'
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Uses',
      content: 'You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.'
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: 'In no event shall Qwipo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FileText className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Terms of Service
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms of <span className="neon-text">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our AI-powered B2B commerce platform.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="glass-card p-8 mb-12 animate-slide-up stagger-1">
          <h2 className="text-2xl font-bold text-foreground mb-6">Agreement to Terms</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the Qwipo platform and services 
              (the "Service") operated by Qwipo Inc. ("us", "we", or "our").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you 
              disagree with any part of these terms, then you may not access the Service.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className={`glass-card p-8 animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            );
          })}
        </div>

        {/* Service Description */}
        <div className="glass-card p-8 mt-12 animate-slide-up stagger-3">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Service Description</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Qwipo provides an AI-powered B2B commerce platform that includes:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Personalized product recommendations</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Advanced analytics and reporting</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">Order management and tracking</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">API access for integrations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="glass-card p-8 mt-12 animate-slide-up stagger-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Payment Terms</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Subscription fees are billed in advance on a monthly or annual basis. All fees are 
              non-refundable except as required by law.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Fees are automatically charged to your payment method on the billing date.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Cancellation</h3>
                <p className="text-sm text-muted-foreground">
                  You may cancel your subscription at any time through your account settings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card p-8 mt-12 animate-slide-up stagger-5">
          <h2 className="text-2xl font-bold text-foreground mb-6">Questions About Terms?</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">legal@qwipo.ai</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">123 Innovation Drive<br />San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
