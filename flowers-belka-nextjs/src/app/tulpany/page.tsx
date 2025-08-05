import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products-parsed';

export default function TulpanyPage() {
  const category = { name: 'Тюльпаны', description: 'Весенние тюльпаны для особых моментов' };
  const categoryProducts = products.filter(p => p.category === 'tulpany');

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
            <li className="text-gray-900 font-medium">Тюльпаны</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Тюльпаны с доставкой в Путилково
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Яркие весенние тюльпаны различных сортов и цветов. Символ весны и обновления, 
            идеальный подарок к 8 марта и другим весенним праздникам.
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
          <h2 className="text-2xl font-bold mb-4">Тюльпаны - символ весны и обновления</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Тюльпаны - это воплощение весенней красоты и нежности. Эти прекрасные цветы 
              символизируют обновление, надежду и чистую любовь. В нашем магазине "Белка фловерс" 
              вы найдете широкий выбор тюльпанов различных сортов и оттенков.
            </p>
            <p className="mb-4">
              Мы предлагаем классические красные тюльпаны, нежные розовые, солнечные желтые, 
              изысканные белые и даже редкие пионовидные сорта. Каждый букет тюльпанов - это 
              маленький кусочек весны, который подарит радость и хорошее настроение.
            </p>
            <p>
              Заказывайте свежие тюльпаны с доставкой в Путилково по телефону +7 (903) 734-98-44. 
              Мы гарантируем свежесть цветов и быструю доставку.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
