import React from 'react';
import { Star, Sparkles, ArrowRight } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onNavigate,
  favorites,
  onToggleFavorite
}) => {
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Favorites' }]}
        onNavigate={onNavigate}
      />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Favorite Tools
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Quick access to your starred utilities stored locally in your browser
          </p>
        </div>
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={slug => onNavigate(`/tools/${slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No Favorites Saved Yet
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Click the star icon ⭐ on any tool card or tool page to add it to your personal quick-access favorites.
          </p>
          <button
            onClick={() => onNavigate('/tools')}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
