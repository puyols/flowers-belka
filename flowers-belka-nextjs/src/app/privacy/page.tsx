import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности - Belka Flowers",
  description: "Политика конфиденциальности интернет-магазина Belka Flowers. Информация о сборе и обработке персональных данных.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Главная
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Политика конфиденциальности</span>
        </nav>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Политика конфиденциальности
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Общие положения
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности)
                действует в отношении всей информации, которую интернет-магазин &ldquo;Belka Flowers&rdquo; может
                получить о Пользователе во время использования сайта flowers-belka.ru.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Какую информацию мы собираем
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                При оформлении заказа мы можем запросить следующую информацию:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Имя и фамилию получателя</li>
                <li>Контактный телефон</li>
                <li>Адрес доставки</li>
                <li>Адрес электронной почты (при необходимости)</li>
                <li>Комментарии к заказу</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Также мы автоматически получаем некоторые виды информации при посещении сайта: IP-адрес,
                данные cookies, информация о браузере, время доступа и адреса запрашиваемых страниц.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Цели обработки персональных данных
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы используем ваши персональные данные для:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Обработки и выполнения ваших заказов</li>
                <li>Связи с вами по вопросам заказа</li>
                <li>Доставки цветов по указанному адресу</li>
                <li>Информирования о статусе заказа</li>
                <li>Улучшения качества обслуживания</li>
                <li>Отправки информационных сообщений (только с вашего согласия)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Защита персональных данных
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы принимаем необходимые организационные и технические меры для защиты персональных данных
                от несанкционированного или случайного доступа, уничтожения, изменения, блокирования,
                копирования, распространения, а также от иных неправомерных действий.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Доступ к персональным данным имеют только уполномоченные сотрудники, которые обязаны
                соблюдать конфиденциальность.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Передача данных третьим лицам
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Передачи курьерской службе для доставки заказа</li>
                <li>Если это требуется по закону или по решению суда</li>
                <li>С вашего явного согласия</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Использование cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Наш сайт использует cookies для улучшения работы сайта и персонализации пользовательского опыта.
                Cookies – это небольшие текстовые файлы, которые сохраняются на вашем устройстве.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Вы можете настроить ваш браузер для отклонения cookies или уведомления об их отправке.
                Однако это может повлиять на функциональность сайта.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Ваши права
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Вы имеете право:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Получать информацию о хранящихся у нас персональных данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
                <li>Ограничить обработку персональных данных</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Для реализации ваших прав свяжитесь с нами по телефону{' '}
                <a href="tel:+79037349844" className="text-orange-500 hover:text-orange-600 font-medium">
                  +7 (903) 734-98-44
                </a>{' '}
                или email{' '}
                <a href="mailto:info@belka-flowers.ru" className="text-orange-500 hover:text-orange-600 font-medium">
                  info@belka-flowers.ru
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Срок хранения данных
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Мы храним ваши персональные данные не дольше, чем это необходимо для целей, указанных в данной
                Политике, если иное не предусмотрено законодательством. После завершения обработки персональные
                данные уничтожаются или обезличиваются.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Изменения в Политике конфиденциальности
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.
                Все изменения вступают в силу с момента их публикации на сайте. Рекомендуем периодически
                проверять данную страницу для ознакомления с изменениями.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Контактная информация
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>Интернет-магазин &ldquo;Belka Flowers&rdquo;</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  Адрес: 143441, Московская область, Красногорский район, д. Путилково
                </p>
                <p className="text-gray-700 mb-2">
                  Телефон:{' '}
                  <a href="tel:+79037349844" className="text-orange-500 hover:text-orange-600 font-medium">
                    +7 (903) 734-98-44
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  Email:{' '}
                  <a href="mailto:info@belka-flowers.ru" className="text-orange-500 hover:text-orange-600 font-medium">
                    info@belka-flowers.ru
                  </a>
                </p>
                <p className="text-gray-700">
                  WhatsApp:{' '}
                  <a
                    href="https://api.whatsapp.com/send?phone=79037349844"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    +7 (903) 734-98-44
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
