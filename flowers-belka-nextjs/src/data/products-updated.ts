import { Product } from '../types';

// ОБНОВЛЕННЫЕ ДАННЫЕ ТОВАРОВ на основе реального сайта flowers-belka.ru
// Дата обновления: 05.08.2025

export const updatedProducts: Product[] = [
  // ХИТ ПРОДАЖ - ПРИОРИТЕТНЫЕ ТОВАРЫ
  {
    id: '055',
    name: 'Букет цветов 055',
    slug: 'buket055',
    price: 4300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2023-01-03%2016-28-44-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2023-01-03%2016-28-58-550x550.JPG'
    ],
    description: 'Элегантный букет цветов 055 - один из наших хитов продаж. Создан из свежих цветов высочайшего качества.',
    shortDescription: 'Букет цветов 055 - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Популярный', 'Букет'],
    isHit: true,
    inStock: true,
    publishedAt: '2023-01-03'
  },
  {
    id: '053',
    name: 'Букет цветов 053',
    slug: 'buket053',
    price: 4300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-08-14%2017-27-28-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-08-14%2017-27-36-550x550.JPG'
    ],
    description: 'Изысканный букет цветов 053 - хит продаж нашего магазина. Идеальный выбор для особых случаев.',
    shortDescription: 'Букет цветов 053 - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Популярный', 'Букет'],
    isHit: true,
    inStock: true,
    publishedAt: '2022-08-14'
  },
  {
    id: '004',
    name: 'Букет цветов 004',
    slug: 'buket004',
    price: 3300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-14%2016-15-36-550x550.JPG'
    ],
    description: 'Нежный букет цветов 004 - хит продаж по доступной цене. Отличный выбор для повседневных подарков.',
    shortDescription: 'Букет цветов 004 - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Доступная цена', 'Букет'],
    isHit: true,
    inStock: true,
    publishedAt: '2021-07-14'
  },
  {
    id: '007',
    name: 'Букет цветов 007',
    slug: 'buket007',
    price: 3500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-02-28%2014-35-50-550x550.JPG'
    ],
    description: 'Стильный букет цветов 007 - хит продаж с элегантным дизайном.',
    shortDescription: 'Букет цветов 007 - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Элегантный', 'Букет'],
    isHit: true,
    inStock: true,
    publishedAt: '2021-02-28'
  },
  {
    id: '005',
    name: 'Букет цветов 005',
    slug: 'buket005',
    price: 3800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-06-07%2019-02-26-550x550.JPG'
    ],
    description: 'Роскошный букет цветов 005 - хит продаж с богатой композицией.',
    shortDescription: 'Букет цветов 005 - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Роскошный', 'Букет'],
    isHit: true,
    inStock: true,
    publishedAt: '2021-06-07'
  },
  {
    id: 'sireny',
    name: 'Букет с сиренью',
    slug: 'buket_s_sirenyu',
    price: 8200,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/1t6ohmw1log000owws4ko04oo8gcow-550x550.jpg'
    ],
    description: 'Эксклюзивный букет с сиренью - хит продаж премиум класса. Ароматная сирень создает неповторимую атмосферу.',
    shortDescription: 'Букет с сиренью - хит продаж',
    category: 'bukety_tsvetov',
    tags: ['Хит продаж', 'Премиум', 'Сирень', 'Ароматный'],
    isHit: true,
    inStock: true,
    publishedAt: '2024-05-01'
  },

  // ПОПУЛЯРНЫЕ БУКЕТЫ
  {
    id: '054',
    name: 'Букет хризантем 054',
    slug: 'buket054',
    price: 3300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-09-25%2019-44-08-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-09-25%2019-19-22-550x550.JPG'
    ],
    description: 'Яркий букет хризантем 054 - осенняя красота в каждом цветке.',
    shortDescription: 'Букет хризантем 054',
    category: 'bukety_tsvetov',
    tags: ['Хризантема', 'Осенний', 'Букет'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-09-25'
  },
  {
    id: '052',
    name: 'Букет цветов 052',
    slug: 'buket052',
    price: 4000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2016-31-31-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2016-31-21-550x550.JPG'
    ],
    description: 'Изысканный букет цветов 052 с гармоничным сочетанием оттенков.',
    shortDescription: 'Букет цветов 052',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Гармоничный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-08-06'
  },
  {
    id: '009',
    name: 'Букет цветов 009',
    slug: 'buket009',
    price: 3300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-08%2018-49-243-550x550.JPG'
    ],
    description: 'Нежный букет цветов 009 с деликатными оттенками.',
    shortDescription: 'Букет цветов 009',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Нежный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-08'
  },

  // ВЕСЕННИЕ БУКЕТЫ
  {
    id: 'vesna001',
    name: 'Букет весна 001',
    slug: 'vesna001',
    price: 4400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2120-550x550h.jpg'
    ],
    description: 'Букет весны - пример с семантической разметкой и Schema.org. Весенний букет с тюльпанами и гиацинтами.',
    shortDescription: 'Букет весна 001',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Тюльпан', 'Весенний букет', 'Любимой'],
    isHit: false,
    inStock: true,
    publishedAt: '2024-01-15'
  },
  {
    id: 'vesna004',
    name: 'Букет весна 004',
    slug: 'vesna004',
    price: 4400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2020-02-03%2014-40-17-550x550h.JPG',
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2020-02-03%2014-40-12-550x550h.JPG'
    ],
    description: 'Весенний букет 004 с яркими весенними цветами.',
    shortDescription: 'Букет весна 004',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-02-03'
  },
  {
    id: 'vesna008',
    name: 'Букет весна 008',
    slug: 'vesna008',
    price: 3400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2020-02-15%2018-32-56-550x550h.JPG'
    ],
    description: 'Нежный весенний букет 008 с деликатными весенними цветами.',
    shortDescription: 'Букет весна 008',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет', 'Нежный'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-02-15'
  },
  {
    id: 'vesna012',
    name: 'Букет весна 012',
    slug: 'vesna012',
    price: 3400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-07-21%2014-43-39-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-07-21%2014-43-07-550x550.JPG'
    ],
    description: 'Весенний букет 012 с яркими красками весны.',
    shortDescription: 'Букет весна 012',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет', 'Яркий'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-21'
  },

  // РОЗЫ
  {
    id: 'rozy_kenya_25',
    name: 'Букет из 25 небольших красных роз',
    slug: 'krasniye_rozy_keniya',
    price: 4250,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2020-02-12%2016-51-00-550x550h.JPG'
    ],
    description: 'Классический букет из 25 красных роз Кения. Символ страсти и любви.',
    shortDescription: 'Букет из 25 красных роз',
    category: 'rozy',
    tags: ['Роза Кения', 'Красные', '25 роз', 'Классический'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-02-12'
  },
  {
    id: 'rozy_belye_51',
    name: 'Букет из 51 белой розы',
    slug: '51_belaya_roza',
    price: 14280,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-05%2016-15-11-550x550h.JPG'
    ],
    description: 'Роскошный букет из 51 белой розы. Символ чистоты и искренности чувств.',
    shortDescription: 'Букет из 51 белой розы',
    category: 'rozy',
    tags: ['Роза белая', '51 роза', 'Роскошный', 'Премиум'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-05'
  },

  // ТЮЛЬПАНЫ
  {
    id: 'tulpany_belye',
    name: 'Букет из белых тюльпанов',
    slug: 'buket_belih_tulpanov',
    price: 3100,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-01-27%2019-53-46-550x550.JPG'
    ],
    description: 'Нежный букет из белых тюльпанов. Символ чистоты и новых начинаний.',
    shortDescription: 'Букет из белых тюльпанов',
    category: 'tulpany',
    tags: ['Тюльпан', 'Белые', 'Нежный', 'Весенний'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-01-27'
  },
  {
    id: 'tulpany_rozovye_21',
    name: 'Букет из 21 пионовидного розового тюльпана',
    slug: 'buket_21_tulpan',
    price: 5400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-02-20%2012-05-48-550x550.JPG'
    ],
    description: 'Эксклюзивный букет из 21 пионовидного розового тюльпана. Необычная форма и нежный цвет.',
    shortDescription: 'Букет из 21 пионовидного тюльпана',
    category: 'tulpany',
    tags: ['Тюльпан', 'Пионовидный', 'Розовые', '21 штука'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-02-20'
  },

  // КОМПОЗИЦИИ В КОРОБКАХ
  {
    id: 'korobka_008',
    name: 'Шляпная коробка 008',
    slug: 'v_korobke_008',
    price: 3400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2017-34-32-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2017-24-14-550x550.JPG'
    ],
    description: 'Элегантная шляпная коробка 008 с изысканной цветочной композицией.',
    shortDescription: 'Шляпная коробка 008',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Композиция', 'Элегантная'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-08-06'
  },
  {
    id: 'kompoziciya_004',
    name: 'Композиция в коробке 004',
    slug: 'kompoziciya004',
    price: 4300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-04-03%2017-20-19-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-04-03%2017-19-51-550x550.JPG'
    ],
    description: 'Стильная композиция в коробке 004 с гармоничным сочетанием цветов.',
    shortDescription: 'Композиция в коробке 004',
    category: 'tsvety_v_korobke',
    tags: ['Композиция', 'Коробка', 'Стильная'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-04-03'
  },

  // СУХОЦВЕТЫ
  {
    id: 'gipsofila_suhaya',
    name: 'Букет из гипсофилы',
    slug: 'buket_sukhotsvet_004',
    price: 2500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2013-52-23-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-08-06%2013-52-45-550x550.JPG'
    ],
    description: 'Нежный букет из сухой гипсофилы. Долговечная красота для вашего дома.',
    shortDescription: 'Букет из гипсофилы',
    category: 'sukhotsvety',
    tags: ['Гипсофила', 'Сухоцветы', 'Долговечный', 'Нежный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-08-06'
  }
];

// Функция для получения товаров по категории
export const getProductsByCategory = (category: string): Product[] => {
  return updatedProducts.filter(product => product.category === category);
};

// Функция для получения хитов продаж
export const getHitProducts = (): Product[] => {
  return updatedProducts.filter(product => product.isHit);
};

// Функция для получения товара по slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return updatedProducts.find(product => product.slug === slug);
};
