import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `ToolNest makes fast, private, and free online utilities. No servers, no tracking, just instant results in your browser.`;

export const CharacterCounterTool: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const total = text.length;
    const noSpaces = text.replace(/\s+/g, '').length;
    const words = (text.trim().match(/\b[\w'-]+\b/g) || []).length;
    const lines = text ? text.split('\n').length : 0;
    const digits = (text.match(/\d/g) || []).length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const punctuation = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g) || []).length;

    return {
      total,
      noSpaces,
      words,
      lines,
      digits,
      letters,
      spaces,
      punctuation
    };
  }, [text]);

  const limits = [
    { label: 'Twitter / X Post', max: 280, count: stats.total },
    { label: 'SMS Message (1 credit)', max: 160, count: stats.total },
    { label: 'Google Meta Title', max: 60, count: stats.total },
    { label: 'Google Meta Description', max: 160, count: stats.total },
    { label: 'Instagram Bio', max: 150, count: stats.total },
  ];

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Primary Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Total Characters</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-blue-100 mt-1">
            {stats.total.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Without Spaces</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 dark:text-indigo-100 mt-1">
            {stats.noSpaces.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Words</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1">
            {stats.words.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
          <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Lines</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 dark:text-purple-100 mt-1">
            {stats.lines.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="char-counter-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Enter Text
          </label>
          <div className="flex items-center gap-2">
            {!text && (
              <button
                type="button"
                onClick={() => setText(SAMPLE_TEXT)}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Load Sample
              </button>
            )}
            {text && (
              <button
                type="button"
                onClick={() => setText('')}
                className="flex items-center gap-1 text-xs text-rose-600 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          id="char-counter-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste text to measure characters, letters, digits, and limits..."
          rows={7}
          className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-sm leading-relaxed"
        />
      </div>

      {/* Detailed breakdown tags */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between">
          <span className="text-slate-500">Letters:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{stats.letters}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between">
          <span className="text-slate-500">Digits:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{stats.digits}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between">
          <span className="text-slate-500">Whitespace:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{stats.spaces}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between">
          <span className="text-slate-500">Punctuation:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{stats.punctuation}</span>
        </div>
      </div>

      {/* Social Media & SEO Limit Meters */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Social Media &amp; SEO Limit Meters
        </h4>
        <div className="space-y-3">
          {limits.map(l => {
            const percent = Math.min(100, Math.round((l.count / l.max) * 100));
            const isOver = l.count > l.max;
            const remaining = l.max - l.count;

            return (
              <div key={l.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{l.label}</span>
                  <span className={isOver ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                    {l.count} / {l.max} chars ({isOver ? `${Math.abs(remaining)} over limit!` : `${remaining} left`})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isOver ? 'bg-rose-500' : percent > 85 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          disabled={!text}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
};
