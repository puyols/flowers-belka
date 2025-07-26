import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedSize.price;
  const originalPrice = selectedSize.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-text-primary mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
              />
            ))}
            <span className="text-sm font-inter text-text-secondary ml-2">
              {product.rating} ({product.reviewCount} отзывов)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={16} className="text-text-secondary" />
            <span className="text-sm font-inter text-text-secondary">В избранное</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-3">
        <span className="font-playfair text-3xl font-bold text-primary">
          {currentPrice.toLocaleString('ru-RU')} ₽
        </span>
        {originalPrice && (
          <>
            <span className="text-xl font-inter text-text-secondary line-through">
              {originalPrice.toLocaleString('ru-RU')} ₽
            </span>
            <span className="bg-error text-error-foreground px-2 py-1 rounded-lg text-sm font-inter font-medium">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Product Description */}
      <div className="prose prose-sm max-w-none">
        <p className="font-inter text-text-secondary leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Flower Composition */}
      <div className="bg-surface rounded-xl p-4">
        <h3 className="font-playfair text-lg font-semibold text-text-primary mb-3">
          Состав композиции
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.composition.map((flower, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <div>
                <span className="font-inter text-sm font-medium text-text-primary">
                  {flower.name}
                </span>
                <span className="font-inter text-xs text-text-secondary ml-2">
                  ({flower.latinName})
                </span>
                <div className="font-inter text-xs text-text-secondary">
                  {flower.quantity} шт.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-playfair text-lg font-semibold text-text-primary mb-3">
          Размер
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`p-4 rounded-xl border-2 transition-botanical text-center ${
                selectedSize.id === size.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div className="font-inter text-sm font-medium text-text-primary">
                {size.name}
              </div>
              <div className="font-inter text-xs text-text-secondary mt-1">
                {size.dimensions}
              </div>
              <div className="font-inter text-sm font-semibold text-primary mt-2">
                {size.price.toLocaleString('ru-RU')} ₽
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-playfair text-lg font-semibold text-text-primary mb-3">
          Цветовая гамма
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl border-2 transition-botanical ${
                selectedColor.id === color.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-background shadow-botanical-sm"
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="font-inter text-sm font-medium text-text-primary">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-border rounded-xl">
          <button
            onClick={decreaseQuantity}
            className="p-3 hover:bg-surface transition-botanical rounded-l-xl"
            aria-label="Уменьшить количество"
          >
            <Icon name="Minus" size={16} />
          </button>
          <span className="px-4 py-3 font-inter font-medium text-text-primary min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="p-3 hover:bg-surface transition-botanical rounded-r-xl"
            aria-label="Увеличить количество"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
        
        <Button
          variant="default"
          size="lg"
          iconName="ShoppingCart"
          iconPosition="left"
          className="flex-1"
        >
          Добавить в корзину
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          iconName="Heart"
          iconPosition="left"
          fullWidth
        >
          В избранное
        </Button>
        <Button
          variant="outline"
          iconName="Share2"
          iconPosition="left"
          fullWidth
        >
          Поделиться
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;