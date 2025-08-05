const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Функция для создания slug из заголовка с транслитерацией
function createSlug(title) {
  const translitMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  return title
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '') // Удаляем все кроме латинских букв, цифр, пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .replace(/^-+|-+$/g, ''); // Убираем дефисы в начале и конце
}

// Функция для преобразования даты
function parseDate(dateStr) {
  const months = {
    'янв': '01', 'февр': '02', 'мар': '03', 'апр': '04',
    'май': '05', 'июн': '06', 'июл': '07', 'авг': '08',
    'сент': '09', 'окт': '10', 'нояб': '11', 'дек': '12'
  };
  
  // Извлекаем день и месяц из строки типа "09 мар."
  const match = dateStr.match(/(\d+)\s+(\w+)/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = months[match[2]] || '01';
    return `2025-${month}-${day}`;
  }
  return '2025-01-01';
}

// Функция для очистки HTML контента
function cleanContent(html) {
  // Убираем inline стили и оставляем только структурные теги
  return html
    .replace(/style="[^"]*"/g, '')
    .replace(/<div[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

async function parseNews() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Переходим на страницу новостей...');
    await page.goto('https://flowers-belka.ru/novosti', { waitUntil: 'networkidle2' });
    
    // Получаем все ссылки на статьи
    const newsLinks = await page.evaluate(() => {
      const links = [];
      const newsItems = document.querySelectorAll('a[href*="journal_blog_post_id"]');
      
      newsItems.forEach(link => {
        const href = link.href;
        const title = link.textContent.trim();
        if (title && title !== 'Подробнее' && !links.find(item => item.href === href)) {
          links.push({ href, title });
        }
      });
      
      return links;
    });
    
    console.log(`Найдено ${newsLinks.length} статей`);
    
    const articles = [];
    
    // Парсим каждую статью
    for (let i = 0; i < newsLinks.length; i++) {
      const link = newsLinks[i];
      console.log(`Парсим статью ${i + 1}/${newsLinks.length}: ${link.title}`);
      
      try {
        await page.goto(link.href, { waitUntil: 'networkidle2' });
        
        const article = await page.evaluate(() => {
          const result = {};

          // Заголовок
          const titleElement = document.querySelector('h1');
          result.title = titleElement ? titleElement.textContent.trim() : '';

          // Дата
          const dateElement = document.querySelector('.journal-date');
          if (dateElement) {
            const dateText = dateElement.textContent.trim();
            result.dateStr = dateText;
          }

          // Просмотры
          const viewsMatch = document.body.textContent.match(/(\d+)\s+Просмотры/);
          result.views = viewsMatch ? parseInt(viewsMatch[1]) : 0;

          // Получаем основной контент статьи
          const contentContainer = document.querySelector('.journal-post-content, .post-content, [class*="journal-content"]');

          if (contentContainer) {
            result.content = contentContainer.innerHTML;
          } else {
            // Если не нашли основной контейнер, собираем контент по частям
            const contentElements = [];
            const paragraphs = document.querySelectorAll('p');
            const headings = document.querySelectorAll('h2, h3, h4');
            const lists = document.querySelectorAll('ul, ol');

            // Объединяем все элементы
            const allElements = [...paragraphs, ...headings, ...lists];

            // Фильтруем элементы, исключая те, что в футере, навигации и сайдбаре
            const filteredElements = allElements.filter(el => {
              const parent = el.closest('footer, nav, .sidebar, .journal-sidebar, complementary');
              return !parent && el.textContent.trim().length > 10;
            });

            // Сортируем по позиции в документе
            filteredElements.sort((a, b) => {
              const position = a.compareDocumentPosition(b);
              return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            });

            let htmlContent = '';
            filteredElements.forEach(el => {
              htmlContent += el.outerHTML + '\n';
            });

            result.content = htmlContent;
          }

          // Изображение
          const imageElement = document.querySelector('img[alt*="' + result.title + '"], .journal-post img');
          result.image = imageElement ? imageElement.src : '';

          // Краткое описание (первый параграф)
          const firstParagraph = document.querySelector('p');
          result.excerpt = firstParagraph ? firstParagraph.textContent.trim().substring(0, 200) + '...' : '';

          return result;
        });
        
        // Обрабатываем данные
        const processedArticle = {
          id: (i + 1).toString(),
          title: article.title,
          slug: createSlug(article.title),
          excerpt: article.excerpt,
          content: cleanContent(article.content),
          image: article.image.replace('https://flowers-belka.ru/', '/'),
          author: 'admin',
          publishedAt: parseDate(article.dateStr || '01 янв'),
          views: article.views,
          tags: ['флористика', 'букеты', 'цветы', 'советы']
        };
        
        articles.push(processedArticle);
        
        // Небольшая пауза между запросами
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Ошибка при парсинге статьи ${link.title}:`, error.message);
      }
    }
    
    // Сохраняем результат
    const outputPath = path.join(__dirname, '../src/data/news-parsed.ts');
    const tsContent = `import { NewsArticle } from '../types';

export const newsArticles: NewsArticle[] = ${JSON.stringify(articles, null, 2)};
`;
    
    fs.writeFileSync(outputPath, tsContent, 'utf8');
    console.log(`Сохранено ${articles.length} статей в ${outputPath}`);
    
  } catch (error) {
    console.error('Ошибка при парсинге:', error);
  } finally {
    await browser.close();
  }
}

// Запускаем парсинг
parseNews().catch(console.error);
