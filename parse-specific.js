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

// Тестовые товары
const testProducts = [
  { slug: 'vesna001', name: 'Букет весна 001' },
  { slug: 'vesna002', name: 'Букет весна 002' },
  { slug: 'vesna003', name: 'Букет весна 003' },
  { slug: 'vesna005', name: 'Букет весна 005' }
];

// Основная функция
async function main() {
  try {
    const results = [];
    
    for (let i = 0; i < testProducts.length; i++) {
      const product = testProducts[i];
      console.log(`Парсинг товара: ${product.name} (${product.slug})`);
      
      try {
        const url = `https://flowers-belka.ru/bukety_tsvetov/${product.slug}`;
        const html = await fetchPage(url);
        const description = extractDescription(html);
        
        if (description) {
          results.push({
            slug: product.slug,
            name: product.name,
            description: description
          });
          console.log(`✓ Описание получено для ${product.name}`);
        } else {
          console.log(`✗ Описание не найдено для ${product.name}`);
        }
      } catch (error) {
        console.error(`Ошибка при парсинге ${product.name}:`, error.message);
      }
      
      // Задержка между запросами
      if (i < testProducts.length - 1) {
        console.log('Ожидание 2 секунды...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Сохраняем результат
    fs.writeFileSync('test-descriptions.json', JSON.stringify(results, null, 2));
    console.log('\nПарсинг завершен! Результат сохранен в test-descriptions.json');
    console.log(`Успешно спарсено: ${results.length} из ${testProducts.length} товаров`);
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

// Запускаем парсинг
main();
