import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products, getHitProducts } from '@/data/products-parsed';
import { getLatestNews } from '@/data/news';

export default function HomePage() {
  const hitProducts = getHitProducts();
  const popularProducts = products.slice(0, 12);
  const latestNews = getLatestNews(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Доставка цветов в Путилково
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Подарите радость близким, даже находясь далеко! Мы поможем вам передать тепло и заботу с помощью красивых, ярких букетов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=79037349844"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Заказать букет в WhatsApp
              </a>
              <Link
                href="/bukety_tsvetov"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold"
              >
                Посмотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярные категории</h2>
            <div className="flex justify-center space-x-8">
              <Link href="/bukety_tsvetov" className="text-green-600 hover:text-green-700 font-semibold border-b-2 border-green-600 pb-2">
                Популярные
              </Link>
              <Link href="/rozy" className="text-gray-600 hover:text-green-600 font-semibold pb-2">
                Розы
              </Link>
              <Link href="/tulpany" className="text-gray-600 hover:text-green-600 font-semibold pb-2">
                Тюльпаны
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/bukety_tsvetov"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Посмотреть все букеты
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как это работает?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите букет</h3>
              <p className="text-gray-600">
                На нашем сайте вы найдете самые свежие и стильные композиции. Мы предлагаем цветы на любой вкус — от классических роз до экзотических сочетаний.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Оформите заказ</h3>
              <p className="text-gray-600">
                Укажите адрес получателя и желаемую дату доставки. Мы учтем все пожелания, чтобы ваш подарок был идеальным.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Доставка в срок</h3>
              <p className="text-gray-600">
                Мы оперативно доставим букет в указанное время, чтобы ваш сюрприз стал приятным моментом для получателя.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нашу доставку цветов?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-2xl">🕐</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Работаем ежедневно с 10 до 22</h3>
              <p className="text-gray-600 text-sm">
                Круглосуточная служба поддержки ответит на вопросы и поможет оформить заявку в удобное для вас время.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Всегда на связи в WhatsApp</h3>
              <p className="text-gray-600 text-sm">
                Мы отправляем в мессенджере отчёты по заказам, в текстовом формате общаемся с клиентами.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Широкий ассортимент</h3>
              <p className="text-gray-600 text-sm">
                В нашем каталоге большое количество букетов на любой вкус, цвет и бюджет.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600 text-sm">
                Перед сборкой букета, флористы проверяют качество цветов, и повторно проверяют качество букета перед отправкой в доставку.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Последние новости</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('ru-RU')} • {article.views} просмотров
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link href={`/novosti/${article.slug}`} className="hover:text-green-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/novosti/${article.slug}`}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/novosti"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Все новости
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
