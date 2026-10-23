export type PlatformType = 'meesho' | 'flipkart' | 'amazon' | 'other';

export type CategoryType = 'Cable Protectors' | 'Lens Protectors' | 'Cases & Gadgets' | 'All' | string;

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
}

export type RouteView = 'public' | 'admin';
