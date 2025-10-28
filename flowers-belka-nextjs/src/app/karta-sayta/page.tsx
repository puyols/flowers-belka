import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Карта сайта - Belka Flowers",
  description: "Карта сайта интернет-магазина Belka Flowers. Все разделы и страницы для удобной навигации.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  const sitemapData = [
    {
      title: "Главная",
      links: [
        { name: "Главная страница", href: "/" },
      ],
    },
    {
      title: "Каталог",
      links: [
        { name: "Букеты цветов", href: "/bukety_tsvetov", description: "Свежие букеты на любой случай" },
        { name: "Розы", href: "/rozy", description: "Классические и экзотические розы" },
        { name: "Тюльпаны", href: "/tulpany", description: "Весенние тюльпаны разных сортов" },
        { name: "Пионы", href: "/piony", description: "Роскошные пионы" },
        { name: "Цветы в коробке", href: "/tsvety_v_korobke", description: "Стильные композиции в коробках" },
        { name: "Сухоцветы", href: "/sukhotsvety", description: "Долговечные сухие композиции" },
      ],
    },
    {
      title: "Кому дарим",
      links: [
        { name: "Девушке", href: "/bukety_tsvetov?filter=devushke" },
        { name: "Девочке", href: "/bukety_tsvetov?filter=devochke" },
        { name: "Маме", href: "/bukety_tsvetov?filter=mame" },
        { name: "Любимой", href: "/bukety_tsvetov?filter=lyubimoy" },
        { name: "Мужчине", href: "/bukety_tsvetov?filter=muzhchine" },
        { name: "Учителю", href: "/bukety_tsvetov?filter=uchitelyu" },
      ],
    },
    {
      title: "По поводу",
      links: [
        { name: "День рождения", href: "/bukety_tsvetov?filter=den_rozhdeniya" },
        { name: "День матери", href: "/bukety_tsvetov?filter=den_materi" },
        { name: "8 марта", href: "/bukety_tsvetov?filter=8_marta" },
        { name: "14 февраля", href: "/bukety_tsvetov?filter=14_fevralya" },
        { name: "Роскошный", href: "/bukety_tsvetov?filter=roskoshnyy" },
        { name: "Нежный", href: "/bukety_tsvetov?filter=nezhnyy" },
        { name: "Элегантный", href: "/bukety_tsvetov?filter=elegantnyy" },
        { name: "Романтика", href: "/bukety_tsvetov?filter=romantika" },
      ],
    },
    {
      title: "Информация",
      links: [
        { name: "Доставка", href: "/dostavka", description: "Условия и зоны доставки" },
        { name: "Новости", href: "/novosti", description: "Статьи и новости о цветах" },
        { name: "Политика конфиденциальности", href: "/privacy" },
        { name: "Карта сайта", href: "/karta-sayta" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { name: "Телефон: +7 (903) 734-98-44", href: "tel:+79037349844", external: true },
        { name: "WhatsApp", href: "https://api.whatsapp.com/send?phone=79037349844", external: true },
        { name: "Email: info@belka-flowers.ru", href: "mailto:info@belka-flowers.ru", external: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Главная
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Карта сайта</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Карта сайта
          </h1>
          <p className="text-gray-600 text-lg">
            Все разделы и страницы нашего интернет-магазина для удобной навигации
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapData.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group block"
                    >
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <div className="flex-1">
                          <div className="text-gray-700 group-hover:text-orange-500 transition-colors font-medium">
                            {link.name}
                          </div>
                          {link.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {link.description}
                            </div>
                          )}
                        </div>
                        {link.external && (
                          <svg
                            className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Не нашли что искали?
            </h3>
            <p className="text-gray-700 mb-6">
              Свяжитесь с нами любым удобным способом, и мы поможем вам выбрать идеальный букет!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+79037349844"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Позвонить
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=79037349844"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
