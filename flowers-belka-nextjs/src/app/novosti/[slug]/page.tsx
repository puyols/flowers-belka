import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { newsArticles } from '@/data/news-parsed';
import { processNewsContent } from '@/utils/processNewsContent';
import '../../../styles/news-article.css';

// Функция для получения статьи по slug
function getNewsArticleBySlug(slug: string) {
  return newsArticles.find(article => article.slug === slug);
}

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = getNewsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  // Get navigation articles
  const currentIndex = newsArticles.findIndex(a => a.id === article.id);
  const previousArticle = currentIndex > 0 ? newsArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < newsArticles.length - 1 ? newsArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600">Главная</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/novosti" className="hover:text-green-600">Новости</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-8">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>Автор: {article.author}</span>
                    <span>•</span>
                    <span>{article.views} просмотров</span>
                  </div>
                </div>

                {/* Title */}
                <div className="news-article-content">
                  <h1>{article.title}</h1>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div
                  className="news-article-content"
                  dangerouslySetInnerHTML={{ __html: processNewsContent(article.content) }}
                />


              </div>
            </article>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link
                href="/novosti"
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
              >
                <span>← Все новости</span>
              </Link>
              
              {/* Навигация между статьями */}
              <div className="flex space-x-4">
                {previousArticle ? (
                  <Link
                    href={`/novosti/${previousArticle.slug}`}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    ← Предыдущая
                  </Link>
                ) : (
                  <span className="text-gray-400">← Предыдущая</span>
                )}
                {nextArticle ? (
                  <Link
                    href={`/novosti/${nextArticle.slug}`}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Следующая →
                  </Link>
                ) : (
                  <span className="text-gray-400">Следующая →</span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Похожие статьи</h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="flex space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2 mb-1">
                        <Link 
                          href={`/novosti/${relatedArticle.slug}`}
                          className="hover:text-green-600 transition-colors"
                        >
                          {relatedArticle.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(relatedArticle.publishedAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Подписка на новости</h3>
              <p className="text-sm text-gray-600 mb-4">
                Получайте свежие статьи о цветах и флористике на вашу почту
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold">
                  Подписаться
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Нужна консультация?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Наши флористы ответят на любые вопросы о цветах и помогут выбрать идеальный букет
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+79037349844"
                  className="block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  Позвонить: +7 (903) 734-98-44
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=79037349844"
                  className="block w-full border border-green-600 text-green-600 text-center py-2 rounded-md hover:bg-green-600 hover:text-white transition-colors text-sm font-semibold"
                >
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all news articles
export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsArticlePageProps) {
  const article = getNewsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Статья не найдена',
    };
  }

  return {
    title: `${article.title} | Новости Belka Flowers`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}
