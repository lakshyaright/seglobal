import React, { useState } from 'react';
import { RouteView } from '../types/product.ts';
import { useProducts } from '../context/ProductContext.tsx';
import { Globe, Shield, ExternalLink, Copy, Check, Eye } from 'lucide-react';

interface UrlBarProps {
  currentRoute: RouteView;
  onNavigate: (route: RouteView) => void;
}

export const UrlBar: React.FC<UrlBarProps> = ({ currentRoute, onNavigate }) => {
  const { publishedProducts, products } = useProducts();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const baseUrl = window.location.origin;
  const publicUrl = `${baseUrl}/`;
  const adminUrl = `${baseUrl}/admin`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(type);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <aside aria-label="Route Switcher" className="bg-neutral-900 text-neutral-200 border-b border-neutral-800 text-xs py-2 px-4 select-none sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Mode Switcher Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400 font-medium hidden md:inline">
            Active View:
          </span>

          <div className="flex items-center gap-1 p-0.5 bg-neutral-950 rounded-lg border border-neutral-800">
            <button
              onClick={() => onNavigate('public')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                currentRoute === 'public'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Store</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                currentRoute === 'public' ? 'bg-neutral-950/20 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'
              }`}>
                {publishedProducts.length} live
              </span>
            </button>

            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                currentRoute === 'admin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                currentRoute === 'admin' ? 'bg-blue-800 text-white font-bold' : 'bg-neutral-800 text-neutral-300'
              }`}>
                {products.length} total
              </span>
            </button>
          </div>
        </div>

        {/* Center / Right: Exact URLs display and copy triggers */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-neutral-400 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
            <span className="text-neutral-500">URL:</span>
            <code className="text-neutral-200 font-mono font-medium">
              {currentRoute === 'admin' ? '/admin' : '/'}
            </code>
            <button
              onClick={() =>
                copyToClipboard(
                  currentRoute === 'admin' ? adminUrl : publicUrl,
                  currentRoute
                )
              }
              className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors ml-1"
              title="Copy link to clipboard"
            >
              {copiedUrl === currentRoute ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>

          {currentRoute === 'admin' ? (
            <button
              onClick={() => onNavigate('public')}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Public Store &rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Manage Store (Admin) &rarr;</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
