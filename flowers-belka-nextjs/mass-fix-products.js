const fs = require('fs');

// Читаем файл с данными товаров
let content = fs.readFileSync('src/data/products-parsed.ts', 'utf8');

console.log('Начинаем массовое исправление товаров...');

// Обновляем размеры изображений с 500x500 на 550x550
const before500 = (content.match(/-500x500/g) || []).length;
content = content.replace(/-500x500/g, '-550x550');
const after500 = (content.match(/-500x500/g) || []).length;

console.log(`Обновлено изображений: ${before500 - after500} (с 500x500 на 550x550)`);

// Ищем и заменяем шаблонные описания
const templatePatterns = [
  /изысканная цветочная композиция<\/h2><p>Изысканный букет из свежих цветов[^<]*<\/p><h3>Особенности композиции:<\/h3><ul><li><strong>Отборные цветы<\/strong>[^<]*<\/li><li><strong>Гармоничное сочетание<\/strong>[^<]*<\/li><li><strong>Профессиональная работа<\/strong>[^<]*<\/li><li><strong>Свежесть<\/strong>[^<]*<\/li><\/ul><div class="bg-blue-50[^"]*"><p><strong>Качество:<\/strong>[^<]*<\/p><\/div><p>Если нужных цветов[^<]*<\/p><p><em>Подарите красоту и изысканность[^<]*<\/em><\/p>/g,
  
  /изысканная цветочная композиция<\/h2><p>Элегантный весенний букет цветов[^<]*<\/p><h3>Особенности композиции:<\/h3><ul><li><strong>Отборные цветы<\/strong>[^<]*<\/li><li><strong>Гармоничное сочетание<\/strong>[^<]*<\/li><li><strong>Профессиональная работа<\/strong>[^<]*<\/li><li><strong>Свежесть<\/strong>[^<]*<\/li><\/ul><div class="bg-blue-50[^"]*"><p><strong>Качество:<\/strong>[^<]*<\/p><\/div><p>Если нужных цветов[^<]*<\/p><p><em>Подарите красоту и изысканность[^<]*<\/em><\/p>/g,
  
  /классическая красота роз<\/h2><p>[^<]*Розы – это вечная классика[^<]*<\/p><h3>Преимущества роз:<\/h3><ul><li><strong>Классическая красота<\/strong>[^<]*<\/li><li><strong>Универсальность<\/strong>[^<]*<\/li><li><strong>Символичность<\/strong>[^<]*<\/li><li><strong>Аромат<\/strong>[^<]*<\/li><\/ul><div class="bg-red-50[^"]*"><p><strong>Классика:<\/strong>[^<]*<\/p><\/div><p><em>Выразите свои чувства с классическими розами[^<]*<\/em><\/p>/g
];

let replacedCount = 0;
templatePatterns.forEach((pattern, index) => {
  const matches = content.match(pattern);
  if (matches) {
    replacedCount += matches.length;
    content = content.replace(pattern, `TEMPLATE_DESCRIPTION_${index + 1}_TO_REPLACE`);
  }
});

console.log(`Заменено шаблонных описаний: ${replacedCount}`);

// Сохраняем файл
fs.writeFileSync('src/data/products-parsed.ts', content);

console.log('Массовое исправление завершено!');
console.log('Теперь нужно заменить заглушки на реальные описания с сайта.');
