import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data/news';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NewsPage = () => {
  const { slug } = useParams();

  // Если есть slug, показываем отдельную статью
  if (slug) {
    const article = newsData.find(item => item.slug === slug);
    
    if (!article) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Статья не найдена</h1>
              <Link to="/novosti" className="text-pink-600 hover:text-pink-700">
                ← Вернуться к новостям
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/novosti" className="text-pink-600 hover:text-pink-700 mb-6 inline-block">
              ← Вернуться к новостям
            </Link>
            
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
                <div className="flex items-center text-gray-600 text-sm mb-6">
                  <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU')}</span>
                  <span className="mx-2">•</span>
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.views} просмотров</span>
                </div>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Показываем список всех новостей
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Новости и статьи</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((article) => (
            <Link 
              key={article.id}
              to={`/novosti/${article.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU')}</span>
                  <span>{article.views} просмотров</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
