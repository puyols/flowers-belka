const fs = require('fs');
const path = require('path');

// Читаем наши данные из файла
function loadOurProducts() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  // Простой парсинг для извлечения данных о товарах
  const products = [];
  const lines = content.split('\n');
  let currentProduct = null;
  let inProduct = false;

  for (const line of lines) {
    if (line.includes('id:') && line.includes("'")) {
      inProduct = true;
      currentProduct = {};
    }

    if (inProduct) {
      if (line.includes('name:')) {
        const nameMatch = line.match(/name:\s*'([^']+)'/);
        if (nameMatch) currentProduct.name = nameMatch[1];
      }

      if (line.includes('slug:')) {
        const slugMatch = line.match(/slug:\s*'([^']+)'/);
        if (slugMatch) currentProduct.slug = slugMatch[1];
      }

      if (line.includes('price:')) {
        const priceMatch = line.match(/price:\s*(\d+)/);
        if (priceMatch) currentProduct.price = parseInt(priceMatch[1]);
      }

      if (line.includes('category:')) {
        const categoryMatch = line.match(/category:\s*'([^']+)'/);
        if (categoryMatch) currentProduct.category = categoryMatch[1];
      }
    }

    if (line.includes('},') && inProduct) {
      if (currentProduct.name && currentProduct.category) {
        products.push(currentProduct);
      }
      inProduct = false;
      currentProduct = null;
    }
  }

  return products;
}

// Данные с оригинального сайта (собранные вручную)
const originalSiteProducts = {
  bukety_tsvetov: [
    // Страница 1
    { name: 'Букет весна 001', price: 4400, slug: 'vesna001' },
    { name: 'Букет весна 002', price: 4600, slug: 'vesna002' },
    { name: 'Букет весна 003', price: 7500, slug: 'vesna003' },
    { name: 'Букет весна 004', price: 4400, slug: 'vesna004' },
    { name: 'Букет весна 005', price: 9000, slug: 'vesna005' },
    { name: 'Букет весна 008', price: 3400, slug: 'vesna008' },
    { name: 'Букет весна 009', price: 5400, slug: 'vesna009' },
    { name: 'Букет весна 010', price: 8000, slug: 'vesna010' },
    { name: 'Букет весна 011', price: 4500, slug: 'vesna011' },
    { name: 'Букет весна 012', price: 3400, slug: 'vesna012' },
    { name: 'Букет весна 016', price: 6600, slug: 'vesna016' },
    { name: 'Букет весна 017', price: 6600, slug: 'vesna017' },
    { name: 'Букет весна 018', price: 4500, slug: 'vesna018' },
    { name: 'Букет гвоздик 017', price: 5800, slug: 'buket017' },
    { name: 'Букет гортензий Верена', price: 5300, slug: 'buket_verena' },
    { name: 'Букет из гипсофилы', price: 2500, slug: 'buket_sukhotsvet_004' },
    { name: 'Букет из кустовой розы', price: 6000, slug: 'kustoviye_rozy' },
    { name: 'Букет пионов 011', price: 4100, slug: 'buket011' },
    { name: 'Букет пионов 012', price: 4100, slug: 'buket012' },
    { name: 'Букет пионов 048', price: 5400, slug: 'buket048' },
    { name: 'Букет пионов 049', price: 5400, slug: 'buket049' },
    { name: 'Букет роз 021', price: 9900, slug: 'buket021' },
    { name: 'Букет роз 023', price: 6500, slug: 'buket023' },
    { name: 'Букет роз 033', price: 3500, slug: 'buket033' },
    
    // Страница 2
    { name: 'Букет роз 034', price: 4500, slug: 'buket034' },
    { name: 'Букет роз 035', price: 4500, slug: 'buket035' },
    { name: 'Букет с сиренью', price: 8200, slug: 'buket_s_sirenyu' },
    { name: 'Букет хризантем 054', price: 3300, slug: 'buket054' },
    { name: 'Букет цветов 001', price: 4900, slug: 'buket001' },
    { name: 'Букет цветов 002', price: 3700, slug: 'buket002' },
    { name: 'Букет цветов 003', price: 4500, slug: 'buket003' },
    { name: 'Букет цветов 004', price: 3300, slug: 'buket004' },
    { name: 'Букет цветов 005', price: 3800, slug: 'buket005' },
    { name: 'Букет цветов 006', price: 3500, slug: 'buket006' },
    { name: 'Букет цветов 007', price: 3500, slug: 'buket007' },
    { name: 'Букет цветов 008', price: 3900, slug: 'buket008' },
    { name: 'Букет цветов 009', price: 3300, slug: 'buket009' },
    { name: 'Букет цветов 010', price: 4600, slug: 'buket010' },
    { name: 'Букет цветов 014', price: 3900, slug: 'buket014' },
    { name: 'Букет цветов 015', price: 4300, slug: 'buket015' },
    { name: 'Букет цветов 016', price: 4200, slug: 'buket016' },
    { name: 'Букет цветов 018', price: 3800, slug: 'buket018' },
    { name: 'Букет цветов 019', price: 4200, slug: 'buket019' },
    { name: 'Букет цветов 020', price: 6500, slug: 'buket020' },
    { name: 'Букет цветов 022', price: 6500, slug: 'buket022' },
    { name: 'Букет цветов 024', price: 3500, slug: 'buket024' },
    { name: 'Букет цветов 025', price: 4000, slug: 'buket025' },
    { name: 'Букет цветов 026', price: 7100, slug: 'buket026' }
  ]
};

