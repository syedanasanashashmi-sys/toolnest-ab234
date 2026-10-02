import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-4 overflow-x-auto py-1">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-medium text-slate-800 dark:text-slate-200 truncate shrink-0" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.path!)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0 truncate"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
