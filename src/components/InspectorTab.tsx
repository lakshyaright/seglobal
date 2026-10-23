import React, { useMemo } from 'react';
import { analyzeHtml } from '../utils/htmlInspector.ts';
import { Layers, FileCode, CheckCircle2, Cpu, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

interface InspectorTabProps {
  code: string;
  filename: string;
  onSwitchToPreview: () => void;
  onSwitchToEditor: () => void;
}

export const InspectorTab: React.FC<InspectorTabProps> = ({
  code,
  filename,
  onSwitchToPreview,
  onSwitchToEditor,
}) => {
  const meta = useMemo(() => analyzeHtml(code), [code]);

  return (
    <div className="flex-1 overflow-auto bg-slate-950 p-6 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>HTML & Architecture Inspector</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              <span>Target: {filename}</span>
              <span className="mx-2">·</span>
              <span>Document: "{meta.title}"</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToEditor}
              className="px-3.5 py-1.5 text-xs bg-slate-900 border border-slate-700 text-slate-300 rounded hover:bg-slate-800 transition-colors"
            >
              Open Editor
            </button>
            <button
              onClick={onSwitchToPreview}
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 text-slate-950 rounded hover:bg-emerald-300 transition-colors"
            >
              Launch Preview
            </button>
          </div>
        </div>

        {/* Vital Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Total Lines</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">{meta.lineCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Formatted source lines</div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Payload Size</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
              {(meta.charCount / 1024).toFixed(1)} KB
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{meta.charCount.toLocaleString()} chars</div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Script Blocks</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">{meta.scriptsCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Inline & external</div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400">Style Sheets</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">{meta.stylesCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Inline & linked CSS</div>
          </div>
        </div>

        {/* Detected Frameworks & APIs */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">Detected Frameworks & Browser Subsystems</h2>
          </div>

          {meta.detectedTech.length === 0 ? (
            <p className="text-xs text-slate-400 py-2">
              No standard CDN frameworks detected. This looks like pure vanilla HTML5 & CSS3.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meta.detectedTech.map((tech) => (
                <div key={tech.name} className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-100">{tech.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono uppercase">{tech.category}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{tech.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security & Sandbox Audit */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">Execution Isolation Guarantee</h2>
          </div>
          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p>
              • The interactive preview runs within a hardened HTML5 sandbox iframe (<code className="text-emerald-400 font-mono">allow-scripts allow-forms allow-same-origin</code>).
            </p>
            <p>
              • All <code className="text-slate-300 font-mono">console.log</code> and runtime exceptions are safely piped into the host runner's telemetry console without disrupting the parent application.
            </p>
            <p>
              • Direct access to local host filesystems (<code className="text-slate-400 font-mono">file:///</code>) is blocked by browser-level cross-origin boundaries, which is why files are uploaded in-memory.
            </p>
          </div>
        </div>

        {/* React Conversion Guide */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">How to Integrate Into This React Project</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you want this HTML prototype permanently integrated into this application as native React components:
          </p>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span>Extract inline CSS or CDN script links into standard npm packages or Tailwind classes in <code className="text-slate-300 font-mono">src/App.tsx</code>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span>Replace manual DOM element manipulation (<code className="text-slate-300 font-mono">document.getElementById</code>) with React state (<code className="text-slate-300 font-mono">useState</code>, <code className="text-slate-300 font-mono">useRef</code>).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              <span>Simply ask in chat: <em>"Convert my uploaded HTML code into native React components"</em>!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
