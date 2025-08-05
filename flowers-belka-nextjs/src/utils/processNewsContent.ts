// Утилита для обработки HTML контента новостей и применения стилей

export function processNewsContent(htmlContent: string): string {
  let processedContent = htmlContent;

  // Обрабатываем цветные блоки с разными стилями
  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#fef2f7[^"]*"[^>]*>/g,
    '<div class="colored-block">'
  );

  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#f9f5ff[^"]*"[^>]*>/g,
    '<div class="colored-block colored-block-blue">'
  );

  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#fff9f0[^"]*"[^>]*>/g,
    '<div class="colored-block colored-block-orange">'
  );

  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#f0fdf4[^"]*"[^>]*>/g,
    '<div class="colored-block colored-block-green">'
  );

  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#f5f3ff[^"]*"[^>]*>/g,
    '<div class="colored-block colored-block-cyan">'
  );

  // Обрабатываем внутренние блоки с примерами
  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*#ffffff[^"]*padding[^"]*18px[^"]*"[^>]*>/g,
    '<div class="example-block">'
  );

  // Обрабатываем списки со стрелками
  processedContent = processedContent.replace(
    /<ul[^>]*>\s*<li[^>]*>\s*<span[^>]*>➤<\/span>/g,
    '<ul class="arrow-list"><li>'
  );

  // Обрабатываем CTA блоки
  processedContent = processedContent.replace(
    /<div style="[^"]*background[^"]*linear-gradient[^"]*d4145a[^"]*"[^>]*>/g,
    '<div class="cta-block">'
  );

  // Обрабатываем текст с цветами
  processedContent = processedContent.replace(
    /<p style="[^"]*color[^"]*#2ecc71[^"]*"[^>]*>/g,
    '<p class="example-text">'
  );

  processedContent = processedContent.replace(
    /<p style="[^"]*color[^"]*#e74c3c[^"]*"[^>]*>/g,
    '<p class="tip-text">'
  );

  // Убираем лишние inline стили, оставляя только структуру
  processedContent = processedContent.replace(
    /style="[^"]*"/g,
    ''
  );

  // Очищаем пустые атрибуты
  processedContent = processedContent.replace(
    /\s+>/g,
    '>'
  );

  return processedContent;
}
