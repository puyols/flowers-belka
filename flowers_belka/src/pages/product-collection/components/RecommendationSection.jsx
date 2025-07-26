import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationSection = ({ recommendations }) => {
  return (
    <div className="bg-surface py-12">
      <div className="w-full px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl font-bold text-text-primary mb-4">
            Рекомендуемые композиции
          </h2>
          <p className="font-inter text-text-secondary max-w-2xl mx-auto">
            Наши флористы подобрали для вас композиции, которые идеально дополнят выбранную коллекцию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl shadow-botanical hover:shadow-botanical-sm transition-all duration-300 overflow-hidden border border-botanical group"
            >
              <Link to="/product-detail" className="block">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Quick Action */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                      <Icon name="Heart" size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-playfair text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-inter text-lg font-bold text-primary">
                        ₽{item.price.toLocaleString('ru-RU')}
                      </span>
                      {item.originalPrice && (
                        <span className="font-inter text-sm text-text-secondary line-through">
                          ₽{item.originalPrice.toLocaleString('ru-RU')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-accent fill-current" />
                      <span className="text-sm text-text-secondary">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Truck" size={14} className="text-success" />
                      <span className="text-xs text-success">
                        {item.deliveryTime}
                      </span>
                    </div>
                    
                    <span className="text-xs text-text-secondary">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="px-4 pb-4">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  size="sm"
                >
                  Добавить к заказу
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Посмотреть все рекомендации
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;