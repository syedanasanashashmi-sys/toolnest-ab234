import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Star,
  Layers,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  favoritesCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  favoritesCount,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'All Tools', path: '/tools', icon: Wrench },
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Free
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => {
            const isActive = currentPath === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 opacity-75" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('/favorites')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
              currentPath === '/favorites'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-0.5 text-xs font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-white">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Desktop Controls: Search, Theme, PWA */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700/60 rounded-xl transition"
            title="Search tools (Ctrl+K or ⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">Search tools...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark/light theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton />
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Search tools"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  currentPath === link.path
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 opacity-75" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('/favorites')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Favorites</span>
            </div>
            {favoritesCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <PWAInstallButton />
          </div>
        </div>
      )}
    </header>
  );
};
