// Скрипт для парсинга актуальных данных с flowers-belka.ru
// Запускать в консоли браузера на странице https://flowers-belka.ru/

function parseProductsFromPage() {
    const products = [];
    
    // Находим все карточки товаров
    const productCards = document.querySelectorAll('.product-item, .product-card, [data-product-id]');
    
    if (productCards.length === 0) {
        // Альтернативный селектор для карточек
        const alternativeCards = document.querySelectorAll('a[href*="/bukety_tsvetov/"], a[href*="/rozy/"], a[href*="/tulpany/"], a[href*="/tsvety_v_korobke/"], a[href*="/piony/"]');
        
        alternativeCards.forEach((card, index) => {
            try {
                const link = card.href;
                const nameElement = card.querySelector('img') || card.querySelector('[alt]');
                const name = nameElement ? (nameElement.alt || nameElement.title || '') : '';
                
                // Ищем цену рядом с карточкой
                let priceElement = card.parentElement.querySelector('.price, [class*="price"], [class*="cost"]');
                if (!priceElement) {
                    priceElement = card.closest('.product-item, .product-card, .item')?.querySelector('.price, [class*="price"]');
                }
                
                const priceText = priceElement ? priceElement.textContent.trim() : '';
                const price = priceText.match(/[\d\s]+/)?.[0]?.replace(/\s/g, '') || '0';
                
                // Ищем изображение
                const imgElement = card.querySelector('img');
                const image = imgElement ? imgElement.src : '';
                
                if (name && link) {
                    products.push({
                        id: `parsed_${index + 1}`,
                        name: name.trim(),
                        slug: link.split('/').pop() || `product_${index + 1}`,
                        price: parseInt(price) || 0,
                        link: link,
                        image: image,
                        category: getCategoryFromLink(link),
                        parsedAt: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error('Ошибка парсинга товара:', error);
            }
        });
    }
    
    return products;
}

function getCategoryFromLink(link) {
    if (link.includes('/bukety_tsvetov/')) return 'bukety_tsvetov';
    if (link.includes('/rozy/')) return 'rozy';
    if (link.includes('/tulpany/')) return 'tulpany';
    if (link.includes('/tsvety_v_korobke/')) return 'tsvety_v_korobke';
    if (link.includes('/piony/')) return 'piony';
    if (link.includes('/sukhotsvety/')) return 'sukhotsvety';
    return 'other';
}

function parseProductsFromHTML() {
    const products = [];
    
    // Парсим товары из HTML структуры
    const productElements = document.querySelectorAll('div[class*="product"], .product-item');
    
    productElements.forEach((element, index) => {
        try {
            // Ищем ссылку на товар
            const linkElement = element.querySelector('a[href*="/bukety_tsvetov/"], a[href*="/rozy/"], a[href*="/tulpany/"]');
            if (!linkElement) return;
            
            const link = linkElement.href;
            
            // Название товара
            const nameElement = linkElement.querySelector('img') || element.querySelector('[alt]') || linkElement;
            const name = nameElement.alt || nameElement.title || nameElement.textContent?.trim() || '';
            
            // Цена
            const priceElement = element.querySelector('[class*="price"], .price');
            const priceText = priceElement ? priceElement.textContent : '';
            const priceMatch = priceText.match(/₽?([\d\s,]+)/);
            const price = priceMatch ? parseInt(priceMatch[1].replace(/[\s,]/g, '')) : 0;
            
            // Изображение
            const imgElement = element.querySelector('img');
            const image = imgElement ? imgElement.src : '';
            
            // Проверяем на хит продаж
            const isHit = element.textContent.includes('Хит продаж') || element.querySelector('[class*="hit"], [class*="bestseller"]');
            
            if (name && link && price > 0) {
                products.push({
                    id: `product_${index + 1}`,
                    name: name.trim(),
                    slug: link.split('/').pop() || `product_${index + 1}`,
                    price: price,
                    link: link,
                    image: image,
                    category: getCategoryFromLink(link),
                    isHit: !!isHit,
                    parsedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Ошибка парсинга товара:', error, element);
        }
    });
    
    return products;
}

// Основная функция парсинга
function parseAllProducts() {
    console.log('🔍 Начинаем парсинг товаров с flowers-belka.ru...');
    
    let products = parseProductsFromHTML();
    
    if (products.length === 0) {
        console.log('⚠️ Первый метод не дал результатов, пробуем альтернативный...');
        products = parseProductsFromPage();
    }
    
    console.log(`✅ Найдено товаров: ${products.length}`);
    
    // Группируем по категориям
    const categories = {};
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });
    
    console.log('📊 Товары по категориям:');
    Object.keys(categories).forEach(cat => {
        console.log(`  ${cat}: ${categories[cat].length} товаров`);
    });
    
    // Выводим первые 5 товаров для проверки
    console.log('🔍 Примеры найденных товаров:');
    products.slice(0, 5).forEach(product => {
        console.log(`  ${product.name} - ${product.price}₽ (${product.category})`);
    });
    
    return {
        products: products,
        categories: categories,
        summary: {
            total: products.length,
            byCategory: Object.keys(categories).map(cat => ({
                category: cat,
                count: categories[cat].length
            }))
        }
    };
}

// Функция для экспорта в JSON
function exportToJSON(data) {
    const jsonString = JSON.stringify(data, null, 2);
    console.log('📄 JSON данные:');
    console.log(jsonString);
    
    // Создаем ссылку для скачивания
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowers-belka-products-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('💾 Файл готов к скачиванию!');
}

// Запуск парсинга
console.log('🚀 Скрипт парсинга flowers-belka.ru готов!');
console.log('📝 Для запуска выполните: parseAllProducts()');
console.log('💾 Для экспорта в JSON: exportToJSON(parseAllProducts())');

// Автоматический запуск если нужно
// const result = parseAllProducts();
// exportToJSON(result);
