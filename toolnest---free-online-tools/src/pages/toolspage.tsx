import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Sparkles, Layers } from 'lucide-react';
import { TOOLS_DATA, CATEGORIES_LIST } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCategory } from '../types';

interface ToolsPageProps {
  initialCategory?: string;
  initialQuery?: string;
  onNavigate: (path: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  initialCategory,
  initialQuery = '',
  onNavigate,
  isFavorite,
  onToggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter(tool => {
      // Category filter
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }
      // Favorites filter
      if (onlyFavorites && !isFavorite(tool.id)) {
        return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.shortDescription.toLowerCase().includes(q);
        const matchesCat = tool.category.toLowerCase().includes(q);
        const matchesKeyword = tool.keywords.some(k => k.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesKeyword) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyFavorites, isFavorite]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'All Tools' }]}
        onNavigate={onNavigate}
      />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          All Online Tools
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Browse our suite of 15 fast, private, client-side tools
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedCategory === 'All'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({TOOLS_DATA.length})
          </button>
          {CATEGORIES_LIST.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input & Favorites toggle */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter tools..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setOnlyFavorites(prev => !prev)}
            className={`p-2 rounded-xl border transition ${
              onlyFavorites
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-500'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600'
            }`}
            title="Filter by Favorites"
          >
            <Star className={`w-4 h-4 ${onlyFavorites ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={slug => onNavigate(`/tools/${slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No tools match your filters
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or clearing your category selection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlyFavorites(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
