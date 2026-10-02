import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Download, Fingerprint, ShieldCheck } from 'lucide-react';

export const UuidGeneratorTool: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [braces, setBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateSingleUuid = (): string => {
    let id: string;
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID();
    } else {
      // RFC4122 v4 fallback
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hyphens) {
      id = id.replace(/-/g, '');
    }

    if (uppercase) {
      id = id.toUpperCase();
    }

    if (braces) {
      id = `{${id}}`;
    }

    return id;
  };

  const generateBatch = () => {
    const batch: string[] = [];
    const count = Math.min(100, Math.max(1, quantity));
    for (let i = 0; i < count; i++) {
      batch.push(generateSingleUuid());
    }
    setUuids(batch);
  };

  // Generate on initial mount or when options change
  useEffect(() => {
    generateBatch();
  }, [quantity, uppercase, hyphens, braces]);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyOne = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleDownload = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uuids-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Container */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Quantity:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white"
            />
            <span className="text-slate-400">(max 100)</span>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 mr-1">Presets:</span>
            {[1, 5, 10, 25, 50].map(qty => (
              <button
                key={qty}
                type="button"
                onClick={() => setQuantity(qty)}
                className={`px-2 py-1 rounded text-xs transition ${
                  quantity === qty
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        {/* Options Toggles */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e => setUppercase(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
            <span>UPPERCASE</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={e => setHyphens(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
            <span>Include Hyphens (-)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={braces}
              onChange={e => setBraces(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
            <span>Wrap in Braces {}</span>
          </label>
        </div>
      </div>

      {/* UUIDs Results List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Generated UUIDs ({uuids.length})</span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Version 4 Cryptographic Random
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 p-2 divide-y divide-slate-200/60 dark:divide-slate-800/60">
          {uuids.map((id, index) => {
            const isCopied = copiedIndex === index;
            return (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 hover:bg-white dark:hover:bg-slate-900 rounded-lg transition group font-mono text-xs text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-slate-400 text-[11px] w-6 select-none shrink-0 font-sans">
                    #{index + 1}
                  </span>
                  <span className="truncate">{id}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyOne(id, index)}
                  className="shrink-0 ml-3 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition"
                  title="Copy this UUID"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2.5">
          <button
            onClick={generateBatch}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate New Batch</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'All Copied!' : 'Copy All UUIDs'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
