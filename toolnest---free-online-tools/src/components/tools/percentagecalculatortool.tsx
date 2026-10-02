import React, { useState } from 'react';
import { Copy, Check, Calculator, ArrowRight } from 'lucide-react';

export const PercentageCalculatorTool: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('15');
  const [m1Y, setM1Y] = useState<string>('80');

  // Mode 2: X is what percent of Y?
  const [m2X, setM2X] = useState<string>('24');
  const [m2Y, setM2Y] = useState<string>('120');

  // Mode 3: Percentage Change from X to Y
  const [m3X, setM3X] = useState<string>('50');
  const [m3Y, setM3Y] = useState<string>('75');

  // Mode 4: Add / Subtract X% to Y
  const [m4Op, setM4Op] = useState<'add' | 'sub'>('add');
  const [m4X, setM4X] = useState<string>('10');
  const [m4Y, setM4Y] = useState<string>('100');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Calculations
  const r1 = (() => {
    const x = parseFloat(m1X);
    const y = parseFloat(m1Y);
    if (isNaN(x) || isNaN(y)) return null;
    const ans = (x / 100) * y;
    return {
      ans: parseFloat(ans.toFixed(4)),
      formula: `(${x} ÷ 100) × ${y} = ${parseFloat(ans.toFixed(4))}`
    };
  })();

  const r2 = (() => {
    const x = parseFloat(m2X);
    const y = parseFloat(m2Y);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    const ans = (x / y) * 100;
    return {
      ans: `${parseFloat(ans.toFixed(4))}%`,
      formula: `(${x} ÷ ${y}) × 100 = ${parseFloat(ans.toFixed(4))}%`
    };
  })();

  const r3 = (() => {
    const oldVal = parseFloat(m3X);
    const newVal = parseFloat(m3Y);
    if (isNaN(oldVal) || isNaN(newVal) || oldVal === 0) return null;
    const diff = newVal - oldVal;
    const ans = (diff / Math.abs(oldVal)) * 100;
    const isIncrease = diff >= 0;
    return {
      ans: `${isIncrease ? '+' : ''}${parseFloat(ans.toFixed(4))}%`,
      isIncrease,
      diff: parseFloat(diff.toFixed(4)),
      formula: `((${newVal} - ${oldVal}) ÷ |${oldVal}|) × 100 = ${parseFloat(ans.toFixed(4))}%`
    };
  })();

  const r4 = (() => {
    const pct = parseFloat(m4X);
    const base = parseFloat(m4Y);
    if (isNaN(pct) || isNaN(base)) return null;
    const change = (pct / 100) * base;
    const ans = m4Op === 'add' ? base + change : base - change;
    return {
      ans: parseFloat(ans.toFixed(4)),
      change: parseFloat(change.toFixed(4)),
      formula: `${base} ${m4Op === 'add' ? '+' : '-'} (${pct}% of ${base} = ${parseFloat(change.toFixed(4))}) = ${parseFloat(ans.toFixed(4))}`
    };
  })();

  return (
    <div className="space-y-6">
      {/* 1. What is X% of Y? */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>1. What is</span>
          <span className="text-blue-600 dark:text-blue-400">X%</span>
          <span>of</span>
          <span className="text-blue-600 dark:text-blue-400">Y</span>?
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">What is</span>
            <input
              type="number"
              value={m1X}
              onChange={e => setM1X(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">% of</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={m1Y}
              onChange={e => setM1Y(e.target.value)}
              className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">=</span>
          </div>

          {r1 && (
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-950/60 px-4 py-2 rounded-xl">
              <span className="text-base font-extrabold text-blue-700 dark:text-blue-300">
                {r1.ans}
              </span>
              <button
                onClick={() => copyVal(String(r1.ans), 'm1')}
                className="p-1 rounded text-blue-600 hover:text-blue-800"
                title="Copy result"
              >
                {copiedKey === 'm1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
        {r1 && <p className="text-[11px] font-mono text-slate-400">Step: {r1.formula}</p>}
      </div>

      {/* 2. X is what percent of Y? */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>2.</span>
          <span className="text-indigo-600 dark:text-indigo-400">X</span>
          <span>is what percent of</span>
          <span className="text-indigo-600 dark:text-indigo-400">Y</span>?
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={m2X}
            onChange={e => setM2X(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">is what % of</span>
          <input
            type="number"
            value={m2Y}
            onChange={e => setM2Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">=</span>

          {r2 && (
            <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-950/60 px-4 py-2 rounded-xl">
              <span className="text-base font-extrabold text-indigo-700 dark:text-indigo-300">
                {r2.ans}
              </span>
              <button
                onClick={() => copyVal(String(r2.ans), 'm2')}
                className="p-1 rounded text-indigo-600 hover:text-indigo-800"
                title="Copy result"
              >
                {copiedKey === 'm2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
        {r2 && <p className="text-[11px] font-mono text-slate-400">Step: {r2.formula}</p>}
      </div>

      {/* 3. Percentage Increase / Decrease */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>3. Percentage Change (Increase / Decrease)</span>
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-500">From</span>
          <input
            type="number"
            value={m3X}
            onChange={e => setM3X(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">to</span>
          <input
            type="number"
            value={m3Y}
            onChange={e => setM3Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">=</span>

          {r3 && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                r3.isIncrease
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
              }`}
            >
              <span className="text-base font-extrabold">
                {r3.ans} {r3.isIncrease ? '(Increase)' : '(Decrease)'}
              </span>
              <button
                onClick={() => copyVal(String(r3.ans), 'm3')}
                className="p-1 rounded opacity-80 hover:opacity-100"
                title="Copy result"
              >
                {copiedKey === 'm3' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
        {r3 && <p className="text-[11px] font-mono text-slate-400">Step: {r3.formula}</p>}
      </div>

      {/* 4. Add / Subtract X% to Y */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>4. Add or Subtract Percentage (Tax, Tips, Discounts)</span>
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={m4Op}
            onChange={e => setM4Op(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
          >
            <option value="add">Add (+)</option>
            <option value="sub">Subtract (-)</option>
          </select>

          <input
            type="number"
            value={m4X}
            onChange={e => setM4X(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">% to/from</span>

          <input
            type="number"
            value={m4Y}
            onChange={e => setM4Y(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-500">=</span>

          {r4 && (
            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-950/60 px-4 py-2 rounded-xl">
              <span className="text-base font-extrabold text-amber-700 dark:text-amber-300">
                {r4.ans}
              </span>
              <button
                onClick={() => copyVal(String(r4.ans), 'm4')}
                className="p-1 rounded text-amber-600 hover:text-amber-800"
                title="Copy result"
              >
                {copiedKey === 'm4' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
        {r4 && <p className="text-[11px] font-mono text-slate-400">Step: {r4.formula}</p>}
      </div>
    </div>
  );
};
