'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface CustomerData {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
}

interface DeliveryData {
  address: string;
  city: string;
  postcode: string;
  delivery_time: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cartData, isLoading, createOrder, refreshCart } = useCart();
  
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
  });
  
  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    address: '',
    city: 'Путилково',
    postcode: '',
    delivery_time: 'today',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Загружаем корзину при инициализации
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Перенаправляем на корзину, если она пуста
  useEffect(() => {
    if (cartData && cartData.items.length === 0) {
      router.push('/korzina');
    }
  }, [cartData, router]);

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerData.firstname.trim()) {
      newErrors.firstname = 'Имя обязательно для заполнения';
    }

    if (!customerData.telephone.trim()) {
      newErrors.telephone = 'Телефон обязателен для заполнения';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(customerData.telephone)) {
      newErrors.telephone = 'Некорректный формат телефона';
    }

    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!deliveryData.address.trim()) {
      newErrors.address = 'Адрес доставки обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка отправки заказа
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer: customerData,
        delivery: deliveryData,
        payment_method: paymentMethod,
        comment,
      };

      const order = await createOrder(orderData);
      
      // Перенаправляем на страницу успеха
      router.push(`/order-success?order_id=${order.id}`);
      
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading && !cartData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return null; // Перенаправление обрабатывается в useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Оформление заказа</h1>
          <p className="text-gray-600 mt-2">Заполните данные для доставки</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Форма заказа */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Контактные данные */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Контактные данные</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={customerData.firstname}
                      onChange={(e) => setCustomerData({...customerData, firstname: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.firstname ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите ваше имя"
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      value={customerData.lastname}
                      onChange={(e) => setCustomerData({...customerData, lastname: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Введите вашу фамилию"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={customerData.telephone}
                      onChange={(e) => setCustomerData({...customerData, telephone: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.telephone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Доставка */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Доставка</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Город
                      </label>
                      <select
                        value={deliveryData.city}
                        onChange={(e) => setDeliveryData({...deliveryData, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="Путилково">Путилково</option>
                        <option value="Красногорск">Красногорск</option>
                        <option value="Москва">Москва</option>
                        <option value="Московская область">Московская область</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Индекс
                      </label>
                      <input
                        type="text"
                        value={deliveryData.postcode}
                        onChange={(e) => setDeliveryData({...deliveryData, postcode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес доставки *
                    </label>
                    <input
                      type="text"
                      value={deliveryData.address}
                      onChange={(e) => setDeliveryData({...deliveryData, address: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Улица, дом, квартира"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Время доставки
                    </label>
                    <select
                      value={deliveryData.delivery_time}
                      onChange={(e) => setDeliveryData({...deliveryData, delivery_time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="today">Сегодня (10:00-22:00)</option>
                      <option value="tomorrow">Завтра (10:00-22:00)</option>
                      <option value="custom">Выбрать дату</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Способ оплаты */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Способ оплаты</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Наличными курьеру</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Картой курьеру</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Онлайн оплата</span>
                  </label>
                </div>
              </div>

              {/* Комментарий */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Комментарий к заказу</h2>
                
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Дополнительные пожелания к заказу..."
                />
              </div>
            </div>

            {/* Итоги заказа */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ваш заказ</h2>
                
                {/* Товары */}
                <div className="space-y-3 mb-6">
                  {cartData.items.map((item) => (
                    <div key={item.cart_id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.total_price || (item.price * item.quantity))}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Итоги */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товары</span>
                    <span className="font-medium">{formatPrice(cartData.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span className="font-medium">
                      {cartData.delivery === 0 ? 'Бесплатно' : formatPrice(cartData.delivery)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Итого</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(cartData.total_price)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Оформляем заказ...' : 'Оформить заказ'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
