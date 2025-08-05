// Утилиты для генерации SEO данных

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  availability?: string;
  brand?: string;
  category?: string;
  canonical?: string;
}

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string;
  areaServed: string[];
  serviceType: string[];
}

// Базовые данные организации
export const getOrganizationData = (): OrganizationData => ({
  name: "Belka Flowers",
  url: "https://flowers-belka.ru",
  logo: "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
  description: "Доставка свежих цветов и букетов в Путилково и Москве. Розы, тюльпаны, композиции в коробках. Быстрая доставка, свежие цветы, доступные цены.",
  telephone: "+7 (903) 734-98-44",
  email: "info@belka-flowers.ru",
  address: {
    streetAddress: "143441, МО, Красногорский район, д. Путилково",
    addressLocality: "Путилково",
    addressRegion: "Московская область",
    postalCode: "143441",
    addressCountry: "RU"
  },
  geo: {
    latitude: 55.8094,
    longitude: 37.0781
  },
  openingHours: [
    "Mo-Su 10:00-22:00"
  ],
  priceRange: "₽₽",
  paymentAccepted: ["Наличные", "Банковская карта", "Онлайн оплата"],
  currenciesAccepted: "RUB",
  areaServed: ["Путилково", "Москва", "Химки", "Красногорск", "Куркино", "Митино", "Тушино"],
  serviceType: ["Доставка цветов", "Флористические услуги", "Букеты на заказ", "Цветочные композиции"]
});

// Генерация SEO данных для главной страницы
export const getHomeSEO = (): SEOData => ({
  title: "Доставка цветов в Путилково - Belka Flowers | Свежие букеты и розы",
  description: "🌸 Доставка свежих цветов в Путилково и Москве. Букеты роз, тюльпаны, композиции в коробках. ⚡ Быстрая доставка за 2 часа. 💰 Доступные цены. ☎️ +7 (903) 734-98-44",
  keywords: "доставка цветов Путилково, букеты Путилково, розы доставка, цветы Москва, флористика, свежие цветы, букет на заказ",
  image: "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
  url: "https://flowers-belka.ru",
  type: "website"
});

// Генерация SEO данных для категорий
export const getCategorySEO = (category: string): SEOData => {
  const categoryData: Record<string, Partial<SEOData>> = {
    'bukety_tsvetov': {
      title: "Букеты цветов с доставкой в Путилково | Belka Flowers",
      description: "🌺 Красивые букеты цветов с доставкой в Путилково. Свежие композиции из роз, тюльпанов, хризантем. ⚡ Доставка за 2 часа. 💰 От 1500₽. ☎️ +7 (903) 734-98-44",
      keywords: "букеты цветов Путилково, букет доставка, цветочные композиции, свежие букеты",
      section: "Букеты цветов"
    },
    'rozy': {
      title: "Розы с доставкой в Путилково | Букеты роз | Belka Flowers",
      description: "🌹 Свежие розы с доставкой в Путилково. Красные, белые, розовые розы. Букеты из 15, 25, 51 розы. ⚡ Быстрая доставка. 💰 Лучшие цены. ☎️ +7 (903) 734-98-44",
      keywords: "розы Путилково, букет роз доставка, красные розы, белые розы, розовые розы",
      section: "Розы"
    },
    'tulpany': {
      title: "Тюльпаны с доставкой в Путилково | Букеты тюльпанов | Belka Flowers",
      description: "🌷 Свежие тюльпаны с доставкой в Путилково. Разноцветные букеты тюльпанов к 8 марта и другим праздникам. ⚡ Доставка за 2 часа. ☎️ +7 (903) 734-98-44",
      keywords: "тюльпаны Путилково, букет тюльпанов доставка, тюльпаны 8 марта, весенние цветы",
      section: "Тюльпаны"
    },
    'tsvety_v_korobke': {
      title: "Цветы в коробке с доставкой в Путилково | Композиции | Belka Flowers",
      description: "🎁 Элегантные цветочные композиции в коробках с доставкой в Путилково. Розы, пионы, смешанные букеты в стильных коробках. ⚡ Доставка за 2 часа. ☎️ +7 (903) 734-98-44",
      keywords: "цветы в коробке Путилково, композиции в коробке, цветочные коробки, подарочные букеты",
      section: "Цветы в коробке"
    }
  };

  const baseData = categoryData[category] || {};
  
  return {
    title: baseData.title || `${category} - Belka Flowers`,
    description: baseData.description || `Каталог ${category} с доставкой в Путилково`,
    keywords: baseData.keywords || `${category}, доставка цветов Путилково`,
    image: "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
    url: `https://flowers-belka.ru/${category}`,
    type: "website",
    section: baseData.section || category,
    ...baseData
  };
};

