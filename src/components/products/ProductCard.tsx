import React from 'react';
import { Product } from '@/data/products';
import { NeonButton } from '@/components/ui/neon-button';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';
import { Star, Zap, Package, TrendingUp } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onAddToCart }) => {
  const staggerClass = `stagger-${Math.min(index + 1, 4)}`;
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product, 1);
    onAddToCart?.(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className={`glass-card group hover:scale-105 transition-all duration-500 animate-slide-up ${staggerClass} relative overflow-hidden`}>
      {/* Trending Badge */}
      {product.trending && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center space-x-1 bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium border border-accent/30">
            <TrendingUp className="h-3 w-3" />
            <span>Trending</span>
          </div>
        </div>
      )}

      {/* Recommended Badge */}
      {product.recommended && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-1 bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium border border-secondary/30">
            <Zap className="h-3 w-3" />
            <span>AI Pick</span>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg mb-4 overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-16 w-16 text-primary/30" />
            </div>
          </>
        )}
        <div className="absolute bottom-2 right-2 glass-card p-1">
          <span className={`text-xs font-medium ${product.inStock ? 'text-accent' : 'text-red-400'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {product.features.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded-full">
              +{product.features.length - 2} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-accent fill-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{product.rating}</span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-2xl font-bold neon-text-secondary">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex space-x-2">
            <NeonButton variant="ghost" size="sm">
              View
            </NeonButton>
            <NeonButton 
              variant="primary" 
              size="sm" 
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </NeonButton>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;