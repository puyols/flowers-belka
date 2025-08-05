const fs = require('fs');
const path = require('path');

function testTagUpdate() {
  const filePath = path.join(__dirname, '../src/data/products-parsed.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Найдем конкретный товар "Букет из белых тюльпанов"
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes("name: 'Букет из белых тюльпанов'")) {
      console.log(`Найден товар на строке ${i + 1}: ${line}`);
      
      // Ищем теги этого товара
      for (let j = i; j < i + 10; j++) {
        if (lines[j] && lines[j].includes('tags:')) {
          console.log(`Теги на строке ${j + 1}: ${lines[j]}`);
          
          // Попробуем обновить теги
          const oldLine = lines[j];
          const newLine = "    tags: ['Тюльпан', '8 марта', 'Белые'],";
          lines[j] = newLine;
          
          console.log(`Старая строка: ${oldLine}`);
          console.log(`Новая строка: ${newLine}`);
          
          // Сохраняем файл
          const updatedContent = lines.join('\n');
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          console.log('Файл обновлен!');
          return;
        }
      }
    }
  }
}

testTagUpdate();
