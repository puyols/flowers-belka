const fs = require('fs');

// Читаем результаты тестового парсинга
const testResults = JSON.parse(fs.readFileSync('test-descriptions.json', 'utf8'));

// Читаем файл с товарами
const productsFile = fs.readFileSync('flowers-belka-nextjs/src/data/products-parsed.ts', 'utf8');

// Создаем карту описаний
const descriptionsMap = {};
testResults.forEach(item => {
  descriptionsMap[item.slug] = item.description;
});

console.log('Найдено описаний для обновления:', Object.keys(descriptionsMap).length);

// Обновляем описания в файле
let updatedFile = productsFile;

// Обновляем каждое описание
Object.keys(descriptionsMap).forEach(slug => {
  const newDescription = descriptionsMap[slug];
  
  // Ищем товар по slug и обновляем его description
  const slugPattern = new RegExp(`slug: '${slug}'[\\s\\S]*?description: '[^']*'`, 'g');
  const match = updatedFile.match(slugPattern);
  
  if (match) {
    console.log(`Обновляем описание для ${slug}`);
    
    // Экранируем специальные символы в описании
    const escapedDescription = newDescription
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n');
    
    // Заменяем старое описание на новое
    const oldDescriptionPattern = new RegExp(`(slug: '${slug}'[\\s\\S]*?description: ')[^']*'`, 'g');
    updatedFile = updatedFile.replace(oldDescriptionPattern, `$1${escapedDescription}'`);
  } else {
    console.log(`Товар с slug ${slug} не найден`);
  }
});

// Сохраняем обновленный файл
fs.writeFileSync('flowers-belka-nextjs/src/data/products-parsed.ts', updatedFile);
console.log('Файл products-parsed.ts обновлен!');

console.log('\nДля проверки изменений запустите:');
console.log('git diff flowers-belka-nextjs/src/data/products-parsed.ts');
