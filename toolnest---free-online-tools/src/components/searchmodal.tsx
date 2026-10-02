import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { DynamicIcon } from '../utils/iconMap';
import { ToolDefinition } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
  isFavorite: (toolId: string) => boolean;
  toggleFavorite: (toolId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  isFavorite,
  toggleFavorite
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  // Global shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Parent handles opening if triggered globally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTools: ToolDefinition[] = TOOLS_DATA.filter(tool => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredTools.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredTools.length - 1));
    } else if (e.key === 'Enter' && filteredTools.length > 0) {
      e.preventDefault();
      const selected = filteredTools[selectedIndex];
      if (selected) {
        onSelectTool(selected.slug);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search tools by name, keyword, or category (e.g. image, json, percent)..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const active = index === selectedIndex;
              const favorited = isFavorite(tool.id);
              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    onSelectTool(tool.slug);
                    onClose();
                  }}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        active
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <DynamicIcon name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {tool.name}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className={`p-1.5 rounded-lg transition ${
                        favorited
                          ? 'text-amber-500 hover:text-amber-600'
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                      }`}
                      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
                      aria-label="Toggle favorite"
                    >
                      <Star className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                    <ArrowRight className={`w-4 h-4 text-blue-500 transition-transform ${active ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                No tools found for "{query}"
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Try searching for general keywords like "text", "calculate", "photo", "json", or "qr".
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-[10px]">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-[10px] flex items-center">
                <CornerDownLeft className="w-2.5 h-2.5 mr-0.5" /> Enter
              </kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-[10px]">Esc</kbd>
              close
            </span>
          </div>
          <span>{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
};
