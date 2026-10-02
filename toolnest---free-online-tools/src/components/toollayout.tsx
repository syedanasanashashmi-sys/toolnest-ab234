import React, { useState } from 'react';
import {
  Star,
  Share2,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  BookOpen,
  Info,
  Check
} from 'lucide-react';
import { ToolDefinition } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { RelatedTools } from './RelatedTools';
import { AdPlaceholder } from './AdPlaceholder';
import { DynamicIcon } from '../utils/iconMap';
import { siteConfig } from '../config/siteConfig';

interface ToolLayoutProps {
  tool: ToolDefinition;
  isFavorite: boolean;
  checkFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  tool,
  isFavorite,
  checkFavorite,
  onToggleFavorite,
  onNavigate,
  children
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.shortDescription,
          url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Tools', path: '/tools' },
          { label: tool.category, path: `/tools?category=${encodeURIComponent(tool.category)}` },
          { label: tool.name }
        ]}
        onNavigate={onNavigate}
      />

      {/* Tool Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <DynamicIcon name={tool.icon} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {tool.category}
              </span>
              {tool.popular && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  Popular
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tool.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        {/* Action buttons: Favorite, Share */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
              isFavorite
                ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Star className={`w-4 h-4 text-amber-500 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
            title="Share this tool"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="mb-6 flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <p>
          <strong className="font-semibold">Privacy Guaranteed:</strong> {tool.privacyNote || siteConfig.privacyGuarantee}
        </p>
      </div>

      {/* Main Interactive Tool Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 sm:p-6 mb-8">
        {children}
      </div>

      {/* Top Advertisement Placeholder */}
      <AdPlaceholder format="horizontal" />

      {/* How to Use Section */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How to Use {tool.name}
            </h2>
          </div>
          <ol className="space-y-3">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* How it Works / Explanation */}
      {tool.howItWorks && (
        <section className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How It Works Under the Hood
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.howItWorks}
          </p>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left font-medium text-slate-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <RelatedTools
        currentToolId={tool.id}
        relatedIds={tool.relatedToolIds}
        isFavorite={checkFavorite}
        onToggleFavorite={onToggleFavorite}
        onSelectTool={slug => onNavigate(`/tools/${slug}`)}
      />
    </div>
  );
};
