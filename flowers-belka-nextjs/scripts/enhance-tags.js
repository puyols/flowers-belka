const fs = require('fs');
const path = require('path');

// Словарь для улучшения тегов
const enhancementDictionary = {
  // Цвета
  'Красные': ['красн', 'red'],
  'Белые': ['бел', 'white'],
  'Розовые': ['розов', 'pink'],
  'Желтые': ['желт', 'yellow'],
  'Сиреневые': ['сиренев', 'фиолет', 'purple'],
  'Персиковые': ['персиков', 'peach'],
  'Оранжевые': ['оранжев', 'orange'],
  
  // Количество
  '5 штук': ['5 ', 'пять '],
  '7 штук': ['7 ', 'семь '],
  '9 штук': ['9 ', 'девять '],
  '11 штук': ['11 ', 'одиннадцать '],
  '15 штук': ['15 ', 'пятнадцать '],
  '21 штука': ['21 ', 'двадцать один'],
  '25 штук': ['25 ', 'двадцать пять'],
  '51 штука': ['51 ', 'пятьдесят один'],
  '101 штука': ['101 ', 'сто один'],
  
  // Типы роз
  'Эквадорские': ['эквадор', 'ecuador'],
  'Кенийские': ['кени', 'kenya'],
  'Пионовидные': ['пионовидн', 'peony'],
  'Кустовые': ['кустов', 'spray'],
  
  // Типы коробок
  'Круглая коробка': ['кругл', 'round'],
  'Квадратная коробка': ['квадрат', 'square'],
  'Коробка-сердце': ['сердц', 'heart'],
  'Большая коробка': ['больш', 'big'],
  'Маленькая коробка': ['мален', 'мини', 'small'],
  
  // Поводы
  '8 марта': ['8 март', 'женск', 'international women'],
  'День рождения': ['день рожден', 'birthday'],
  'Свадьба': ['свадеб', 'wedding'],
  'Романтика': ['романт', 'romantic', 'любов', 'love'],
  
  // Стили
  'Весенний': ['весенн', 'spring'],
  'Летний': ['летн', 'summer'],
  'Осенний': ['осенн', 'autumn'],
  'Зимний': ['зимн', 'winter'],
  'Нежный': ['нежн', 'tender'],
  'Яркий': ['ярк', 'bright'],
  'Элегантный': ['элегант', 'elegant'],
  'Роскошный': ['роскош', 'luxury']
};

function findEnhancements(text, existingTags) {
  const foundEnhancements = [];
  const lowerText = text.toLowerCase();
  const existingTagsLower = existingTags.map(tag => tag.toLowerCase()).join(' ');
  
  for (const [enhancement, variations] of Object.entries(enhancementDictionary)) {
    // Проверяем, что такого тега еще нет
    if (!existingTagsLower.includes(enhancement.toLowerCase())) {
      for (const variation of variations) {
        if (lowerText.includes(variation)) {
          foundEnhancements.push(enhancement);
          break;
        }
      }
    }
  }
  
  return foundEnhancements;
}

function enhanceProductTags() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  let currentProduct = null;
  let inProduct = false;
  let processedCount = 0;
  let enhancedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Начало нового продукта
    if (line.includes('id:') && line.includes("'")) {
      inProduct = true;
      currentProduct = {
        id: '',
        name: '',
        description: '',
        tags: [],
        category: '',
        lineStart: i
      };
    }
    
    // Сбор данных о продукте
    if (inProduct) {
      if (line.includes('name:')) {
        const nameMatch = line.match(/name:\s*'([^']+)'/);
        if (nameMatch) {
          currentProduct.name = nameMatch[1];
        }
      }
      
      if (line.includes('description:')) {
        let descLine = line;
        let j = i;
        while (j < lines.length && !descLine.includes("',")) {
          if (j > i) descLine += lines[j];
          j++;
        }
        currentProduct.description = descLine;
      }
      
      if (line.includes('category:')) {
        const categoryMatch = line.match(/category:\s*'([^']+)'/);
        if (categoryMatch) {
          currentProduct.category = categoryMatch[1];
        }
      }
      
      if (line.includes('tags:')) {
        currentProduct.tags = line;
        currentProduct.tagsLineIndex = i;
      }
    }
    
    // Конец продукта
    if (line.includes('},') && inProduct && ['bukety_tsvetov', 'rozy', 'tulpany', 'tsvety_v_korobke'].includes(currentProduct.category)) {
      processedCount++;
      
      // Анализируем текст и ищем улучшения
      const allText = `${currentProduct.name} ${currentProduct.description}`;
      
      // Парсим существующие теги
      const tagsMatch = currentProduct.tags.match(/\[(.*?)\]/);
      let existingTags = [];
      if (tagsMatch) {
        existingTags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/'/g, ''));
      }
      
      // Ищем улучшения
      const enhancements = findEnhancements(allText, existingTags);
      
      if (enhancements.length > 0 && currentProduct.tagsLineIndex !== undefined) {
        // Добавляем новые теги
        const allTags = [...existingTags, ...enhancements];
        const uniqueTags = [...new Set(allTags)];

        // Формируем новую строку с тегами
        const newTagsLine = `    tags: [${uniqueTags.map(tag => `'${tag}'`).join(', ')}],`;
        lines[currentProduct.tagsLineIndex] = newTagsLine;
        enhancedCount++;

        console.log(`Улучшен товар "${currentProduct.name}": добавлены теги ${enhancements.join(', ')}`);
        console.log(`  Старые теги: [${existingTags.join(', ')}]`);
        console.log(`  Новые теги: [${uniqueTags.join(', ')}]`);
      }
      
      inProduct = false;
      currentProduct = null;
    }
  }
  
  // Записываем обновленный файл
  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Файл обновлен! Обработано ${processedCount} товаров, улучшено ${enhancedCount}.`);
}

// Запускаем улучшение
enhanceProductTags();
