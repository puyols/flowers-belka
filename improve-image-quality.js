const fs = require('fs');

// Функция для улучшения качества изображений
function improveImageQuality() {
  const filePath = 'flowers-belka-nextjs/src/data/products-parsed.ts';
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('Улучшаем качество изображений...');
  
  // Заменяем все изображения на версии более высокого качества
  let totalReplacements = 0;

  // Заменяем -250x250 на -500x500 для лучшего качества
  const qualityRegex = /-250x250(h?)\.([jJ][pP][gG]|[jJ][pP][eE][gG]|[pP][nN][gG])/g;
  const qualityMatches = content.match(qualityRegex);

  if (qualityMatches) {
    console.log(`Найдено ${qualityMatches.length} изображений для улучшения качества`);
    content = content.replace(qualityRegex, '-500x500$1.$2');
    totalReplacements += qualityMatches.length;
  }

  // Также попробуем заменить некоторые на оригинальные изображения без кеширования
  // Но только для тех, которые имеют простые имена файлов
  const simpleImageRegex = /https:\/\/flowers-belka\.ru\/image\/cache\/catalog\/([^\/\s'"]+)-500x500(h?)\.([jJ][pP][gG]|[jJ][pP][eE][gG]|[pP][nN][gG])/g;
  const simpleMatches = content.match(simpleImageRegex);

  if (simpleMatches) {
    console.log(`Найдено ${simpleMatches.length} простых изображений для замены на оригинальные`);
    content = content.replace(simpleImageRegex, (match, filename, h, ext) => {
      // Возвращаем оригинальный путь без кеширования для простых файлов
      return `https://flowers-belka.ru/image/catalog/${filename}.${ext}`;
    });
    totalReplacements += simpleMatches.length;
  }
  
  if (totalReplacements > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Обновлено ${totalReplacements} изображений`);
    console.log('Файл products-parsed.ts обновлен!');
  } else {
    console.log('Изображения для замены не найдены');
  }
  
  return totalReplacements;
}

// Запускаем улучшение качества
try {
  const updated = improveImageQuality();
  
  if (updated > 0) {
    console.log('\n=== РЕЗУЛЬТАТ ===');
    console.log(`Обновлено изображений: ${updated}`);
    console.log('\nТеперь изображения должны быть более высокого качества!');
    console.log('\nДля проверки изменений запустите:');
    console.log('git diff flowers-belka-nextjs/src/data/products-parsed.ts');
  }
} catch (error) {
  console.error('Ошибка:', error.message);
}
