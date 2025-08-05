'use client';

import React from 'react';
import ReviewsStructuredData from './ReviewsStructuredData';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

const reviewsData: Review[] = [
  {
    author: "Анна Петрова",
    rating: 5,
    text: "Заказывала букет роз на день рождения мамы. Цветы пришли свежие, красивые, точно в срок. Мама была в восторге! Обязательно буду заказывать еще.",
    date: "2025-03-08"
  },
  {
    author: "Михаил Сидоров",
    rating: 5,
    text: "Отличный сервис! Заказал букет для жены на 8 марта, доставили точно вовремя. Цветы очень свежие, композиция красивая. Рекомендую!",
    date: "2025-03-07"
  },
  {
    author: "Елена Козлова",
    rating: 4,
    text: "Хороший выбор цветов, быстрая доставка. Единственное - хотелось бы больше вариантов упаковки. В целом довольна заказом.",
    date: "2025-02-28"
  },
  {
    author: "Дмитрий Волков",
    rating: 5,
    text: "Заказывал композицию в коробке на юбилей коллеги. Получилось очень стильно и элегантно. Цены адекватные, качество отличное.",
    date: "2025-02-25"
  },
  {
    author: "Ольга Морозова",
    rating: 5,
    text: "Спасибо за прекрасные тюльпаны! Заказывала на 8 марта для дочери, она была счастлива. Цветы держались очень долго.",
    date: "2025-02-20"
  },
  {
    author: "Александр Новиков",
    rating: 4,
    text: "Хорошая флористика, вежливые курьеры. Заказ выполнили качественно, но немного задержали доставку. В остальном все отлично.",
    date: "2025-02-15"
  }
];

const Reviews: React.FC = () => {
  const averageRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-white">
      {/* Reviews Structured Data */}
      <ReviewsStructuredData 
        reviews={reviewsData}
        businessName="Belka Flowers"
        businessUrl="https://flowers-belka.ru"
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center mr-4">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold text-gray-900 mr-2">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              из 5 ({reviewsData.length} отзывов)
            </span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы ценим каждого клиента и стремимся превзойти ваши ожидания. 
            Читайте отзывы о нашей работе и убедитесь в качестве наших услуг.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.author}</h3>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              
              <div className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Поделитесь своим опытом!
            </h3>
            <p className="text-gray-600 mb-6">
              Ваше мнение важно для нас. Оставьте отзыв о нашей работе и помогите другим клиентам сделать правильный выбор.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/79037349844"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Написать отзыв
              </a>
              <a
                href="tel:+79037349844"
                className="inline-flex items-center px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl hover:bg-pink-50 transition-colors font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
