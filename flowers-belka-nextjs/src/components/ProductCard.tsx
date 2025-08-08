'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '@/contexts/CartContext';
import OptimizedImage from './OptimizedImage';
import useAnalytics from '@/hooks/useAnalytics';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { trackProductView, trackAddToCart } = useAnalytics();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Отслеживаем добавление в корзину
    await trackAddToCart(product.id, product.name, 1, product.price);

    await addToCart({
      product_id: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      category: product.category,
    });
  };

  const handleProductClick = () => {
    // Отслеживаем просмотр товара
    trackProductView(product.id, product.name, product.category);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
      setIsHovered(true);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group h-full flex flex-col">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-green-100">
        <Link href={`/${product.category}/${product.slug}`} onClick={handleProductClick}>
          <div
            className="relative w-full h-full cursor-pointer"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <OptimizedImage
              src={product.images[currentImageIndex] || ''}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
            />

            {/* Hit badge - розовый как на вашем сайте */}
            {product.isHit && (
              <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-medium">
                🌸 Букет цветов
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="p-3 flex flex-col flex-grow">
        <Link href={`/${product.category}/${product.slug}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors mb-1 h-12 overflow-hidden line-clamp-2">
            {product.name}
          </h3>
        </Link>



        {/* Price */}
        <div className="mb-3">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toLocaleString()} ₽
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <button
            onClick={handleAddToCart}
            className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
              product.inStock
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Купить' : 'Нет в наличии'}
          </button>

          <Link
            href="/dostavka"
            className="block text-center text-xs text-green-600 hover:text-green-700 transition-colors"
          >
            Доставка от 5000₽ бесплатно
          </Link>
        </div>
      </div>
    </div>
  );
};

// Мемоизируем компонент для оптимизации рендеринга
export default memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.inStock === nextProps.product.inStock
  );
});
