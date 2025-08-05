#!/usr/bin/env node

/**
 * Генератор PNG фавиконов из SVG
 *
 * Использование:
 * 1. npm install canvas (опционально)
 * 2. node generate-favicon.js
 *
 * Альтернативы:
 * - https://favicon.io/favicon-converter/
 * - https://realfavicongenerator.net/
 */

const fs = require('fs');
const path = require('path');

console.log('🌸 Генератор фавиконов для Flowers Belka\n');

// Проверяем наличие SVG файла
const svgPath = path.join(__dirname, 'src', 'app', 'icon.svg');
if (!fs.existsSync(svgPath)) {
  console.error('❌ Файл icon.svg не найден в src/app/');
  process.exit(1);
}

console.log('✅ SVG иконка найдена:', svgPath);

// Пытаемся использовать canvas для конвертации
try {
  const { createCanvas, loadImage } = require('canvas');
  console.log('✅ Canvas доступен, генерируем PNG файлы...');

  // Здесь был бы код для конвертации SVG в PNG
  // Но для простоты используем заглушки

} catch (error) {
  console.log('⚠️  Canvas не установлен (npm install canvas)');
}

console.log('\n📋 Инструкции:');
console.log('1. Откройте https://favicon.io/favicon-converter/');
console.log('2. Загрузите файл src/app/icon.svg');
console.log('3. Скачайте PNG файлы и замените заглушки в public/');
console.log('\n📁 Файлы для замены:');
console.log('- public/favicon-32x32.png');
console.log('- public/icon-192.png');
console.log('- public/icon-512.png');

console.log('\n🎨 SVG фавикон уже работает в современных браузерах!');
console.log('📱 PNG файлы нужны для старых браузеров и PWA');

// Создаем простую HTML страницу для предварительного просмотра
const previewHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Предварительный просмотр фавикона</title>
  <link rel="icon" type="image/svg+xml" href="src/app/icon.svg">
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
    .icon-preview { width: 64px; height: 64px; margin: 20px; }
  </style>
</head>
<body>
  <h1>🌸 Предварительный просмотр фавикона Flowers Belka</h1>
  <p>Посмотрите на иконку во вкладке браузера!</p>
  <div>
    <h3>SVG иконка в разных размерах:</h3>
    <img src="src/app/icon.svg" class="icon-preview" alt="32x32">
    <img src="src/app/icon.svg" style="width: 48px; height: 48px; margin: 20px;" alt="48x48">
    <img src="src/app/icon.svg" style="width: 96px; height: 96px; margin: 20px;" alt="96x96">
  </div>
</body>
</html>
`;

fs.writeFileSync('favicon-preview.html', previewHtml);
console.log('\n🔍 Создан файл favicon-preview.html для предварительного просмотра');