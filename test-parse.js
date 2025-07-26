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

// Тестируем парсинг одной страницы
async function testParse() {
  try {
    const url = 'https://flowers-belka.ru/bukety_tsvetov/vesna004';
    console.log('Загружаем страницу:', url);
    
    const html = await fetchPage(url);
    console.log('HTML загружен, размер:', html.length);
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Ищем заголовок "Описание"
    console.log('Ищем описание...');
    
    // Попробуем найти все заголовки
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log('Найдено заголовков:', headings.length);
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      console.log(`Заголовок ${i + 1}: "${heading.textContent.trim()}"`);
      
      if (heading.textContent.includes('Описание')) {
        console.log('Найден заголовок "Описание"!');
        
        // Ищем следующий элемент с содержимым
        let nextElement = heading.nextElementSibling;
        while (nextElement) {
          if (nextElement.innerHTML && nextElement.innerHTML.trim().length > 50) {
            console.log('Найдено описание:');
            console.log(nextElement.innerHTML.substring(0, 500) + '...');
            break;
          }
          nextElement = nextElement.nextElementSibling;
        }
        break;
      }
    }
    
    // Также попробуем найти по содержимому
    const allDivs = document.querySelectorAll('div');
    console.log('Всего div элементов:', allDivs.length);

    for (const div of allDivs) {
      const text = div.textContent || '';
      const html = div.innerHTML || '';

      // Ищем div который содержит описание, но не является большим контейнером
      if (text.includes('Букет из пионовидных тюльпанов') &&
          text.length < 2000 &&
          text.length > 100 &&
          !html.includes('<header') &&
          !html.includes('<nav')) {
        console.log('Найден div с описанием по содержимому!');
        console.log('Длина текста:', text.length);
        console.log('Содержимое:');
        console.log(html);
        break;
      }
    }
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

testParse();
