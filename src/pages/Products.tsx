import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { NeonButton } from '@/components/ui/neon-button';
import { mockProducts } from '@/data/products';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Handle search from URL
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Product <span className="neon-text">Catalog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge products tailored to your business needs
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-input hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-input hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Advanced Filters */}
              <NeonButton
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </NeonButton>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                    />
                    <span className="text-muted-foreground">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground">
                    <option>Any Rating</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
                  <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground">
                    <option>All Products</option>
                    <option>In Stock Only</option>
                    <option>Pre-order</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 animate-slide-up stagger-2">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="bg-input border border-border rounded-lg px-3 py-2 text-foreground text-sm">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`animate-slide-up stagger-3 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-slide-up">
            <div className="glass-card max-w-md mx-auto">
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all products
              </p>
              <NeonButton 
                variant="primary" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </NeonButton>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12 animate-slide-up stagger-4">
            <NeonButton variant="glass" size="lg">
              Load More Products
            </NeonButton>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;