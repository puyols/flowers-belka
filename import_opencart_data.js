/**
 * Скрипт для импорта данных из OpenCart в Next.js проект
 */

const fs = require('fs');
const path = require('path');

// Читаем экспортированные данные
const exportedData = JSON.parse(fs.readFileSync('opencart_products_export.json', 'utf8'));

console.log('📦 Импортируем данные из OpenCart...');
console.log(`Найдено товаров: ${exportedData.products.length}`);
console.log(`Найдено категорий: ${exportedData.categories.length}`);

// Функция для создания уникального slug
function createUniqueSlug(name, existingSlugs) {
    let baseSlug = name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9а-яё\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    
    // Убираем лишние дефисы
    baseSlug = baseSlug.replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    if (!baseSlug) {
        baseSlug = 'product';
    }
    
    let slug = baseSlug;
    let counter = 1;
    
    while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    
    existingSlugs.push(slug);
    return slug;
}

// Обрабатываем товары
const existingSlugs = [];
const processedProducts = exportedData.products.map((product, index) => {
    const slug = createUniqueSlug(product.name, existingSlugs);
    
    // Копируем изображения товара
    const productImages = [];
    product.images.forEach((imagePath, imgIndex) => {
        const imageName = path.basename(imagePath);
        const sourceImagePath = path.join('image/catalog', imageName);
        const targetImagePath = path.join('flowers-belka-nextjs/public/images/products', imageName);
        
        // Проверяем, существует ли исходное изображение
        if (fs.existsSync(sourceImagePath)) {
            try {
                // Копируем изображение
                fs.copyFileSync(sourceImagePath, targetImagePath);
                productImages.push(`/images/products/${imageName}`);
                console.log(`✅ Скопировано изображение: ${imageName}`);
            } catch (error) {
                console.log(`❌ Ошибка копирования ${imageName}: ${error.message}`);
                productImages.push('/images/placeholder.jpg');
            }
        } else {
            console.log(`⚠️ Изображение не найдено: ${sourceImagePath}`);
            productImages.push('/images/placeholder.jpg');
        }
    });
    
    // Если нет изображений, добавляем placeholder
    if (productImages.length === 0) {
        productImages.push('/images/placeholder.jpg');
    }
    
    return {
        id: product.id,
        name: product.name,
        slug: slug,
        price: product.price,
        images: productImages,
        description: product.description || `Красивый букет "${product.name}" от цветочного магазина Belka-flowers. Свежие цветы, профессиональная упаковка, быстрая доставка.`,
        shortDescription: product.shortDescription || `${product.name} - ${product.price} руб.`,
        category: product.category || 'Букеты',
        inStock: product.inStock,
        isHit: product.isHit,
        tags: ['цветы', 'букет', 'доставка'],
        attributes: {
            'Модель': product.model || '',
            'Артикул': product.sku || '',
            'Количество': product.quantity.toString()
        }
    };
});

console.log(`\n🔄 Обработано товаров: ${processedProducts.length}`);

// Создаем TypeScript файл с товарами
const productsFileContent = `// Автоматически сгенерированный файл из OpenCart
// Дата экспорта: ${exportedData.exportDate}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  shortDescription: string;
  category: string;
  inStock: boolean;
  isHit: boolean;
  tags: string[];
  attributes: Record<string, string>;
}

export const products: Product[] = ${JSON.stringify(processedProducts, null, 2)};

export default products;
`;

// Сохраняем файл с товарами
const productsFilePath = 'flowers-belka-nextjs/src/data/products-opencart.ts';
fs.writeFileSync(productsFilePath, productsFileContent, 'utf8');

console.log(`\n✅ Файл товаров сохранен: ${productsFilePath}`);

// Обрабатываем категории
const processedCategories = exportedData.categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || `Категория ${category.name} в цветочном магазине Belka-flowers`,
    parentId: category.parentId
}));

// Создаем файл с категориями
const categoriesFileContent = `// Автоматически сгенерированный файл из OpenCart
// Дата экспорта: ${exportedData.exportDate}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
}

export const categories: Category[] = ${JSON.stringify(processedCategories, null, 2)};

export default categories;
`;

const categoriesFilePath = 'flowers-belka-nextjs/src/data/categories-opencart.ts';
fs.writeFileSync(categoriesFilePath, categoriesFileContent, 'utf8');

console.log(`✅ Файл категорий сохранен: ${categoriesFilePath}`);

// Создаем файл статистики
const statsContent = `# Статистика импорта из OpenCart

**Дата импорта:** ${new Date().toLocaleString('ru-RU')}
**Дата экспорта из OpenCart:** ${exportedData.exportDate}

## 📊 Импортированные данные:

- **Товаров:** ${processedProducts.length}
- **Категорий:** ${processedCategories.length}
- **Изображений:** ${processedProducts.reduce((sum, p) => sum + p.images.length, 0)}

## 🏷️ Топ товары по цене:

${processedProducts
    .sort((a, b) => b.price - a.price)
    .slice(0, 10)
    .map((p, i) => `${i + 1}. **${p.name}** - ${p.price} руб.`)
    .join('\n')}

## 📁 Категории:

${processedCategories.map(c => `- **${c.name}** (ID: ${c.id})`).join('\n')}

## 📝 Следующие шаги:

1. Проверить импортированные данные в файлах:
   - \`src/data/products-opencart.ts\`
   - \`src/data/categories-opencart.ts\`

2. Обновить компоненты для использования новых данных

3. Проверить все изображения товаров

4. Настроить SEO для новых товаров
`;

fs.writeFileSync('import_stats.md', statsContent, 'utf8');

console.log(`\n🎉 Импорт завершен успешно!`);
console.log(`📄 Статистика сохранена в: import_stats.md`);
console.log(`\n📋 Итого:`);
console.log(`   - Товаров: ${processedProducts.length}`);
console.log(`   - Категорий: ${processedCategories.length}`);
console.log(`   - Файлов создано: 3`);
