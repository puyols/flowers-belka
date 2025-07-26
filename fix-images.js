const fs = require('fs');
const path = require('path');

// Функция для извлечения имени файла из URL
function extractImageName(url) {
  try {
    // Декодируем URL
    const decodedUrl = decodeURIComponent(url);
    
    // Извлекаем имя файла
    const parts = decodedUrl.split('/');
    let fileName = parts[parts.length - 1];
    
    // Убираем размеры из имени файла (например, -250x250h.jpg)
    fileName = fileName.replace(/-\d+x\d+[hw]?\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.$1');
    
    return fileName;
  } catch (error) {
    console.error('Ошибка при извлечении имени файла:', error);
    return null;
  }
}

// Функция для поиска соответствующего локального файла
function findLocalImage(imageName, localImages) {
  // Прямое совпадение
  if (localImages.includes(imageName)) {
    return imageName;
  }
  
  // Поиск без учета регистра
  const lowerImageName = imageName.toLowerCase();
  const found = localImages.find(img => img.toLowerCase() === lowerImageName);
  if (found) {
    return found;
  }
  
  // Поиск по части имени (без расширения)
  const nameWithoutExt = imageName.replace(/\.(jpg|jpeg|png)$/i, '');
  const foundPartial = localImages.find(img => {
    const imgWithoutExt = img.replace(/\.(jpg|jpeg|png)$/i, '');
    return imgWithoutExt.toLowerCase().includes(nameWithoutExt.toLowerCase()) ||
           nameWithoutExt.toLowerCase().includes(imgWithoutExt.toLowerCase());
  });
  
  return foundPartial || null;
}

// Основная функция
function fixImages() {
  try {
    console.log('Исправляем пути к изображениям...');
    
    // Читаем список локальных изображений
    const imagesDir = './flowers-belka-nextjs/public/images/products';
    const localImages = fs.readdirSync(imagesDir).filter(file => 
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
    );
    
    console.log(`Найдено ${localImages.length} локальных изображений`);
    
    // Читаем файл с товарами
    const filePath = './flowers-belka-nextjs/src/data/products-parsed.ts';
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Находим все URL изображений
    const imageUrlRegex = /'https:\/\/flowers-belka\.ru\/image\/cache\/catalog\/[^']+'/g;
    const matches = content.match(imageUrlRegex);
    
    if (!matches) {
      console.log('URL изображений не найдены');
      return;
    }
    
    console.log(`Найдено ${matches.length} URL изображений для замены`);
    
    let replacedCount = 0;
    let notFoundCount = 0;
    
    // Заменяем каждый URL
    matches.forEach(match => {
      const url = match.slice(1, -1); // Убираем кавычки
      const imageName = extractImageName(url);
      
      if (imageName) {
        const localImage = findLocalImage(imageName, localImages);
        
        if (localImage) {
          const newPath = `'/images/products/${localImage}'`;
          content = content.replace(match, newPath);
          console.log(`✅ ${imageName} → ${localImage}`);
          replacedCount++;
        } else {
          console.log(`❌ Не найдено локальное изображение для: ${imageName}`);
          // Заменяем на placeholder
          const placeholderPath = `'/images/placeholder.jpg'`;
          content = content.replace(match, placeholderPath);
          notFoundCount++;
        }
      }
    });
    
    // Сохраняем обновленный файл
    fs.writeFileSync(filePath, content);
    
    console.log(`\n🎉 Готово!`);
    console.log(`✅ Заменено: ${replacedCount} изображений`);
    console.log(`❌ Не найдено: ${notFoundCount} изображений (заменены на placeholder)`);
    console.log('Все внешние URL заменены на локальные пути.');
    
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Запускаем
fixImages();
