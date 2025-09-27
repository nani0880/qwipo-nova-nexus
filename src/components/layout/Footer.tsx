import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    products: [
      { name: 'AI Recommendations', href: '/recommendations' },
      { name: 'Product Catalog', href: '/products' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'API', href: '/api' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  return (
    <footer className="glass-card mt-16 mx-4 mb-4">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md"></div>
              </div>
              <span className="text-2xl font-bold neon-text">Qwipo</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionary B2B e-commerce platform powered by AI. Discover personalized products 
              and transform your business with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="glass-card p-2 hover:glow-primary transition-all duration-300">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="glass-card p-2 hover:glow-secondary transition-all duration-300">
                <Linkedin className="h-5 w-5 text-secondary" />
              </a>
              <a href="#" className="glass-card p-2 hover:glow-accent transition-all duration-300">
                <Github className="h-5 w-5 text-accent" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">support@qwipo.ai</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} Qwipo. All rights reserved. Powered by AI.
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
