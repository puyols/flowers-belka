import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getDifficultyText = (level) => {
    switch (level) {
      case 'easy': return 'Простой';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return 'Неизвестно';
    }
  };

  return (
    <div 
      className="group bg-card rounded-xl shadow-botanical hover:shadow-botanical-sm transition-all duration-300 overflow-hidden border border-botanical"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/product-detail" className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' :'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isLimited && (
              <span className="px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full">
                Ограниченная серия
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                Новинка
              </span>
            )}
            {product.isPersonalizable && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Персонализация
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
              <Icon name="Heart" size={16} />
            </button>
            <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
              <Icon name="Eye" size={16} />
            </button>
          </div>

          {/* Availability Counter */}
          {product.availableCount && product.availableCount <= 5 && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-warning/90 text-warning-foreground text-xs font-medium rounded-full">
              Осталось: {product.availableCount}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Price */}
          <div className="mb-3">
            <h3 className="font-playfair text-lg font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-inter text-xl font-bold text-primary">
                  ₽{product.price.toLocaleString('ru-RU')}
                </span>
                {product.originalPrice && (
                  <span className="font-inter text-sm text-text-secondary line-through">
                    ₽{product.originalPrice.toLocaleString('ru-RU')}
                  </span>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(product.careDifficulty)}`}>
                {getDifficultyText(product.careDifficulty)}
              </div>
            </div>
          </div>

          {/* Botanical Details */}
          <div className="mb-3">
            <p className="text-sm text-text-secondary mb-2 line-clamp-2">
              {product.botanicalDetails}
            </p>
            {product.meaning && (
              <p className="text-xs text-primary/80 italic">
                Символизм: {product.meaning}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                +{product.features.length - 3}
              </span>
            )}
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'}
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary">
                ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={14} className="text-success" />
              <span className="text-xs text-success">
                {product.deliveryTime}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="ShoppingBag"
          iconPosition="left"
          className="group-hover:bg-primary/90 transition-colors"
        >
          Быстрый заказ
        </Button>
        {product.isPersonalizable && (
          <Button
            variant="outline"
            fullWidth
            iconName="Palette"
            iconPosition="left"
          >
            Персонализировать
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;