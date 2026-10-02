import React, { useState } from 'react';
import { Copy, Check, Sparkles, Trash2, ArrowUpRight } from 'lucide-react';

const SAMPLE_TEXT = `hello world! welcome to toolnest case converter. make your text look great.`;

export const CaseConverterTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Conversion functions
  const toUppercase = (str: string) => str.toUpperCase();
  const toLowercase = (str: string) => str.toLowerCase();

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet', 'with']);
    return str.toLowerCase().split(/\s+/).map((word, idx) => {
      if (idx > 0 && minorWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  const toCapitalizedWords = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^([A-Z])/, chr => chr.toLowerCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .replace(/[\s\-_]+/g, '_')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .toLowerCase();
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .replace(/[\s\-_]+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  const toAlternatingCase = (str: string) => {
    let toUpper = false;
    return str
      .split('')
      .map(char => {
        if (/[a-zA-Z]/.test(char)) {
          toUpper = !toUpper;
          return toUpper ? char.toUpperCase() : char.toLowerCase();
        }
        return char;
      })
      .join('');
  };

  const cases = [
    { key: 'upper', name: 'UPPERCASE', fn: toUppercase },
    { key: 'lower', name: 'lowercase', fn: toLowercase },
    { key: 'title', name: 'Title Case', fn: toTitleCase },
    { key: 'sentence', name: 'Sentence case', fn: toSentenceCase },
    { key: 'cap', name: 'Capitalized Words', fn: toCapitalizedWords },
    { key: 'camel', name: 'camelCase', fn: toCamelCase },
    { key: 'snake', name: 'snake_case', fn: toSnakeCase },
    { key: 'kebab', name: 'kebab-case', fn: toKebabCase },
    { key: 'alt', name: 'aLtErNaTiNg cAsE', fn: toAlternatingCase },
  ];

  const handleCopy = (textToCopy: string, key: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleApply = (convertedText: string) => {
    setInput(convertedText);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="case-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Original Text
          </label>
          <div className="flex items-center gap-2">
            {!input && (
              <button
                type="button"
                onClick={() => setInput(SAMPLE_TEXT)}
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
          id="case-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste the text you want to convert into various cases..."
          rows={5}
          className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-sans text-sm leading-relaxed"
        />
      </div>

      {/* Grid of Case Previews with One-Click Copy */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Converted Formats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cases.map(c => {
            const converted = input ? c.fn(input) : '';
            const isCopied = copiedKey === c.key;

            return (
              <div
                key={c.key}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between gap-2 hover:border-blue-400/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {c.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleApply(converted)}
                      disabled={!input}
                      className="text-[11px] px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 disabled:opacity-30 transition"
                      title="Apply this case to editor"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => handleCopy(converted, c.key)}
                      disabled={!input}
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 disabled:opacity-30 transition shadow-2xs"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre-wrap break-all min-h-[42px] flex items-center">
                  {converted || <span className="text-slate-400 italic font-sans text-xs">Waiting for input...</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
