import React, { useState } from 'react';
import { Copy, Check, Download, Trash2, Sparkles, AlertCircle, CheckCircle2, Minimize2, FileCode } from 'lucide-react';

const SAMPLE_JSON = `{
  "platform": "ToolNest",
  "version": "1.0.0",
  "status": "active",
  "settings": {
    "offlineSupport": true,
    "privacy": {
      "clientSideOnly": true,
      "serverUploads": false
    },
    "features": [
      "Word Counter",
      "Image Compressor",
      "QR Generator",
      "JSON Formatter"
    ]
  },
  "rating": 4.9
}`;

export const JsonFormatterTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState<{ keys: number; sizeBytes: number } | null>(null);

  const formatJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setInput(formatted);
      setError(null);

      // Compute statistics
      const keysCount = (JSON.stringify(parsed).match(/":/g) || []).length;
      setStats({
        keys: keysCount,
        sizeBytes: new Blob([formatted]).size
      });
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message || 'Syntax error'}`);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify.');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
      setStats({
        keys: (minified.match(/":/g) || []).length,
        sizeBytes: new Blob([minified]).size
      });
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message || 'Syntax error'}`);
    }
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!input) return;
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toolnest-formatted-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setError(null);
    setStats(null);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    setError(null);
    setStats({
      keys: 6,
      sizeBytes: new Blob([SAMPLE_JSON]).size
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatJson}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <FileCode className="w-4 h-4" />
            <span>Format / Prettify</span>
          </button>

          <button
            onClick={minifyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-medium transition cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
            <span>Indent:</span>
            <select
              value={indentSize}
              onChange={e => setIndentSize(Number(e.target.value))}
              className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample JSON</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-rose-600 hover:underline ml-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Error / Success Banner */}
      {error ? (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="font-mono">{error}</div>
        </div>
      ) : stats ? (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Valid JSON payload</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono">
            <span>{stats.keys} keys</span>
            <span>•</span>
            <span>{stats.sizeBytes} bytes</span>
          </div>
        </div>
      ) : null}

      {/* Editor Textarea */}
      <textarea
        value={input}
        onChange={e => {
          setInput(e.target.value);
          if (error) setError(null);
        }}
        placeholder="Paste your JSON here..."
        rows={14}
        className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        spellCheck={false}
      />

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!input}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!input}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .json</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {input.length} characters
        </span>
      </div>
    </div>
  );
};
