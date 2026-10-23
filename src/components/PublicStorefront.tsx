import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext.tsx';
import { useStoreTheme } from '../context/ThemeContext.tsx';
import { StoreTemplateId } from '../types/theme.ts';
import { Product } from '../types/product.ts';
import { 
  Search, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Heart, 
  ArrowUpDown, 
  Lock, 
  PackageX, 
  Palette 
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal.tsx';
import { WishlistDrawer } from './WishlistDrawer.tsx';
import { ProductImageSlider } from './ProductImageSlider.tsx';
import { StoreAdBanner } from './StoreAdBanner.tsx';

interface PublicStorefrontProps {
  onOpenAdmin: () => void;
}

export const PublicStorefront: React.FC<PublicStorefrontProps> = ({ onOpenAdmin }) => {
  const { publishedProducts, trackClick } = useProducts();
  const { effectiveTemplate, designSettings, visitorTemplateId, setVisitorTemplateId } = useStoreTheme();
  const classes = effectiveTemplate.classes;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Extract all categories dynamically from published products
  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [publishedProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return publishedProducts
      .filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.platform.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [publishedProducts, activeCategory, searchQuery, sortBy]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getPlatformColors = (platform: string) => {
    if (platform === 'meesho') return { bg: 'bg-[#9f2089] hover:bg-[#851b73]', label: 'Buy on Meesho' };
    if (platform === 'flipkart') return { bg: 'bg-[#2874f0] hover:bg-[#1a5ec9]', label: 'Buy on Flipkart' };
    return { bg: 'bg-[#e67a00] hover:bg-[#c96a00]', label: 'Buy on Amazon' };
  };

  return (
    <div className={`min-h-screen ${classes.pageBg} ${classes.textColor} flex flex-col font-sans transition-colors duration-300`}>
      {/* 1. Top Announcement Bar */}
      {designSettings.showAnnouncement && (
        <div className={`${classes.announcementBg} ${classes.announcementText} text-xs font-semibold text-center py-2.5 px-4 tracking-wide transition-colors duration-300`}>
          {designSettings.announcementText}
        </div>
      )}

      {/* 2. Top Navigation Bar with Single Admin Button & Optional Visitor Theme Switcher */}
      <header className={`sticky top-0 z-40 ${classes.headerBg} backdrop-blur px-4 md:px-8 py-3.5 transition-colors duration-300 border-b`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-brand text-2xl font-bold tracking-tight uppercase leading-none">
              SE GLOBAL*
            </span>
            <span className={`text-[11px] ${classes.mutedText} font-medium tracking-wide mt-1`}>
              mobile accessories with personality
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Optional Visitor Theme Selector (Configured by Admin) */}
            {designSettings.allowVisitorThemeToggle && (
              <div className="hidden sm:flex items-center gap-1 p-1 bg-black/5 dark:bg-white/10 rounded-full text-[11px]">
                <Palette className="w-3.5 h-3.5 ml-1.5 opacity-60" />
                <button
                  onClick={() => setVisitorTemplateId('warm-boutique')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    effectiveTemplate.id === 'warm-boutique' ? 'bg-white text-black shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  title="Warm Boutique Theme"
                >
                  Warm
                </button>
                <button
                  onClick={() => setVisitorTemplateId('midnight-cyber')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    effectiveTemplate.id === 'midnight-cyber' ? 'bg-white text-black shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  title="Midnight Cyber Theme"
                >
                  Dark
                </button>
                <button
                  onClick={() => setVisitorTemplateId('nordic-studio')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    effectiveTemplate.id === 'nordic-studio' ? 'bg-white text-black shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  title="Nordic Studio Theme"
                >
                  Nordic
                </button>
                <button
                  onClick={() => setVisitorTemplateId('candy-kawaii')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    effectiveTemplate.id === 'candy-kawaii' ? 'bg-white text-black shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  title="Candy Kawaii Theme"
                >
                  Candy
                </button>
              </div>
            )}

            {/* Saved Wishlist Drawer Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative cursor-pointer mr-1"
              title="View saved wishlist items"
            >
              <Heart className={`w-4 h-4 ${likedIds.size > 0 ? 'text-rose-500 fill-rose-500' : 'opacity-70'}`} />
              {likedIds.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {likedIds.size}
                </span>
              )}
            </button>

            {/* Exactly ONE Admin button on the entire public page */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
              title="Admin Portal login"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Customizable by Admin) */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <span className={`inline-block ${classes.badgeBg} ${classes.badgeText} px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 transition-colors`}>
          {designSettings.heroBadge}
        </span>
        <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {designSettings.heroHeadline}
        </h1>
        <p className={`${classes.mutedText} text-sm md:text-base max-w-xl mx-auto leading-relaxed`}>
          {designSettings.heroSubheadline}
        </p>
      </section>

      {/* Dynamic Store Ad & Promotional Campaign Banner */}
      <section className="max-w-6xl mx-auto px-4 mb-6">
        <StoreAdBanner position="top-strip" />
      </section>

      {/* 4. Filter & Search Controls */}
      <section className="max-w-6xl mx-auto px-4 mb-8 w-full">
        <div className={`${classes.cardBg} p-3.5 rounded-2xl border ${classes.cardBorder} shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 transition-colors`}>
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 ${classes.mutedText} absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cable covers, lens guards, cases..."
              className={`w-full pl-10 pr-4 py-2 ${classes.searchBg} border ${classes.searchBorder} rounded-full text-xs placeholder:opacity-60 focus:outline-none transition-colors`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  activeCategory === cat ? classes.accentPillActive : classes.accentPillInactive
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-black/10">
            <span className={`text-[11px] ${classes.mutedText} flex items-center gap-1`}>
              <ArrowUpDown className="w-3 h-3" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className={`${classes.searchBg} border ${classes.searchBorder} rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none`}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* 5. Product Catalog Grid based on Admin Layout */}
      <main className="max-w-6xl mx-auto px-4 pb-16 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className={`${classes.cardBg} border ${classes.cardBorder} rounded-2xl p-12 text-center max-w-md mx-auto my-8 shadow-sm`}>
            <div className={`w-12 h-12 ${classes.badgeBg} rounded-full flex items-center justify-center mx-auto mb-3 ${classes.mutedText}`}>
              <PackageX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">No products found</h3>
            <p className={`text-xs ${classes.mutedText} mb-4`}>
              {publishedProducts.length === 0
                ? 'No products have been published yet by the store admin.'
                : 'Try clearing your search query or switching categories.'}
            </p>
            {publishedProducts.length > 0 && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className={`px-3.5 py-1.5 ${classes.badgeBg} ${classes.badgeText} rounded-lg text-xs font-semibold cursor-pointer`}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : designSettings.cardLayout === 'list-showcase' ? (
          /* List Showcase Layout */
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredProducts.map((p) => {
              const isUrl = p.image && (p.image.startsWith('http://') || p.image.startsWith('https://') || p.image.startsWith('data:'));
              const isLiked = likedIds.has(p.id);
              const discountPercent = p.originalPrice && p.originalPrice > p.price
                ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                : null;
              const { bg: platformColor, label: platformLabel } = getPlatformColors(p.platform);

              return (
                <div
                  key={p.id}
                  className={`${classes.cardBg} border ${classes.cardBorder} ${classes.cardRadius} p-4 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-200 hover:shadow-lg relative group`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div 
                      onClick={() => setSelectedProduct(p)}
                      className="w-24 h-24 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer group/thumb"
                      title="Click to view full photo gallery"
                    >
                      {isUrl ? (
                        <img 
                          src={(p.images && p.images.length > 0) ? p.images[0] : p.image} 
                          alt={p.title} 
                          className="w-full h-full object-cover transition-transform group-hover/thumb:scale-105" 
                        />
                      ) : (
                        <span className="text-4xl select-none">
                          {(p.images && p.images.length > 0) ? p.images[0] : p.image || '📦'}
                        </span>
                      )}
                      {p.images && p.images.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/75 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          {p.images.length} photos
                        </span>
                      )}
                    </div>
                    <div>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${classes.mutedText} block mb-0.5`}>
                        {p.category}
                      </span>
                      <h3 className="text-sm font-bold leading-snug line-clamp-1">{p.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-lg font-extrabold font-mono">₹{p.price}</span>
                        {p.originalPrice && (
                          <span className={`text-xs ${classes.mutedText} line-through font-mono`}>₹{p.originalPrice}</span>
                        )}
                        {discountPercent && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                            {discountPercent}% OFF
                          </span>
                        )}
                        <span className={`text-[11px] font-semibold ${classes.ratingBg} ${classes.ratingText} px-2 py-0.5 rounded flex items-center gap-1`}>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{p.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => toggleLike(p.id)}
                      className={`p-2 rounded-xl border ${classes.cardBorder} hover:scale-105 transition-transform`}
                      title="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : classes.mutedText}`} />
                    </button>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick(p.id, p.platform)}
                      className={`py-2 px-4 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 ${platformColor} transition-transform active:scale-95`}
                    >
                      <span>{platformLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Grid Layout (Standard or Compact) */
          <div
            className={`grid gap-5 ${
              designSettings.cardLayout === 'grid-compact'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((p) => {
              const isUrl = p.image && (p.image.startsWith('http://') || p.image.startsWith('https://') || p.image.startsWith('data:'));
              const isLiked = likedIds.has(p.id);
              const discountPercent = p.originalPrice && p.originalPrice > p.price
                ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                : null;
              const { bg: platformColor, label: platformLabel } = getPlatformColors(p.platform);
              const isCompact = designSettings.cardLayout === 'grid-compact';

              return (
                <div
                  key={p.id}
                  className={`${classes.cardBg} border ${classes.cardBorder} ${classes.cardRadius} ${isCompact ? 'p-3' : 'p-4'} flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative group`}
                >
                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleLike(p.id)}
                    className="absolute top-5 right-5 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur border border-black/10 flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    title="Add to wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isLiked ? 'fill-rose-500 text-rose-500' : classes.mutedText
                      }`}
                    />
                  </button>

                  <div>
                    {/* Multi-Photo Image Slider (User can slide / swipe photos directly) */}
                    <div className="mb-3 relative">
                      <ProductImageSlider
                        images={p.images && p.images.length > 0 ? p.images : [p.image || '📦']}
                        title={p.title}
                        size={isCompact ? 'compact' : 'standard'}
                        onClickMain={() => setSelectedProduct(p)}
                      />
                      {p.featured && (
                        <span className="absolute top-2 left-2 pointer-events-none bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-sm z-10">
                          Staff Pick
                        </span>
                      )}
                    </div>

                    {/* Metadata Header */}
                    <div className={`text-[11px] font-semibold uppercase tracking-wider ${classes.mutedText} mb-1`}>
                      {p.category}
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedProduct(p)}
                      className={`font-bold leading-snug line-clamp-2 cursor-pointer hover:underline ${isCompact ? 'text-xs min-h-[32px] mb-2' : 'text-sm min-h-[38px] mb-3'}`}
                    >
                      {p.title}
                    </h3>

                    {/* Price and Rating Row */}
                    <div className="flex items-baseline justify-between mb-3.5">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className={`font-extrabold font-mono ${isCompact ? 'text-base' : 'text-xl'}`}>
                          ₹{p.price}
                        </span>
                        {p.originalPrice && (
                          <span className={`text-xs ${classes.mutedText} line-through font-mono`}>
                            ₹{p.originalPrice}
                          </span>
                        )}
                        {discountPercent && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <div className={`flex items-center gap-1 ${classes.ratingBg} ${classes.ratingText} px-2 py-0.5 rounded text-xs font-semibold`}>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{p.rating}</span>
                        {!isCompact && <span className={`text-[11px] ${classes.mutedText}`}>({p.reviews})</span>}
                      </div>
                    </div>
                  </div>

                  {/* Buy / Affiliate Action Button */}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(p.id, p.platform)}
                    className={`w-full py-2.5 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${platformColor} active:scale-[0.98]`}
                  >
                    <span className="truncate">{platformLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. Footer Section */}
      <footer className={`border-t ${classes.footerBorder} ${classes.footerBg} py-10 px-4 mt-auto transition-colors`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center md:text-left">
            <span className="font-brand text-lg font-bold uppercase">
              SE GLOBAL*
            </span>
            <p className={`text-xs ${classes.mutedText} mt-1 max-w-sm`}>
              Curating cute and functional tech accessories from verified Indian e-commerce marketplaces.
            </p>
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-6 text-xs ${classes.mutedText}`}>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 opacity-80" />
              <span>Fast Shipping Across India</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 opacity-80" />
              <span>Verified Marketplace Links</span>
            </div>
          </div>

          <div className={`text-xs ${classes.mutedText}`}>
            <span>© 2026 SE GLOBAL. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Product Quick View & WhatsApp Share Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isLiked={selectedProduct ? likedIds.has(selectedProduct.id) : false}
        onToggleLike={toggleLike}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        likedIds={likedIds}
        onRemoveLiked={toggleLike}
        onClearAll={() => setLikedIds(new Set())}
      />
    </div>
  );
};
