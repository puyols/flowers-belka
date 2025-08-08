'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { completeProducts } from '@/data/products-complete';
import { getCategorySEO, generateBreadcrumbs } from '@/utils/seo';

export default function SukhotsvetyPage() {
  // SEO данные для категории
  const seoData = getCategorySEO('sukhotsvety');
  const breadcrumbs = generateBreadcrumbs('/sukhotsvety');

  // Состояние фильтров
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    type: '',
    sortBy: 'popular'
  });

  // Фильтруем товары сухоцветов
  const categoryProducts = useMemo(() => {
    let filtered = completeProducts.filter(p => p.category === 'sukhotsvety');

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceTo));
    }

    // Фильтр по типу
    if (filters.type) {
      filtered = filtered.filter(p => 
        p.tags.some(tag => tag.toLowerCase().includes(filters.type.toLowerCase()))
      );
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // По популярности (хиты сначала, потом по дате)
        filtered.sort((a, b) => {
          if (a.isHit && !b.isHit) return -1;
          if (!a.isHit && b.isHit) return 1;
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
    }

    return filtered;
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <SEOHead {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Заголовок категории */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Сухоцветы
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Долговечные композиции из сухоцветов. Природная красота, которая сохранится надолго.
              Идеальный выбор для интерьера и подарков.
            </p>
          </div>

          {/* Фильтры */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Цена от */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена от (₽)
                </label>
                <input
                  type="number"
                  value={filters.priceFrom}
                  onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="От"
                />
              </div>

              {/* Цена до */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена до (₽)
                </label>
                <input
                  type="number"
                  value={filters.priceTo}
                  onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="До"
                />
              </div>

              {/* Тип сухоцветов */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип сухоцветов
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Все типы</option>
                  <option value="гипсофила">Гипсофила</option>
                  <option value="лаванда">Лаванда</option>
                  <option value="колоски">Колоски</option>
                  <option value="композиция">Композиция</option>
                </select>
              </div>

              {/* Сортировка */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сортировка
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="popular">По популярности</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="name">По названию</option>
                </select>
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="mb-6">
            <p className="text-gray-600">
              Найдено товаров: <span className="font-semibold">{categoryProducts.length}</span>
            </p>
          </div>

          {/* Сетка товаров */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600 mb-4">
                Попробуйте изменить параметры фильтрации
              </p>
              <button
                onClick={() => setFilters({ priceFrom: '', priceTo: '', type: '', sortBy: 'popular' })}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Информация о сухоцветах */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              О сухоцветах
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Преимущества сухоцветов
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Долговечность - сохраняют красоту годами</li>
                  <li>• Не требуют ухода и полива</li>
                  <li>• Гипоаллергенны</li>
                  <li>• Экологичны и натуральны</li>
                  <li>• Подходят для любого интерьера</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Уход за сухоцветами
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Избегайте прямых солнечных лучей</li>
                  <li>• Защищайте от влаги</li>
                  <li>• Аккуратно удаляйте пыль</li>
                  <li>• Храните в сухом месте</li>
                  <li>• Не ставьте рядом с отопительными приборами</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
