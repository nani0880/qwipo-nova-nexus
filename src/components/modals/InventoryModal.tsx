import React, { useState } from 'react';
import { NeonButton } from '@/components/ui/neon-button';
import { InventoryItem } from '@/services/dashboardService';
import { X, Save, Package, DollarSign, Hash, Tag } from 'lucide-react';

interface InventoryModalProps {
  item?: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<InventoryItem>) => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    sku: item?.sku || '',
    category: item?.category || '',
    stock: item?.stock || 0,
    price: item?.price || 0,
    cost: item?.cost || 0,
    supplier: item?.supplier || '',
    status: item?.status || 'in_stock'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' || name === 'cost' ? Number(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {item ? 'Edit Inventory Item' : 'Add New Item'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Package className="inline h-4 w-4 mr-2" />
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Hash className="inline h-4 w-4 mr-2" />
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Tag className="inline h-4 w-4 mr-2" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Software">Software</option>
                  <option value="Storage">Storage</option>
                  <option value="Display">Display</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-border">
              <NeonButton type="button" variant="ghost" onClick={onClose}>
                Cancel
              </NeonButton>
              <NeonButton type="submit" variant="primary">
                <Save className="mr-2 h-4 w-4" />
                {item ? 'Update Item' : 'Add Item'}
              </NeonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;
