import React from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolCard } from './ToolCard';

interface RelatedToolsProps {
  currentToolId: string;
  relatedIds: string[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onSelectTool: (slug: string) => void;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  currentToolId,
  relatedIds,
  isFavorite,
  onToggleFavorite,
  onSelectTool
}) => {
  // Find related tools, fallback to others in catalog if fewer than 3
  const relatedTools = TOOLS_DATA.filter(
    t => t.id !== currentToolId && relatedIds.includes(t.id)
  );

  const fallbackTools = TOOLS_DATA.filter(
    t => t.id !== currentToolId && !relatedIds.includes(t.id)
  ).slice(0, Math.max(0, 3 - relatedTools.length));

  const displayTools = [...relatedTools, ...fallbackTools].slice(0, 3);

  if (displayTools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related Tools</h3>
          <p className="text-sm text-slate-500 mt-1">Other free utilities you might find useful</p>
        </div>
        <button
          onClick={() => onSelectTool('all-tools')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All Tools &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayTools.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isFavorite={isFavorite(tool.id)}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelectTool}
          />
        ))}
      </div>
    </section>
  );
};
