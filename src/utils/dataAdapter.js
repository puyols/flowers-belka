// Адаптер для преобразования данных OpenCart в формат React компонентов

export const adaptOpenCartProduct = (opencartProduct) => {
  // Преобразуем товар OpenCart в формат, ожидаемый React компонентами
  return {
    id: opencartProduct.product_id,
    name: opencartProduct.name || 'Без названия',
    price: parseFloat(opencartProduct.price) || 0,
    originalPrice: parseFloat(opencartProduct.price) || 0,
    images: [
      // Главное изображение
      opencartProduct.image ? `/images/${opencartProduct.image}` : '/images/placeholder-flower.jpg',
      // Дополнительные изображения (если есть)
      ...(opencartProduct.additional_images || []).map(img => `/images/${img}`)
    ],
    description: opencartProduct.description || '',
    category: opencartProduct.categories && opencartProduct.categories.length > 0 
      ? opencartProduct.categories[0].category_name 
      : 'Цветы',
    difficulty: 'easy', // По умолчанию
    rating: 4.5, // По умолчанию
    reviews: Math.floor(Math.random() * 50) + 10, // Случайное количество отзывов
    inStock: parseInt(opencartProduct.quantity) > 0,
    quantity: parseInt(opencartProduct.quantity) || 0,
    sku: opencartProduct.sku || opencartProduct.model || '',
    slug: generateSlug(opencartProduct.name || opencartProduct.model || ''),
    tags: extractTags(opencartProduct.description || ''),
    isNew: isNewProduct(opencartProduct.date_added),
    isSale: false, // Можно добавить логику для скидок
  };
};

export const adaptOpenCartCategory = (opencartCategory) => {
  return {
    id: opencartCategory.category_id,
    name: opencartCategory.name || 'Без названия',
    description: opencartCategory.description || '',
    image: opencartCategory.image ? `/image/${opencartCategory.image}` : '/placeholder-category.jpg',
    parentId: opencartCategory.parent_id || null,
    slug: generateSlug(opencartCategory.name || ''),
    sortOrder: opencartCategory.sort_order || 0,
  };
};

// Вспомогательные функции
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
    .replace(/[\s_-]+/g, '-') // Заменяем пробелы и подчеркивания на дефисы
    .replace(/^-+|-+$/g, ''); // Удаляем дефисы в начале и конце
};

const extractTags = (description) => {
  // Простая логика извлечения тегов из описания
  const commonTags = ['букет', 'розы', 'тюльпаны', 'хризантемы', 'лилии', 'доставка'];
  const foundTags = [];
  
  commonTags.forEach(tag => {
    if (description.toLowerCase().includes(tag)) {
      foundTags.push(tag);
    }
  });
  
  return foundTags.length > 0 ? foundTags : ['цветы'];
};

const isNewProduct = (dateAdded) => {
  if (!dateAdded) return false;
  
  const productDate = new Date(dateAdded);
  const now = new Date();
  const daysDiff = (now - productDate) / (1000 * 60 * 60 * 24);
  
  return daysDiff <= 30; // Товар считается новым 30 дней
};

// Функция для загрузки и адаптации всех данных
export const loadAdaptedData = async () => {
  try {
    // В production это будет API запрос
    const response = await fetch('/products_full.json');
    const data = await response.json();
    
    return {
      products: data.products.map(adaptOpenCartProduct),
      categories: data.categories.map(adaptOpenCartCategory),
      settings: data.settings || {}
    };
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    return {
      products: [],
      categories: [],
      settings: {}
    };
  }
};

// Функции для фильтрации и поиска
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Фильтр по категории
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Фильтр по цене
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Фильтр по наличию
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    // Поиск по названию
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(searchLower) &&
          !product.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    return true;
  });
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => b.isNew - a.isNew);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
