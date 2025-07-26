const fs = require('fs');
const https = require('https');
const { JSDOM } = require('jsdom');

// Функция для получения HTML страницы
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Функция для извлечения описания из HTML
function extractDescription(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  let descriptionSection = null;

  // Ищем div с описанием по содержимому
  const allDivs = document.querySelectorAll('div');
  for (const div of allDivs) {
    const text = div.textContent || '';
    const html = div.innerHTML || '';

    // Ищем div который содержит описание букета
    if ((text.includes('Букет из') || text.includes('Состав букета')) &&
        text.length < 3000 &&
        text.length > 100 &&
        !html.includes('<header') &&
        !html.includes('<nav') &&
        !html.includes('class="header')) {
      descriptionSection = div;
      break;
    }
  }

  if (!descriptionSection) {
    console.log('Описание не найдено');
    return null;
  }

  // Получаем HTML содержимое описания
  let description = descriptionSection.innerHTML.trim();

  // Очищаем от лишних атрибутов, но сохраняем структуру
  description = description.replace(/itemprop="[^"]*"/g, '');
  description = description.replace(/itemscope="[^"]*"/g, '');
  description = description.replace(/itemtype="[^"]*"/g, '');
  description = description.replace(/data-nosnippet="[^"]*"/g, '');
  description = description.replace(/class="[^"]*"/g, '');
  description = description.replace(/<link[^>]*>/g, '');
  description = description.replace(/<meta[^>]*>/g, '');

  // Убираем лишние пробелы
  description = description.replace(/\s+/g, ' ').trim();
  description = description.replace(/>\s+</g, '><');

  return description;
}

// Функция для парсинга одного товара
async function parseProduct(product) {
  try {
    console.log(`Парсинг товара: ${product.name} (${product.slug})`);
    
    const url = `https://flowers-belka.ru/bukety_tsvetov/${product.slug}`;
    const html = await fetchPage(url);
    const description = extractDescription(html);
    
    if (description) {
      return {
        ...product,
        description: description
      };
    } else {
      console.log(`Описание не найдено для ${product.name}`);
      return product;
    }
  } catch (error) {
    console.error(`Ошибка при парсинге ${product.name}:`, error.message);
    return product;
  }
}

// Основная функция
async function main() {
  try {
    // Читаем файл с товарами
    const productsFile = fs.readFileSync('flowers-belka-nextjs/src/data/products-parsed.ts', 'utf8');
    
    // Извлекаем массив товаров из TypeScript файла
    const productsMatch = productsFile.match(/export const products: Product\[\] = (\[[\s\S]*?\]);/);
    if (!productsMatch) {
      throw new Error('Не удалось найти массив товаров в файле');
    }
    
    // Преобразуем TypeScript в JSON (упрощенно)
    let productsString = productsMatch[1];
    
    // Заменяем одинарные кавычки на двойные для JSON
    productsString = productsString.replace(/'/g, '"');
    
    // Убираем комментарии
    productsString = productsString.replace(/\/\/.*$/gm, '');
    
    const products = JSON.parse(productsString);
    
    console.log(`Найдено ${products.length} товаров для парсинга`);
    
    // Парсим только первые 5 товаров для тестирования
    const testProducts = products.slice(0, 5);
    console.log(`Тестируем парсинг на ${testProducts.length} товарах`);

    const updatedProducts = [];
    for (let i = 0; i < testProducts.length; i++) {
      const product = testProducts[i];
      const updatedProduct = await parseProduct(product);
      updatedProducts.push(updatedProduct);

      // Задержка между запросами
      if (i < testProducts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Показываем прогресс
      console.log(`Прогресс: ${i + 1}/${testProducts.length}`);
    }
    
    // Сохраняем результат
    fs.writeFileSync('parsed-descriptions.json', JSON.stringify(updatedProducts, null, 2));
    console.log('Парсинг завершен! Результат сохранен в parsed-descriptions.json');
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

// Запускаем парсинг
main();
