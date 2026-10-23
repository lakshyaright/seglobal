import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product.ts';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts.ts';

const STORAGE_KEY = 'se_products';

interface ProductContextType {
  products: Product[];
  publishedProducts: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  togglePublish: (id: string) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure isPublished property exists on all products
          return parsed.map((p: any) => ({
            ...p,
            isPublished: p.isPublished !== undefined ? p.isPublished : true,
            rating: typeof p.rating === 'number' ? p.rating : 4.1,
            reviews: typeof p.reviews === 'number' ? p.reviews : 20,
            price: Number(p.price) || 199,
          }));
        }
      }
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return DEFAULT_PRODUCTS;
  });

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  };

  // Sync across tabs if user opens admin in one tab and public in another
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProducts(parsed);
          }
        } catch (err) {
          console.error('Failed to parse storage update:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addProduct = (item: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...item,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString(),
      isPublished: item.isPublished !== undefined ? item.isPublished : true,
    };
    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    saveProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updated,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const togglePublish = (id: string) => {
    saveProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              isPublished: !p.isPublished,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    saveProducts([...DEFAULT_PRODUCTS]);
  };

  const publishedProducts = products.filter((p) => p.isPublished);

  return (
    <ProductContext.Provider
      value={{
        products,
        publishedProducts,
        addProduct,
        updateProduct,
        togglePublish,
        deleteProduct,
        resetToDefaults,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
