import React from 'react';
import { Code2, Play, Eye, FileCode, Search, Sparkles, Upload } from 'lucide-react';

interface TopNavProps {
  activeTab: 'preview' | 'editor' | 'inspector' | 'samples';
  setActiveTab: (tab: 'preview' | 'editor' | 'inspector' | 'samples') => void;
  onUploadClick: () => void;
  hasCustomCode: boolean;
  activeFilename: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onUploadClick,
  hasCustomCode,
  activeFilename,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900 border-b border-slate-800 text-slate-100 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Code2 className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Gemini Code Sandbox
          </span>
        </div>
      </div>

      {/* Zone 2: Single-line navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'preview' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Interactive Runner</span>
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'editor' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Live Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'inspector' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Code Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('samples')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'samples' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sample Demos</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        {hasCustomCode && (
          <span className="hidden xl:inline-block text-xs text-slate-400 font-mono truncate max-w-[200px]" title={activeFilename}>
            {activeFilename}
          </span>
        )}
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import Local File</span>
        </button>
      </div>
    </header>
  );
};
