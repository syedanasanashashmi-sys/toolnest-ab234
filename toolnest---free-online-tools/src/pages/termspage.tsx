import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

export const TermsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} onNavigate={onNavigate} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Last updated: September 2026
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing and utilizing {siteConfig.name}, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, you may discontinue use of our utilities.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Free Use License</h2>
        <p>
          {siteConfig.name} grants you a personal, worldwide, royalty-free, non-assignable license to use the tools available on this platform for personal, educational, or commercial purposes.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. User Responsibility</h2>
        <p>
          Because all calculations and image modifications occur client-side on your hardware, you are solely responsible for ensuring you have valid backup copies of critical files prior to compression or alteration.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. No Warranty</h2>
        <p>
          The tools and services provided on {siteConfig.name} are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Governing Law &amp; Inquiries</h2>
        <p>
          Any inquiries regarding these terms may be directed to <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-600 hover:underline">{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
};
