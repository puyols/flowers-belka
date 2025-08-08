'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { completeProducts } from '@/data/products-complete';
import { getCategorySEO, generateBreadcrumbs } from '@/utils/seo';

export default function BuketyTsvetovPage() {
  // SEO данные для категории
  const seoData = getCategorySEO('bukety_tsvetov');
  const breadcrumbs = generateBreadcrumbs('/bukety_tsvetov');

  // Состояние фильтров
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    flowerType: '',
    color: '',
    sortBy: 'popular'
  });

  // Фильтруем и сортируем товары
  const categoryProducts = useMemo(() => {
    let filtered = completeProducts.filter(p => p.category === 'bukety_tsvetov');

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceTo));
    }

    // Фильтр по типу цветов
    if (filters.flowerType) {
      filtered = filtered.filter(p => {
        const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
        const name = p.name.toLowerCase();
        const allText = `${tags} ${name}`;

        switch (filters.flowerType) {
          case 'розы':
            return /роз/i.test(allText);
          case 'тюльпаны':
            return /тюльпан/i.test(allText);
          case 'хризантемы':
            return /хризантем/i.test(allText);
          case 'пионы':
            return /пион/i.test(allText);
          case 'гвоздики':
            return /гвоздик/i.test(allText);
          case 'лилии':
            return /лили/i.test(allText);
          case 'герберы':
            return /гербер/i.test(allText);
          case 'альстромерии':
            return /альстромери/i.test(allText);
          default:
            return true;
        }
      });
    }

    // Фильтр по цвету
    if (filters.color) {
      filtered = filtered.filter(p => {
        const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
        const name = p.name.toLowerCase();
        const allText = `${tags} ${name}`;

        switch (filters.color) {
          case 'красные':
            return /красн/i.test(allText);
          case 'белые':
            return /бел/i.test(allText);
          case 'розовые':
            return /розов/i.test(allText);
          case 'желтые':
            return /желт/i.test(allText);
          case 'фиолетовые':
            return /фиолет|сиренев/i.test(allText);
          case 'оранжевые':
            return /оранжев|персиков/i.test(allText);
          case 'разноцветные':
            return /микс|разноцвет/i.test(allText);
          default:
            return true;
        }
      });
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
        // По популярности (по умолчанию)
        break;
    }

    return filtered;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      priceFrom: '',
      priceTo: '',
      flowerType: '',
      color: '',
      sortBy: 'popular'
    });
  };

  return (
    <div>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        url={seoData.url}
        type={seoData.type}
        canonical={seoData.url}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{color: 'rgb(212, 20, 90)'}}>
              Букеты цветов с доставкой в Путилково
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Красивые букеты из свежих цветов для любого повода. Розы, тюльпаны, хризантемы и другие цветы 
              в стильных композициях. Быстрая доставка в Путилково и соседние районы.
            </p>
          </div>

          {/* Фильтры */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Фильтры и сортировка
              </h3>
              <button
                onClick={resetFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Сбросить все
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Цена от */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена от (₽)</label>
                <input
                  type="number"
                  placeholder="От"
                  value={filters.priceFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Цена до */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена до (₽)</label>
                <input
                  type="number"
                  placeholder="До"
                  value={filters.priceTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Тип цветов */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип цветов</label>
                <select
                  value={filters.flowerType}
                  onChange={(e) => setFilters(prev => ({ ...prev, flowerType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Все типы</option>
                  <option value="розы">Розы</option>
                  <option value="тюльпаны">Тюльпаны</option>
                  <option value="хризантемы">Хризантемы</option>
                  <option value="пионы">Пионы</option>
                  <option value="гвоздики">Гвоздики</option>
                  <option value="лилии">Лилии</option>
                  <option value="герберы">Герберы</option>
                  <option value="альстромерии">Альстромерии</option>
                </select>
              </div>

              {/* Цвет */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
                <select
                  value={filters.color}
                  onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Все цвета</option>
                  <option value="красные">Красные</option>
                  <option value="белые">Белые</option>
                  <option value="розовые">Розовые</option>
                  <option value="желтые">Желтые</option>
                  <option value="фиолетовые">Фиолетовые</option>
                  <option value="оранжевые">Оранжевые</option>
                  <option value="разноцветные">Разноцветные</option>
                </select>
              </div>

              {/* Сортировка */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">
              Найдено товаров: <span className="text-green-600 font-bold">{categoryProducts.length}</span>
            </p>
          </div>

          {/* Товары */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M6.343 6.343A8 8 0 1021.657 21.657 8 8 0 006.343 6.343z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-500 mb-4">По вашим критериям поиска товары не найдены. Попробуйте изменить фильтры.</p>
                <button
                  onClick={resetFilters}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}