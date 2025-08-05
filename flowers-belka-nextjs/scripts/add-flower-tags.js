const fs = require('fs');
const path = require('path');

// Словарь цветов для поиска в описаниях
const flowerDictionary = {
  'Розы': ['роз', 'rose', 'роза', 'розы', 'розе', 'розу', 'розой', 'розах', 'розами'],
  'Тюльпаны': ['тюльпан', 'tulip', 'тюльпана', 'тюльпаны', 'тюльпане', 'тюльпану', 'тюльпаном', 'тюльпанах', 'тюльпанами'],
  'Хризантемы': ['хризантем', 'chrysanthemum', 'хризантема', 'хризантемы', 'хризантеме', 'хризантему', 'хризантемой', 'хризантемах', 'хризантемами'],
  'Гортензия': ['гортенз', 'hydrangea', 'гортензия', 'гортензии', 'гортензию', 'гортензией', 'гортензиях', 'гортензиями'],
  'Альстромерия': ['альстромер', 'alstroemeria', 'альстромерия', 'альстромерии', 'альстромерию', 'альстромерией', 'альстромериях', 'альстромериями'],
  'Пионы': ['пион', 'peony', 'пиона', 'пионы', 'пионе', 'пиону', 'пионом', 'пионах', 'пионами', 'пионовидн'],
  'Ранункулюсы': ['ранункулюс', 'ranunculus', 'ранункулюса', 'ранункулюсы', 'ранункулюсе', 'ранункулюсу', 'ранункулюсом', 'ранункулюсах', 'ранункулюсами'],
  'Анемоны': ['анемон', 'anemone', 'анемона', 'анемоны', 'анемоне', 'анемону', 'анемоном', 'анемонах', 'анемонами'],
  'Гиацинты': ['гиацинт', 'hyacinth', 'гиацинта', 'гиацинты', 'гиацинте', 'гиацинту', 'гиацинтом', 'гиацинтах', 'гиацинтами'],
  'Гвоздики': ['гвоздик', 'carnation', 'гвоздика', 'гвоздики', 'гвоздике', 'гвоздику', 'гвоздикой', 'гвозди'],
  'Лилии': ['лили', 'lily', 'лилия', 'лилии', 'лилию', 'лилией', 'лилиях', 'лилиями'],
  'Ирисы': ['ирис', 'iris', 'ириса', 'ирисы', 'ирисе', 'ирису', 'ирисом', 'ирисах', 'ирисами'],
  'Эустома': ['эустом', 'lisianthus', 'эустома', 'эустомы', 'эустоме', 'эустому', 'эустомой', 'эустомах', 'эустомами', 'лизиантус'],
  'Сирень': ['сирен', 'lilac', 'сирень', 'сирени', 'сирению', 'сиренью', 'сиренях', 'сиренями'],
  'Фрезия': ['фрези', 'freesia', 'фрезия', 'фрезии', 'фрезию', 'фрезией', 'фрезиях', 'фрезиями'],
  'Орхидеи': ['орхиде', 'orchid', 'орхидея', 'орхидеи', 'орхидею', 'орхидеей', 'орхидеях', 'орхидеями'],
  'Подсолнухи': ['подсолнух', 'sunflower', 'подсолнуха', 'подсолнухи', 'подсолнухе', 'подсолнуху', 'подсолнухом', 'подсолнухах', 'подсолнухами'],
  'Герберы': ['гербер', 'gerbera', 'гербера', 'герберы', 'гербере', 'герберу', 'герберой', 'герберах', 'герберами'],
  'Каллы': ['калл', 'calla', 'калла', 'каллы', 'калле', 'каллу', 'каллой', 'каллах', 'каллами'],
  'Дельфиниум': ['дельфиниум', 'delphinium', 'дельфиниума', 'дельфиниумы', 'дельфиниуме', 'дельфиниуму', 'дельфиниумом'],
  'Аллиум': ['аллиум', 'allium', 'аллиума', 'аллиумы', 'аллиуме', 'аллиуму', 'аллиумом'],
  'Хамелациум': ['хамелациум', 'chamelaucium', 'хамелациума', 'хамелациумы', 'хамелациуме', 'хамелациуму'],
  'Гиперикум': ['гиперикум', 'hypericum', 'гиперикума', 'гиперикумы', 'гиперикуме', 'гиперикуму'],
  'Эвкалипт': ['эвкалипт', 'eucalyptus', 'эвкалипта', 'эвкалипты', 'эвкалипте', 'эвкалипту', 'эвкалиптом']
};

// Словарь цветов роз
const roseColors = {
  'Красные розы': ['красн', 'red'],
  'Белые розы': ['бел', 'white'],
  'Розовые розы': ['розов', 'pink'],
  'Сиреневые розы': ['сиренев', 'фиолет', 'purple', 'violet'],
  'Персиковые розы': ['персиков', 'peach'],
  'Желтые розы': ['желт', 'yellow'],
  'Оранжевые розы': ['оранжев', 'orange']
};

// Словарь типов роз
const roseTypes = {
  'Пионовидные розы': ['пионовидн', 'peony'],
  'Кустовые розы': ['кустов', 'spray'],
  'Эквадорские розы': ['эквадор', 'ecuador'],
  'Кенийские розы': ['кени', 'kenya'],
  'Голландские розы': ['голланд', 'holland']
};

