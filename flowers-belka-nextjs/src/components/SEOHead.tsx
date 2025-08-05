'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  availability?: string;
  brand?: string;
  category?: string;
  noindex?: boolean;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = 'https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png',
  url = 'https://flowers-belka.ru',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  price,
  currency = 'RUB',
  availability,
  brand = 'Belka Flowers',
  category,
  noindex = false,
  canonical
}) => {
  const siteName = 'Belka Flowers';
  const locale = 'ru_RU';
  const twitterHandle = '@belka_flowers';

  useEffect(() => {
    // Обновляем title
    document.title = title;

    // Функция для обновления или создания мета-тега
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Функция для обновления или создания link тега
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Основные мета-теги
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Canonical URL
    updateLinkTag('canonical', canonical || url);

    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Дополнительные мета-теги для локального бизнеса
    updateMetaTag('geo.region', 'RU-MOS');
    updateMetaTag('geo.placename', 'Путилково');
    updateMetaTag('geo.position', '55.8094;37.0781');
    updateMetaTag('ICBM', '55.8094, 37.0781');

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, price, currency, availability, brand, category, noindex, canonical]);

  return null;
};

export default SEOHead;
