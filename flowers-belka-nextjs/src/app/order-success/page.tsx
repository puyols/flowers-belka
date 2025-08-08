'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface OrderInfo {
  id: number;
  total: number;
  status: string;
  items_count: number;
}

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Загружаем информацию о заказе
  useEffect(() => {
    if (orderId) {
      fetchOrderInfo(orderId);
    } else {
      setIsLoading(false);
      setError('ID заказа не найден');
    }
  }, [orderId]);

  const fetchOrderInfo = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api_products.php?action=order_get&order_id=${id}`);
      const data = await response.json();

      if (data.success) {
        const order = data.order.info;
        setOrderInfo({
          id: order.order_id,
          total: order.total,
          status: order.status_name || 'В обработке',
          items_count: data.order.products.length,
        });
      } else {
        throw new Error(data.error || 'Ошибка загрузки заказа');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки заказа';
      setError(errorMessage);
      console.error('Error fetching order:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка информации о заказе...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Иконка успеха */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Заказ оформлен!</h1>
            <p className="text-gray-600">Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
          </div>

          {/* Информация о заказе */}
          {orderInfo && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Детали заказа</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Номер заказа</p>
                  <p className="font-semibold text-gray-900">#{orderInfo.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Статус</p>
                  <p className="font-semibold text-gray-900">{orderInfo.status}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Количество товаров</p>
                  <p className="font-semibold text-gray-900">{orderInfo.items_count}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Сумма заказа</p>
                  <p className="font-semibold text-gray-900">{formatPrice(orderInfo.total)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Что дальше */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Что дальше?</h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold text-orange-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Подтверждение заказа</p>
                  <p className="text-sm text-gray-600">Мы свяжемся с вами в течение 15 минут для подтверждения заказа</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold text-orange-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Подготовка заказа</p>
                  <p className="text-sm text-gray-600">Наши флористы подготовят ваш заказ с особой заботой</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold text-orange-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Доставка</p>
                  <p className="text-sm text-gray-600">Курьер доставит заказ в указанное время</p>
                </div>
              </div>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Нужна помощь?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Если у вас есть вопросы по заказу, свяжитесь с нами:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
              <p><strong>Email:</strong> info@flowers-belka.ru</p>
              <p><strong>Время работы:</strong> Ежедневно с 10:00 до 22:00</p>
            </div>
          </div>

          {/* Действия */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium text-center"
            >
              Продолжить покупки
            </Link>
            
            <Link
              href="/catalog"
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
            >
              Посмотреть каталог
            </Link>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Быстрая доставка</h4>
                <p className="text-sm text-gray-600">Доставляем в день заказа</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Гарантия качества</h4>
                <p className="text-sm text-gray-600">Только свежие цветы</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Поддержка 24/7</h4>
                <p className="text-sm text-gray-600">Всегда готовы помочь</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
