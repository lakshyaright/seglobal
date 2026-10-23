import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewportMode, ConsoleMessage } from '../types.ts';
import { injectConsoleBridge } from '../utils/htmlInspector.ts';
import { ConsoleDrawer } from './ConsoleDrawer.tsx';
import { 
  Monitor, 
  Laptop, 
  Tablet, 
  Smartphone, 
  RotateCw, 
  ExternalLink, 
  Download, 
  Maximize2,
  Terminal,
  Check
} from 'lucide-react';

interface PreviewViewportProps {
  htmlCode: string;
  filename: string;
  logs: ConsoleMessage[];
  onClearLogs: () => void;
}

export const PreviewViewport: React.FC<PreviewViewportProps> = ({
  htmlCode,
  filename,
  logs,
  onClearLogs,
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Injected HTML with console interceptor
  const injectedHtml = useMemo(() => {
    return injectConsoleBridge(htmlCode);
  }, [htmlCode]);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  const handleOpenNewWindow = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'gemini-code-app.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  // Dimensions based on mode
  const getContainerStyles = (): { width: string; maxWidth: string } => {
    switch (viewport) {
      case 'mobile':
        return { width: '375px', maxWidth: '100%' };
      case 'tablet':
        return { width: '768px', maxWidth: '100%' };
      case 'laptop':
        return { width: '1024px', maxWidth: '100%' };
      case 'desktop':
      default:
        return { width: '100%', maxWidth: '100%' };
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
      {/* Viewport Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 select-none">
        {/* Left: Viewport Size Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewport === 'desktop'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop 100%"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('laptop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewport === 'laptop'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Laptop (1024px)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laptop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewport === 'tablet'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewport === 'mobile'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Center: File identifier */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span>Sandbox Container</span>
          <span>·</span>
          <span className="text-slate-300">{filename}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs transition-colors cursor-pointer ${
              isConsoleOpen
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
            {logs.length > 0 && (
              <span className="font-mono text-[11px] text-slate-400">({logs.length})</span>
            )}
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer"
            title="Reload Iframe"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenNewWindow}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer"
            title="Open Sandbox in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
            title="Download Standalone HTML"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Saved</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto bg-slate-950 p-3 sm:p-6 flex items-start justify-center">
        <div
          style={getContainerStyles()}
          className="h-full transition-all duration-200 flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-800"
        >
          {/* Simulated Browser Bar for Mobile & Tablet */}
          {viewport !== 'desktop' && (
            <div className="bg-slate-900 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
              <span>{viewport === 'mobile' ? '375 × 667' : viewport === 'tablet' ? '768 × 1024' : '1024 × 768'}</span>
            </div>
          )}

          <iframe
            key={reloadKey}
            ref={iframeRef}
            srcDoc={injectedHtml}
            title="Gemini Code Preview"
            sandbox="allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin"
            className="w-full flex-1 border-0 bg-white"
          />
        </div>
      </div>

      {/* Bottom Console Drawer */}
      <ConsoleDrawer
        logs={logs}
        onClear={onClearLogs}
        isOpen={isConsoleOpen}
        onToggle={() => setIsConsoleOpen(!isConsoleOpen)}
      />
    </div>
  );
};
