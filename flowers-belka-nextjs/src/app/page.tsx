'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomOrderForm from '../components/CustomOrderForm';
import CustomOrderSection from '../components/CustomOrderSection';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Reviews from '../components/Reviews';
import StructuredData from '../components/StructuredData';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { updatedProducts, getHitProducts, getProductsByCategory } from '../data/products-updated';
import { getLatestNews } from '../data/news';
import { getHomeSEO, getOrganizationData } from '../utils/seo';

export default function HomePage() {
  const hitProducts = getHitProducts().slice(0, 8);
  const popularProducts = updatedProducts
    .sort((a, b) => {
      // Извлекаем числа из названий букетов
      const getNumber = (name: string) => {
        const match = name.match(/(\d+)$/); // Ищем цифры в конце строки
        return match ? parseInt(match[1]) : 0;
      };

      const numA = getNumber(a.name);
      const numB = getNumber(b.name);

      return numB - numA; // Сортировка от большего номера к меньшему
    })
    .slice(0, 12);
  const latestNews = getLatestNews(3);
  const organizationData = getOrganizationData();
  const seoData = getHomeSEO();

  // Structured Data для товаров на главной странице
  const productListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Популярные букеты цветов",
    "description": "Самые популярные букеты и композиции с доставкой в Путилково",
    "numberOfItems": popularProducts.length,
    "itemListElement": popularProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "url": `https://flowers-belka.ru/${product.category}/${product.slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Belka Flowers"
          }
        }
      }
    }))
  };

  return (
    <div className="min-h-screen">
      {/* SEO Head */}
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        url={seoData.url}
        type={seoData.type}
        canonical={seoData.url}
      />

      {/* Structured Data для списка товаров */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productListData)
        }}
      />

      {/* Хлебные крошки (скрытые на главной странице, но нужны для SEO) */}
      <div className="sr-only">
        <Breadcrumbs items={[{ name: 'Главная', url: '/', current: true }]} />
      </div>

      {/* Modern Hero Section */}
      <HeroSection />

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

      {/* Gift Joy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Image
                  src="https://flowers-belka.ru/image/catalog/image_fx_.jpg"
                  alt="Белочка с букетом цветов"
                  width={400}
                  height={300}
                  className="mb-4 rounded-lg"
                  quality={100}
                  priority
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <strong>Подарите радость близким, даже находясь далеко!</strong>
              </h2>
              <p className="text-gray-600 mb-6">
                Хотите порадовать любимого человека или друга, но находитесь далеко? Не беда! Мы поможем вам передать тепло и заботу с помощью красивых, ярких букетов, которые подчеркнут ваши чувства и оставят самые приятные впечатления. Наши флористы тщательно подбирают оттенки и сочетания, чтобы каждый букет был уникальным и подходил к любому поводу — будь то день рождения, годовщина или просто знак внимания.
              </p>
              <p className="text-gray-900 font-semibold mb-4">Как это работает?</p>
              <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                <li>
                  <strong>Выберите букет</strong>: На нашем сайте вы найдете самые свежие и стильные композиции. Мы предлагаем цветы на любой вкус — от классических роз до экзотических сочетаний.
                </li>
                <li>
                  <strong>Оформите заказ</strong>: Укажите адрес получателя и желаемую дату доставки. Мы учтем все пожелания, чтобы ваш подарок был идеальным.
                </li>
                <li>
                  <strong>Доставка в срок</strong>: Мы оперативно доставим букет в указанное время, чтобы ваш сюрприз стал приятным моментом для получателя.
                </li>
              </ol>
            </div>
            <div>
              {/* Yandex Maps Reviews Widget */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Цветочная мастерская Belka-Flowers</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-3xl font-bold text-gray-900 mr-2">4,5</span>
                      <div className="flex text-yellow-400">
                        {'★★★★☆'.split('').map((star, i) => (
                          <span key={i} className="text-lg">{star}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">22 отзыва • 31 оценка</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">Яндекс Карты</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="border-b pb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        A
                      </div>
                      <div>
                        <span className="font-semibold">areshek1</span>
                        <div className="text-gray-500 text-xs">11 ноября 2021</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2 text-sm">{'★★★★★'}</div>
                    <p className="text-gray-600">Прекрасная работа коллектива, отличный букет свежих цветов за считанные минуты был доставлен по адресу. Рекомендую данную цветочную мастерскую всем. Оценка 5+.</p>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        А
                      </div>
                      <div>
                        <span className="font-semibold">Анна Иванова</span>
                        <div className="text-gray-500 text-xs">25 апреля 2022</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2 text-sm">{'★★★★★'}</div>
                    <p className="text-gray-600">Люблю этот магазин за красивые, интересные по цвету и составу букеты! Всегда готовы подбрать, посоветовать, как я поняла, по телефону берет трубку сам хозяин, что большая редкость в наше время! Желаю побольше позитивных клиентов!</p>
                  </div>

                  <div className="pb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        А
                      </div>
                      <div>
                        <span className="font-semibold">Андрей Плакунов</span>
                        <div className="text-gray-500 text-xs">25 января 2022</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2 text-sm">{'★★★★★'}</div>
                    <p className="text-gray-600">Отличная цветочная мастерская! Красивые букеты, свежие цветы, приятные цены. Рекомендую!</p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                    Оставить отзыв
                  </button>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="https://yandex.ru/maps/org/tsvetochnaya_masterskaya_belka_flowers/4005765345/reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Больше отзывов на Яндекс Картах
                  </a>
                </div>

                <div className="text-xs text-gray-500 mt-4 text-center">
                  Цветочная мастерская Belka-Flowers на карте Москвы и Московской области — Яндекс Карты
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Reviews Section */}
      <Reviews />

      {/* Custom Order Section */}
      <CustomOrderSection />

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
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
}
