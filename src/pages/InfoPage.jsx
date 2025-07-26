import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const InfoPage = ({ pageSlug }) => {
  const { pageId } = useParams();
  const currentPageSlug = pageSlug || pageId;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        
        // Загружаем данные страниц
        const response = await fetch('/products_full.json');
        const data = await response.json();
        
        // Ищем страницу по slug или создаем стандартную
        let foundPage = null;
        
        if (data.pages) {
          foundPage = data.pages.find(p => 
            generateSlug(p.title) === currentPageSlug ||
            p.information_id === parseInt(currentPageSlug)
          );
        }
        
        // Если не найдена в данных, создаем стандартную страницу
        if (!foundPage) {
          foundPage = createStandardPage(currentPageSlug);
        }
        
        setPage(foundPage);
      } catch (err) {
        console.error('Ошибка загрузки страницы:', err);
        setError('Ошибка загрузки страницы');
      } finally {
        setLoading(false);
      }
    };

    if (currentPageSlug) {
      loadPage();
    }
  }, [currentPageSlug]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const createStandardPage = (slug) => {
    const standardPages = {
      'o_nas': {
        title: 'О нас',
        description: `
          <h2>Добро пожаловать в Flowers Belka!</h2>
          <p>Мы - команда профессионалов, которая уже много лет создает прекрасные цветочные композиции для наших клиентов.</p>
          <p>Наша миссия - дарить радость и красоту через цветы. Мы тщательно отбираем только самые свежие и качественные цветы от лучших поставщиков.</p>
          <h3>Почему выбирают нас:</h3>
          <ul>
            <li>Свежие цветы высочайшего качества</li>
            <li>Быстрая доставка по Москве и области</li>
            <li>Индивидуальный подход к каждому заказу</li>
            <li>Опытные флористы с многолетним стажем</li>
            <li>Доступные цены без переплат</li>
          </ul>
        `,
        meta_title: 'О нас - Flowers Belka',
        meta_description: 'Узнайте больше о нашей команде и подходе к созданию цветочных композиций'
      },
      'dostavka': {
        title: 'Доставка',
        description: `
          <h2>Доставка цветов по Москве и области</h2>
          <p>Мы осуществляем быструю и надежную доставку цветов в любую точку Москвы и Московской области.</p>
          
          <h3>Условия доставки:</h3>
          <ul>
            <li><strong>По Москве в пределах МКАД:</strong> 500 рублей</li>
            <li><strong>За МКАД до 10 км:</strong> 700 рублей</li>
            <li><strong>За МКАД свыше 10 км:</strong> 1000 рублей</li>
            <li><strong>Бесплатная доставка:</strong> при заказе от 5000 рублей в пределах МКАД</li>
          </ul>
          
          <h3>Время доставки:</h3>
          <p>Стандартная доставка: 2-4 часа с момента подтверждения заказа</p>
          <p>Срочная доставка: 1-2 часа (доплата 500 рублей)</p>
          
          <h3>График работы:</h3>
          <p>Принимаем заказы: круглосуточно</p>
          <p>Доставка: ежедневно с 8:00 до 22:00</p>
        `,
        meta_title: 'Доставка цветов - Flowers Belka',
        meta_description: 'Быстрая доставка цветов по Москве и области. Условия и стоимость доставки.'
      },
      'pravila_i_usloviya': {
        title: 'Правила и условия',
        description: `
          <h2>Правила и условия обслуживания</h2>
          
          <h3>Общие положения</h3>
          <p>Настоящие правила регулируют отношения между интернет-магазином Flowers Belka и покупателями.</p>
          
          <h3>Оформление заказа</h3>
          <ul>
            <li>Заказ считается принятым после подтверждения менеджером</li>
            <li>Все цены указаны в рублях и включают НДС</li>
            <li>Мы оставляем за собой право изменять цены без предварительного уведомления</li>
          </ul>
          
          <h3>Оплата</h3>
          <ul>
            <li>Наличными курьеру при получении</li>
            <li>Банковской картой онлайн</li>
            <li>Банковским переводом для юридических лиц</li>
          </ul>
          
          <h3>Возврат и обмен</h3>
          <p>В случае получения товара ненадлежащего качества, мы гарантируем замену или возврат денежных средств.</p>
          
          <h3>Контактная информация</h3>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Email: info@flowers-belka.ru</p>
        `,
        meta_title: 'Правила и условия - Flowers Belka',
        meta_description: 'Правила оформления заказов, доставки и возврата товаров в интернет-магазине Flowers Belka'
      },
      'contact': {
        title: 'Контакты',
        description: `
          <h2>Контактная информация</h2>
          
          <div style="margin: 20px 0;">
            <h3>Телефоны:</h3>
            <p><strong>Основной:</strong> +7 (495) 123-45-67</p>
            <p><strong>WhatsApp:</strong> +7 (495) 123-45-67</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Email:</h3>
            <p>info@flowers-belka.ru</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Режим работы:</h3>
            <p>Прием заказов: круглосуточно</p>
            <p>Доставка: ежедневно с 8:00 до 22:00</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Адрес:</h3>
            <p>г. Москва, ул. Цветочная, д. 1</p>
          </div>
        `,
        meta_title: 'Контакты - Flowers Belka',
        meta_description: 'Контактная информация интернет-магазина Flowers Belka. Телефоны, адрес, режим работы.'
      }
    };

    return standardPages[slug] || {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не найдена.',
      meta_title: 'Страница не найдена',
      meta_description: ''
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-secondary">Загружаем страницу...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Icon name="AlertCircle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              {error || 'Страница не найдена'}
            </h1>
            <p className="text-text-secondary mb-8">
              Запрашиваемая страница не существует или была удалена.
            </p>
            <Button
              variant="primary"
              onClick={() => window.history.back()}
            >
              Вернуться назад
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Хлебные крошки */}
      <div className="bg-surface py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-text-secondary hover:text-accent">
              Главная
            </a>
            <Icon name="ChevronRight" className="h-4 w-4 text-text-secondary" />
            <span className="text-text-primary">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {page.title}
            </h1>
            {page.meta_description && (
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                {page.meta_description}
              </p>
            )}
          </div>

          {/* Контент страницы */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-text-primary leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: page.description || 'Содержимое страницы отсутствует.' 
              }}
            />
          </div>

          {/* Кнопка возврата */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Вернуться назад
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
