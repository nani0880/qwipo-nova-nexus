import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NeonButton } from '@/components/ui/neon-button';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Zap,
  Heart,
  Target,
  Rocket,
  Star,
  Award
} from 'lucide-react';

const Careers = () => {
  const openPositions = [
    {
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Lead the development of our next-generation AI recommendation engine.',
      requirements: ['5+ years ML experience', 'Python, TensorFlow', 'PhD in AI/ML preferred']
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build beautiful, responsive user interfaces for our B2B platform.',
      requirements: ['React, TypeScript', '3+ years experience', 'UI/UX design skills']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Drive product strategy and roadmap for our AI-powered commerce platform.',
      requirements: ['5+ years PM experience', 'B2B SaaS background', 'Technical understanding']
    },
    {
      title: 'Sales Engineer',
      department: 'Sales',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Help enterprise clients implement and optimize our AI solutions.',
      requirements: ['Technical sales experience', 'AI/ML knowledge', 'Enterprise sales background']
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs'
    },
    {
      icon: Rocket,
      title: 'Growth Opportunities',
      description: 'Learning budget, conference attendance, and career development programs'
    },
    {
      icon: Users,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO'
    },
    {
      icon: Star,
      title: 'Equity & Rewards',
      description: 'Competitive salary, equity participation, and performance bonuses'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and technology'
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'We believe the best solutions come from diverse teams working together'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code to customer service'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Briefcase className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Join Our Team
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Build the{' '}
            <span className="neon-text">Future</span>
            <br />
            of B2B Commerce
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join a team of passionate innovators building the next generation of AI-powered 
            business solutions. Help us revolutionize how companies discover and purchase products.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="glass-card p-12 mb-16 animate-slide-up stagger-1">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Join <span className="neon-text">Qwipo</span>?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just building software – we're creating the future of business commerce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Benefits & <span className="neon-text">Perks</span></h2>
            <p className="text-lg text-muted-foreground">
              We invest in our team's success and well-being
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className={`glass-card p-6 group hover:glow-primary transition-all duration-500 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Open <span className="neon-text">Positions</span></h2>
            <p className="text-lg text-muted-foreground">
              Find your perfect role and help us build the future
            </p>
          </div>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={position.title} className={`glass-card p-8 hover:glow-primary transition-all duration-300 animate-slide-up stagger-${Math.min(index + 1, 4)}`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-bold text-foreground">{position.title}</h3>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
                        {position.department}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{position.type}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-muted/20 text-muted-foreground rounded-full text-xs border border-muted/30">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <NeonButton variant="primary">
                      Apply Now
                    </NeonButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="glass-card p-12 animate-slide-up stagger-3">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our <span className="neon-text">Culture</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We foster an environment where innovation thrives and every voice matters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold neon-text mb-2">50+</div>
              <div className="text-muted-foreground">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold neon-text-secondary mb-2">15</div>
              <div className="text-muted-foreground">Countries Represented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Employee Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-slide-up stagger-4">
          <div className="glass-card p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Don't See Your <span className="neon-text">Dream Job</span>?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our vision. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton variant="primary" size="lg">
                <Briefcase className="mr-2 h-5 w-5" />
                Send Resume
              </NeonButton>
              <NeonButton variant="glass" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Learn More
              </NeonButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
