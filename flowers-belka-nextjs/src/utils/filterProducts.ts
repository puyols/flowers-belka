import { Product } from '@/types';

interface FilterOptions {
  priceFrom: string;
  priceTo: string;
  flowerType: string;
  color: string;
  occasion: string;
  sortBy: string;
}

// Функция для извлечения номера из названия
const getNumber = (name: string) => {
  const match = name.match(/(\d+)$/);
  return match ? parseInt(match[1]) : 0;
};

// Универсальная функция фильтрации продуктов
export function filterProducts(products: Product[], filters: FilterOptions, category?: string): Product[] {
  let filtered = products;

  // Фильтр по категории (если указана)
  if (category) {
    filtered = filtered.filter(p => p.category === category || p.name.toLowerCase().includes(category.replace('_', ' ')));
  }

  // Фильтр по цене
  if (filters.priceFrom) {
    filtered = filtered.filter(p => p.price >= parseInt(filters.priceFrom));
  }
  if (filters.priceTo) {
    filtered = filtered.filter(p => p.price <= parseInt(filters.priceTo));
  }

  // Фильтр по типу цветов (поиск по тегам)
  if (filters.flowerType) {
    filtered = filtered.filter(p => {
      const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');

      // Проверяем наличие цветов в тегах на основе реальных данных
      switch (filters.flowerType) {
        case 'розы':
          return /роз/i.test(tags);
        case 'эквадор':
          return /эквадор/i.test(tags);
        case 'кения':
          return /кения/i.test(tags);
        case 'кустовые':
          return /кустов/i.test(tags);
        case 'пионовидные':
          return /пионовидн/i.test(tags);
        case 'альстромерия':
          return /альстромер/i.test(tags);
        case 'гортензия':
          return /гортенз/i.test(tags);
        case 'тюльпаны':
          return /тюльпан/i.test(tags);
        case 'хризантемы':
          return /хризантем/i.test(tags);
        case 'пионы':
          return /пион/i.test(tags);
        case 'ранункулюсы':
          return /ранункулюс/i.test(tags);
        case 'анемоны':
          return /анемон/i.test(tags);
        case 'гвоздики':
          return /гвоздик/i.test(tags);
        case 'эустома':
          return /эустом|лизиантус/i.test(tags);
        case 'сирень':
          return /сирен/i.test(tags);
        case 'гипсофила':
          return /гипсофил/i.test(tags);
        case 'маттиола':
          return /маттиол/i.test(tags);
        case 'ромашка':
          return /ромашк/i.test(tags);
        case 'смешанный':
          return /смешанный/i.test(tags);
        default:
          return tags.includes(filters.flowerType.toLowerCase());
      }
    });
  }

  // Фильтр по цвету
  if (filters.color) {
    filtered = filtered.filter(p => {
      const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
      
      switch (filters.color) {
        case 'белые':
          return /бел/i.test(tags);
        case 'красные':
          return /красн/i.test(tags);
        case 'розовые':
          return /розов/i.test(tags);
        case 'желтые':
          return /желт/i.test(tags);
        case 'сиреневые':
          return /сиренев|фиолетов/i.test(tags);
        case 'персиковые':
          return /персиков/i.test(tags);
        case 'кремовые':
          return /кремов/i.test(tags);
        default:
          return tags.includes(filters.color.toLowerCase());
      }
    });
  }

  // Фильтр по поводу
  if (filters.occasion) {
    filtered = filtered.filter(p => {
      const tags = p.tags.map(tag => tag.toLowerCase()).join(' ');
      
      switch (filters.occasion) {
        case '8_marta':
          return /8 марта/i.test(tags);
        case 'den_rozhdeniya':
          return /день рождения/i.test(tags);
        case 'den_materi':
          return /день матери/i.test(tags);
        case '14_fevralya':
          return /14 февраля/i.test(tags);
        case 'mame':
          return /маме/i.test(tags);
        case 'devushke':
          return /девушке/i.test(tags);
        case 'devochke':
          return /девочке/i.test(tags);
        case 'lyubimoy':
          return /любимой/i.test(tags);
        case 'muzhchine':
          return /мужчине/i.test(tags);
        case 'uchitelyu':
          return /учителю/i.test(tags);
        case 'nezhniy':
        case 'nezhnyy':
          return /нежн/i.test(tags);
        case 'elegantnyy':
          return /элегантн/i.test(tags);
        case 'roskoshnyy':
          return /роскошн/i.test(tags);
        case 'romantika':
          return /романтик/i.test(tags);
        default:
          return tags.includes(filters.occasion.toLowerCase());
      }
    });
  }

  // Сортировка
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'number_desc':
        return getNumber(b.name) - getNumber(a.name);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
      default:
        return getNumber(b.name) - getNumber(a.name);
    }
  });

  return filtered;
}

