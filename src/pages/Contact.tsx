import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Zap
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Contact form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@qwipo.ai', 'sales@qwipo.ai'],
      description: 'Get in touch via email for any inquiries'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Speak directly with our team'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Innovation Drive', 'San Francisco, CA 94105'],
      description: 'Our headquarters in the heart of Silicon Valley'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM-6PM PST', 'Sat: 10AM-4PM PST'],
      description: 'We\'re here to help during business hours'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Zap className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Let's Build the{' '}
            <span className="neon-text">Future</span>
            <br />
            Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about Qwipo? Want to discuss a partnership? 
            We'd love to hear from you and help you discover the power of AI-driven B2B commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 animate-slide-up stagger-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className={`animate-slide-up stagger-${Math.min(index + 2, 4)}`}>
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-foreground font-medium">{detail}</p>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8 mt-8 animate-slide-up stagger-2">
              <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <NeonButton variant="glass" className="w-full justify-start">
                  <MessageCircle className="mr-3 h-5 w-5" />
                  Live Chat Support
                </NeonButton>
                <NeonButton variant="glass" className="w-full justify-start">
                  <Headphones className="mr-3 h-5 w-5" />
                  Schedule a Demo
                </NeonButton>
                <NeonButton variant="glass" className="w-full justify-start">
                  <Mail className="mr-3 h-5 w-5" />
                  Request Quote
                </NeonButton>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 animate-slide-up stagger-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <NeonButton 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </NeonButton>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 animate-slide-up stagger-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked <span className="neon-text">Questions</span></h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="font-bold text-foreground mb-3">How quickly can I get started?</h3>
              <p className="text-muted-foreground">
                Most customers are up and running within 24 hours. Our onboarding team will guide you through the entire process.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-bold text-foreground mb-3">Do you offer custom integrations?</h3>
              <p className="text-muted-foreground">
                Yes! We provide custom API integrations and can work with your existing systems to ensure seamless connectivity.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-bold text-foreground mb-3">What kind of support do you provide?</h3>
              <p className="text-muted-foreground">
                We offer 24/7 technical support, dedicated account managers, and comprehensive documentation for all users.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-bold text-foreground mb-3">Is my data secure?</h3>
              <p className="text-muted-foreground">
                Absolutely. We use enterprise-grade encryption, comply with GDPR, and maintain SOC 2 Type II certification.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
