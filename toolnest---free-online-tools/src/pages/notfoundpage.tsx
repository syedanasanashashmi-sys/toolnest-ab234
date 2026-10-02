import React from 'react';
import { Search, Home, ArrowRight, HelpCircle } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenSearch }) => {
  const popularTools = TOOLS_DATA.filter(t => t.popular).slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
        <span className="text-3xl font-black">404</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          The tool or page you requested does not exist or may have been moved. Try searching or choose a popular tool below.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition"
        >
          <Search className="w-4 h-4" />
          <span>Search Tools</span>
        </button>
      </div>

      {/* Suggested Tools */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Popular Tools You Might Need
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularTools.map(t => (
            <div
              key={t.id}
              onClick={() => onNavigate(`/tools/${t.slug}`)}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 cursor-pointer flex items-center justify-between transition"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.name}
                </span>
                <span className="text-[11px] text-slate-400 block">{t.category}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
