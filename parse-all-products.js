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

  // Сначала ищем по заголовку "Описание"
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  for (const heading of headings) {
    if (heading.textContent.trim() === 'Описание') {
      // Ищем следующий элемент с содержимым
      let nextElement = heading.nextElementSibling;
      while (nextElement) {
        if (nextElement.innerHTML && nextElement.innerHTML.trim().length > 100) {
          descriptionSection = nextElement;
          break;
        }
        nextElement = nextElement.nextElementSibling;
      }
      break;
    }
  }

  // Если не найдено по заголовку, ищем div с описанием по содержимому
  if (!descriptionSection) {
    const allDivs = document.querySelectorAll('div');
    for (const div of allDivs) {
      const text = div.textContent || '';
      const html = div.innerHTML || '';

      // Ищем div который содержит описание букета (более строгие критерии)
      if ((text.includes('Букет из') || text.includes('Состав букета:') || text.includes('композиции')) &&
          text.length < 3000 &&
          text.length > 200 &&
          !html.includes('<header') &&
          !html.includes('<nav') &&
          !html.includes('class="header') &&
          !html.includes('button-cart') &&
          !html.includes('input-option') &&
          !html.includes('₽') &&
          (html.includes('<h2') || html.includes('<h3') || html.includes('<ul') || html.includes('<strong>'))) {
        descriptionSection = div;
        break;
      }
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

// Функция для извлечения всех slug'ов из файла
function extractSlugsFromFile() {
  const productsFile = fs.readFileSync('flowers-belka-nextjs/src/data/products-parsed.ts', 'utf8');
  
  // Ищем все slug'и в файле
  const slugMatches = productsFile.match(/slug: '[^']+'/g);
  if (!slugMatches) {
    throw new Error('Не удалось найти slug\'и в файле');
  }
  
  const slugs = slugMatches.map(match => {
    const slug = match.replace(/slug: '([^']+)'/, '$1');
    return slug;
  });
  
  // Также извлекаем имена товаров для логирования
  const nameMatches = productsFile.match(/name: '[^']+'/g);
  const names = nameMatches ? nameMatches.map(match => {
    return match.replace(/name: '([^']+)'/, '$1');
  }) : [];
  
  const products = slugs.map((slug, index) => ({
    slug: slug,
    name: names[index] || `Товар ${index + 1}`
  }));
  
  return products;
}

// Основная функция
async function main() {
  try {
    console.log('Извлекаем список товаров из файла...');
    const products = extractSlugsFromFile();
    console.log(`Найдено ${products.length} товаров для парсинга`);

    // Тестируем на первых 5 товарах
    const testProducts = products.slice(0, 5);
    console.log(`Тестируем улучшенный алгоритм на ${testProducts.length} товарах`);

    const results = [];
    const errors = [];

    for (let i = 0; i < testProducts.length; i++) {
      const product = testProducts[i];
      console.log(`\n[${i + 1}/${products.length}] Парсинг: ${product.name} (${product.slug})`);
      
      try {
        const url = `https://flowers-belka.ru/bukety_tsvetov/${product.slug}`;
        const html = await fetchPage(url);
        const description = extractDescription(html);
        
        if (description && description.length > 50) {
          results.push({
            slug: product.slug,
            name: product.name,
            description: description
          });
          console.log(`✓ Описание получено (${description.length} символов)`);
        } else {
          console.log(`✗ Описание не найдено или слишком короткое`);
          errors.push({
            slug: product.slug,
            name: product.name,
            error: 'Описание не найдено'
          });
        }
      } catch (error) {
        console.error(`✗ Ошибка: ${error.message}`);
        errors.push({
          slug: product.slug,
          name: product.name,
          error: error.message
        });
      }
      
      // Задержка между запросами (2 секунды)
      if (i < testProducts.length - 1) {
        process.stdout.write('Ожидание...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        process.stdout.write(' готово\n');
      }
      
      // Сохраняем промежуточные результаты каждые 10 товаров
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync('all-descriptions-temp.json', JSON.stringify(results, null, 2));
        console.log(`Промежуточное сохранение: ${results.length} описаний`);
      }
    }
    
    // Сохраняем финальные результаты
    fs.writeFileSync('all-descriptions.json', JSON.stringify(results, null, 2));
    fs.writeFileSync('parsing-errors.json', JSON.stringify(errors, null, 2));
    
    console.log('\n=== РЕЗУЛЬТАТЫ ПАРСИНГА ===');
    console.log(`Всего товаров: ${testProducts.length}`);
    console.log(`Успешно спарсено: ${results.length}`);
    console.log(`Ошибок: ${errors.length}`);
    console.log(`Процент успеха: ${Math.round((results.length / testProducts.length) * 100)}%`);
    
    console.log('\nФайлы сохранены:');
    console.log('- all-descriptions.json (все описания)');
    console.log('- parsing-errors.json (ошибки)');
    
  } catch (error) {
    console.error('Критическая ошибка:', error.message);
  }
}

// Запускаем парсинг
console.log('Начинаем полный парсинг всех товаров...');
console.log('Это займет около 3-4 минут с задержками между запросами');
main();
