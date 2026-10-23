import React, { useRef, useState } from 'react';
import { useProducts } from '../context/ProductContext.tsx';
import { Product } from '../types/product.ts';
import { 
  BarChart3, 
  Download, 
  Upload, 
  TrendingUp, 
  MousePointerClick, 
  Check, 
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  Package,
  Layers
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { products, exportCatalogAsCsv, exportCatalogAsJson, importProducts } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  // Compute aggregate clicks
  const totalClicks = products.reduce((acc, p) => acc + (p.clicks?.total || 0), 0);
  const meeshoClicks = products.reduce((acc, p) => acc + (p.clicks?.meesho || 0), 0);
  const flipkartClicks = products.reduce((acc, p) => acc + (p.clicks?.flipkart || 0), 0);
  const amazonClicks = products.reduce((acc, p) => acc + (p.clicks?.amazon || 0), 0);

  // Top performing products by clicks
  const sortedByClicks = [...products]
    .sort((a, b) => (b.clicks?.total || 0) - (a.clicks?.total || 0))
    .slice(0, 5);

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            importProducts(parsed);
            setImportNotice(`Successfully imported ${parsed.length} products!`);
            setTimeout(() => setImportNotice(null), 3000);
          } else {
            setImportNotice('JSON file must contain an array of products.');
          }
        } catch {
          setImportNotice('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Affiliate Clicks</span>
            <MousePointerClick className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{totalClicks}</div>
          <div className="text-[11px] text-slate-500 mt-1">Direct buy outbound clicks</div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Meesho Platform</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#9f2089]"></span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{meeshoClicks}</div>
          <div className="text-[11px] text-pink-400/80 mt-1">
            {totalClicks > 0 ? Math.round((meeshoClicks / totalClicks) * 100) : 0}% of traffic
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Flipkart Platform</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2874f0]"></span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{flipkartClicks}</div>
          <div className="text-[11px] text-blue-400/80 mt-1">
            {totalClicks > 0 ? Math.round((flipkartClicks / totalClicks) * 100) : 0}% of traffic
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Amazon Platform</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#e67a00]"></span>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{amazonClicks}</div>
          <div className="text-[11px] text-amber-400/80 mt-1">
            {totalClicks > 0 ? Math.round((amazonClicks / totalClicks) * 100) : 0}% of traffic
          </div>
        </div>
      </div>

      {/* Top Performing Products Leaderboard */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Top Clicked Products (Traffic Leaderboard)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Product Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3 text-right">Total Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {sortedByClicks.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 text-slate-500 font-bold">#{idx + 1}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-white max-w-xs truncate">{p.title}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-400">{p.category}</td>
                  <td className="py-2.5 px-3 uppercase text-slate-300">{p.platform}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{p.clicks?.total || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Catalog Import & Export Suite */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Catalog Data & Bulk Migration Suite</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Export your entire store catalog for Excel/Google Sheets, or import a fresh product inventory batch.
          </p>
        </div>

        {importNotice && (
          <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-lg text-xs text-blue-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{importNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Export CSV */}
          <button
            onClick={exportCatalogAsCsv}
            className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                Export as CSV (Excel)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Download spreadsheet with SKUs, prices, categories, and direct affiliate links.
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>Download .CSV</span>
            </span>
          </button>

          {/* Export JSON */}
          <button
            onClick={exportCatalogAsJson}
            className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                <FileCode className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Export as JSON (Backup)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Complete database backup containing full metadata, ratings, and click analytics.
              </p>
            </div>
            <span className="text-[10px] text-blue-400 font-semibold mt-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>Download .JSON</span>
            </span>
          </button>

          {/* Import JSON */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors flex flex-col justify-between group cursor-pointer"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleJsonUpload}
              accept=".json"
              className="hidden"
            />
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Upload className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                Import JSON Batch
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Upload a JSON inventory file to restore or add products in bulk.
              </p>
            </div>
            <span className="text-[10px] text-amber-400 font-semibold mt-3 flex items-center gap-1">
              <Upload className="w-3 h-3" />
              <span>Upload .JSON File</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
