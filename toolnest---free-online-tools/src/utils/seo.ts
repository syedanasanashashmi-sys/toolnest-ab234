import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  schema?: object;
}

export function updateSEO({
  title,
  description,
  canonicalPath = '/',
  schema
}: SEOProps) {
  if (typeof document === 'undefined') return;

  const fullTitle = title 
    ? `${title}` 
    : `${siteConfig.name} – Free Online Tools | Fast, Private & Easy`;
  const fullDesc = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  // Update <title>
  document.title = fullTitle;

  // Helper for meta tags
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('description', fullDesc);
  setMeta('og:title', fullTitle, true);
  setMeta('og:description', fullDesc, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', fullDesc);

  // Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Dynamic Schema.org JSON-LD
  if (schema) {
    let scriptEl = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-page-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schema);
  }
}
