const fs = require('fs');
const https = require('https');
const http = require('http');

// Читаем файл с данными
const fileContent = fs.readFileSync('./src/data/products-parsed.ts', 'utf8');

// Извлекаем все ссылки на изображения
const imageRegex = /'(https:\/\/flowers-belka\.ru\/[^']+)'/g;
const images = [];
let match;

while ((match = imageRegex.exec(fileContent)) !== null) {
  images.push(match[1]);
}

console.log(`Найдено ${images.length} изображений для проверки...`);

// Функция для проверки доступности URL
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 300
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        ok: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        ok: false,
        error: 'Timeout'
      });
    });
  });
}

// Проверяем все изображения
async function checkAllImages() {
  const results = [];
  const brokenImages = [];
  
  console.log('Начинаем проверку...\n');
  
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    process.stdout.write(`\rПроверяем ${i + 1}/${images.length}: ${url.substring(0, 60)}...`);
    
    const result = await checkUrl(url);
    results.push(result);
    
    if (!result.ok) {
      brokenImages.push(result);
    }
    
    // Небольшая задержка чтобы не перегружать сервер
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n\nРезультаты проверки:');
  console.log(`✅ Работающих изображений: ${results.filter(r => r.ok).length}`);
  console.log(`❌ Неработающих изображений: ${brokenImages.length}`);
  
  if (brokenImages.length > 0) {
    console.log('\n🚨 НЕРАБОТАЮЩИЕ ИЗОБРАЖЕНИЯ:');
    brokenImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.url}`);
      console.log(`   Статус: ${img.status} ${img.error ? `(${img.error})` : ''}\n`);
    });
    
    // Сохраняем список неработающих изображений в файл
    fs.writeFileSync('broken-images.json', JSON.stringify(brokenImages, null, 2));
    console.log('📝 Список неработающих изображений сохранен в broken-images.json');
  } else {
    console.log('\n🎉 Все изображения работают корректно!');
  }
}

checkAllImages().catch(console.error);
