import React from 'react';
import { Wrench, ShieldCheck, Heart, Github, Twitter } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { CATEGORIES_LIST } from '../data/toolsData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Client-Side Privacy Guaranteed</span>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/tools/word-counter')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/image-compressor')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Compressor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/qr-generator')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  QR Code Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/age-calculator')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Age Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/json-formatter')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  JSON Formatter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/percentage-calculator')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Percentage Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {CATEGORIES_LIST.map(category => (
                <li key={category}>
                  <button
                    onClick={() => onNavigate(`/tools?category=${encodeURIComponent(category)}`)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About ToolNest
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved. Built for Netlify deployment.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted for speed &amp; privacy
            </span>
            <span>•</span>
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:underline"
            >
              Zero Logging
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
