'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products-parsed';

export default function TsvetyVKorobkePage() {
  // Состояние фильтров
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    boxType: '',
    sortBy: 'popular'
  });

  // Фильтруем и сортируем товары
  const categoryProducts = useMemo(() => {
    let filtered = products.filter(p => p.category === 'tsvety_v_korobke');

    // Фильтр по цене
    if (filters.priceFrom) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceTo));
    }

    // Фильтр по типу коробки
    if (filters.boxType) {
      filtered = filtered.filter(p => {
        const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
        const name = p.name.toLowerCase();
        const allText = `${tags} ${name}`;

        switch (filters.boxType) {
          case 'круглая':
            return /кругл/i.test(allText);
          case 'квадратная':
            return /квадрат/i.test(allText);
          case 'сердце':
            return /сердц/i.test(allText);
          case 'большая':
            return /больш/i.test(allText);
          case 'маленькая':
            return /мален|мини/i.test(allText);
          case 'розы':
            return /роз/i.test(allText);
          case 'смешанная':
            return /смешан/i.test(allText);
          default:
            return allText.includes(filters.boxType.toLowerCase());
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
      boxType: '',
      sortBy: 'popular'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600">Главная</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Цветы в коробке</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Цветы в шляпной коробке с доставкой в Путилково
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Элегантные цветочные композиции в стильных шляпных коробках. Современное решение 
            для подарка, которое сочетает красоту цветов с практичностью и долговечностью.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Найдено товаров: {categoryProducts.length}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Цветы в коробке - современный тренд флористики</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Цветы в шляпной коробке - это современный тренд флористики, который завоевал 
              популярность благодаря своей практичности и эстетической привлекательности. 
              Такие композиции выглядят стильно и сохраняют свежесть значительно дольше обычных букетов.
            </p>
            <p className="mb-4">
              В нашем магазине "Белка фловерс" представлен широкий выбор композиций в шляпных коробках: 
              от нежных пастельных до ярких контрастных сочетаний. Мы используем только свежие цветы 
              и качественные материалы для создания наших композиций.
            </p>
            <p>
              Заказывайте цветы в коробке с доставкой в Путилково по телефону +7 (903) 734-98-44. 
              Идеальный подарок для любого случая!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
