'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();

  // Данные для выпадающих меню
  const menuData = {
    collections: [
      { name: 'Букеты цветов', href: '/bukety_tsvetov', description: 'Свежие букеты на любой случай' },
      { name: 'Розы', href: '/rozy', description: 'Классические и экзотические розы' },
      { name: 'Тюльпаны', href: '/tulpany', description: 'Весенние тюльпаны разных сортов' },
      { name: 'Цветы в коробке', href: '/tsvety_v_korobke', description: 'Стильные композиции в коробках' },
      { name: 'Пионы', href: '/piony', description: 'Роскошные пионы' },
      { name: 'Сухоцветы', href: '/sukhotsvety', description: 'Долговечные сухие композиции' },
    ],
    recipients: [
      { name: 'Девушке', href: '/bukety_tsvetov?filter=devushke' },
      { name: 'Девочке', href: '/bukety_tsvetov?filter=devochke' },
      { name: 'Маме', href: '/bukety_tsvetov?filter=mame' },
      { name: 'Любимой', href: '/bukety_tsvetov?filter=lyubimoy' },
      { name: 'Мужчине', href: '/bukety_tsvetov?filter=muzhchine' },
      { name: 'Учителю', href: '/bukety_tsvetov?filter=uchitelyu' },
    ],
    occasions: [
      { name: 'День рождения', href: '/bukety_tsvetov?filter=den_rozhdeniya' },
      { name: 'День матери', href: '/bukety_tsvetov?filter=den_materi' },
      { name: '8 марта', href: '/bukety_tsvetov?filter=8_marta' },
      { name: '14 февраля', href: '/bukety_tsvetov?filter=14_fevralya' },
      { name: 'Роскошный', href: '/bukety_tsvetov?filter=roskoshnyy' },
      { name: 'Нежный', href: '/bukety_tsvetov?filter=nezhnyy' },
      { name: 'Элегантный', href: '/bukety_tsvetov?filter=elegantnyy' },
      { name: 'Романтика', href: '/bukety_tsvetov?filter=romantika' },
    ]
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-slate-700 text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <span className="text-slate-300">Путилково</span>
              <span className="text-green-400">Интернет-магазин &ldquo;Белка флауэрс&rdquo; работает ежедневно 10:00 - 22:00 / Доставка курьером</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://api.whatsapp.com/send?phone=79037349844"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-green-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a href="tel:+79037349844" className="text-white font-medium hover:text-green-400 transition-colors">
                +7 (903) 734-98-44
              </a>
              {/* Cart Icon - moved here */}
              <Link
                href="/korzina"
                className="relative p-2 text-slate-300 hover:text-orange-500 transition-all duration-300 hover:scale-110"
                title="Корзина"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {/* Счетчик товаров в корзине */}
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-8">
              <div className="text-2xl font-bold whitespace-nowrap">
                <span className="text-orange-500">belka</span>
                <span className="text-orange-600">flowers</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
              {/* Коллекции - с мега-меню */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'collections' ? null : 'collections')}
                  className="btn-modern group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 shadow-modern-hover hover:scale-105 relative overflow-hidden"
                >
                  {/* Фоновый эффект */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-xl"></div>

                  <div className="relative flex items-center space-x-3">
                    <div className="p-1 rounded-lg bg-orange-100 group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-base">Коллекции</span>
                    <svg className={`w-4 h-4 transition-all duration-300 ${activeDropdown === 'collections' ? 'rotate-180' : ''} group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Мега-меню для коллекций с glassmorphism */}
                {activeDropdown === 'collections' && (
                  <div className="absolute top-full left-0 pt-2 w-[500px] z-50">
                    {/* Невидимый мостик для плавного перехода курсора */}
                    <div className="h-2 w-full"></div>
                    <div className="glass-effect rounded-2xl shadow-modern overflow-hidden dropdown-enter">
                      {/* Градиентный фон */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/90 to-pink-50/80"></div>

                    <div className="relative p-8">
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-3"></span>
                          Наши коллекции
                        </h3>
                        <p className="text-sm text-gray-600">Выберите идеальные цветы для любого случая</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {menuData.collections.map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="menu-item-enter group relative p-4 rounded-xl bg-white/60 hover:bg-white/80 border border-white/30 hover:border-orange-200/50 transition-all duration-300 glass-hover backdrop-blur-sm"
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                          >
                            {/* Минималистичные иконки */}
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors duration-300 mt-1">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-600 leading-relaxed">
                                  {item.description}
                                </div>
                              </div>
                            </div>

                            {/* Hover эффект */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 to-pink-400/0 group-hover:from-orange-400/5 group-hover:to-pink-400/5 rounded-xl transition-all duration-300"></div>
                          </Link>
                        ))}
                      </div>

                      {/* Нижний блок с дополнительной информацией */}
                      <div className="mt-6 pt-6 border-t border-white/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">🌸 Свежие цветы каждый день</span>
                          <span className="text-orange-600 font-medium">Доставка от 2 часов</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Кому - с выпадающим меню */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('recipients')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'recipients' ? null : 'recipients')}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:scale-105 relative overflow-hidden"
                >
                  {/* Фоновый эффект */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-xl"></div>

                  <div className="relative flex items-center space-x-3">
                    <div className="p-1 rounded-lg bg-blue-100 group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-base">Кому</span>
                    <svg className={`w-4 h-4 transition-all duration-300 ${activeDropdown === 'recipients' ? 'rotate-180' : ''} group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {activeDropdown === 'recipients' && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50">
                    {/* Невидимый мостик для плавного перехода курсора */}
                    <div className="h-2 w-full"></div>
                    <div className="glass-effect rounded-2xl shadow-modern overflow-hidden dropdown-enter">
                      {/* Градиентный фон */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80"></div>

                    <div className="relative p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                          Кому дарим?
                        </h3>
                        <p className="text-sm text-gray-600">Подберите цветы для особенного человека</p>
                      </div>

                      <div className="space-y-1">
                        {menuData.recipients.map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center px-4 py-3 rounded-xl bg-white/60 hover:bg-white/80 border border-white/30 hover:border-blue-200/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                            style={{
                              animationDelay: `${index * 30}ms`
                            }}
                          >
                            {/* Минималистичные иконки */}
                            <div className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>

                            <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                              {item.name}
                            </span>

                            {/* Стрелочка */}
                            <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                )}
              </div>

              {/* Повод - с выпадающим меню */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('occasions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'occasions' ? null : 'occasions')}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-500 hover:shadow-lg hover:scale-105 relative overflow-hidden"
                >
                  {/* Фоновый эффект */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-yellow-500/0 group-hover:from-green-500/10 group-hover:to-yellow-500/10 transition-all duration-300 rounded-xl"></div>

                  <div className="relative flex items-center space-x-3">
                    <div className="p-1 rounded-lg bg-green-100 group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-base">Повод</span>
                    <svg className={`w-4 h-4 transition-all duration-300 ${activeDropdown === 'occasions' ? 'rotate-180' : ''} group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {activeDropdown === 'occasions' && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50">
                    {/* Невидимый мостик для плавного перехода курсора */}
                    <div className="h-2 w-full"></div>
                    <div className="glass-effect rounded-2xl shadow-modern overflow-hidden dropdown-enter">
                      {/* Градиентный фон */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/90 to-yellow-50/80"></div>

                    <div className="relative p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full mr-3"></span>
                          По какому поводу?
                        </h3>
                        <p className="text-sm text-gray-600">Цветы для особенных моментов жизни</p>
                      </div>

                      <div className="space-y-1">
                        {menuData.occasions.map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center px-4 py-3 rounded-xl bg-white/60 hover:bg-white/80 border border-white/30 hover:border-green-200/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                            style={{
                              animationDelay: `${index * 30}ms`
                            }}
                          >
                            {/* Минималистичные иконки */}
                            <div className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-500 transition-colors duration-300">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>

                            <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                              {item.name}
                            </span>

                            {/* Стрелочка */}
                            <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                )}
              </div>

              {/* Простые ссылки без выпадающих меню */}
              <Link href="/novosti" className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:scale-105 relative overflow-hidden">
                {/* Фоновый эффект */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-xl"></div>

                <div className="relative flex items-center space-x-3">
                  <div className="p-1 rounded-lg bg-indigo-100 group-hover:bg-white/20 transition-all duration-300">
                    <svg className="w-5 h-5 text-indigo-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <span className="text-base">Новости</span>
                </div>
              </Link>

              <Link href="/dostavka" className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:scale-105 relative overflow-hidden">
                {/* Фоновый эффект */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300 rounded-xl"></div>

                <div className="relative flex items-center space-x-3">
                  <div className="p-1 rounded-lg bg-emerald-100 group-hover:bg-white/20 transition-all duration-300">
                    <svg className="w-5 h-5 text-emerald-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-base">Доставка</span>
                </div>
              </Link>
            </nav>

            {/* Right side - Search only */}
            <div className="hidden md:flex items-center">
              {/* Search Field */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Поиск цветов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-400"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {/* Коллекции - с выпадающим меню */}
                <div>
                  <button
                    onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'collections' ? null : 'collections')}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Коллекции</span>
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'collections' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMobileDropdown === 'collections' && (
                    <div className="ml-6 mt-2 space-y-2">
                      {menuData.collections.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveMobileDropdown(null);
                          }}
                          className="block py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Кому - с выпадающим меню */}
                <div>
                  <button
                    onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'recipients' ? null : 'recipients')}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Кому</span>
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'recipients' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMobileDropdown === 'recipients' && (
                    <div className="ml-6 mt-2 space-y-2">
                      {menuData.recipients.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveMobileDropdown(null);
                          }}
                          className="block py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Повод - с выпадающим меню */}
                <div>
                  <button
                    onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'occasions' ? null : 'occasions')}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Повод</span>
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'occasions' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMobileDropdown === 'occasions' && (
                    <div className="ml-6 mt-2 space-y-2">
                      {menuData.occasions.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveMobileDropdown(null);
                          }}
                          className="block py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Простые ссылки */}
                <Link href="/novosti" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors font-medium py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Новости</span>
                </Link>
                <Link href="/dostavka" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors font-medium py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Доставка</span>
                </Link>

                <div className="pt-4 border-t space-y-3">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors w-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Поиск</span>
                  </button>

                  <Link
                    href="/korzina"
                    className="relative inline-flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    title="Корзина"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M17 13v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    {/* Счетчик товаров в корзине для мобильной версии */}
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>

                  <div className="pt-2">
                    <a href="tel:+79037349844" className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors">
                      +7 (903) 734-98-44
                    </a>
                    <div className="text-sm text-gray-500">Ежедневно 10:00-22:00</div>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
