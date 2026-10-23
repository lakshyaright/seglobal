import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, CheckCircle2, ArrowRight, ClipboardCopy } from 'lucide-react';

interface LocalFileHelperProps {
  onLoadCode: (code: string, filename: string) => void;
  onOpenPasteModal: () => void;
  currentFilename: string;
}

export const LocalFileHelper: React.FC<LocalFileHelperProps> = ({
  onLoadCode,
  onOpenPasteModal,
  currentFilename,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loadedSuccess, setLoadedSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        onLoadCode(content, file.name);
        setLoadedSuccess(file.name);
        setTimeout(() => setLoadedSuccess(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-4 md:p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Banner with user-requested context */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-slate-950/80 border border-slate-800 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Target File: gemini-code-1792745103849.html</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because this application runs in a secure cloud environment, browser security policies restrict direct access to your local Windows filesystem (<code className="text-slate-400 font-mono">file:///C:/Users/...</code>).
              Select or drag your file below to run and preview it immediately!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileInputChange}
              accept=".html,.htm,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Select HTML File</span>
            </button>
            <button
              onClick={onOpenPasteModal}
              className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
              <span>Paste Code</span>
            </button>
          </div>
        </div>

        {/* Drop target */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
              : 'border-slate-700/80 hover:border-slate-600 bg-slate-950/40 text-slate-400'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <UploadCloud className={`w-7 h-7 ${isDragging ? 'text-emerald-400' : 'text-slate-500'}`} />
            <div className="text-xs font-medium text-slate-200">
              Drag and drop <span className="text-emerald-400 font-mono">gemini-code-1792745103849.html</span> here, or click to browse
            </div>
            <div className="text-[11px] text-slate-500">
              Supports .html, .htm, and single-file web applications
            </div>
          </div>
        </div>

        {loadedSuccess && (
          <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-md text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Successfully imported <strong>{loadedSuccess}</strong> into the live runner!</span>
          </div>
        )}
      </div>
    </div>
  );
};
