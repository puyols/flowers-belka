'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useApiCache } from '../hooks/useApiCache';

interface LazyProductGridProps {
  initialProducts?: Product[];
  apiEndpoint?: string;
  pageSize?: number;
  searchQuery?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  className?: string;
}

const LazyProductGrid: React.FC<LazyProductGridProps> = ({
  initialProducts = [],
  apiEndpoint = '/api_products.php?action=products',
  pageSize = 12,
  searchQuery = '',
  categoryId,
  minPrice,
  maxPrice,
  sortBy = 'date_desc',
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Построение URL для API запроса
  const buildApiUrl = useCallback((page: number) => {
    const params = new URLSearchParams({
      action: 'products',
      page: page.toString(),
      limit: pageSize.toString(),
      sort: sortBy,
    });

    if (searchQuery) params.append('search', searchQuery);
    if (categoryId) params.append('category_id', categoryId.toString());
    if (minPrice) params.append('min_price', minPrice.toString());
    if (maxPrice) params.append('max_price', maxPrice.toString());

    return `${apiEndpoint.split('?')[0]}?${params.toString()}`;
  }, [apiEndpoint, pageSize, searchQuery, categoryId, minPrice, maxPrice, sortBy]);

  // Используем кэшированный API запрос для первой страницы
  const firstPageUrl = useMemo(() => buildApiUrl(1), [buildApiUrl]);
  const { data: firstPageData, isLoading, error, refetch } = useApiCache(firstPageUrl, {
    cacheTime: 2 * 60 * 1000, // 2 минуты
    staleTime: 30 * 1000, // 30 секунд
  });

  // Обновляем продукты при получении данных первой страницы
  useEffect(() => {
    if (firstPageData?.products) {
      setAllProducts(firstPageData.products);
      setCurrentPage(1);
      setHasMore(firstPageData.pagination?.pages > 1);
    }
  }, [firstPageData]);

  // Загрузка дополнительных страниц
  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const response = await fetch(buildApiUrl(nextPage));
      const data = await response.json();

      if (data.success && data.products) {
        setAllProducts(prev => [...prev, ...data.products]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < data.pagination.pages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [buildApiUrl, currentPage, hasMore, isLoadingMore]);

  // Intersection Observer для автоматической загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMoreProducts]);

  // Сброс при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
    setAllProducts([]);
    setHasMore(true);
    refetch();
  }, [searchQuery, categoryId, minPrice, maxPrice, sortBy, refetch]);

  // Скелетон для загрузки
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );

  if (error && allProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">Ошибка загрузки товаров</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
          />
        ))}
        
        {/* Скелетоны во время загрузки */}
        {isLoading && allProducts.length === 0 && (
          Array.from({ length: pageSize }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        )}
        
        {/* Скелетоны для загрузки дополнительных товаров */}
        {isLoadingMore && (
          Array.from({ length: Math.min(pageSize, 4) }).map((_, index) => (
            <ProductSkeleton key={`loading-skeleton-${index}`} />
          ))
        )}
      </div>

      {/* Сентинел для автоматической загрузки */}
      {hasMore && !isLoading && (
        <div id="load-more-sentinel" className="h-10 mt-8" />
      )}

      {/* Кнопка "Загрузить еще" как fallback */}
      {hasMore && !isLoading && allProducts.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreProducts}
            disabled={isLoadingMore}
            className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      )}

      {/* Сообщение об отсутствии товаров */}
      {!isLoading && allProducts.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
            </svg>
            <p className="text-lg font-medium">Товары не найдены</p>
            <p className="text-sm text-gray-600 mt-2">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        </div>
      )}

      {/* Сообщение о завершении списка */}
      {!hasMore && allProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Все товары загружены</p>
        </div>
      )}
    </div>
  );
};

export default LazyProductGrid;
