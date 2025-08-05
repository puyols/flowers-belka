'use client';

import React, { useState } from 'react';

const CustomOrderForm = () => {
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('3000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Здравствуйте! Хочу заказать индивидуальный букет:

Описание пожеланий: ${description}
Бюджет: ${budget} ₽

Прошу связаться со мной для уточнения деталей.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=79037349844&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Не нашли, что искали?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Опишите Ваши пожелания по составу, цвету, упаковке букета или композиции
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Описание пожеланий
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Например: букет из белых роз и эвкалипта в крафтовой упаковке для свадьбы..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Бюджет (₽)
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setBudget(Math.max(1000, parseInt(budget) - 500).toString())}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-bold">-</span>
                  </button>
                  
                  <input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="1000"
                    step="500"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center font-semibold text-lg"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setBudget((parseInt(budget) + 500).toString())}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-12 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center mx-auto"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  ЗАКАЗАТЬ
                </button>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Заказ оформляется только по предварительному согласованию</p>
                <p>по WhatsApp: <strong>+79037349844</strong></p>
                <p>Минимальная сумма заказа – 3 000 ₽</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderForm;
