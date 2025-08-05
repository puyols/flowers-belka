const fs = require('fs');
const path = require('path');

// Товары для добавления
const productsToAdd = [
  {
    name: 'Букет из гипсофилы',
    slug: 'buket_sukhotsvet_004',
    price: 2500,
    category: 'bukety_tsvetov',
    description: 'Нежный букет из белой гипсофилы. Воздушный и романтичный букет для особых моментов.',
    tags: ['Гипсофила', 'Белые', 'Нежный', 'Романтика']
  },
  {
    name: 'Букет пионов 011',
    slug: 'buket011',
    price: 4100,
    category: 'bukety_tsvetov',
    description: 'Роскошный букет из свежих пионов. Идеальный подарок для весенних праздников.',
    tags: ['Пионы', 'Весенний', 'Роскошный', '8 марта']
  },
  {
    name: 'Букет пионов 012',
    slug: 'buket012',
    price: 4100,
    category: 'bukety_tsvetov',
    description: 'Элегантный букет из нежных пионов. Символ богатства и процветания.',
    tags: ['Пионы', 'Элегантный', 'Нежный', 'День рождения']
  },
  {
    name: 'Букет пионов 048',
    slug: 'buket048',
    price: 5400,
    category: 'bukety_tsvetov',
    description: 'Пышный букет из крупных пионов. Великолепный подарок для любимой.',
    tags: ['Пионы', 'Пышный', 'Любимой', 'Роскошный']
  },
  {
    name: 'Букет пионов 049',
    slug: 'buket049',
    price: 5400,
    category: 'bukety_tsvetov',
    description: 'Изысканный букет из ароматных пионов. Воплощение нежности и красоты.',
    tags: ['Пионы', 'Изысканный', 'Ароматный', 'Красота']
  },
  {
    name: 'Букет роз 021',
    slug: 'buket021',
    price: 9900,
    category: 'bukety_tsvetov',
    description: 'Роскошный букет из премиальных роз. Идеальный подарок для особых случаев.',
    tags: ['Розы', 'Роскошный', 'Премиум', 'Особый случай']
  },
  {
    name: 'Букет роз 023',
    slug: 'buket023',
    price: 6500,
    category: 'bukety_tsvetov',
    description: 'Элегантный букет из отборных роз. Классический подарок для выражения чувств.',
    tags: ['Розы', 'Элегантный', 'Классический', 'Чувства']
  },
  {
    name: 'Букет роз 033',
    slug: 'buket033',
    price: 3500,
    category: 'bukety_tsvetov',
    description: 'Нежный букет из свежих роз. Прекрасный способ показать свою заботу.',
    tags: ['Розы', 'Нежный', 'Свежий', 'Забота']
  }
];

function getNextId() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Находим максимальный ID
  const idMatches = content.match(/id:\s*'(\d+)'/g);
  let maxId = 0;
  
  if (idMatches) {
    idMatches.forEach(match => {
      const id = parseInt(match.match(/id:\s*'(\d+)'/)[1]);
      if (id > maxId) maxId = id;
    });
  }
  
  return maxId + 1;
}

function generateProductCode(product, id) {
  const imageUrl = `https://flowers-belka.ru/image/cache/catalog/bukety/${product.slug}-500x500.jpg`;
  
  return `  {
    id: '${id}',
    name: '${product.name}',
    slug: '${product.slug}',
    price: ${product.price},
    images: [
      '${imageUrl}'
    ],
    description: '${product.description}',
    category: '${product.category}',
    isHit: false,
    tags: [${product.tags.map(tag => `'${tag}'`).join(', ')}],
  },`;
}

function addMissingProducts() {
  console.log('➕ Добавление недостающих товаров...\n');
  
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  let nextId = getNextId();
  let addedCount = 0;
  
  // Находим место для вставки (перед закрывающей скобкой массива)
  const insertPosition = content.lastIndexOf('];');
  
  if (insertPosition === -1) {
    console.error('❌ Не удалось найти место для вставки товаров');
    return;
  }
  
  let newProducts = '';
  
  productsToAdd.forEach(product => {
    const productCode = generateProductCode(product, nextId);
    newProducts += '\n' + productCode;
    
    console.log(`✅ Добавлен: ${product.name} (ID: ${nextId}, цена: ${product.price}₽)`);
    nextId++;
    addedCount++;
  });
  
  // Вставляем новые товары
  const beforeInsert = content.substring(0, insertPosition);
  const afterInsert = content.substring(insertPosition);
  
  const updatedContent = beforeInsert + newProducts + '\n' + afterInsert;
  
  // Записываем обновленный файл
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  console.log(`\n🎉 Успешно добавлено ${addedCount} товаров!`);
  console.log('\n📊 Новая статистика:');
  console.log(`   Букеты: ${64 + addedCount} товаров (было 64)`);
  console.log(`   Розы: 10 товаров`);
  console.log(`   Всего: ${74 + addedCount} товаров`);
}

// Запускаем добавление
addMissingProducts();
