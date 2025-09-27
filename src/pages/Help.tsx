import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Phone,
  Mail,
  ChevronRight,
  HelpCircle,
  Zap,
  Users,
  Settings,
  BarChart3,
  ShoppingCart,
  Target,
  Shield,
  Clock
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'account', name: 'Account & Profile', icon: Users },
    { id: 'products', name: 'Products & Catalog', icon: ShoppingCart },
    { id: 'analytics', name: 'Analytics & Reports', icon: BarChart3 },
    { id: 'recommendations', name: 'AI Recommendations', icon: Target },
    { id: 'security', name: 'Security & Privacy', icon: Shield },
    { id: 'billing', name: 'Billing & Payments', icon: Settings }
  ];

  const articles = [
    {
      id: 1,
      title: 'Getting Started with Qwipo',
      category: 'getting-started',
      description: 'Learn the basics of navigating and using the Qwipo platform',
      readTime: '5 min read',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Setting Up Your Profile',
      category: 'account',
      description: 'Complete guide to configuring your account and preferences',
      readTime: '3 min read',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Understanding AI Recommendations',
      category: 'recommendations',
      description: 'How our AI algorithm works and how to improve recommendations',
      readTime: '8 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Product Search and Filtering',
      category: 'products',
      description: 'Master the search functionality and advanced filtering options',
      readTime: '6 min read',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      title: 'Analytics Dashboard Overview',
      category: 'analytics',
      description: 'Navigate and interpret your business analytics dashboard',
      readTime: '10 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'Security Best Practices',
      category: 'security',
      description: 'Keep your account and data secure with these tips',
      readTime: '7 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      title: 'Managing Your Cart and Orders',
      category: 'products',
      description: 'Complete guide to shopping cart and order management',
      readTime: '4 min read',
      difficulty: 'Beginner'
    },
    {
      id: 8,
      title: 'Billing and Payment Methods',
      category: 'billing',
      description: 'Understanding billing cycles and payment options',
      readTime: '5 min read',
      difficulty: 'Beginner'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with a support specialist',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      action: 'Send Email'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      action: 'Watch Videos'
    }
  ];

  const popularTopics = [
    'How to set up AI recommendations',
    'Understanding your analytics dashboard',
    'Managing user permissions',
    'Integrating with existing systems',
    'Troubleshooting login issues',
    'Customizing your profile'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <HelpCircle className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How can we{' '}
            <span className="neon-text">help</span>
            <br />
            you today?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers, get support, and learn how to make the most of Qwipo's powerful features.
          </p>
        </div>

        {/* Search Section */}
        <div className="glass-card p-8 mb-12 animate-slide-up stagger-1">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-input border border-border rounded-lg pl-12 pr-4 py-4 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={action.title} className={`glass-card p-6 text-center group hover:glow-primary transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <NeonButton variant="glass" size="sm" className="w-full">
                  {action.action}
                </NeonButton>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 animate-slide-up stagger-1">
              <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow-primary'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Topics */}
            <div className="glass-card p-6 mt-6 animate-slide-up stagger-2">
              <h3 className="text-lg font-bold text-foreground mb-4">Popular Topics</h3>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Articles List */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="space-y-4">
              {filteredArticles.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse different categories
                  </p>
                  <NeonButton variant="primary">Browse All Articles</NeonButton>
                </div>
              ) : (
                filteredArticles.map((article, index) => (
                  <div key={article.id} className={`glass-card p-6 hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 3, 4)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.difficulty === 'Beginner' 
                              ? 'bg-accent/20 text-accent border border-accent/30'
                              : 'bg-primary/20 text-primary border border-primary/30'
                          }`}>
                            {article.difficulty}
                          </span>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-300 cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{article.description}</p>
                        <div className="flex items-center space-x-4">
                          <NeonButton variant="ghost" size="sm">
                            Read Article
                          </NeonButton>
                          <NeonButton variant="ghost" size="sm">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Save
                          </NeonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 animate-slide-up stagger-3">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Still need <span className="neon-text">help</span>?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get in touch with us through any of these channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton variant="primary" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Live Chat
              </NeonButton>
              <NeonButton variant="glass" size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Call Support
              </NeonButton>
              <NeonButton variant="glass" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </NeonButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