// Функция для подсчета товаров по фильтрам (для отображения количества в опциях)
export function getFilterCounts(products: Product[], category?: string) {
  let categoryProducts = products;
  
  if (category) {
    categoryProducts = products.filter(p => p.category === category || p.name.toLowerCase().includes(category.replace('_', ' ')));
  }

  const counts = {
    flowerTypes: {} as Record<string, number>,
    colors: {} as Record<string, number>,
    occasions: {} as Record<string, number>
  };

  categoryProducts.forEach(product => {
    const tags = product.tags.map(tag => tag.toLowerCase()).join(' ');

    // Подсчет типов цветов
    if (/роз/i.test(tags)) counts.flowerTypes.розы = (counts.flowerTypes.розы || 0) + 1;
    if (/хризантем/i.test(tags)) counts.flowerTypes.хризантемы = (counts.flowerTypes.хризантемы || 0) + 1;
    if (/эустом|лизиантус/i.test(tags)) counts.flowerTypes.эустома = (counts.flowerTypes.эустома || 0) + 1;
    if (/гвоздик/i.test(tags)) counts.flowerTypes.гвоздики = (counts.flowerTypes.гвоздики || 0) + 1;
    if (/альстромер/i.test(tags)) counts.flowerTypes.альстромерия = (counts.flowerTypes.альстромерия || 0) + 1;
    if (/тюльпан/i.test(tags)) counts.flowerTypes.тюльпаны = (counts.flowerTypes.тюльпаны || 0) + 1;
    if (/пион/i.test(tags)) counts.flowerTypes.пионы = (counts.flowerTypes.пионы || 0) + 1;
    if (/гортенз/i.test(tags)) counts.flowerTypes.гортензия = (counts.flowerTypes.гортензия || 0) + 1;

    // Подсчет цветов
    if (/бел/i.test(tags)) counts.colors.белые = (counts.colors.белые || 0) + 1;
    if (/красн/i.test(tags)) counts.colors.красные = (counts.colors.красные || 0) + 1;
    if (/розов/i.test(tags)) counts.colors.розовые = (counts.colors.розовые || 0) + 1;
    if (/желт/i.test(tags)) counts.colors.желтые = (counts.colors.желтые || 0) + 1;
    if (/сиренев|фиолетов/i.test(tags)) counts.colors.сиреневые = (counts.colors.сиреневые || 0) + 1;

    // Подсчет поводов
    if (/8 марта/i.test(tags)) counts.occasions['8_marta'] = (counts.occasions['8_marta'] || 0) + 1;
    if (/роскошн/i.test(tags)) counts.occasions.roskoshnyy = (counts.occasions.roskoshnyy || 0) + 1;
    if (/нежн/i.test(tags)) counts.occasions.nezhniy = (counts.occasions.nezhniy || 0) + 1;
    if (/элегантн/i.test(tags)) counts.occasions.elegantnyy = (counts.occasions.elegantnyy || 0) + 1;
  });

  return counts;
}
