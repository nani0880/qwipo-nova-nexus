import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Zap, 
  Brain, 
  Shield, 
  Users, 
  Target, 
  TrendingUp,
  Award,
  Globe,
  Rocket,
  Star
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'AI Accuracy', value: '99.2%', icon: Brain },
    { label: 'Products', value: '50,000+', icon: Target },
    { label: 'Countries', value: '25+', icon: Globe }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Founder',
      image: '/api/placeholder/200/200',
      bio: 'AI researcher with 15+ years in machine learning and e-commerce innovation.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      image: '/api/placeholder/200/200',
      bio: 'Full-stack architect specializing in scalable AI systems and cloud infrastructure.'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Head of AI',
      image: '/api/placeholder/200/200',
      bio: 'Leading expert in recommendation systems and natural language processing.'
    },
    {
      name: 'Alex Thompson',
      role: 'Head of Product',
      image: '/api/placeholder/200/200',
      bio: 'Product strategist with deep experience in B2B platform development.'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'AI-First Approach',
      description: 'We believe artificial intelligence should enhance human decision-making, not replace it.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Enterprise-grade security with complete data privacy and GDPR compliance.'
    },
    {
      icon: Users,
      title: 'User-Centric Design',
      description: 'Every feature is designed with our users\' needs and workflows in mind.'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible in B2B commerce.'
    }
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
              About Qwipo
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Revolutionizing{' '}
            <span className="neon-text">B2B Commerce</span>
            <br />
            with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building the future of business-to-business commerce, where artificial intelligence 
            meets human intuition to create unparalleled shopping experiences.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`glass-card text-center group hover:glow-primary transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold neon-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="glass-card p-12 mb-16 animate-slide-up stagger-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our <span className="neon-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To democratize access to cutting-edge technology for businesses of all sizes. 
                We believe every company should have access to AI-powered insights and personalized 
                product recommendations that were once only available to enterprise giants.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform combines advanced machine learning algorithms with intuitive design 
                to create a seamless B2B commerce experience that adapts to your business needs.
              </p>
              <NeonButton variant="primary" size="lg">
                <Rocket className="mr-2 h-5 w-5" />
                Join Our Mission
              </NeonButton>
            </div>
            <div className="relative">
              <div className="glass-card p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">AI-Powered Insights</h3>
                      <p className="text-sm text-muted-foreground">Real-time business intelligence</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Personalized Recommendations</h3>
                      <p className="text-sm text-muted-foreground">Tailored to your business needs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Growth Analytics</h3>
                      <p className="text-sm text-muted-foreground">Data-driven decision making</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our <span className="neon-text">Values</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className={`glass-card p-8 group hover:glow-primary transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our <span className="neon-text">Team</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind Qwipo's innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={member.name} className={`glass-card p-6 text-center group hover:glow-primary transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="w-24 h-24 bg-gradient-neon rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-background" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div className="glass-card p-12 animate-slide-up stagger-1">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recognition & <span className="neon-text">Awards</span></h2>
            <p className="text-lg text-muted-foreground">
              Industry recognition for our innovative approach
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Best AI Platform 2024</h3>
              <p className="text-sm text-muted-foreground">TechCrunch Disrupt</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Innovation Award</h3>
              <p className="text-sm text-muted-foreground">B2B Commerce Summit</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20 w-fit mx-auto mb-4">
                <Globe className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Global Impact</h3>
              <p className="text-sm text-muted-foreground">World Economic Forum</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
