import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Trash2, Sparkles, Filter } from 'lucide-react';

const SAMPLE_LIST = `apple
banana
orange
apple
banana
grape
watermelon
apple
pear
orange
kiwi
grape`;

export const DuplicateLinesTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc' | 'reverse'>('none');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) {
      return {
        text: '',
        originalCount: 0,
        duplicatesCount: 0,
        finalCount: 0,
        reductionPercent: 0
      };
    }

    let lines = input.split(/\r?\n/);
    const originalCount = lines.length;

    if (trimWhitespace) {
      lines = lines.map(l => l.trim());
    }

    if (removeEmpty) {
      lines = lines.filter(l => l.length > 0);
    }

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }

    if (sortOrder === 'asc') {
      uniqueLines.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'desc') {
      uniqueLines.sort((a, b) => b.localeCompare(a));
    } else if (sortOrder === 'reverse') {
      uniqueLines.reverse();
    }

    const duplicatesCount = originalCount - uniqueLines.length;
    const reductionPercent = originalCount > 0
      ? Math.round((duplicatesCount / originalCount) * 100)
      : 0;

    return {
      text: uniqueLines.join('\n'),
      originalCount,
      duplicatesCount,
      finalCount: uniqueLines.length,
      reductionPercent
    };
  }, [input, caseSensitive, trimWhitespace, removeEmpty, sortOrder]);

  const handleCopy = () => {
    if (!result.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result.text) return;
    const blob = new Blob([result.text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deduplicated-lines-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Original Lines</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {result.originalCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
          <span className="text-xs text-rose-600 dark:text-rose-400">Duplicates Removed</span>
          <div className="text-xl font-bold text-rose-950 dark:text-rose-200 mt-0.5">
            {result.duplicatesCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-xs text-emerald-600 dark:text-emerald-400">Unique Lines</span>
          <div className="text-xl font-bold text-emerald-950 dark:text-emerald-200 mt-0.5">
            {result.finalCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
          <span className="text-xs text-blue-600 dark:text-blue-400">Size Reduction</span>
          <div className="text-xl font-bold text-blue-950 dark:text-blue-200 mt-0.5">
            {result.reductionPercent}%
          </div>
        </div>
      </div>

      {/* Options Toolbar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={e => setCaseSensitive(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Case Sensitive</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={e => setTrimWhitespace(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Trim Whitespace</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={e => setRemoveEmpty(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Remove Empty Lines</span>
          </label>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Sort:</span>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">Original Order</option>
            <option value="asc">A to Z (Alphabetical)</option>
            <option value="desc">Z to A (Reverse Alpha)</option>
            <option value="reverse">Reverse Order</option>
          </select>
        </div>
      </div>

      {/* Inputs / Output Dual View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Input Text / List
            </label>
            <div className="flex items-center gap-2">
              {!input && (
                <button
                  type="button"
                  onClick={() => setInput(SAMPLE_LIST)}
                  className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load Sample
                </button>
              )}
              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your multiline list here..."
            rows={10}
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs leading-relaxed focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cleaned Unique Output
            </label>
            <span className="text-xs text-slate-400">
              {result.finalCount} unique items
            </span>
          </div>
          <textarea
            readOnly
            value={result.text}
            placeholder="Cleaned list will appear here automatically..."
            rows={10}
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 font-mono text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!result.text}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Clean List' : 'Copy Result'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!result.text}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download .txt</span>
        </button>
      </div>
    </div>
  );
};
