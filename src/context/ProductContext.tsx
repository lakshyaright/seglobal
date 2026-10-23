import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PlatformType, StockStatus } from '../types/product.ts';
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
  trackClick: (productId: string, platform: PlatformType) => void;
  setStockStatus: (productId: string, status: StockStatus) => void;
  importProducts: (newProducts: Product[]) => void;
  exportCatalogAsCsv: () => void;
  exportCatalogAsJson: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any) => ({
            ...p,
            isPublished: p.isPublished !== undefined ? p.isPublished : true,
            rating: typeof p.rating === 'number' ? p.rating : 4.1,
            reviews: typeof p.reviews === 'number' ? p.reviews : 20,
            price: Number(p.price) || 199,
            stockStatus: p.stockStatus || 'in_stock',
            clicks: p.clicks || { meesho: 0, flipkart: 0, amazon: 0, total: 0 },
            description: p.description || 'Premium mobile accessory with aesthetic design.',
            sku: p.sku || 'SEG-' + (p.id ? p.id.toUpperCase() : '01'),
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
      stockStatus: item.stockStatus || 'in_stock',
      clicks: { meesho: 0, flipkart: 0, amazon: 0, total: 0 },
      sku: item.sku || 'SEG-' + Date.now().toString().slice(-4),
      description: item.description || 'Premium mobile accessory crafted with high personality.',
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

  const setStockStatus = (id: string, status: StockStatus) => {
    saveProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              stockStatus: status,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const trackClick = (productId: string, platform: PlatformType) => {
    saveProducts(
      products.map((p) => {
        if (p.id === productId) {
          const currentClicks = p.clicks || { meesho: 0, flipkart: 0, amazon: 0, total: 0 };
          const platformKey = platform === 'meesho' ? 'meesho' : platform === 'flipkart' ? 'flipkart' : 'amazon';
          return {
            ...p,
            clicks: {
              ...currentClicks,
              [platformKey]: (currentClicks[platformKey] || 0) + 1,
              total: (currentClicks.total || 0) + 1,
            },
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    saveProducts([...DEFAULT_PRODUCTS]);
  };

  const importProducts = (newItems: Product[]) => {
    saveProducts(newItems);
  };

  const exportCatalogAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `seglobal_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  const exportCatalogAsCsv = () => {
    const headers = ['id', 'sku', 'title', 'category', 'price', 'originalPrice', 'rating', 'platform', 'stockStatus', 'isPublished', 'totalClicks', 'link'];
    const rows = products.map((p) => [
      p.id,
      p.sku || '',
      `"${p.title.replace(/"/g, '""')}"`,
      p.category,
      p.price,
      p.originalPrice || '',
      p.rating,
      p.platform,
      p.stockStatus || 'in_stock',
      p.isPublished ? 'true' : 'false',
      p.clicks?.total || 0,
      `"${p.link}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `seglobal_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        trackClick,
        setStockStatus,
        importProducts,
        exportCatalogAsCsv,
        exportCatalogAsJson,
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
