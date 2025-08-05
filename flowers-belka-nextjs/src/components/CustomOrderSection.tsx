'use client';

import { useState } from 'react';
import Image from 'next/image';

const CustomOrderSection = () => {
  const [budget, setBudget] = useState(3000);
  const [description, setDescription] = useState('');

  const handleOrder = () => {
    const message = `Здравствуйте! Хочу заказать букет по индивидуальному заказу.
    
Описание пожеланий: ${description || 'Не указано'}
Бюджет: ${budget} ₽

Заказ оформляется только по предварительному согласованию по WhatsApp: +79037349844
Минимальная сумма заказа — 3 000 ₽`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=79037349844&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1487070183336-b863922373d4?w=1200&h=800&fit=crop&q=95"
                  alt="Красивый букет цветов для индивидуального заказа"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                  unoptimized
                />
              </div>

              {/* Right side - Form */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Не нашли, что искали?
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Опишите Ваши пожелания по составу, цвету, упаковке букета или композиции
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Description Input */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Описание пожеланий
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                      placeholder="Например: букет из белых роз и эвкалипта в крафтовой упаковке для свадьбы..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Budget Input */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Бюджет (₽)
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setBudget(Math.max(3000, budget - 500))}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-l-md flex items-center justify-center text-gray-600 font-bold transition-colors border border-r-0 border-gray-300"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="budget"
                        min="3000"
                        step="500"
                        className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-semibold"
                        value={budget}
                        onChange={(e) => setBudget(Math.max(3000, parseInt(e.target.value) || 3000))}
                      />
                      <button
                        type="button"
                        onClick={() => setBudget(budget + 500)}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-r-md flex items-center justify-center text-gray-600 font-bold transition-colors border border-l-0 border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={handleOrder}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>ЗАКАЗАТЬ</span>
                  </button>

                  {/* Additional Info */}
                  <div className="text-center text-xs text-gray-500 space-y-1">
                    <p>Заказ оформляется только по предварительному согласованию</p>
                    <p>по WhatsApp: <span className="font-semibold">+79037349844</span></p>
                    <p>Минимальная сумма заказа — 3 000 ₽</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
