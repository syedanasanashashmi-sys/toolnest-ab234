import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} onNavigate={onNavigate} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Legal Disclaimer
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Disclaimer
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Last updated: September 2026
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          1. Calculators &amp; Mathematical Estimates
        </h2>
        <p>
          The calculators provided on {siteConfig.name} (including the Percentage Calculator, Discount Calculator, and Age Calculator) are intended strictly for educational, convenience, and informational estimates. While we strive for extreme mathematical precision and adhere to standard formulas, these results should not replace professional financial, tax, or legal advice.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          2. Image Processing &amp; File Integrity
        </h2>
        <p>
          All image compression and format conversions are performed directly by your browser's canvas renderer. We recommend retaining original copies of high-value photos and media before performing lossy compression or resizing. {siteConfig.name} is not liable for data loss or unintended visual degradation resulting from aggressive compression settings.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          3. External Links &amp; Advertisements
        </h2>
        <p>
          {siteConfig.name} may display links to external websites or third-party sponsor placeholders. We have no control over the nature, content, and availability of those external sites.
        </p>
      </div>
    </div>
  );
};
