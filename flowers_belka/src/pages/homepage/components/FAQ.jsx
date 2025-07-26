import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null); // Все вопросы закрыты по умолчанию

  const faqData = [
    {
      id: 1,
      question: "Какая цена доставки цветов?",
      answer: "Доставка по городу осуществляется бесплатно от 5000 рублей. Стоимость доставки в отдаленные районы и область можно уточнить по круглосуточному номеру в WhatsApp: 89037349844."
    },
    {
      id: 2,
      question: "Возможна ли доставка букетов в Путилково?",
      answer: "Да, мы доставляем цветы и подарки в Путилково и соседние районы точно к указанному времени. Стоимость доставки на конкретный адрес можно рассчитать с помощью операторов службы поддержки."
    },
    {
      id: 3,
      question: "В какое время осуществляется доставка?",
      answer: "Доставка работает с 10:00 до 22:00. Вы можете выбрать удобный временной интервал при оформлении заказа или согласовать точное время с оператором."
    },
    {
      id: 4,
      question: "Возможна ли срочная доставка?",
      answer: "Да, мы предлагаем срочную доставку в течение 2-4 часов. Стоимость срочной доставки составляет 500 рублей дополнительно к стандартной цене."
    },
    {
      id: 5,
      question: "Можно ли отправить букет анонимно?",
      answer: "Конечно! Вы можете заказать анонимную доставку. Просто укажите это при оформлении заказа, и курьер не будет называть имя отправителя."
    },
    {
      id: 6,
      question: "Можно ли купить букет рядом с домом?",
      answer: "Мы работаем с доставкой по всему Путилково и соседним районам. Вы можете заказать букет с доставкой прямо к дому или в любое удобное место."
    },
    {
      id: 7,
      question: "Как добавить к цветам открытку?",
      answer: "При оформлении заказа вы можете указать текст для открытки в специальном поле. Мы бесплатно добавим красивую открытку с вашим поздравлением."
    },
    {
      id: 8,
      question: "Как курьеры доставляют цветы?",
      answer: "Наши курьеры доставляют цветы в специальных контейнерах, которые сохраняют свежесть букетов. Курьер свяжется с получателем за 30 минут до доставки."
    },
    {
      id: 9,
      question: "Где можно купить красивые букеты в Путилково недорого?",
      answer: "В нашем интернет-магазине представлен широкий выбор букетов от 2500 рублей. Мы предлагаем качественные цветы по доступным ценам с бесплатной доставкой."
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Левая колонка - Вопросы */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Вопросы о доставке цветов и работе сервиса
                </h2>

                <div className="space-y-1">
                  {faqData.map((item) => (
                    <div key={item.id}>
                      <div
                        onClick={() => toggleQuestion(item.id)}
                        className="flex items-center py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors"
                      >
                        <div className="text-green-600 mr-3 text-lg">✓</div>
                        <span className="text-gray-700 font-medium text-sm">
                          {item.question}
                        </span>
                      </div>

                      {openQuestion === item.id && (
                        <div className="ml-8 pb-4 pr-4">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая колонка - Изображение */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Букет желтых роз"
                  className="w-full h-full object-cover min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
