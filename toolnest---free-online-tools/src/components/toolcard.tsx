import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { ToolDefinition } from '../types';
import { DynamicIcon } from '../utils/iconMap';

interface ToolCardProps {
  tool: ToolDefinition;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (slug: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(tool.slug)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Top row: Icon, Category & Favorite Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
            <DynamicIcon name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.popular && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Popular
              </span>
            )}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onToggleFavorite(tool.id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/30'
                  : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle favorite"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="mb-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
          {tool.category}
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        <span>Open Tool</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  );
};
