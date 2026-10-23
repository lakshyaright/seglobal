import React, { useState, useMemo } from 'react';
import { Play, Copy, Check, RotateCcw, Search, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onReset: () => void;
  filename: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  filename,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [autoRun, setAutoRun] = useState(true);

  const lines = useMemo(() => code.split('\n'), [code]);

  const searchMatches = useMemo(() => {
    if (!searchTerm.trim()) return 0;
    try {
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = code.match(regex);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [code, searchTerm]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(val);
    if (autoRun) {
      onRun();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden text-slate-100">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs">{filename}</span>
          </div>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono tabular-nums">{lines.length} lines</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono tabular-nums">{(code.length / 1024).toFixed(1)} KB</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Find in code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded pl-7 pr-7 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 w-36 sm:w-44 font-mono"
            />
            {searchTerm && (
              <span className="absolute right-2 text-[10px] text-slate-400 font-mono">
                {searchMatches}
              </span>
            )}
          </div>

          <label className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
            />
            <span className="text-[11px]">Auto-Run</span>
          </label>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={onRun}
            className="flex items-center gap-1 px-3.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded transition-colors shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Code Editor Surface with Line Numbers */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers Column */}
        <div className="w-14 bg-slate-950/80 border-r border-slate-800/80 text-right pr-3 pt-3 select-none font-mono text-xs text-slate-600 overflow-hidden leading-6">
          {lines.slice(0, 800).map((_, idx) => (
            <div key={idx} className="tabular-nums">
              {idx + 1}
            </div>
          ))}
          {lines.length > 800 && <div className="text-slate-700">...</div>}
        </div>

        {/* Text Area */}
        <div className="flex-1 relative bg-slate-950">
          <textarea
            value={code}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full h-full p-3 font-mono text-xs text-slate-200 bg-transparent resize-none focus:outline-none leading-6 selection:bg-emerald-500/30 selection:text-white"
          />
        </div>
      </div>
    </div>
  );
};
