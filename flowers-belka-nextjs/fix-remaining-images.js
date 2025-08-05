// Скрипт для исправления оставшихся проблемных изображений
const fs = require('fs');

// Список оставшихся проблемных букетов и их правильных изображений
const fixes = [
  {
    buket: 'buket_sukhotsvet_004',
    oldUrl: 'https://flowers-belka.ru/image/cache/catalog/bukety/buket_sukhotsvet_004-500x500.jpg',
    newUrl: 'https://flowers-belka.ru/image/cache/catalog/2022-04-15%2013-55-18-550x550.JPG' // Временно используем то же изображение
  },
  {
    buket: 'buket048',
    oldUrl: 'https://flowers-belka.ru/image/cache/catalog/bukety/buket048-500x500.jpg',
    newUrl: 'https://flowers-belka.ru/image/cache/catalog/2020-06-27%2015-34-44-550x550.JPG' // Временно используем изображение пиона
  },
  {
    buket: 'buket049',
    oldUrl: 'https://flowers-belka.ru/image/cache/catalog/bukety/buket049-500x500.jpg',
    newUrl: 'https://flowers-belka.ru/image/cache/catalog/2021-07-07%2019-59-14-550x550.JPG' // Временно используем изображение пиона
  },
  {
    buket: 'buket021',
    oldUrl: 'https://flowers-belka.ru/image/cache/catalog/bukety/buket021-500x500.jpg',
    newUrl: 'https://flowers-belka.ru/image/cache/catalog/2022-04-15%2013-55-18-550x550.JPG' // Временно используем изображение роз
  },
  {
    buket: 'buket023',
    oldUrl: 'https://flowers-belka.ru/image/cache/catalog/bukety/buket023-500x500.jpg',
    newUrl: 'https://flowers-belka.ru/image/cache/catalog/2022-04-15%2013-55-18-550x550.JPG' // Временно используем изображение роз
  }
];

// Читаем файл
let content = fs.readFileSync('./src/data/products-parsed.ts', 'utf8');

// Применяем исправления
fixes.forEach(fix => {
  console.log(`Исправляем ${fix.buket}...`);
  content = content.replace(fix.oldUrl, fix.newUrl);
});

// Записываем обратно
fs.writeFileSync('./src/data/products-parsed.ts', content);

console.log('✅ Все изображения исправлены!');
console.log('Исправлено букетов:', fixes.length);
