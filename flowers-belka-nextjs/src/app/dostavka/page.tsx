import React from 'react';
import Link from 'next/link';

export default function DostavkaPage() {
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
            <li className="text-gray-900 font-medium">Доставка</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Доставка цветов в Путилково
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Мы осуществляем быструю и надежную доставку свежих цветов и букетов 
            в Путилково и близлежащие районы. Работаем ежедневно с 10:00 до 22:00.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Info */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Условия доставки</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Зоны доставки</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Путилково</li>
                  <li>• Красногорск</li>
                  <li>• Химки</li>
                  <li>• Куркино</li>
                  <li>• Митино</li>
                  <li>• Тушино</li>
                  <li>• Строгино</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Стоимость доставки</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• <strong>Бесплатно</strong> при заказе от 5000 ₽</li>
                  <li>• <strong>300 ₽</strong> при заказе от 1500 ₽</li>
                  <li>• <strong>500 ₽</strong> при заказе менее 1500 ₽</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Время доставки</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Ежедневно с 10:00 до 22:00</li>
                  <li>• Доставка в день заказа</li>
                  <li>• Срочная доставка в течение 2-3 часов</li>
                  <li>• Возможна доставка к определенному времени</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Способы оплаты</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Наличными курьеру</li>
                  <li>• Банковской картой курьеру</li>
                  <li>• Онлайн на сайте</li>
                  <li>• Переводом на карту</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Заказать доставку</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Адрес доставки
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Укажите полный адрес доставки"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Желаемое время доставки
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Комментарий к заказу
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Дополнительные пожелания"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-semibold"
              >
                Оформить заказ
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Или свяжитесь с нами</h3>
              <div className="space-y-3">
                <a
                  href="tel:+79037349844"
                  className="flex items-center space-x-3 text-green-600 hover:text-green-700"
                >
                  <span>📞</span>
                  <span>+7 (903) 734-98-44</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=79037349844"
                  className="flex items-center space-x-3 text-green-600 hover:text-green-700"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span>📧</span>
                  <span>info@belka-flowers.ru</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Можно ли заказать доставку на определенное время?
              </h3>
              <p className="text-gray-600">
                Да, мы можем доставить букет к определенному времени. Укажите желаемое время 
                при оформлении заказа, и мы постараемся доставить точно в срок.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Что делать, если получателя нет дома?
              </h3>
              <p className="text-gray-600">
                Наш курьер свяжется с получателем по указанному номеру телефона. 
                Если связаться не удается, мы перенесем доставку на удобное время.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Можно ли доставить букет анонимно?
              </h3>
              <p className="text-gray-600">
                Конечно! Мы можем доставить букет без указания отправителя. 
                Просто укажите это в комментарии к заказу.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Гарантируете ли вы свежесть цветов?
              </h3>
              <p className="text-gray-600">
                Да, мы гарантируем свежесть всех наших цветов. Если вы не удовлетворены 
                качеством, мы заменим букет или вернем деньги.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