function verifyProducts() {
  console.log('🔍 Проверка соответствия товаров с оригинальным сайтом...\n');

  const allProducts = loadOurProducts();
  const ourBukety = allProducts.filter(p => p.category === 'bukety_tsvetov');
  const originalBukety = originalSiteProducts.bukety_tsvetov;
  
  console.log(`📊 Статистика:`);
  console.log(`   Наших букетов: ${ourBukety.length}`);
  console.log(`   На оригинальном сайте: ${originalBukety.length}`);
  console.log('');
  
  // Проверяем каждый товар с оригинального сайта
  let foundCount = 0;
  let priceMatchCount = 0;
  let missingProducts = [];
  let priceMismatches = [];
  
  originalBukety.forEach(originalProduct => {
    const ourProduct = ourBukety.find(p => 
      p.name === originalProduct.name || 
      p.slug === originalProduct.slug
    );
    
    if (ourProduct) {
      foundCount++;
      if (ourProduct.price === originalProduct.price) {
        priceMatchCount++;
        console.log(`✅ ${originalProduct.name} - цена совпадает (${originalProduct.price})`);
      } else {
        priceMismatches.push({
          name: originalProduct.name,
          ourPrice: ourProduct.price,
          originalPrice: originalProduct.price
        });
        console.log(`⚠️  ${originalProduct.name} - цена НЕ совпадает: наша ${ourProduct.price}, оригинал ${originalProduct.price}`);
      }
    } else {
      missingProducts.push(originalProduct);
      console.log(`❌ ${originalProduct.name} - НЕ НАЙДЕН в нашей базе`);
    }
  });
  
  console.log('\n📈 Результаты проверки:');
  console.log(`   Найдено товаров: ${foundCount}/${originalBukety.length}`);
  console.log(`   Цены совпадают: ${priceMatchCount}/${foundCount}`);
  console.log(`   Отсутствующих товаров: ${missingProducts.length}`);
  console.log(`   Несоответствий цен: ${priceMismatches.length}`);
  
  if (missingProducts.length > 0) {
    console.log('\n❌ Отсутствующие товары:');
    missingProducts.forEach(product => {
      console.log(`   - ${product.name} (${product.slug})`);
    });
  }
  
  if (priceMismatches.length > 0) {
    console.log('\n⚠️  Несоответствия цен:');
    priceMismatches.forEach(product => {
      console.log(`   - ${product.name}: наша ${product.ourPrice} ≠ оригинал ${product.originalPrice}`);
    });
  }
  
  // Проверяем, есть ли у нас лишние товары
  const extraProducts = ourBukety.filter(ourProduct => {
    return !originalBukety.find(original => 
      original.name === ourProduct.name || 
      original.slug === ourProduct.slug
    );
  });
  
  if (extraProducts.length > 0) {
    console.log(`\n🔍 Дополнительные товары в нашей базе (${extraProducts.length}):`);
    extraProducts.forEach(product => {
      console.log(`   + ${product.name} (${product.slug}) - ${product.price}₽`);
    });
  }
  
  console.log('\n✨ Проверка завершена!');
}

// Запускаем проверку
verifyProducts();
