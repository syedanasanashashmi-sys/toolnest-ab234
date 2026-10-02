import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Zap, Globe, Lock, Cpu, ServerOff } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'About' }]} onNavigate={onNavigate} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About {siteConfig.name}
        </h1>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          The fast, private, and zero-compromise online tools suite for the modern web.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <p>
          <strong>{siteConfig.name}</strong> was created to solve a persistent annoyance on the web: everyday utilities that require unnecessary accounts, bombard you with popup spam, and upload your private images, passwords, and documents to unknown third-party servers.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
          Our Architecture: 100% Client-Side Processing
        </h2>
        <p>
          Unlike legacy utility sites that process files on remote servers, ToolNest executes everything natively in your browser using modern Web APIs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <ServerOff className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero Server Uploads</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your images, texts, and JSON never leave your machine's local RAM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <Zap className="w-6 h-6 text-amber-500 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Blazing Fast</h3>
            <p className="text-xs text-slate-500 mt-1">
              No network round-trips or file transfer latency. Conversions take milliseconds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <Globe className="w-6 h-6 text-emerald-500 mb-2" />
            <h3 className="text-sm font-bold text-white dark:text-white">Offline Ready (PWA)</h3>
            <p className="text-xs text-slate-500 mt-1">
              Install {siteConfig.name} on your device and access tools anytime without Wi-Fi.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
          Designed for Simple Static Hosting
        </h2>
        <p>
          ToolNest requires no server-side databases, APIs, or complex infrastructure. The entire project is packaged cleanly to deploy effortlessly on static platforms like <strong>Netlify</strong>, GitHub Pages, Cloudflare Pages, or Vercel with zero backend maintenance.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
          Open &amp; Transparent
        </h2>
        <p>
          We believe utilities should just work. No email signups, no cookies used for invasive user profiling, and no deceptive buttons. You can inspect network traffic in your browser's Developer Tools anytime to verify that zero file payloads leave your browser.
        </p>
      </div>
    </div>
  );
};
