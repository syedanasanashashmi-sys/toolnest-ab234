/**
 * ToolNest - All-in-One Online Tools Platform
 * Pure client-side processing, Netlify static compatible, PWA & SEO ready.
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useRecentTools } from './hooks/useRecentTools';
import { updateSEO } from './utils/seo';
import { siteConfig } from './config/siteConfig';

// Pages
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ToolPageWrapper } from './components/ToolPageWrapper';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentIds, recordVisit, clearRecent } = useRecentTools();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Navigate helper
  const navigate = (path: string) => {
    if (typeof window === 'undefined') return;

    const [pathname, search] = path.split('?');
    window.history.pushState({}, '', path);
    setCurrentPath(pathname);
    setSearchParams(new URLSearchParams(search || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update default SEO for non-tool pages
  useEffect(() => {
    if (currentPath === '/') {
      updateSEO({
        title: `${siteConfig.name} – Free Online Tools | Fast, Private & Easy`,
        description: siteConfig.description,
        canonicalPath: '/'
      });
    } else if (currentPath === '/tools') {
      updateSEO({
        title: `All Online Tools – Free Browser Utilities | ${siteConfig.name}`,
        description: 'Explore all 15 free online tools for text, images, calculations, generators, and code formatting on ToolNest.',
        canonicalPath: '/tools'
      });
    } else if (currentPath === '/categories') {
      updateSEO({
        title: `Tool Categories – Text, Images, Calculators & Code | ${siteConfig.name}`,
        description: 'Browse tools by category: Text utilities, Image compression, Calculators, Developers tools, and Generators.',
        canonicalPath: '/categories'
      });
    } else if (currentPath === '/about') {
      updateSEO({
        title: `About ${siteConfig.name} – Privacy First Client-Side Utilities`,
        description: `Learn why ${siteConfig.name} processes 100% of your data client-side with zero server uploads and zero tracking.`,
        canonicalPath: '/about'
      });
    } else if (currentPath === '/contact') {
      updateSEO({
        title: `Contact Us & Tool Suggestions | ${siteConfig.name}`,
        description: `Get in touch with the ${siteConfig.name} team for questions, tool requests, or feedback.`,
        canonicalPath: '/contact'
      });
    } else if (currentPath === '/privacy') {
      updateSEO({
        title: `Privacy Policy | ${siteConfig.name}`,
        description: `Read our comprehensive zero-data-collection privacy policy for ${siteConfig.name}.`,
        canonicalPath: '/privacy'
      });
    } else if (currentPath === '/terms') {
      updateSEO({
        title: `Terms of Service | ${siteConfig.name}`,
        description: `Terms and conditions for using ${siteConfig.name} free online tools.`,
        canonicalPath: '/terms'
      });
    } else if (currentPath === '/disclaimer') {
      updateSEO({
        title: `Disclaimer | ${siteConfig.name}`,
        description: `Calculators, estimates, and file processing disclaimers for ${siteConfig.name}.`,
        canonicalPath: '/disclaimer'
      });
    }
  }, [currentPath]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Router renderer
  const renderCurrentPage = () => {
    // Normalizing trailing slashes
    const cleanPath = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    // Homepage
    if (cleanPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setSearchModalOpen(true)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          recentIds={recentIds}
          onClearRecent={clearRecent}
        />
      );
    }

    // All tools page
    if (cleanPath === '/tools') {
      const categoryParam = searchParams.get('category') || undefined;
      const queryParam = searchParams.get('q') || undefined;
      return (
        <ToolsPage
          initialCategory={categoryParam}
          initialQuery={queryParam}
          onNavigate={navigate}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    // Categories page
    if (cleanPath === '/categories') {
      return <CategoriesPage onNavigate={navigate} />;
    }

    // Favorites page
    if (cleanPath === '/favorites') {
      return (
        <FavoritesPage
          onNavigate={navigate}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    // About page
    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // Contact page
    if (cleanPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // Privacy page
    if (cleanPath === '/privacy') {
      return <PrivacyPage onNavigate={navigate} />;
    }

    // Terms page
    if (cleanPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    // Disclaimer page
    if (cleanPath === '/disclaimer') {
      return <DisclaimerPage onNavigate={navigate} />;
    }

    // Dedicated tool pages: /tools/:slug
    if (cleanPath.startsWith('/tools/')) {
      const slug = cleanPath.replace('/tools/', '').trim();
      return (
        <ToolPageWrapper
          slug={slug}
          onNavigate={navigate}
          onOpenSearch={() => setSearchModalOpen(true)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onRecordVisit={recordVisit}
        />
      );
    }

    // 404 Not Found
    return (
      <NotFoundPage
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        favoritesCount={favorites.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTool={slug => {
          if (slug === 'all-tools') navigate('/tools');
          else navigate(`/tools/${slug}`);
        }}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />

      {/* Non-intrusive Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
}
