export type PlatformType = 'meesho' | 'flipkart' | 'amazon' | 'other';

export type CategoryType = 'Cable Protectors' | 'Lens Protectors' | 'Cases & Gadgets' | 'All' | string;

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductClicks {
  meesho: number;
  flipkart: number;
  amazon: number;
  total: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  platform: PlatformType;
  link: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  featured?: boolean;
  stockStatus?: StockStatus;
  description?: string;
  sku?: string;
  clicks?: ProductClicks;
}

export type RouteView = 'public' | 'admin';
