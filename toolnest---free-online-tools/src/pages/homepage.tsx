import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { TOOLS_DATA, CATEGORIES_LIST, CATEGORY_DETAILS } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { DynamicIcon } from '../utils/iconMap';
import { ToolDefinition } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  recentIds: string[];
  onClearRecent: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSearch,
  isFavorite,
  onToggleFavorite,
  recentIds,
  onClearRecent
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Popular tools
  const popularTools = TOOLS_DATA.filter(t => t.popular);

  // Filtered tools if user types in hero search
  const filteredHeroTools = heroSearch.trim()
    ? TOOLS_DATA.filter(t => {
        const q = heroSearch.toLowerCase().trim();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords.some(k => k.toLowerCase().includes(q))
        );
      })
    : [];

  // Recent tools list
  const recentTools: ToolDefinition[] = recentIds
    .map(id => TOOLS_DATA.find(t => t.id === id))
    .filter((t): t is ToolDefinition => !!t);

  const homeFaqs = [
    {
      q: 'Are ToolNest tools really 100% free?',
      a: 'Yes, completely free. There are no subscriptions, paywalls, or hidden limits. You can use every tool as many times as you need.'
    },
    {
      q: 'Do I need an account or sign up to use the tools?',
      a: 'Never. ToolNest requires zero registration or login. Open any tool and use it right away.'
    },
    {
      q: 'Are my files and images uploaded to your servers?',
      a: 'No! All processing for image compression, text counting, QR code generation, and calculations takes place entirely inside your web browser via HTML5 APIs. Your data never leaves your device.'
    },
    {
      q: 'Can I use ToolNest offline?',
      a: 'Yes. ToolNest is an installable Progressive Web App (PWA) with service worker caching. Once loaded, client-side tools work offline without an active internet connection.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Free Online Tools — Fast, Private &amp; Easy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Free Online Tools for{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Everyday Tasks
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Fast, simple, and privacy-friendly tools that work directly in your browser. Compress photos, format JSON, count words, calculate dates, and generate QR codes without uploading files.
        </p>

        {/* Large Search Box */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="flex items-center rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl focus-within:border-blue-500 transition-all p-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 mr-2 shrink-0" />
            <input
              type="text"
              value={heroSearch}
              onChange={e => setHeroSearch(e.target.value)}
              placeholder="Search for a tool (e.g. image, json, percent, qr)..."
              className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none py-1.5"
            />
            {heroSearch ? (
              <button
                onClick={() => setHeroSearch('')}
                className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 mr-1"
              >
                Clear
              </button>
            ) : (
              <kbd className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md mr-2 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Instant Search Dropdown on Hero Input */}
          {heroSearch.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 max-h-72 overflow-y-auto text-left">
              {filteredHeroTools.length > 0 ? (
                filteredHeroTools.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onNavigate(`/tools/${t.slug}`);
                      setHeroSearch('');
                    }}
                    className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <DynamicIcon name={t.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {t.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{t.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No tools found matching "{heroSearch}"
                </div>
              )}
            </div>
          )}

          {/* Quick shortcuts */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium mr-1">Popular:</span>
            {popularTools.slice(0, 4).map(pt => (
              <button
                key={pt.id}
                onClick={() => onNavigate(`/tools/${pt.slug}`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 transition"
              >
                {pt.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor / Ad Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder format="horizontal" />
      </div>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Popular Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              The most frequented tools by thousands of users every day
            </p>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={slug => onNavigate(`/tools/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Recently Used Tools (if any exist) */}
      {recentTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recently Used
              </h2>
            </div>
            <button
              onClick={onClearRecent}
              className="text-xs text-slate-400 hover:text-rose-500 transition"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentTools.slice(0, 4).map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={slug => onNavigate(`/tools/${slug}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Visual Category Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Browse by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Organized suites for text, images, calculation, and code
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES_LIST.map(category => {
            const details = CATEGORY_DETAILS[category];
            return (
              <div
                key={category}
                onClick={() => onNavigate(`/tools?category=${encodeURIComponent(category)}`)}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <DynamicIcon name={details.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {details.count} tools
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {details.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              All Available Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore our complete collection of 15 free online utilities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOOLS_DATA.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={slug => onNavigate(`/tools/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Why ToolNest? Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The Privacy First Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Why Professionals &amp; Everyday Users Love {siteConfig.name}
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Most online converters and tools upload your sensitive documents to remote servers. ToolNest is fundamentally different: your files never leave your device.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">100% Private</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero uploads. Everything is calculated in your browser's private memory using Web APIs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Zero Latency Speed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant calculations with no server waiting queues or network upload bottlenecks.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">No Registration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No email requests, passwords, or credit cards required. Ever.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Installable PWA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Install as a native app on iOS, Android, macOS, and Windows. Works offline anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common questions about ToolNest and browser-based tools
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
