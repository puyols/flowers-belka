'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { newsArticles } from '@/data/news-parsed';
import { getNewsSEO, generateBreadcrumbs } from '@/utils/seo';

export default function NewsPage() {
  const sortedNews = newsArticles.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const breadcrumbs = generateBreadcrumbs('/novosti');
  const seoData = getNewsSEO();

  return (
    <div>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        url={seoData.url}
        type={seoData.type}
        canonical={seoData.url}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{color: 'rgb(212, 20, 90)'}}>
              Новости флористики и советы по уходу за цветами
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Актуальные новости мира флористики, полезные советы по уходу за цветами, 
              тренды в цветочном дизайне и многое другое от экспертов Белка фловерс.
            </p>
          </div>

          {sortedNews.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={sortedNews[0].image}
                      alt={sortedNews[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(sortedNews[0].publishedAt).toLocaleDateString('ru-RU')} • {sortedNews[0].views} просмотров
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    <Link href={`/novosti/${sortedNews[0].slug}`} className="hover:text-green-600 transition-colors">
                      {sortedNews[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {sortedNews[0].excerpt}
                  </p>
                  <Link
                    href={`/novosti/${sortedNews[0].slug}`}
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Читать далее
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('ru-RU')} • {article.views} просмотров
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link href={`/novosti/${article.slug}`} className="hover:text-green-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/novosti/${article.slug}`}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}