import React from 'react';
import { Product } from '../types/product.ts';
import { useProducts } from '../context/ProductContext.tsx';
import { X, Heart, Trash2, ExternalLink, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  likedIds: Set<string>;
  onRemoveLiked: (id: string) => void;
  onClearAll: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  likedIds,
  onRemoveLiked,
  onClearAll,
}) => {
  const { products, trackClick } = useProducts();

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => likedIds.has(p.id));
  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-black/10 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-black/10 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-base font-bold">My Saved Items ({wishlistProducts.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                <h3 className="text-sm font-semibold">Your wishlist is empty</h3>
                <p className="text-xs max-w-xs mx-auto">
                  Click the heart icon on any accessory to save it here for later.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => {
                const isUrl = p.image && (p.image.startsWith('http://') || p.image.startsWith('https://') || p.image.startsWith('data:'));
                return (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl border border-black/10 dark:border-slate-800 flex items-center justify-between gap-3 group bg-black/[0.02] dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                        {isUrl ? (
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{p.image || '📦'}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold line-clamp-1">{p.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-extrabold font-mono">₹{p.price}</span>
                          <span className="text-[10px] font-bold uppercase text-slate-400">{p.platform}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick(p.id, p.platform)}
                        className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                        title="Buy Now"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onRemoveLiked(p.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Total */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-black/10 dark:border-slate-800 bg-black/[0.02] dark:bg-white/[0.02] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Wishlist Value:</span>
                <span className="text-base font-extrabold font-mono">₹{totalValue}</span>
              </div>
              <button
                onClick={onClearAll}
                className="w-full py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 border border-rose-200 dark:border-rose-900/60 rounded-xl transition-colors cursor-pointer"
              >
                Clear Entire Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
