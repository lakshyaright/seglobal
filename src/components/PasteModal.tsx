import React, { useState } from 'react';
import { X, Clipboard, Play, AlertCircle } from 'lucide-react';

interface PasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCode: (code: string, filename: string) => void;
  defaultFilename: string;
}

export const PasteModal: React.FC<PasteModalProps> = ({
  isOpen,
  onClose,
  onLoadCode,
  defaultFilename,
}) => {
  const [pasteContent, setPasteContent] = useState('');
  const [customFilename, setCustomFilename] = useState(defaultFilename);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteContent.trim()) {
      setError('Please paste your HTML code before importing.');
      return;
    }
    onLoadCode(pasteContent, customFilename || 'gemini-code.html');
    onClose();
  };

  const handleReadClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPasteContent(text);
        setError(null);
      }
    } catch {
      setError('Clipboard access was blocked by browser permissions. Please paste directly into the box.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Paste Raw HTML / Gemini Code</h2>
            <p className="text-xs text-slate-400">Paste code directly from your downloaded file or editor</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 pt-4 overflow-hidden">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Target Filename</label>
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-slate-700"
              placeholder="gemini-code-1792745103849.html"
            />
          </div>

          <div className="flex-1 flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">HTML / JS Code</label>
              <button
                type="button"
                onClick={handleReadClipboard}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste from Clipboard</span>
              </button>
            </div>
            <textarea
              value={pasteContent}
              onChange={(e) => {
                setPasteContent(e.target.value);
                if (error) setError(null);
              }}
              placeholder="<!DOCTYPE html><html><head>...</head><body>...</body></html>"
              className="w-full flex-1 bg-slate-950 border border-slate-800 rounded p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-rose-950/40 border border-rose-800/60 rounded text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Import & Run in Sandbox</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