// Генерация SEO данных для товаров
export const getProductSEO = (product: any): SEOData => {
  const price = product.price || 0;
  const name = product.name || 'Товар';
  const description = product.description || `${name} с доставкой в Путилково`;
  
  return {
    title: `${name} - купить с доставкой в Путилково | Belka Flowers`,
    description: `${description.substring(0, 150)}... ⚡ Доставка за 2 часа. 💰 Цена ${price}₽. ☎️ +7 (903) 734-98-44`,
    keywords: `${name}, купить ${name.toLowerCase()}, доставка цветов Путилково, ${product.category || 'цветы'}`,
    image: product.image || "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
    url: `https://flowers-belka.ru/${product.category}/${product.slug}`,
    type: "product",
    price: price,
    currency: "RUB",
    availability: "InStock",
    brand: "Belka Flowers",
    category: product.category || "Цветы"
  };
};

// Генерация SEO данных для статей
export const getArticleSEO = (article: any): SEOData => {
  return {
    title: `${article.title} | Блог Belka Flowers`,
    description: article.excerpt || article.description || `${article.title} - читайте в блоге Belka Flowers`,
    keywords: `${article.title}, цветы, флористика, советы по уходу за цветами, Belka Flowers`,
    image: article.image || "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
    url: `https://flowers-belka.ru/novosti/${article.slug}`,
    type: "article",
    author: article.author || "Belka Flowers",
    publishedTime: article.publishedAt || new Date().toISOString(),
    modifiedTime: article.updatedAt || article.publishedAt || new Date().toISOString(),
    section: "Блог",
    tags: article.tags || ["цветы", "флористика"]
  };
};

// Генерация SEO данных для страницы новостей
export const getNewsSEO = (): SEOData => ({
  title: "Новости и статьи о цветах | Блог Belka Flowers",
  description: "📰 Читайте новости и полезные статьи о цветах, флористике и уходе за букетами. Советы от профессиональных флористов Belka Flowers. 🌸 Все о мире цветов!",
  keywords: "новости о цветах, блог флориста, советы по уходу за цветами, флористика, Belka Flowers",
  image: "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
  url: "https://flowers-belka.ru/novosti",
  type: "website",
  section: "Новости"
});

// Генерация SEO данных для страницы доставки
export const getDeliverySEO = (): SEOData => ({
  title: "Доставка цветов в Путилково и Москве | Условия доставки | Belka Flowers",
  description: "🚚 Быстрая доставка цветов в Путилково, Москве, Химках, Красногорске. ⏰ Доставка за 2 часа. 💰 От 200₽. Работаем ежедневно 10:00-22:00. ☎️ +7 (903) 734-98-44",
  keywords: "доставка цветов Путилково, доставка Москва, курьерская доставка, быстрая доставка цветов",
  image: "https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png",
  url: "https://flowers-belka.ru/dostavka",
  type: "website",
  section: "Доставка"
});

// Генерация хлебных крошек
export const generateBreadcrumbs = (path: string, productName?: string) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [];

  // Маппинг сегментов на читаемые названия
  const segmentNames: Record<string, string> = {
    'bukety_tsvetov': 'Букеты цветов',
    'rozy': 'Розы',
    'tulpany': 'Тюльпаны',
    'tsvety_v_korobke': 'Цветы в коробке',
    'novosti': 'Новости',
    'dostavka': 'Доставка',
    'korzina': 'Корзина'
  };

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      name: productName && isLast ? productName : (segmentNames[segment] || segment),
      url: currentPath,
      current: isLast
    });
  });

  return breadcrumbs;
};

// Утилита для очистки HTML тегов из описания
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

// Утилита для обрезки текста
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};
