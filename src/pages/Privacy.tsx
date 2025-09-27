import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Eye, Lock, Database, Globe, Users } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, company details)',
        'Usage data and analytics',
        'Product preferences and recommendations',
        'Communication records with our support team'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our AI-powered services',
        'Personalize product recommendations',
        'Process transactions and manage your account',
        'Send important updates and notifications'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'Enterprise-grade encryption for all data',
        'Regular security audits and assessments',
        'Access controls and authentication protocols',
        'Secure data centers with 24/7 monitoring'
      ]
    },
    {
      icon: Globe,
      title: 'International Transfers',
      content: [
        'Data may be processed in secure facilities worldwide',
        'All transfers comply with applicable data protection laws',
        'Standard contractual clauses for international transfers',
        'Your data rights remain protected regardless of location'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your <span className="neon-text">Privacy</span> Matters
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're committed to protecting your privacy and being transparent about how we collect, 
            use, and safeguard your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="glass-card p-8 mb-12 animate-slide-up stagger-1">
          <h2 className="text-2xl font-bold text-foreground mb-6">Introduction</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Qwipo, we understand that your privacy is important. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our 
              AI-powered B2B commerce platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance 
              with this policy. If you do not agree with the terms of this Privacy Policy, please 
              do not access or use our services.
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
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Your Rights */}
        <div className="glass-card p-8 mt-12 animate-slide-up stagger-3">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-foreground mb-3">Access & Portability</h3>
              <p className="text-sm text-muted-foreground">
                You can request a copy of your personal data and have it transferred to another service.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Correction & Updates</h3>
              <p className="text-sm text-muted-foreground">
                You can update or correct your personal information at any time through your account settings.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Deletion</h3>
              <p className="text-sm text-muted-foreground">
                You can request deletion of your personal data, subject to certain legal and operational requirements.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Opt-out</h3>
              <p className="text-sm text-muted-foreground">
                You can opt out of marketing communications and certain data processing activities.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card p-8 mt-12 animate-slide-up stagger-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Questions About Privacy?</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">privacy@qwipo.ai</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Data Protection Officer</h3>
              <p className="text-muted-foreground">dpo@qwipo.ai</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
