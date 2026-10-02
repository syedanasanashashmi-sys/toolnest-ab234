import React, { useState, useMemo } from 'react';
import { Tag, Copy, Check, DollarSign, RefreshCw, ShoppingBag } from 'lucide-react';

export const DiscountCalculatorTool: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('120');
  const [currency, setCurrency] = useState<string>('$');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState<string>('25');
  const [secondDiscount, setSecondDiscount] = useState<string>('10');
  const [salesTax, setSalesTax] = useState<string>('8');
  const [copied, setCopied] = useState<boolean>(false);

  const calc = useMemo(() => {
    const orig = parseFloat(originalPrice);
    if (isNaN(orig) || orig <= 0) return null;

    let d1Amount = 0;
    const dVal = parseFloat(discountValue) || 0;

    if (discountType === 'percent') {
      d1Amount = (dVal / 100) * orig;
    } else {
      d1Amount = Math.min(orig, dVal);
    }

    const priceAfterD1 = Math.max(0, orig - d1Amount);

    // Second discount
    const d2Val = parseFloat(secondDiscount) || 0;
    const d2Amount = (d2Val / 100) * priceAfterD1;
    const subtotal = Math.max(0, priceAfterD1 - d2Amount);

    // Sales Tax
    const taxRate = parseFloat(salesTax) || 0;
    const taxAmount = (taxRate / 100) * subtotal;

    // Final price
    const finalPrice = subtotal + taxAmount;
    const totalSaved = orig - subtotal;
    const effectiveDiscountPercent = orig > 0 ? ((totalSaved / orig) * 100).toFixed(1) : '0';

    return {
      originalPrice: orig,
      d1Amount: parseFloat(d1Amount.toFixed(2)),
      d2Amount: parseFloat(d2Amount.toFixed(2)),
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      totalSaved: parseFloat(totalSaved.toFixed(2)),
      effectiveDiscountPercent
    };
  }, [originalPrice, discountType, discountValue, secondDiscount, salesTax]);

  const handleCopySummary = () => {
    if (!calc) return;
    const summary = `Discount Breakdown:
- Original Price: ${currency}${calc.originalPrice}
- Total Savings: ${currency}${calc.totalSaved} (${calc.effectiveDiscountPercent}% off)
- Sales Tax: ${currency}${calc.taxAmount}
- Final Price: ${currency}${calc.finalPrice}
Calculated via ToolNest.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOriginalPrice('100');
    setDiscountValue('20');
    setSecondDiscount('0');
    setSalesTax('0');
  };

  return (
    <div className="space-y-6">
      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Original Price */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Original Price
          </label>
          <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="px-2.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-sm font-semibold border-r border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
              <option value="₹">₹ (INR)</option>
              <option value="¥">¥ (JPY)</option>
            </select>
            <input
              type="number"
              min="0"
              step="any"
              value={originalPrice}
              onChange={e => setOriginalPrice(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Primary Discount */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Primary Discount
            </label>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setDiscountType('percent')}
                className={`px-1.5 py-0.5 rounded ${
                  discountType === 'percent' ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => setDiscountType('fixed')}
                className={`px-1.5 py-0.5 rounded ${
                  discountType === 'fixed' ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}
              >
                {currency}
              </button>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              min="0"
              step="any"
              value={discountValue}
              onChange={e => setDiscountValue(e.target.value)}
              className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
            <span className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-900">
              {discountType === 'percent' ? '%' : currency}
            </span>
          </div>
        </div>

        {/* Extra Coupon / Second Discount */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Additional Coupon (% Off)
          </label>
          <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              value={secondDiscount}
              onChange={e => setSecondDiscount(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
            <span className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-900">
              %
            </span>
          </div>
        </div>

        {/* Optional Sales Tax */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Sales Tax (%)
          </label>
          <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              min="0"
              step="any"
              value={salesTax}
              onChange={e => setSalesTax(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
            <span className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-900">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Results Box */}
      {calc && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md">
              <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block mb-1">
                Final Price to Pay
              </span>
              <div className="text-3xl sm:text-4xl font-black">
                {currency}{calc.finalPrice.toFixed(2)}
              </div>
              {calc.taxAmount > 0 && (
                <span className="text-xs text-emerald-200 mt-1 block">
                  Includes {currency}{calc.taxAmount.toFixed(2)} sales tax
                </span>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300 block mb-1">
                Total You Save
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-blue-950 dark:text-blue-100">
                {currency}{calc.totalSaved.toFixed(2)}
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                {calc.effectiveDiscountPercent}% Total Savings
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Original Price
              </span>
              <div className="text-2xl font-bold text-slate-400 line-through">
                {currency}{calc.originalPrice.toFixed(2)}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Subtotal before tax: {currency}{calc.subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Summary Copied' : 'Copy Breakdown'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
