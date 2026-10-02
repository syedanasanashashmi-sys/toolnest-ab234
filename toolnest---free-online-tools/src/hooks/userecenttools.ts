import { useState, useEffect, useCallback } from 'react';

export function useRecentTools() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('toolnest_recent_tools');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recordVisit = useCallback((toolId: string) => {
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== toolId);
      const updated = [toolId, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('toolnest_recent_tools', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentIds([]);
    try {
      localStorage.removeItem('toolnest_recent_tools');
    } catch {
      // ignore
    }
  }, []);

  return { recentIds, recordVisit, clearRecent };
}
