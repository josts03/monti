import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site, pageTitle } from '@/config/site';

interface SeoProps {
  title?: string;
  description: string;
  noIndex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Per-page SEO for the SPA: sets the document title, meta description,
 * Open Graph tags and canonical URL on every route change.
 */
export default function Seo({ title, description, noIndex = false }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = pageTitle(title);
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, noIndex, pathname]);

  return null;
}
