import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Trash2, FileText, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `ToolNest is a modern, fast, and privacy-friendly suite of browser-based tools. 

Whether you are writing essays, preparing marketing copy, or auditing code, this word counter provides deep real-time metrics. Your data stays 100% inside your browser and is never uploaded anywhere. Try typing or editing this text to see the live calculations change!`;

export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute statistics
  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        keywordDensity: []
      };
    }

    const wordsArray = trimmed.match(/\b[\w'-]+\b/g) || [];
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    
    // Sentences: split by period, exclamation, question mark followed by whitespace or end
    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0);

    // Paragraphs: split by double newlines or single non-empty newlines
    const paragraphs = text
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0).length;

    // Reading time: avg 200 WPM
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
    // Speaking time: avg 130 WPM
    const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

    // Keyword density
    const frequencyMap: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'this', 'for', 'with', 'on', 'are', 'as', 'at', 'be']);
    
    wordsArray.forEach(w => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        frequencyMap[lower] = (frequencyMap[lower] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percentage: words > 0 ? ((count / words) * 100).toFixed(1) : '0'
      }));

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      keywordDensity
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `word-count-text-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Words</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-blue-100 mt-1">
            {stats.words.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Characters</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 dark:text-indigo-100 mt-1">
            {stats.charsWithSpaces.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {stats.charsNoSpaces.toLocaleString()} without spaces
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Sentences</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1">
            {stats.sentences.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {stats.paragraphs} paragraph{stats.paragraphs === 1 ? '' : 's'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Reading Time</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-100 mt-1">
            {stats.words > 0 ? `${stats.readingTimeMinutes} min` : '0 min'}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            ~{stats.speakingTimeMinutes} min speaking
          </span>
        </div>
      </div>

      {/* Editor Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="word-counter-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Input Text
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
          id="word-counter-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or start typing your text here..."
          rows={9}
          className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-sm leading-relaxed"
        />
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!text}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .txt</span>
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Auto-updates instantly on every keystroke
        </span>
      </div>

      {/* Top Keywords Density Table */}
      {stats.keywordDensity.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Top Keyword Density
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats.keywordDensity.map(k => (
              <div
                key={k.word}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="font-semibold text-slate-900 dark:text-white">"{k.word}"</span>
                <span className="text-slate-500">×{k.count} ({k.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
