import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import newsData from '../../../data/news';

const LatestNews = () => {
  // Берем первые 3 новости из данных
  const newsItems = newsData.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Последние новости
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto">
            Полезные советы, тренды флористики и секреты создания красивых букетов
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/novosti/"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-inter font-medium"
          >
            <span>Все новости</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
