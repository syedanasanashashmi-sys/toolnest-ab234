import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Lock, HardDrive, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Privacy First Architecture
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Last updated: September 2026
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 not-prose text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
          <strong className="block text-sm font-bold text-emerald-900 dark:text-emerald-200">
            Summary: We Do Not Collect Your Personal Files or Data
          </strong>
          <p>
            When you compress an image, count words, format JSON, or generate a QR code on {siteConfig.name}, all computations happen exclusively in your browser memory. We never upload, save, or view your content.
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Data Processing Philosophy
        </h2>
        <p>
          {siteConfig.name} is designed to be completely functional as a static, client-side web application. Unlike typical web converters that upload your files to remote cloud servers for batch processing, our tools utilize standard HTML5 Canvas, Web Cryptography, and JavaScript engine capabilities locally on your computer or mobile device.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. Local Storage Usage
        </h2>
        <p>
          We use browser <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">localStorage</code> solely to remember your preferences between sessions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Theme:</strong> Storing whether you prefer dark or light mode.</li>
          <li><strong>Favorites:</strong> Saving your pinned tools for quick access.</li>
          <li><strong>Recently Used:</strong> Remembering the last few tools you visited.</li>
        </ul>
        <p>
          This data never leaves your browser. You can clear your history or favorites at any time with a single click or by clearing your browser cache.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. Analytics &amp; Third-Party Services
        </h2>
        <p>
          We do not employ intrusive spyware or keystroke loggers. If third-party advertisements or privacy-preserving analytics are displayed, they adhere to standard web protocols and do not access the data you input into our tools.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          4. Contact Information
        </h2>
        <p>
          For privacy inquiries or suggestions, please contact us at <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-600 hover:underline">{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </div>
  );
};
