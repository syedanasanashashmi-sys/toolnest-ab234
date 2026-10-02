import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface AdPlaceholderProps {
  format?: 'horizontal' | 'rectangle' | 'inline';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'horizontal',
  className = ''
}) => {
  if (!siteConfig.monetization.adsEnabled) return null;

  const formatStyles = {
    horizontal: 'w-full h-24 max-w-4xl min-h-[90px]',
    rectangle: 'w-full max-w-[300px] h-[250px]',
    inline: 'w-full h-20 max-w-2xl'
  };

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 p-3 text-center transition-all ${formatStyles[format]} ${className}`}
      aria-label="Advertisement area"
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
          {siteConfig.monetization.adPlaceholderText}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        Non-intrusive sponsor placeholder. Configurable in <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">siteConfig.ts</code>
      </p>
    </div>
  );
};
