const fs = require('fs');

// Список товаров с шаблонными описаниями, которые нужно исправить
const problemProducts = [
  // Весенние букеты
  { slug: 'vesna012', category: 'tsvety_v_korobke' },
  { slug: 'vesna016', category: 'tsvety_v_korobke' },
  { slug: 'vesna017', category: 'tsvety_v_korobke' },
  { slug: 'vesna013', category: 'tsvety_v_korobke' },
  
  // Букеты роз
  { slug: 'buket034', category: 'bukety_tsvetov' },
  { slug: 'buket021', category: 'bukety_tsvetov' },
  
  // Букеты цветов
  { slug: 'buket005', category: 'bukety_tsvetov' },
  { slug: 'buket026', category: 'bukety_tsvetov' },
  { slug: 'buket029', category: 'bukety_tsvetov' },
  { slug: 'buket041', category: 'bukety_tsvetov' },
  { slug: 'buket053', category: 'bukety_tsvetov' },
  
  // Розы
  { slug: '51_belaya_roza', category: 'rozy' },
  { slug: 'krasnie_rozy', category: 'rozy' },
  { slug: 'persikovie_rozy', category: 'rozy' },
  { slug: 'rozovie_rozy', category: 'rozy' },
  { slug: 'sirenevie_rozy', category: 'rozy' },
  
  // Тюльпаны
  { slug: '19_rozovih_tulpanov_kolumbus', category: 'tulpany' },
  { slug: 'rozovie_tulpany', category: 'tulpany' },
  { slug: 'rozovie_tulpany_s_romashkoy', category: 'tulpany' },
  
  // Композиции
  { slug: 'kompoziciya001', category: 'tsvety_v_korobke' },
  { slug: 'kompoziciya004', category: 'tsvety_v_korobke' },
  
  // Корзины
  { slug: 'korzina_s_krasnoy_rozoy', category: 'tsvety_v_korobke' },
  { slug: 'korzina_s_kustovoy_rozoy', category: 'tsvety_v_korobke' },
  { slug: 'korzina_s_hrizantemoy', category: 'tsvety_v_korobke' },
  { slug: 'korzina_s_eustomoy', category: 'tsvety_v_korobke' },
  { slug: 'korzina_skazka', category: 'tsvety_v_korobke' },
  
  // Шляпные коробки
  { slug: 'shlyapnaya_korobka001', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka002', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka005', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka006', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka008', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka_s_gipsofiloy', category: 'tsvety_v_korobke' },
  { slug: 'shlyapnaya_korobka_s_pionami', category: 'tsvety_v_korobke' },
  
  // Другие
  { slug: 'buket_iz_gipsofilyi', category: 'bukety_tsvetov' }
];

console.log(`Найдено ${problemProducts.length} товаров с шаблонными описаниями:`);
problemProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.slug} (${product.category})`);
});

// Функция для получения данных с реального сайта
async function fetchProductData(slug, category) {
  const url = `https://flowers-belka.ru/${category}/${slug}`;
  console.log(`Получаем данные для: ${url}`);
  
  // Здесь будет код для парсинга реального сайта
  // Пока просто возвращаем заглушку
  return {
    url,
    description: 'Описание с реального сайта',
    tags: ['Тег1', 'Тег2']
  };
}

module.exports = { problemProducts, fetchProductData };
