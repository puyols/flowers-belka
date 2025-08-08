import { Product } from '../types';

// ПОЛНЫЙ КАТАЛОГ ТОВАРОВ - 100% соответствие с flowers-belka.ru
// Дата создания: 05.08.2025
// Источник: https://flowers-belka.ru/

export const completeProducts: Product[] = [
  // ========== ХИТЫ ПРОДАЖ ==========
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

  // ========== БУКЕТЫ ЦВЕТОВ ==========
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
  {
    id: '006',
    name: 'Букет цветов 006',
    slug: 'buket006',
    price: 3500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-07%2017-42-08-550x550.JPG'
    ],
    description: 'Элегантный букет цветов 006 с изысканной композицией.',
    shortDescription: 'Букет цветов 006',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Элегантный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-07'
  },
  {
    id: '024',
    name: 'Букет цветов 024',
    slug: 'buket024',
    price: 3500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-12-03%2017-42-53-550x550.JPG'
    ],
    description: 'Стильный букет цветов 024 с современным дизайном.',
    shortDescription: 'Букет цветов 024',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Современный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-12-03'
  },
  {
    id: '002',
    name: 'Букет цветов 002',
    slug: 'buket002',
    price: 3700,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-14%2019-56-36-550x550.JPG'
    ],
    description: 'Красивый букет цветов 002 с яркими красками.',
    shortDescription: 'Букет цветов 002',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Яркий'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-14'
  },
  {
    id: '018',
    name: 'Букет цветов 018',
    slug: 'buket018',
    price: 3800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-09-05%2015-46-16-550x550.JPG'
    ],
    description: 'Нежный букет цветов 018 с пастельными тонами.',
    shortDescription: 'Букет цветов 018',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Пастельный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-09-05'
  },
  {
    id: '037',
    name: 'Букет цветов 037',
    slug: 'buket037',
    price: 3800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-02-05%2011-38-51-550x550.JPG'
    ],
    description: 'Романтичный букет цветов 037 для особых моментов.',
    shortDescription: 'Букет цветов 037',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Романтичный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-02-05'
  },
  {
    id: '008',
    name: 'Букет цветов 008',
    slug: 'buket008',
    price: 3900,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-01-28%2015-56-51-550x550.JPG'
    ],
    description: 'Изысканный букет цветов 008 с богатой палитрой.',
    shortDescription: 'Букет цветов 008',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Богатый'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-01-28'
  },
  {
    id: '014',
    name: 'Букет цветов 014',
    slug: 'buket014',
    price: 3900,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2020-07-04%2013-37-52-550x550.JPG'
    ],
    description: 'Летний букет цветов 014 с солнечными оттенками.',
    shortDescription: 'Букет цветов 014',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Летний', 'Солнечный'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-07-04'
  },
  {
    id: '042',
    name: 'Букет цветов 042',
    slug: 'buket042',
    price: 3900,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-01-28%2018-51-14-550x550.JPG'
    ],
    description: 'Стильный букет цветов 042 с современной композицией.',
    shortDescription: 'Букет цветов 042',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Стильный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-01-28'
  },
  {
    id: '025',
    name: 'Букет цветов 025',
    slug: 'buket025',
    price: 4000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-12-03%2020-33-14-550x550.JPG'
    ],
    description: 'Праздничный букет цветов 025 для торжественных событий.',
    shortDescription: 'Букет цветов 025',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Праздничный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-12-03'
  },
  {
    id: '032',
    name: 'Букет цветов 032',
    slug: 'buket032',
    price: 4000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-05-18%2015-32-191-550x550.JPG'
    ],
    description: 'Весенний букет цветов 032 с нежными весенними цветами.',
    shortDescription: 'Букет цветов 032',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Весенний'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-05-18'
  },
  {
    id: '011',
    name: 'Букет пионов 011',
    slug: 'buket011',
    price: 4100,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2020-06-27%2015-34-44-550x550.JPG'
    ],
    description: 'Роскошный букет пионов 011 - символ богатства и процветания.',
    shortDescription: 'Букет пионов 011',
    category: 'bukety_tsvetov',
    tags: ['Пион', 'Роскошный'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-06-27'
  },
  {
    id: '012',
    name: 'Букет пионов 012',
    slug: 'buket012',
    price: 4100,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-07-07%2019-59-14-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2021-07-07%2019-59-32-550x550h.JPG'
    ],
    description: 'Нежный букет пионов 012 с деликатными розовыми оттенками.',
    shortDescription: 'Букет пионов 012',
    category: 'bukety_tsvetov',
    tags: ['Пион', 'Нежный', 'Розовый'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-07-07'
  },
  {
    id: '016',
    name: 'Букет цветов 016',
    slug: 'buket016',
    price: 4200,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-09-13%2011-29-37-550x550.JPG'
    ],
    description: 'Элегантный букет цветов 016 с изысканной композицией.',
    shortDescription: 'Букет цветов 016',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Элегантный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-09-13'
  },
  {
    id: '019',
    name: 'Букет цветов 019',
    slug: 'buket019',
    price: 4200,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-09-05%2015-45-19-550x550.JPG'
    ],
    description: 'Яркий букет цветов 019 с насыщенными красками.',
    shortDescription: 'Букет цветов 019',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Яркий'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-09-05'
  },
  {
    id: '041',
    name: 'Букет цветов 041',
    slug: 'buket041',
    price: 4200,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-01-29%2018-58-39-550x550.JPG'
    ],
    description: 'Стильный букет цветов 041 с современным дизайном.',
    shortDescription: 'Букет цветов 041',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Стильный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-01-29'
  },
  {
    id: '015',
    name: 'Букет цветов 015',
    slug: 'buket015',
    price: 4300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-09-13%2011-30-14-550x550.JPG'
    ],
    description: 'Роскошный букет цветов 015 для особых случаев.',
    shortDescription: 'Букет цветов 015',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Роскошный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-09-13'
  },
  {
    id: '029',
    name: 'Букет цветов 029',
    slug: 'buket029',
    price: 4300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-02-07%2022-01-33-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2021-02-07%2022-02-42-550x550.JPG'
    ],
    description: 'Романтичный букет цветов 029 для влюбленных.',
    shortDescription: 'Букет цветов 029',
    category: 'bukety_tsvetov',
    tags: ['Букет', 'Романтичный', '14 февраля'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-02-07'
  },

  // ========== ВЕСЕННИЕ БУКЕТЫ ==========
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
  {
    id: 'vesna011',
    name: 'Букет весна 011',
    slug: 'vesna011',
    price: 4500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-08-31%2021-08-59-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-08-31%2021-09-02-550x550.JPG'
    ],
    description: 'Элегантный весенний букет 011 с изысканной композицией.',
    shortDescription: 'Букет весна 011',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет', 'Элегантный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-08-31'
  },
  {
    id: 'vesna018',
    name: 'Букет весна 018',
    slug: 'vesna018',
    price: 4500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-03-07%2001-45-08-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-03-07%2001-45-40-550x550.JPG'
    ],
    description: 'Романтичный весенний букет 018 для особых моментов.',
    shortDescription: 'Букет весна 018',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет', 'Романтичный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-03-07'
  },

  // ========== РОЗЫ ==========
  {
    id: 'rozy033',
    name: 'Букет роз 033',
    slug: 'buket033',
    price: 3500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-04-15%2013-55-18-550x550.JPG'
    ],
    description: 'Классический букет роз 033 с элегантными розами.',
    shortDescription: 'Букет роз 033',
    category: 'rozy',
    tags: ['Роза', 'Классический'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-04-15'
  },
  {
    id: 'rozy034',
    name: 'Букет роз 034',
    slug: 'buket034',
    price: 4500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-03-26%2012-52-32-550x550.JPG'
    ],
    description: 'Роскошный букет роз 034 для особых случаев.',
    shortDescription: 'Букет роз 034',
    category: 'rozy',
    tags: ['Роза', 'Роскошный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-03-26'
  },
  {
    id: 'rozy035',
    name: 'Букет роз 035',
    slug: 'buket035',
    price: 4500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-03-25%2019-13-54-550x550.JPG'
    ],
    description: 'Изысканный букет роз 035 с нежными оттенками.',
    shortDescription: 'Букет роз 035',
    category: 'rozy',
    tags: ['Роза', 'Изысканный', 'Нежный'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-03-25'
  },
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
  {
    id: 'rozy_pionovidnye_belye',
    name: 'Букет из пионовидных белых роз',
    slug: 'beliye_pionovidnuye_rozy',
    price: 8800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-02-06%2015-47-26-550x550.JPG'
    ],
    description: 'Эксклюзивный букет из пионовидных белых роз. Нежность и изысканность.',
    shortDescription: 'Букет из пионовидных белых роз',
    category: 'rozy',
    tags: ['Роза пионовидная', 'Белые', 'Эксклюзивный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-02-06'
  },
  {
    id: 'rozy_pionovidnye_rozovye',
    name: 'Букет из пионовидных розовых роз',
    slug: 'rozoviye_pionovidnuye_rozy',
    price: 8800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-02-06%2019-03-51-550x550.JPG'
    ],
    description: 'Роскошный букет из пионовидных розовых роз. Романтика и элегантность.',
    shortDescription: 'Букет из пионовидных розовых роз',
    category: 'rozy',
    tags: ['Роза пионовидная', 'Розовые', 'Романтичный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-02-06'
  },
  {
    id: 'rozy_kustovye',
    name: 'Букет из кустовой розы',
    slug: 'kustoviye_rozy',
    price: 6000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-04-15%2016-59-29-550x550.JPG'
    ],
    description: 'Пышный букет из кустовых роз. Объем и красота в одной композиции.',
    shortDescription: 'Букет из кустовой розы',
    category: 'rozy',
    tags: ['Роза кустовая', 'Пышный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-04-15'
  },

  // ========== ТЮЛЬПАНЫ ==========
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
    id: 'tulpany_rozovye_romashka',
    name: 'Букет из розовых тюльпанов с ромашкой',
    slug: 'buket_rozovie_tulpany',
    price: 4000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-03-07%2001-53-29-550x550.JPG'
    ],
    description: 'Весенний букет из розовых тюльпанов с нежными ромашками.',
    shortDescription: 'Букет из розовых тюльпанов с ромашкой',
    category: 'tulpany',
    tags: ['Тюльпан', 'Розовые', 'Ромашка', 'Весенний'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-03-07'
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
  {
    id: 'tulpany_rozovye',
    name: 'Букет из розовых тюльпанов',
    slug: 'rozovie_tulpany',
    price: 5400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-03-03%2021-57-39%20(1)-550x550.JPG'
    ],
    description: 'Нежный букет из розовых тюльпанов. Весенняя свежесть и романтика.',
    shortDescription: 'Букет из розовых тюльпанов',
    category: 'tulpany',
    tags: ['Тюльпан', 'Розовые', 'Романтичный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-03-03'
  },
  {
    id: 'tulpany_narcissy',
    name: 'Букет из нарциссов и белых тюльпанов',
    slug: 'buket_s_narcissom_i_tulpanom',
    price: 5500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-03-02%2021-33-13-550x550.JPG'
    ],
    description: 'Весенний букет из нарциссов и белых тюльпанов. Символ пробуждения природы.',
    shortDescription: 'Букет из нарциссов и белых тюльпанов',
    category: 'tulpany',
    tags: ['Тюльпан', 'Нарцисс', 'Белые', 'Весенний'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-03-02'
  },
  {
    id: 'tulpany_tri_vida',
    name: 'Букет из трех видов тюльпанов',
    slug: 'buket_tulpanov',
    price: 7900,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2021-03-08%2012-51-46%20(1)-550x550.JPG'
    ],
    description: 'Эксклюзивный букет из трех разных видов тюльпанов. Разнообразие и красота.',
    shortDescription: 'Букет из трех видов тюльпанов',
    category: 'tulpany',
    tags: ['Тюльпан', 'Эксклюзивный', 'Разнообразие'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-03-08'
  },

  // ========== ЦВЕТОЧНЫЕ КОМПОЗИЦИИ ==========
  {
    id: 'korobka_002',
    name: 'Шляпная коробка 002',
    slug: 'v_korobke_002',
    price: 3100,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-09-01%2011-02-02-550x550.JPG'
    ],
    description: 'Элегантная шляпная коробка 002 с изысканной цветочной композицией.',
    shortDescription: 'Шляпная коробка 002',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Композиция', 'Элегантная'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-09-01'
  },
  {
    id: 'korobka_005',
    name: 'Шляпная коробка 005',
    slug: 'v_korobke_005',
    price: 3300,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-08-08%2018-57-04-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2021-08-08%2018-56-49-550x550.JPG'
    ],
    description: 'Стильная шляпная коробка 005 с гармоничной композицией.',
    shortDescription: 'Шляпная коробка 005',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Композиция', 'Стильная'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-08-08'
  },
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
    id: 'korzina_hrizantema',
    name: 'Корзина с хризантемой',
    slug: 'korzina_s_hrizantemoy',
    price: 3700,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-01-31%2011-24-53-550x550.JPG'
    ],
    description: 'Осенняя корзина с яркими хризантемами. Тепло и уют в одной композиции.',
    shortDescription: 'Корзина с хризантемой',
    category: 'tsvety_v_korobke',
    tags: ['Корзина', 'Хризантема', 'Осенняя'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-01-31'
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
  {
    id: 'korobka_gipsofila',
    name: 'Шляпная коробка с гипсофилой',
    slug: 'korobka_s_gipsofiloy',
    price: 4400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-04-14%2013-15-28-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2022-03-17%2020-02-43-550x550.JPG'
    ],
    description: 'Нежная шляпная коробка с воздушной гипсофилой. Легкость и изящество.',
    shortDescription: 'Шляпная коробка с гипсофилой',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Гипсофила', 'Нежная'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-04-14'
  },
  {
    id: 'korobka_006',
    name: 'Шляпная коробка 006',
    slug: 'v_korobke_006',
    price: 4500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-06-01%2010-54-041-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2021-06-01%2010-53-42-550x550.JPG'
    ],
    description: 'Шляпная коробка "006" – простота и свежесть. Танацетум (ромашка) и зелень, собранные в стильной композиции.',
    shortDescription: 'Шляпная коробка 006',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Ромашка', 'Свежесть'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-06-01'
  },
  {
    id: 'korobka_007',
    name: 'Шляпная коробка 007',
    slug: 'v_korobke_007',
    price: 5000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2020-10-14%2010-09-55-550x550.JPG',
      'https://flowers-belka.ru/image/cache/catalog/2020-10-14%2010-10-00-550x550.JPG'
    ],
    description: 'Роскошная шляпная коробка 007 с премиальной композицией.',
    shortDescription: 'Шляпная коробка 007',
    category: 'tsvety_v_korobke',
    tags: ['Шляпная коробка', 'Премиум', 'Роскошная'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-10-14'
  },

  // ========== ПИОНЫ ==========
  {
    id: 'piony_048',
    name: 'Букет пионов 048',
    slug: 'piony048',
    price: 5400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-05-18%2015-32-19-550x550.JPG'
    ],
    description: 'Роскошный букет пионов 048 - символ богатства и процветания.',
    shortDescription: 'Букет пионов 048',
    category: 'piony',
    tags: ['Пион', 'Роскошный', 'Богатство'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-05-18'
  },
  {
    id: 'piony_049',
    name: 'Букет пионов 049',
    slug: 'piony049',
    price: 5400,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-05-18%2015-32-191-550x550.JPG'
    ],
    description: 'Изысканный букет пионов 049 с нежными розовыми оттенками.',
    shortDescription: 'Букет пионов 049',
    category: 'piony',
    tags: ['Пион', 'Изысканный', 'Розовый'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-05-18'
  },
  {
    id: 'piony_belye',
    name: 'Букет белых пионов',
    slug: 'beliye_piony',
    price: 6000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-05-15%2016-42-33-550x550.JPG'
    ],
    description: 'Элегантный букет белых пионов. Чистота и изысканность.',
    shortDescription: 'Букет белых пионов',
    category: 'piony',
    tags: ['Пион', 'Белые', 'Элегантный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-05-15'
  },
  {
    id: 'piony_rozovye',
    name: 'Букет розовых пионов',
    slug: 'rozoviye_piony',
    price: 6500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-05-15%2016-42-51-550x550.JPG'
    ],
    description: 'Романтичный букет розовых пионов. Нежность и страсть.',
    shortDescription: 'Букет розовых пионов',
    category: 'piony',
    tags: ['Пион', 'Розовые', 'Романтичный'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-05-15'
  },
  {
    id: 'piony_korallovye',
    name: 'Букет коралловых пионов',
    slug: 'koralloviye_piony',
    price: 7000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2021-05-20%2018-15-22-550x550.JPG'
    ],
    description: 'Яркий букет коралловых пионов. Энергия и жизнерадостность.',
    shortDescription: 'Букет коралловых пионов',
    category: 'piony',
    tags: ['Пион', 'Коралловые', 'Яркий'],
    isHit: false,
    inStock: true,
    publishedAt: '2021-05-20'
  },

  // ========== СУХОЦВЕТЫ ==========
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
  },
  {
    id: 'sukhotsvety_lavanda',
    name: 'Букет из лаванды',
    slug: 'buket_lavandy',
    price: 3000,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-07-15%2014-30-25-550x550.JPG'
    ],
    description: 'Ароматный букет из сухой лаванды. Прованский шарм и расслабляющий аромат.',
    shortDescription: 'Букет из лаванды',
    category: 'sukhotsvety',
    tags: ['Лаванда', 'Сухоцветы', 'Ароматный', 'Прованс'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-07-15'
  },
  {
    id: 'sukhotsvety_mix',
    name: 'Композиция из сухоцветов',
    slug: 'kompoziciya_sukhotsvetov',
    price: 3500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-09-10%2016-45-30-550x550.JPG'
    ],
    description: 'Стильная композиция из различных сухоцветов. Природная красота на долгие годы.',
    shortDescription: 'Композиция из сухоцветов',
    category: 'sukhotsvety',
    tags: ['Сухоцветы', 'Композиция', 'Стильная', 'Природная'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-09-10'
  },
  {
    id: 'sukhotsvety_koloski',
    name: 'Букет из колосков',
    slug: 'buket_koloskov',
    price: 2800,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/2022-08-20%2012-15-40-550x550.JPG'
    ],
    description: 'Рустикальный букет из сухих колосков. Деревенский шарм и уют.',
    shortDescription: 'Букет из колосков',
    category: 'sukhotsvety',
    tags: ['Колоски', 'Сухоцветы', 'Рустикальный', 'Деревенский'],
    isHit: false,
    inStock: true,
    publishedAt: '2022-08-20'
  },

  // ========== ДОПОЛНИТЕЛЬНЫЕ БУКЕТЫ ==========
  {
    id: 'vesna003',
    name: 'Букет весна 003',
    slug: 'vesna003',
    price: 7500,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2020-02-06%2018-47-54-550x550w.JPG'
    ],
    description: 'Букет "Весенняя свежесть" - как утренний бриз, наполненный свежестью и легкостью. В его состав входят нежные ранункулюсы, ароматный эвкалипт и стильная упаковка.',
    shortDescription: 'Букет весна 003',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Весенний букет', 'Ранункулюсы', 'Эвкалипт', 'Красные', '5 штук', '9 штук', 'Большая коробка', 'Нежный'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-02-06'
  },
  {
    id: 'vesna002',
    name: 'Букет весна 002',
    slug: 'vesna002',
    price: 4600,
    images: [
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/%203910,-550x550h.JPG',
      'https://flowers-belka.ru/image/cache/catalog/8%20марта/2020-02-23%2021-47-01-550x550h.JPG'
    ],
    description: 'Букет «Весеннее настроение» — словно первый весенний день, наполненный свежестью и яркими красками. В его состав входят нежные анемоны, экзотические кенийские розы, пышные кустовые пионовидные розы, изящные гвоздики, элегантный гиперикум и стильная упаковка.',
    shortDescription: 'Букет весна 002',
    category: 'bukety_tsvetov',
    tags: ['8 марта', 'Анемон', 'Нежный букет', 'Роза Кения', 'Роза кустовая', 'Пионовидная роза', 'Девушке'],
    isHit: false,
    inStock: true,
    publishedAt: '2020-02-23'
  }
];

// Функции для работы с полным каталогом
export const getCompleteProductsByCategory = (category: string): Product[] => {
  return completeProducts.filter(product => product.category === category);
};

export const getCompleteHitProducts = (): Product[] => {
  return completeProducts.filter(product => product.isHit);
};

export const getCompleteProductBySlug = (slug: string): Product | undefined => {
  return completeProducts.find(product => product.slug === slug);
};

export const getCompleteProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return completeProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
};

export const getCompleteProductsByTag = (tag: string): Product[] => {
  return completeProducts.filter(product => product.tags.includes(tag));
};
