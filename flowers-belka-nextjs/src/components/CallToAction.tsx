'use client';

import React from 'react';
import Image from 'next/image';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 relative overflow-hidden">
      {/* Enhanced Background decoration with animations */}
      <div className="absolute inset-0">
        {/* Animated floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-pink-400/20 rounded-full animate-ping"></div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            {/* Enhanced badge with glow effect */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-8 py-4 mb-8 border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 group">
              <span className="w-4 h-4 bg-yellow-400 rounded-full mr-4 animate-pulse shadow-lg"></span>
              <span className="text-white font-semibold text-lg group-hover:scale-105 transition-transform">Доставка по Путилково и соседним районам</span>
            </div>

            {/* Enhanced title with text shadow */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Закажите свежие цветы с доставкой<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                в Путилково и соседние районы
              </span>
            </h2>

            {/* Enhanced description */}
            <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Хотите порадовать близких красивым букетом? Новый сервис доставки цветов предлагает вам
              <span className="font-bold text-yellow-300"> бесплатно оформить заказ</span> и получить
              <span className="font-bold text-yellow-300"> гарантию свежести</span> каждого цветка.
            </p>
          </div>

          {/* Enhanced CTA buttons with modern design */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <a
              href="https://api.whatsapp.com/send?phone=79037349844&text=Здравствуйте! Хочу заказать букет с доставкой в Путилково"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white text-green-600 px-12 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-500 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 flex items-center overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <svg className="w-8 h-8 mr-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="relative z-10">Написать в WhatsApp</span>

              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white/30 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-500"></div>
            </a>

            <a
              href="tel:+79037349844"
              className="group relative bg-white/15 backdrop-blur-md border-2 border-white/40 text-white px-12 py-5 rounded-2xl hover:bg-white/25 hover:border-white/60 transition-all duration-500 font-bold text-xl flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <svg className="w-7 h-7 mr-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="relative z-10">Позвонить</span>
            </a>
          </div>

          {/* Enhanced Steps with animations and icons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
            <div className="group flex flex-col items-center transform hover:scale-105 transition-all duration-500">
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/30 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/40 transition-all duration-500">
                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">1</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300">Напишите нам</h3>
              <p className="text-base text-white/90 text-center leading-relaxed group-hover:text-white transition-colors duration-300">В WhatsApp или оставьте<br />обратный звонок</p>
            </div>

            <div className="group flex flex-col items-center transform hover:scale-105 transition-all duration-500">
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/30 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/40 transition-all duration-500">
                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">2</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300">Выберите букет</h3>
              <p className="text-base text-white/90 text-center leading-relaxed group-hover:text-white transition-colors duration-300">Готовый или уникальную<br />композицию</p>
            </div>

            <div className="group flex flex-col items-center transform hover:scale-105 transition-all duration-500">
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/30 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/40 transition-all duration-500">
                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">3</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300">Укажите адрес</h3>
              <p className="text-base text-white/90 text-center leading-relaxed group-hover:text-white transition-colors duration-300">Адрес доставки и<br />удобное время</p>
            </div>

            <div className="group flex flex-col items-center transform hover:scale-105 transition-all duration-500">
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/30 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/40 transition-all duration-500">
                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">4</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-green-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300">Получите букет</h3>
              <p className="text-base text-white/90 text-center leading-relaxed group-hover:text-white transition-colors duration-300">Свежие цветы в идеальном<br />состоянии!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
