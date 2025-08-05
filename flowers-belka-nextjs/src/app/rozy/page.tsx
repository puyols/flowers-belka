'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products-parsed';

export default function RozyPage() {
  // Состояние фильтров
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    roseType: '',
    sortBy: 'popular'
  });

  // Фильтруем и сортируем товары
  const categoryProducts = useMemo(() => {
    let filtered = products.filter(p => p.category === 'rozy');

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceTo));
    }

    // Фильтр по типу роз
    if (filters.roseType) {
      filtered = filtered.filter(p => {
        const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
        const name = p.name.toLowerCase();
        const allText = `${tags} ${name}`;

        switch (filters.roseType) {
          case 'красные':
            return /красн/i.test(allText);
          case 'белые':
            return /бел/i.test(allText);
          case 'розовые':
            return /розов/i.test(allText);
          case 'сиреневые':
            return /сиренев|фиолет/i.test(allText);
          case 'персиковые':
            return /персиков/i.test(allText);
          case 'пионовидные':
            return /пионовидн/i.test(allText);
          case 'кустовые':
            return /кустов/i.test(allText);
          case 'эквадор':
            return /эквадор/i.test(allText);
          case 'кения':
            return /кени/i.test(allText);
          default:
            return allText.includes(filters.roseType.toLowerCase());
        }
      });
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0);
      }
    });

    return filtered;
  }, [filters]);

  // Функция для сброса фильтров
  const resetFilters = () => {
    setFilters({
      priceFrom: '',
      priceTo: '',
      roseType: '',
      sortBy: 'popular'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-rose-600 transition-colors">Главная</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Розы</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">
            🌹 Розы с доставкой в Путилково
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Элегантные розы различных сортов и цветов. Классические красные, нежные белые,
            романтичные розовые - выберите идеальные розы для вашего особого случая.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Символ любви
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Премиум качество
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Свежие розы
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <svg className="w-6 h-6 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Фильтры и сортировка
            </h3>
            <button
              onClick={resetFilters}
              className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors"
            >
              Сбросить все
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price filter */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                💰 Цена
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  placeholder="от"
                  value={filters.priceFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
                <span className="text-gray-400 font-medium">—</span>
                <input
                  type="number"
                  placeholder="до"
                  value={filters.priceTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
                <span className="text-sm text-gray-500 font-medium">₽</span>
              </div>
            </div>

            {/* Rose type filter */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                🌹 Тип роз
              </label>
              <select
                value={filters.roseType}
                onChange={(e) => setFilters(prev => ({ ...prev, roseType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Все виды</option>
                <option value="красные">❤️ Красные розы</option>
                <option value="белые">🤍 Белые розы</option>
                <option value="розовые">💗 Розовые розы</option>
                <option value="сиреневые">💜 Сиреневые розы</option>
                <option value="персиковые">🧡 Персиковые розы</option>
                <option value="пионовидные">🌸 Пионовидные розы</option>
                <option value="кустовые">🌿 Кустовые розы</option>
                <option value="эквадор">🇪🇨 Эквадорские розы</option>
                <option value="кения">🇰🇪 Кенийские розы</option>
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                📊 Сортировка
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                <option value="popular">По популярности</option>
                <option value="price_asc">По цене ↗</option>
                <option value="price_desc">По цене ↘</option>
                <option value="name">По названию</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Наши розы
              </h2>
              <p className="text-gray-600">
                Найдено товаров: <span className="font-semibold text-rose-600">{categoryProducts.length}</span>
                {filters.roseType && (
                  <span className="ml-2 text-sm text-gray-500">
                    (фильтр: {filters.roseType})
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Вид:</span>
              <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 bg-rose-50 border-rose-200 transition-colors">
                <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Розы не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры фильтрации</p>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="bg-gradient-to-r from-white to-rose-50 rounded-2xl shadow-lg border border-rose-100 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🌹 Розы - символ любви и красоты
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                    👑
                  </span>
                  Королева цветов
                </h3>
                <p className="text-gray-600">
                  Роза по праву считается королевой цветов. Этот прекрасный цветок символизирует любовь,
                  страсть, красоту и совершенство. В нашем интернет-магазине "Белка фловерс" вы найдете
                  широкий выбор роз различных сортов, цветов и размеров.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                    🎨
                  </span>
                  Богатая палитра
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❤️</span>
                    Красные розы - для выражения страстной любви
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">🤍</span>
                    Белые розы - для свадебных церемоний
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">💗</span>
                    Розовые розы - для романтических свиданий
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">💜</span>
                    Сиреневые розы - для особых моментов
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-700 mb-4">
                <strong>Все наши розы</strong> выращены в лучших питомниках и доставляются свежими
                прямо к вашему порогу. Мы гарантируем качество и свежесть каждого цветка.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/79037349844"
                  className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Заказать розы в WhatsApp
                </a>
                <a
                  href="tel:+79037349844"
                  className="inline-flex items-center px-6 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl hover:bg-rose-50 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +7 (903) 734-98-44
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
