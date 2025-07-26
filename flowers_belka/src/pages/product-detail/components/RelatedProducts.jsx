import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, title = "Дополнить композицию" }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card rounded-2xl shadow-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-2xl font-bold text-text-primary">
          {title}
        </h3>
        <Link
          to="/product-collection"
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-botanical"
        >
          <span className="font-inter text-sm font-medium">Смотреть все</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-surface rounded-xl overflow-hidden shadow-botanical-sm hover:shadow-botanical transition-botanical">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-background transition-botanical">
                      <Icon name="Heart" size={14} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Добавить
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-success text-success-foreground px-2 py-1 rounded-lg text-xs font-inter font-medium">
                      Новинка
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-error text-error-foreground px-2 py-1 rounded-lg text-xs font-inter font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="font-inter text-xs text-text-secondary ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                <h4 className="font-playfair font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-botanical">
                  <Link to={`/product-detail?id=${product.id}`}>
                    {product.name}
                  </Link>
                </h4>

                <p className="font-inter text-sm text-text-secondary mb-3 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-playfair text-lg font-bold text-primary">
                      {formatPrice(product.price)} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="font-inter text-sm text-text-secondary line-through">
                        {formatPrice(product.originalPrice)} ₽
                      </span>
                    )}
                  </div>
                  
                  {product.category && (
                    <span className="font-inter text-xs text-text-secondary bg-surface px-2 py-1 rounded-lg">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Icon name="Truck" size={12} className="text-text-secondary" />
                    <span className="font-inter text-xs text-text-secondary">
                      {product.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Flower" size={12} className="text-text-secondary" />
                    <span className="font-inter text-xs text-text-secondary">
                      {product.flowerCount} цветов
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Suggestions */}
      <div className="mt-8 p-4 bg-surface rounded-xl">
        <h4 className="font-playfair font-semibold text-text-primary mb-3">
          Популярные дополнения
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Премиум ваза', price: 2500, icon: 'Package' },
            { name: 'Открытка с пожеланием', price: 300, icon: 'Mail' },
            { name: 'Коробка конфет', price: 1200, icon: 'Gift' }
          ].map((addon, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-botanical">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={addon.icon} size={14} className="text-primary" />
                </div>
                <div>
                  <span className="font-inter text-sm font-medium text-text-primary">
                    {addon.name}
                  </span>
                  <div className="font-inter text-xs text-text-secondary">
                    +{formatPrice(addon.price)} ₽
                  </div>
                </div>
              </div>
              <button className="w-6 h-6 border border-border rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-botanical">
                <Icon name="Plus" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;