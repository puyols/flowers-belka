const fs = require('fs');
const path = require('path');

// Данные с оригинального сайта (собранные с браузера)
const originalSiteData = {
  // Розы (19 товаров на сайте)
  rozy: [
    { name: 'Букет белых роз', price: 2700, slug: 'beliye_rozy' },
    { name: 'Букет из 15 сиреневых роз', price: 2700, slug: 'sireneviye_rozy_kenia' },
    { name: 'Букет из 25 небольших красных роз', price: 4250, slug: 'krasniye_rozy_keniya' },
    { name: 'Букет из 51 белой розы', price: 14280, slug: '51_belaya_roza' },
    { name: 'Букет из красных роз', price: 2700, slug: 'krasniye_rozy' },
    { name: 'Букет из персиковых роз', price: 2700, slug: 'persikoviye_rozy' },
    { name: 'Букет из пионовидных белых роз', price: 8800, slug: 'beliye_pionovidnuye_rozy' },
    { name: 'Букет из пионовидных розовых роз', price: 8800, slug: 'rozoviye_pionovidnuye_rozy' },
    { name: 'Букет из розовых роз', price: 2700, slug: 'rozoviye_rozy' },
    { name: 'Букет из сиреневых роз', price: 2700, slug: 'sireneviye_rozy' }
  ],

  // Букеты (72 товара - полный список с 3 страниц)
  bukety_tsvetov: [
    // Страница 1 (24 товара)
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
    
    // Страница 2 (24 товара)
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
    { name: 'Букет цветов 026', price: 7100, slug: 'buket026' },
    
    // Страница 3 (24 товара)
    { name: 'Букет цветов 027', price: 5900, slug: 'buket027' },
    { name: 'Букет цветов 028', price: 7200, slug: 'buket028' },
    { name: 'Букет цветов 029', price: 4300, slug: 'buket029' },
    { name: 'Букет цветов 030', price: 5500, slug: 'buket030' },
    { name: 'Букет цветов 031', price: 8100, slug: 'buket031' },
    { name: 'Букет цветов 032', price: 4000, slug: 'buket032' },
    { name: 'Букет цветов 036', price: 4700, slug: 'buket036' },
    { name: 'Букет цветов 037', price: 3800, slug: 'buket037' },
    { name: 'Букет цветов 038', price: 4900, slug: 'buket038' },
    { name: 'Букет цветов 039', price: 5000, slug: 'buket039' },
    { name: 'Букет цветов 040', price: 5000, slug: 'buket040' },
    { name: 'Букет цветов 041', price: 4200, slug: 'buket041' },
    { name: 'Букет цветов 042', price: 3900, slug: 'buket042' },
    { name: 'Букет цветов 043', price: 5700, slug: 'buket043' },
    { name: 'Букет цветов 044', price: 6500, slug: 'buket044' },
    { name: 'Букет цветов 045', price: 4500, slug: 'buket045' },
    { name: 'Букет цветов 046', price: 5300, slug: 'buket046' },
    { name: 'Букет цветов 047', price: 5900, slug: 'buket047' },
    { name: 'Букет цветов 050', price: 6800, slug: 'buket050' },
    { name: 'Букет цветов 051', price: 6000, slug: 'buket051' },
    { name: 'Букет цветов 052', price: 4000, slug: 'buket052' },
    { name: 'Букет цветов 053', price: 4300, slug: 'buket053' },
    { name: 'Букет цветов 055', price: 4300, slug: 'buket055' },
    { name: 'Букет весна 006', price: 4900, slug: 'vesna006' }
  ]
};

// Читаем наши данные из файла
function loadOurProducts() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
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

function syncProducts() {
  console.log('🔄 Синхронизация с оригинальным сайтом...\n');
  
  const allProducts = loadOurProducts();
  let toRemove = [];
  let toAdd = [];
  let stats = {
    bukety_tsvetov: { our: 0, original: 0, toRemove: 0, toAdd: 0 },
    rozy: { our: 0, original: 0, toRemove: 0, toAdd: 0 }
  };
  
  // Анализируем каждую категорию
  for (const [category, originalProducts] of Object.entries(originalSiteData)) {
    const ourProducts = allProducts.filter(p => p.category === category);
    
    stats[category].our = ourProducts.length;
    stats[category].original = originalProducts.length;
    
    console.log(`📂 Категория: ${category}`);
    console.log(`   Наших товаров: ${ourProducts.length}`);
    console.log(`   На оригинальном сайте: ${originalProducts.length}`);
    
    // Находим товары для удаления (есть у нас, но нет на сайте)
    const productsToRemove = ourProducts.filter(ourProduct => {
      return !originalProducts.find(original => 
        original.name === ourProduct.name || 
        original.slug === ourProduct.slug
      );
    });
    
    // Находим товары для добавления (есть на сайте, но нет у нас)
    const productsToAdd = originalProducts.filter(originalProduct => {
      return !ourProducts.find(our => 
        our.name === originalProduct.name || 
        our.slug === originalProduct.slug
      );
    });
    
    stats[category].toRemove = productsToRemove.length;
    stats[category].toAdd = productsToAdd.length;
    
    if (productsToRemove.length > 0) {
      console.log(`   ❌ К удалению: ${productsToRemove.length}`);
      productsToRemove.forEach(product => {
        console.log(`      - ${product.name} (${product.slug})`);
        toRemove.push(product);
      });
    }
    
    if (productsToAdd.length > 0) {
      console.log(`   ➕ К добавлению: ${productsToAdd.length}`);
      productsToAdd.forEach(product => {
        console.log(`      + ${product.name} (${product.slug}) - ${product.price}₽`);
        toAdd.push({ ...product, category });
      });
    }
    
    console.log('');
  }
  
  console.log('📊 Общая статистика:');
  console.log(`   Всего к удалению: ${toRemove.length}`);
  console.log(`   Всего к добавлению: ${toAdd.length}`);
  
  return { toRemove, toAdd, stats };
}

// Запускаем синхронизацию
const result = syncProducts();
console.log('\n✨ Анализ завершен!');
console.log('\nДля применения изменений запустите:');
console.log('node scripts/apply-sync.js');
