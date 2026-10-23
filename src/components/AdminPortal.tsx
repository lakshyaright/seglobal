import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Product, PlatformType } from '../types/product.ts';
import { 
  Package, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  RotateCcw, 
  Globe, 
  ExternalLink, 
  Upload, 
  Check, 
  AlertCircle,
  Tag,
  DollarSign,
  TrendingUp,
  X,
  LogOut,
  ShieldCheck,
  Download,
  Palette
} from 'lucide-react';
import { AdminThemeCustomizer } from './AdminThemeCustomizer.tsx';

interface AdminPortalProps {
  onViewPublic: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onViewPublic }) => {
  const { products, publishedProducts, addProduct, updateProduct, togglePublish, deleteProduct, resetToDefaults } = useProducts();
  const { logout, adminEmail } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [activeAdminTab, setActiveAdminTab] = useState<'inventory' | 'templates'>('inventory');

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Cable Protectors');
  const [formPlatform, setFormPlatform] = useState<PlatformType>('meesho');
  const [formPrice, setFormPrice] = useState<string>('186');
  const [formOriginalPrice, setFormOriginalPrice] = useState<string>('299');
  const [formRating, setFormRating] = useState<string>('4.1');
  const [formReviews, setFormReviews] = useState<string>('24');
  const [formLink, setFormLink] = useState('https://www.meesho.com');
  const [formImage, setFormImage] = useState('💖');
  const [formIsPublished, setFormIsPublished] = useState<boolean>(true);
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Preset emojis from user's original code + extras
  const EMOJI_PRESETS = ['💖', '🧸', '🐧', '🐼', '⚡', '🎧', '📷', '🌸', '🥑', '🍓', '🐱', '🚀'];

  // Filter products for admin table
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'published'
        ? p.isPublished
        : !p.isPublished;

    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Cable Protectors');
    setFormPlatform('meesho');
    setFormPrice('180');
    setFormOriginalPrice('299');
    setFormRating('4.2');
    setFormReviews('15');
    setFormLink('https://www.meesho.com');
    setFormImage('💖');
    setFormIsPublished(true);
    setFormFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormPlatform(p.platform);
    setFormPrice(p.price.toString());
    setFormOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setFormRating(p.rating.toString());
    setFormReviews(p.reviews.toString());
    setFormLink(p.link);
    setFormImage(p.image);
    setFormIsPublished(p.isPublished);
    setFormFeatured(!!p.featured);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Product title is required.');
      return;
    }
    const numPrice = Number(formPrice);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Please enter a valid selling price.');
      return;
    }

    const payload = {
      title: formTitle.trim(),
      category: formCategory,
      platform: formPlatform,
      price: numPrice,
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : null,
      rating: formRating ? Number(formRating) : 4.1,
      reviews: formReviews ? Number(formReviews) : 0,
      link: formLink.trim(),
      image: formImage.trim() || '📦',
      isPublished: formIsPublished,
      featured: formFeatured,
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    setIsModalOpen(false);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const draftCount = products.length - publishedProducts.length;
  const avgPrice = products.length > 0
    ? Math.round(products.reduce((acc, curr) => acc + curr.price, 0) / products.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  SE GLOBAL · Store Inventory Admin
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Authorized</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <span className="text-slate-200 font-mono font-medium">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onViewPublic}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Store</span>
            </button>

            <a
              href="/seglobal.zip"
              download="seglobal.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-800/60 rounded-md transition-colors cursor-pointer"
              title="Download entire code as ZIP to your local Downloads folder"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </a>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>

            <button
              onClick={() => {
                logout();
                onViewPublic();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-800/60 rounded-md transition-colors cursor-pointer"
              title="Log out of admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeAdminTab === 'inventory'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products & Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('templates')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeAdminTab === 'templates'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Store Templates & Themes</span>
          </button>
        </div>

        {activeAdminTab === 'templates' ? (
          <AdminThemeCustomizer onViewPublic={onViewPublic} />
        ) : (
          <>
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Total Inventory</span>
                  <Package className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">{products.length}</div>
                <div className="text-[11px] text-slate-500 mt-1">Products in catalog</div>
              </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Live on Public Store</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">{publishedProducts.length}</div>
            <div className="text-[11px] text-emerald-500/80 mt-1">Visible to customers</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Hidden / Drafts</span>
              <EyeOff className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono">{draftCount}</div>
            <div className="text-[11px] text-amber-500/80 mt-1">Not shown to public</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Avg Selling Price</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">₹{avgPrice}</div>
            <div className="text-[11px] text-slate-500 mt-1">Across all items</div>
          </div>
        </div>

        {/* Search, Filter & Actions Bar */}
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title or category..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1.5 rounded transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-2.5 py-1.5 rounded transition-colors ${
                  statusFilter === 'published' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                Published ({publishedProducts.length})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-2.5 py-1.5 rounded transition-colors ${
                  statusFilter === 'draft' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset everything back to default products? Any custom products will be reset.')) {
                  resetToDefaults();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset to default items"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Title & Category</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Public Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500">
                      No products match your search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isUrl = p.image && (p.image.startsWith('http://') || p.image.startsWith('https://') || p.image.startsWith('data:'));
                    return (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden text-xl">
                            {isUrl ? (
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                              <span>{p.image || '📦'}</span>
                            )}
                          </div>
                        </td>

                        {/* Title and Category */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-semibold text-slate-100 line-clamp-1">{p.title}</div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>{p.category}</span>
                            {p.featured && (
                              <span className="text-[10px] text-amber-400 font-semibold">· Staff Pick</span>
                            )}
                          </div>
                        </td>

                        {/* Pricing */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-white font-mono">₹{p.price}</div>
                          {p.originalPrice && (
                            <div className="text-[11px] text-slate-500 line-through font-mono">
                              ₹{p.originalPrice}
                            </div>
                          )}
                        </td>

                        {/* Platform */}
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              p.platform === 'meesho'
                                ? 'bg-pink-950/60 text-pink-400 border border-pink-800/40'
                                : p.platform === 'flipkart'
                                ? 'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                                : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                            }`}
                          >
                            {p.platform}
                          </span>
                        </td>

                        {/* Public Toggle (1-Click Publish / Unpublish) */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => togglePublish(p.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                              p.isPublished
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                            title={p.isPublished ? 'Click to hide from public store' : 'Click to publish on public store'}
                          >
                            {p.isPublished ? (
                              <>
                                <Eye className="w-3 h-3 text-emerald-400" />
                                <span>Published (Live)</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 text-slate-400" />
                                <span>Draft (Hidden)</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                              title="Test Affiliate Link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-blue-400 hover:text-blue-300 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Edit Product"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-400" />
                <span>{editingId ? 'Edit Product' : 'Add New Product'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {formError && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Pink Heart Anti-Dust Charger Cover"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Category & Platform */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Cable Protectors">Cable Protectors</option>
                    <option value="Lens Protectors">Lens Protectors</option>
                    <option value="Cases & Gadgets">Cases & Gadgets</option>
                    <option value="Stands & Mounts">Stands & Mounts</option>
                    <option value="AirPods Covers">AirPods Covers</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Platform
                  </label>
                  <select
                    value={formPlatform}
                    onChange={(e: any) => setFormPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="meesho">Meesho</option>
                    <option value="flipkart">Flipkart</option>
                    <option value="amazon">Amazon</option>
                    <option value="other">Other / Direct</option>
                  </select>
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="186"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Original MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="299"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Rating (★ 1.0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    placeholder="4.1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Total Reviews Count
                  </label>
                  <input
                    type="number"
                    value={formReviews}
                    onChange={(e) => setFormReviews(e.target.value)}
                    placeholder="24"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Affiliate / Buy URL (Redirect Link) *
                </label>
                <input
                  type="url"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  placeholder="https://www.meesho.com/... or affiliate tracking link"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Media & Emoji Picker */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Product Image / Emoji
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="Image URL or Emoji"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1 border border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Emoji presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                  {EMOJI_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormImage(emoji)}
                      className={`w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm transition-transform active:scale-90 ${
                        formImage === emoji ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Publishing Controls */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Publish to Customer Storefront
                    </span>
                    <span className="text-[11px] text-slate-400">
                      When enabled, this product immediately appears on the Public URL (<code className="text-slate-300">/</code>).
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsPublished}
                      onChange={(e) => setFormIsPublished(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                  />
                  <label htmlFor="featuredCheck" className="text-xs text-slate-300 cursor-pointer">
                    Feature as "Staff Pick" on Public Store
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
