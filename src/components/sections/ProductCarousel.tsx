import React from 'react';
import { Product } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { NeonButton } from '@/components/ui/neon-button';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  subtitle?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, subtitle }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 320; // Width of a card plus gap
      const scrollLeft = scrollContainer.current.scrollLeft;
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollContainer.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 animate-slide-up">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold neon-text">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <NeonButton
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="hover:glow-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </NeonButton>
            <NeonButton
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="hover:glow-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </NeonButton>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainer}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="flex-none w-80">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center space-x-2 mt-6">
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="hover:glow-primary"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </NeonButton>
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="hover:glow-primary"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </NeonButton>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;