import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../products/ProductCard'
import { Product } from '@/data/products'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  category: 'Electronics',
  price: 999.99,
  description: 'A test product',
  image: '/test-image.jpg',
  rating: 4.5,
  inStock: true,
  features: ['Feature 1', 'Feature 2'],
  trending: true,
  recommended: false,
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('$999.99')).toBeInTheDocument()
    expect(screen.getByText('A test product')).toBeInTheDocument()
  })

  it('shows trending badge when product is trending', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Trending')).toBeInTheDocument()
  })

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    const mockOnAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('disables Add to Cart button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    render(<ProductCard product={outOfStockProduct} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    expect(addToCartButton).toBeDisabled()
  })
})

