import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from './homepage/components/Footer';
import Icon from '../components/AppIcon';
import newsData from '../data/news';

const NewsPage = () => {
  const { slug } = useParams();
  
  // Если slug есть, показываем отдельную новость, иначе список всех новостей
  if (slug) {
    const newsItem = newsData.find(item => item.slug === slug);
    
    if (!newsItem) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <div className="container mx-auto px-4 lg:px-8 py-16">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-primary mb-4">Новость не найдена</h1>
                <Link to="/novosti/" className="text-primary hover:underline">
                  ← Вернуться к новостям
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link to="/" className="hover:text-primary">Главная</Link>
                <Icon name="ChevronRight" size={16} />
                <Link to="/novosti/" className="hover:text-primary">Новости</Link>
                <Icon name="ChevronRight" size={16} />
                <span className="text-primary">{newsItem.title}</span>
              </div>
            </nav>

            <article className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-red-500 text-white rounded-lg px-3 py-2 text-center">
                    <div className="text-lg font-bold">{newsItem.date}</div>
                    <div className="text-xs uppercase">{newsItem.month}</div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={16} />
                      <span>{newsItem.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} />
                      <span>{newsItem.views}</span>
                    </div>
                  </div>
                </div>
                
                <h1 className="font-playfair text-4xl font-bold text-primary mb-4">
                  {newsItem.title}
                </h1>
                
                <p className="font-inter text-xl text-gray-600 leading-relaxed">
                  {newsItem.description}
                </p>
              </header>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none font-inter"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />

              {/* Tags */}
              {newsItem.tags && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Теги:</h3>
                  <div className="flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to News */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  to="/novosti/"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-inter font-medium"
                >
                  <Icon name="ArrowLeft" size={16} />
                  <span>Все новости</span>
                </Link>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Список всех новостей
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl font-bold text-primary mb-4">
              Новости и статьи
            </h1>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto">
              Полезные советы, тренды флористики и секреты создания красивых букетов
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Image with Date Badge */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white rounded-lg px-3 py-2 text-center">
                    <div className="text-lg font-bold">{item.date}</div>
                    <div className="text-xs uppercase">{item.month}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/novosti/${item.slug}`}
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-inter text-sm font-medium"
                  >
                    <span>ПОДРОБНЕЕ</span>
                    <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
