export interface StoreAd {
  id: string;
  title: string;
  subtitle: string;
  badge: string; // e.g. "FLASH SALE", "SPONSORED", "DEAL OF THE DAY"
  ctaText: string; // e.g. "Claim Deal", "Shop Now"
  ctaLink: string;
  image?: string;
  bgGradient: string;
  isActive: boolean;
  clicks: number;
  position: 'top-strip' | 'middle-catalog' | 'popup-deal';
  createdAt: string;
}
