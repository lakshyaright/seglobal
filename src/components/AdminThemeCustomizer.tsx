import React, { useState } from 'react';
import { useStoreTheme } from '../context/ThemeContext.tsx';
import { StoreTemplateId, CardLayoutMode } from '../types/theme.ts';
import { STORE_TEMPLATES } from '../data/storeTemplates.ts';
import { 
  Palette, 
  LayoutGrid, 
  Check, 
  Sparkles, 
  Eye, 
  RotateCcw, 
  Sliders, 
  Type, 
  Megaphone,
  Columns,
  Grid,
  List
} from 'lucide-react';

interface AdminThemeCustomizerProps {
  onViewPublic: () => void;
}

export const AdminThemeCustomizer: React.FC<AdminThemeCustomizerProps> = ({ onViewPublic }) => {
  const { designSettings, updateDesignSettings, resetDesignSettings, effectiveTemplate } = useStoreTheme();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectTemplate = (id: StoreTemplateId) => {
    updateDesignSettings({ templateId: id });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleSelectLayout = (layout: CardLayoutMode) => {
    updateDesignSettings({ cardLayout: layout });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header with Save Confirmation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Store Template & Visual Theme Studio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose the visual template, layout geometry, and store typography for your customer-facing public storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Theme Updated Live!</span>
            </span>
          )}

          <button
            onClick={() => {
              if (confirm('Reset store template & styling back to factory default?')) {
                resetDesignSettings();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Theme</span>
          </button>

          <button
            onClick={onViewPublic}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview on Public Store</span>
          </button>
        </div>
      </div>

      {/* 1. Template Selection Gallery */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Select Storefront Template</span>
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            Active: <span className="text-white font-semibold">{effectiveTemplate.name}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(STORE_TEMPLATES).map((template) => {
            const isSelected = designSettings.templateId === template.id;
            return (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-950 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                {/* Visual Swatch Mini-Preview */}
                <div
                  style={{ backgroundColor: template.previewBg }}
                  className="w-full h-24 rounded-lg border border-black/10 flex flex-col justify-between p-2.5 mb-3 shadow-inner relative"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: template.previewAccent }}
                      className="font-brand text-[11px] font-bold tracking-tight uppercase"
                    >
                      SE GLOBAL
                    </span>
                    <div
                      style={{ backgroundColor: template.previewAccent }}
                      className="w-2 h-2 rounded-full"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-4 rounded bg-black/10 border border-black/5" />
                    <div className="w-12 h-4 rounded bg-black/10 border border-black/5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </h3>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-mono">{template.tagline}</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {isSelected ? 'ACTIVE' : 'APPLY'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Product Card Layout Mode */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
          <span>2. Product Card Grid Geometry</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Standard 3-Col */}
          <div
            onClick={() => handleSelectLayout('grid-standard')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              designSettings.cardLayout === 'grid-standard'
                ? 'bg-slate-950 border-blue-500 ring-1 ring-blue-500/40 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Grid className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold">Standard 3-Column Grid</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Spacious e-commerce layout with prominent photos, rating badges, and clear buy buttons.
            </p>
          </div>

          {/* Compact 4-Col */}
          <div
            onClick={() => handleSelectLayout('grid-compact')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              designSettings.cardLayout === 'grid-compact'
                ? 'bg-slate-950 border-blue-500 ring-1 ring-blue-500/40 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Columns className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Compact High-Density Grid</span>
            </div>
            <p className="text-[11px] text-slate-400">
              4-column grid displaying more products above the fold for fast catalog browsing.
            </p>
          </div>

          {/* List Showcase */}
          <div
            onClick={() => handleSelectLayout('list-showcase')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              designSettings.cardLayout === 'list-showcase'
                ? 'bg-slate-950 border-blue-500 ring-1 ring-blue-500/40 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <List className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold">Horizontal Showcase Rows</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Full-width structured list cards with side-by-side details, perfect for quick price comparison.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Hero & Announcement Customization */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          <span>3. Hero Section Copy & Announcement Bar</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Hero Pill Badge
              </label>
              <input
                type="text"
                value={designSettings.heroBadge}
                onChange={(e) => updateDesignSettings({ heroBadge: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={designSettings.heroHeadline}
                onChange={(e) => updateDesignSettings({ heroHeadline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Hero Subtitle Description
              </label>
              <textarea
                value={designSettings.heroSubheadline}
                onChange={(e) => updateDesignSettings({ heroSubheadline: e.target.value })}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200">
                Top Announcement Bar
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={designSettings.showAnnouncement}
                  onChange={(e) => updateDesignSettings({ showAnnouncement: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Announcement Text Banner
              </label>
              <input
                type="text"
                value={designSettings.announcementText}
                onChange={(e) => updateDesignSettings({ announcementText: e.target.value })}
                disabled={!designSettings.showAnnouncement}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-40"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Public Visitor Theme Switcher
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Allow public shoppers to toggle templates while browsing
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={designSettings.allowVisitorThemeToggle}
                    onChange={(e) => updateDesignSettings({ allowVisitorThemeToggle: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