// Словарь для коробок
const boxTypes = {
  'Круглая коробка': ['кругл', 'round'],
  'Квадратная коробка': ['квадрат', 'square'],
  'Коробка-сердце': ['сердц', 'heart'],
  'Большая коробка': ['больш', 'big', 'large'],
  'Маленькая коробка': ['мален', 'мини', 'small', 'mini'],
  'Шляпная коробка': ['шляпн', 'hat']
};

function findFlowersInText(text, category) {
  const foundFlowers = [];
  const lowerText = text.toLowerCase();

  // Ищем основные цветы
  for (const [flowerName, variations] of Object.entries(flowerDictionary)) {
    for (const variation of variations) {
      if (lowerText.includes(variation)) {
        foundFlowers.push(flowerName);
        break;
      }
    }
  }

  // Для роз добавляем специфичные теги
  if (category === 'rozy') {
    // Ищем цвета роз
    for (const [colorName, variations] of Object.entries(roseColors)) {
      for (const variation of variations) {
        if (lowerText.includes(variation)) {
          foundFlowers.push(colorName);
          break;
        }
      }
    }

    // Ищем типы роз
    for (const [typeName, variations] of Object.entries(roseTypes)) {
      for (const variation of variations) {
        if (lowerText.includes(variation)) {
          foundFlowers.push(typeName);
          break;
        }
      }
    }
  }

  // Для цветов в коробке добавляем теги коробок
  if (category === 'tsvety_v_korobke') {
    for (const [boxName, variations] of Object.entries(boxTypes)) {
      for (const variation of variations) {
        if (lowerText.includes(variation)) {
          foundFlowers.push(boxName);
          break;
        }
      }
    }
  }

  return [...new Set(foundFlowers)]; // Убираем дубликаты
}

function updateProductTags() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Разбираем файл на строки
  const lines = content.split('\n');
  let updatedLines = [];
  let currentProduct = null;
  let inProduct = false;
  let processedCount = 0;
  let updatedCount = 0;
  
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
        // Собираем описание (может быть многострочным)
        let descLine = line;
        let j = i;
        while (j < lines.length && !descLine.includes("',")) {
          if (j > i) descLine += lines[j];
          j++;
        }
        currentProduct.description = descLine;
      }
      
      if (line.includes('category:') && line.includes('bukety_tsvetov')) {
        currentProduct.category = 'bukety_tsvetov';
      }
      
      if (line.includes('tags:')) {
        currentProduct.tags = line;
        currentProduct.tagsLineIndex = i;
      }
    }
    
    // Конец продукта
    if (line.includes('},') && inProduct && ['bukety_tsvetov', 'rozy', 'tulpany', 'tsvety_v_korobke'].includes(currentProduct.category)) {
      processedCount++;

      // Анализируем описание и добавляем теги
      const foundFlowers = findFlowersInText(currentProduct.description, currentProduct.category);

      // Если не нашли цветы в описании, попробуем угадать по названию
      if (foundFlowers.length === 0) {
        const nameText = currentProduct.name || '';
        const additionalFlowers = findFlowersInText(nameText, currentProduct.category);
        foundFlowers.push(...additionalFlowers);
      }

      // Если все еще нет цветов, добавим категорийные теги
      if (foundFlowers.length === 0) {
        switch (currentProduct.category) {
          case 'bukety_tsvetov':
            foundFlowers.push('Смешанный букет');
            break;
          case 'rozy':
            foundFlowers.push('Розы');
            break;
          case 'tulpany':
            foundFlowers.push('Тюльпаны');
            break;
          case 'tsvety_v_korobke':
            foundFlowers.push('Цветы в коробке');
            break;
        }
      }

      if (foundFlowers.length > 0 && currentProduct.tagsLineIndex !== undefined) {
        // Парсим существующие теги
        const tagsMatch = currentProduct.tags.match(/\[(.*?)\]/);
        let existingTags = [];
        if (tagsMatch) {
          existingTags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/'/g, ''));
        }
        
        // Добавляем новые теги цветов (только если их еще нет)
        const newFlowerTags = foundFlowers.filter(flower =>
          !existingTags.some(tag => tag.toLowerCase().includes(flower.toLowerCase()))
        );
        const allTags = [...existingTags, ...newFlowerTags];
        const uniqueTags = [...new Set(allTags)];
        
        // Формируем новую строку с тегами только если есть новые теги
        if (newFlowerTags.length > 0) {
          const newTagsLine = `    tags: [${uniqueTags.map(tag => `'${tag}'`).join(', ')}],`;
          lines[currentProduct.tagsLineIndex] = newTagsLine;
          updatedCount++;

          console.log(`Обновлен продукт: добавлены теги ${newFlowerTags.join(', ')}`);
        }
      }
      
      inProduct = false;
      currentProduct = null;
    }
    
    updatedLines.push(lines[i]);
  }
  
  // Записываем обновленный файл
  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Файл обновлен! Обработано ${processedCount} товаров, обновлено ${updatedCount}.`);
}

// Запускаем обновление
updateProductTags();
