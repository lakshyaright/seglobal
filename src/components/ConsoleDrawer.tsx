import React, { useState } from 'react';
import { ConsoleMessage } from '../types.ts';
import { Terminal, Trash2, ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';

interface ConsoleDrawerProps {
  logs: ConsoleMessage[];
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ConsoleDrawer: React.FC<ConsoleDrawerProps> = ({
  logs,
  onClear,
  isOpen,
  onToggle,
}) => {
  const [filter, setFilter] = useState<'all' | 'error' | 'warn' | 'log'>('all');

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'error') return log.type === 'error';
    if (filter === 'warn') return log.type === 'warn';
    return log.type === 'log' || log.type === 'info';
  });

  const errorCount = logs.filter((l) => l.type === 'error').length;
  const warnCount = logs.filter((l) => l.type === 'warn').length;

  return (
    <div className="bg-slate-900 border-t border-slate-800 transition-all select-none">
      {/* Drawer Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">Runner Console</span>
          <span className="text-slate-500 font-mono">({logs.length})</span>
          {errorCount > 0 && (
            <span className="text-rose-400 font-mono text-[11px] ml-1">
              · {errorCount} errors
            </span>
          )}
          {warnCount > 0 && (
            <span className="text-amber-400 font-mono text-[11px] ml-1">
              · {warnCount} warnings
            </span>
          )}
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 ml-1 text-slate-400" />}
        </button>

        {isOpen && (
          <div className="flex items-center gap-2">
            {/* Filter buttons (allowed by zero-pill rule as functional segmented tabs) */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({logs.length})
              </button>
              <button
                onClick={() => setFilter('error')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'error' ? 'bg-slate-800 text-rose-400 font-medium' : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                Errors ({errorCount})
              </button>
              <button
                onClick={() => setFilter('warn')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'warn' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                Warnings ({warnCount})
              </button>
            </div>

            <button
              onClick={onClear}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors rounded hover:bg-slate-800"
              title="Clear console output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="max-h-56 min-h-28 overflow-y-auto p-3 font-mono text-xs bg-slate-950 divide-y divide-slate-800/40">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-500 py-3 text-center">
              No console entries recorded for current filter.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isErr = log.type === 'error';
              const isWarn = log.type === 'warn';
              return (
                <div key={log.id} className="py-1.5 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-slate-500 text-[11px] tabular-nums shrink-0 pt-0.5">
                    {log.timestamp}
                  </span>
                  <div className="shrink-0 pt-0.5">
                    {isErr ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                  <div
                    className={`flex-1 break-all ${
                      isErr ? 'text-rose-300' : isWarn ? 'text-amber-300' : 'text-slate-300'
                    }`}
                  >
                    {log.text}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
