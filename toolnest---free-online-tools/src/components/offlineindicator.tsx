import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xl backdrop-blur-md animate-bounce"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode — All tools continue to work client-side.</span>
    </div>
  );
};
