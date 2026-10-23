import React, { useState } from 'react';
import { useStoreAds } from '../context/AdContext.tsx';
import { StoreAd } from '../types/ad.ts';
import { 
  Megaphone, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  MousePointerClick, 
  RotateCcw, 
  ExternalLink, 
  Zap, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface AdminAdsManagerProps {
  onViewPublic: () => void;
}

export const AdminAdsManager: React.FC<AdminAdsManagerProps> = ({ onViewPublic }) => {
  const { ads, addAd, updateAd, toggleAd, deleteAd, resetAds } = useStoreAds();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formBadge, setFormBadge] = useState('HOT DEAL');
  const [formCtaText, setFormCtaText] = useState('Claim Deal');
  const [formCtaLink, setFormCtaLink] = useState('https://www.meesho.com');
  const [formImage, setFormImage] = useState('⚡');
  const [formGradient, setFormGradient] = useState('from-fuchsia-900 via-purple-900 to-indigo-950');
  const [formPosition, setFormPosition] = useState<StoreAd['position']>('top-strip');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const GRADIENTS = [
    { label: 'Purple Glam', value: 'from-fuchsia-900 via-purple-900 to-indigo-950' },
    { label: 'Ocean Blue', value: 'from-blue-950 via-slate-900 to-cyan-950' },
    { label: 'Gold Amber', value: 'from-amber-950 via-orange-950 to-neutral-900' },
    { label: 'Emerald Mint', value: 'from-emerald-950 via-teal-900 to-slate-950' },
    { label: 'Crimson Rose', value: 'from-rose-950 via-pink-900 to-slate-950' },
  ];

  const BADGE_PRESETS = ['HOT DEAL', 'FLASH SALE', 'SPONSORED', 'LIMITED OFFER', 'FESTIVE SALE', 'STAFF PICK'];
  const EMOJI_PRESETS = ['⚡', '🎁', '📷', '🎧', '🔥', '💎', '🌟', '💖', '🧸', '🚀'];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormBadge('FLASH SALE');
    setFormCtaText('Claim Deal');
    setFormCtaLink('https://www.meesho.com');
    setFormImage('⚡');
    setFormGradient('from-fuchsia-900 via-purple-900 to-indigo-950');
    setFormPosition('top-strip');
    setFormIsActive(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ad: StoreAd) => {
    setEditingId(ad.id);
    setFormTitle(ad.title);
    setFormSubtitle(ad.subtitle);
    setFormBadge(ad.badge);
    setFormCtaText(ad.ctaText);
    setFormCtaLink(ad.ctaLink);
    setFormImage(ad.image || '⚡');
    setFormGradient(ad.bgGradient);
    setFormPosition(ad.position);
    setFormIsActive(ad.isActive);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Ad title is required.');
      return;
    }
    if (!formCtaLink.trim()) {
      setFormError('Destination link is required.');
      return;
    }

    const payload = {
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      badge: formBadge.trim() || 'PROMO',
      ctaText: formCtaText.trim() || 'Shop Now',
      ctaLink: formCtaLink.trim(),
      image: formImage.trim() || '⚡',
      bgGradient: formGradient,
      position: formPosition,
      isActive: formIsActive,
    };

    if (editingId) {
      updateAd(editingId, payload);
    } else {
      addAd(payload);
    }

    setIsModalOpen(false);
  };

  const totalAdClicks = ads.reduce((acc, a) => acc + (a.clicks || 0), 0);

  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Store Ads & Promotional Campaigns Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create and run custom promo banners, sponsored ads, and affiliate campaigns with click tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset to default preloaded ads?')) resetAds();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Ads</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Ad Campaign</span>
          </button>
        </div>
      </div>

      {/* Ads KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Total Campaigns</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{ads.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Configured in store</div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Active / Live Ads</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {ads.filter((a) => a.isActive).length}
          </div>
          <div className="text-[11px] text-emerald-500/80 mt-1">Currently running</div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Total Campaign Clicks</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{totalAdClicks}</div>
          <div className="text-[11px] text-amber-500/80 mt-1">Outbound click-throughs</div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Top Position</div>
          <div className="text-base font-bold text-blue-400 font-mono mt-2">Top Banner Strip</div>
          <div className="text-[11px] text-slate-500 mt-1">Auto-sliding carousel</div>
        </div>
      </div>

      {/* Campaign List Cards */}
      <div className="space-y-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`p-4 md:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              ad.isActive
                ? 'bg-slate-950/80 border-slate-800 shadow-md'
                : 'bg-slate-950/40 border-slate-900 opacity-60'
            }`}
          >
            {/* Visual Preview */}
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${ad.bgGradient} flex items-center justify-center text-3xl shrink-0 shadow-inner`}
              >
                {ad.image || '⚡'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {ad.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Position: {ad.position === 'top-strip' ? 'Top Store Strip' : 'Middle of Catalog'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{ad.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{ad.subtitle}</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                  <span className="font-semibold text-emerald-400 font-mono">{ad.clicks || 0} clicks</span>
                  <span>·</span>
                  <span className="truncate max-w-xs">{ad.ctaLink}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => toggleAd(ad.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  ad.isActive
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {ad.isActive ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              <a
                href={ad.ctaLink}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Test Destination Link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleOpenEdit(ad)}
                className="p-2 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Edit Campaign"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete ad "${ad.title}"?`)) deleteAd(ad.id);
                }}
                className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Delete Campaign"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>{editingId ? 'Edit Ad Campaign' : 'Create New Ad Campaign'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {formError && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Ad Headline *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. ⚡ Flash Sale Combo: Flat 40% OFF!"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Offer Subtitle / Copy
                </label>
                <textarea
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. Buy any 2 charger guards and get free shipping across India."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Badge & CTA */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="FLASH SALE"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-1 flex-wrap mt-1">
                    {BADGE_PRESETS.slice(0, 3).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormBadge(b)}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={formCtaText}
                    onChange={(e) => setFormCtaText(e.target.value)}
                    placeholder="Claim Deal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Destination Link */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Destination URL *
                </label>
                <input
                  type="url"
                  value={formCtaLink}
                  onChange={(e) => setFormCtaLink(e.target.value)}
                  placeholder="https://www.meesho.com/... or affiliate tracking link"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              {/* Position & Background Gradient */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Banner Position
                  </label>
                  <select
                    value={formPosition}
                    onChange={(e: any) => setFormPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="top-strip">Top Store Banner Strip</option>
                    <option value="middle-catalog">Middle Catalog Section</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Color Gradient
                  </label>
                  <select
                    value={formGradient}
                    onChange={(e) => setFormGradient(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {GRADIENTS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Emoji Icon */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Icon / Emoji
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {EMOJI_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormImage(emoji)}
                      className={`w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm transition-transform active:scale-90 ${
                        formImage === emoji ? 'ring-2 ring-amber-400' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Active Campaign</span>
                  <span className="text-[11px] text-slate-400">Display this ad on the public store</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
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
                  {editingId ? 'Save Campaign' : 'Launch Ad Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
