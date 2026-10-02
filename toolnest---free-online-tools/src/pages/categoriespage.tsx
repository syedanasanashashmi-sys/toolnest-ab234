import React from 'react';
import { CATEGORIES_LIST, CATEGORY_DETAILS, TOOLS_DATA } from '../data/toolsData';
import { DynamicIcon } from '../utils/iconMap';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Categories' }]}
        onNavigate={onNavigate}
      />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tool Categories
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Find the right utility for text formatting, image compression, math, and coding
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES_LIST.map(category => {
          const details = CATEGORY_DETAILS[category];
          const tools = TOOLS_DATA.filter(t => t.category === category);

          return (
            <div
              key={category}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <DynamicIcon name={details.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {category}
                      </h2>
                      <span className="text-xs text-slate-400">
                        {tools.length} available tools
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {details.description}
                </p>

                <div className="space-y-2 mb-4">
                  {tools.map(tool => (
                    <div
                      key={tool.id}
                      onClick={() => onNavigate(`/tools/${tool.slug}`)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <DynamicIcon name={tool.icon} className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {tool.name}
                          </span>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate(`/tools?category=${encodeURIComponent(category)}`)}
                className="w-full mt-2 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-300 transition text-center"
              >
                Browse all {category} &rarr;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
