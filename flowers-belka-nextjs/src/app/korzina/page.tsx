'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartData, isLoading, error, updateQuantity, removeFromCart, clearCart, refreshCart } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Обновляем корзину при загрузке страницы
  React.useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M17 13v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <p className="text-gray-600 mt-2">Проверьте ваш заказ перед оформлением</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Заголовок таблицы */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-6">Товар</div>
              <div className="col-span-2 text-center">Цена</div>
              <div className="col-span-2 text-center">Количество</div>
              <div className="col-span-2 text-center">Сумма</div>
            </div>
          </div>

          {/* Товары */}
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Товар */}
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/${item.category}/${item.slug}`}
                        className="font-medium text-gray-900 hover:text-orange-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors mt-1 block"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>

                  {/* Цена */}
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Количество */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Сумма */}
                  <div className="col-span-2 text-center">
                    <span className="font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Итого */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  Очистить корзину
                </button>
                <Link
                  href="/"
                  className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
                >
                  Продолжить покупки
                </Link>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  Итого: {formatPrice(getTotalPrice())}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Товаров: {items.reduce((total, item) => total + item.quantity, 0)} шт.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка оформления заказа */}
        <div className="mt-8 text-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
            Оформить заказ
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Доставка рассчитывается на следующем шаге
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
