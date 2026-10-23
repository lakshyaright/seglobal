import React, { useState } from 'react';
import { Product } from '../types/product.ts';
import { useProducts } from '../context/ProductContext.tsx';
import { 
  X, 
  Star, 
  ExternalLink, 
  Heart, 
  Share2, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Tag, 
  AlertCircle 
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isLiked,
  onToggleLike,
}) => {
  const { trackClick } = useProducts();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const isUrl = product.image && (product.image.startsWith('http://') || product.image.startsWith('https://') || product.image.startsWith('data:'));
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const getPlatformColors = (platform: string) => {
    if (platform === 'meesho') return { bg: 'bg-[#9f2089] hover:bg-[#851b73]', label: 'Buy on Meesho' };
    if (platform === 'flipkart') return { bg: 'bg-[#2874f0] hover:bg-[#1a5ec9]', label: 'Buy on Flipkart' };
    return { bg: 'bg-[#e67a00] hover:bg-[#c96a00]', label: 'Buy on Amazon' };
  };

  const { bg: platformColor, label: platformLabel } = getPlatformColors(product.platform);

  const handleBuyClick = () => {
    trackClick(product.id, product.platform);
  };

  const shareText = encodeURIComponent(`Check out "${product.title}" for ₹${product.price} on SE GLOBAL! Buy link: ${product.link}`);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '?product=' + product.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-black/10 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-600 dark:text-slate-300 transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto flex-1 pr-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Box */}
            <div className="w-full h-72 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden relative shadow-inner">
              {isUrl ? (
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-8xl select-none">{product.image || '📦'}</div>
              )}

              {/* Heart Button */}
              <button
                onClick={() => onToggleLike(product.id)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-black/10 flex items-center justify-center transition-transform hover:scale-110 shadow-sm cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
              </button>

              {/* Stock Status Badge */}
              <div className="absolute bottom-3 left-3">
                {product.stockStatus === 'out_of_stock' ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-500 text-white shadow-sm">
                    Out of Stock
                  </span>
                ) : product.stockStatus === 'low_stock' ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-slate-950 shadow-sm">
                    Only Few Left!
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white shadow-sm">
                    In Stock & Ready
                  </span>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {product.category}
                  </span>
                  <span className="font-mono text-[11px]">{product.sku || 'SEG-01'}</span>
                </div>

                <h2 className="text-lg font-bold leading-snug">{product.title}</h2>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-amber-400/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">({product.reviews} verified marketplace ratings)</span>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3 pt-3 border-t border-black/10 dark:border-slate-800">
                  {product.description || 'Designed for everyday durability with flexible premium materials to protect your tech from drops, bends, and cable fraying.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBuyClick}
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 ${platformColor} transition-transform active:scale-95 shadow-md`}
                >
                  <span>{platformLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* WhatsApp & Share Row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Share on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="py-2 px-3 rounded-xl border border-black/10 dark:border-slate-700 bg-black/5 dark:bg-slate-800 hover:bg-black/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-2xl text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-500" />
              <span>Fast Tracked Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Verified Merchant Link</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Lowest Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
