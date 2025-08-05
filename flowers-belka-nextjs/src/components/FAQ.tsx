'use client';

import React, { useState } from 'react';
import FAQStructuredData from './FAQStructuredData';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Какая цена доставки цветов?",
    answer: "Доставка по городу осуществляется бесплатно от 5000 рублей. Стоимость доставки в отдаленные районы и область можно уточнить по круглосуточному номеру в WhatsApp: 89037349844."
  },
  {
    question: "Возможна ли доставка букетов в Путилково?",
    answer: "Да, мы доставляем цветы и подарки в Путилково и соседние районы точно к указанному времени. Стоимость доставки на конкретный адрес можно рассчитать с помощью операторов службы поддержки."
  },
  {
    question: "В какое время осуществляется доставка?",
    answer: "Доставка работает с 10:00 до 22:00. Вы можете выбрать удобный временной интервал при оформлении заказа или согласовать точное время с операторами."
  },
  {
    question: "Возможна ли срочная доставка?",
    answer: "Да, при оформлении заказа можно выбрать ближайший интервал доставки. Букет будет доставлен получателю уже через 30 минут после подтверждения оплаты. Для уточнения деталей свяжитесь с операторами."
  },
  {
    question: "Можно ли отправить букет анонимно?",
    answer: "Да, мы гарантируем конфиденциальность ваших данных. Получатель узнает ваше имя только в том случае, если вы укажете его в открытке или оставите соответствующие пожелания в заказе."
  },
  {
    question: "Как добавить к цветам открытку?",
    answer: "При оформлении заказа вы можете выбрать бесплатную открытку или открытку ручной работы из нашего каталога. Мы впишем в нее любой текст по вашему желанию."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      {/* FAQ Structured Data */}
      <FAQStructuredData faqs={faqData} />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Вопросы о доставке цветов и работе сервиса
          </h2>
          
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-green-600 font-bold text-lg mr-4">✓</span>
                    <span className="font-semibold text-gray-800 text-lg">
                      {item.question}
                    </span>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="px-6 pb-5">
                    <div className="pl-10">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
