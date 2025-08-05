const fs = require('fs');
const path = require('path');
const https = require('https');

// Список изображений для скачивания с продакшена
const imagesToDownload = [
  // Фоновое изображение для херо блока (уже есть)
  // {
  //   url: 'https://flowers-belka.ru/image/catalog/image_fx_.jpg',
  //   filename: 'hero-background-gift.jpg'
  // },
  
  // Иконки для блока "Почему выбирают нас"
  {
    url: 'https://flowers-belka.ru/image/catalog/image_fx_%20(39).jpg',
    filename: 'features/24-7.jpg'
  },
  {
    url: 'https://flowers-belka.ru/image/catalog/image_fx_%20(40).jpg', 
    filename: 'features/whatsapp.jpg'
  },
  {
    url: 'https://flowers-belka.ru/image/catalog/image_fx_%20(41).jpg',
    filename: 'features/assortment.jpg'
  },
  {
    url: 'https://flowers-belka.ru/image/catalog/image_fx_%20(43).jpg',
    filename: 'features/quality.jpg'
  },
  
  // Дополнительные изображения
  {
    url: 'https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png',
    filename: 'logo-horizontal.png'
  }
];

// Функция для скачивания файла
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filepath}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Удаляем файл при ошибке
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Основная функция
async function downloadImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  
  console.log('🚀 Начинаем скачивание изображений...');
  
  for (const image of imagesToDownload) {
    try {
      const filepath = path.join(publicDir, image.filename);
      await downloadFile(image.url, filepath);
    } catch (error) {
      console.error(`❌ Ошибка при скачивании ${image.filename}:`, error.message);
    }
  }
  
  console.log('🎉 Скачивание завершено!');
}

// Запускаем скрипт
downloadImages().catch(console.error);
