# Скрипт для копирования изображений из OpenCart в новый сайт
Write-Host "🖼️ Копируем изображения из OpenCart..." -ForegroundColor Green

$sourceImagePath = "/workspace/image"
$destImagePath = "/workspace/flowers-belka-nextjs/public/images"

# Создаем папку для изображений в новом сайте
if (!(Test-Path $destImagePath)) {
    New-Item -ItemType Directory -Path $destImagePath -Force
    Write-Host "✅ Создана папка: $destImagePath" -ForegroundColor Green
}

# Проверяем, существует ли исходная папка
if (!(Test-Path $sourceImagePath)) {
    Write-Host "❌ Исходная папка не найдена: $sourceImagePath" -ForegroundColor Red
    exit 1
}

# Копируем все изображения
try {
    Write-Host "📁 Копируем изображения..." -ForegroundColor Yellow
    
    # Копируем все файлы изображений
    $imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp")
    $copiedCount = 0
    
    foreach ($extension in $imageExtensions) {
        $files = Get-ChildItem -Path $sourceImagePath -Filter $extension -Recurse
        foreach ($file in $files) {
            $relativePath = $file.FullName.Substring($sourceImagePath.Length + 1)
            $destFile = Join-Path $destImagePath $relativePath
            $destDir = Split-Path $destFile -Parent
            
            # Создаем подпапки если нужно
            if (!(Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            
            # Копируем файл
            Copy-Item $file.FullName $destFile -Force
            $copiedCount++
        }
    }
    
    Write-Host "✅ Скопировано изображений: $copiedCount" -ForegroundColor Green
    
    # Создаем placeholder изображения если их нет
    $placeholderPath = Join-Path $destImagePath "placeholder-flower.jpg"
    if (!(Test-Path $placeholderPath)) {
        # Создаем простое placeholder изображение (копируем первое найденное)
        $firstImage = Get-ChildItem -Path $destImagePath -Filter "*.jpg" | Select-Object -First 1
        if ($firstImage) {
            Copy-Item $firstImage.FullName $placeholderPath
            Write-Host "✅ Создан placeholder: placeholder-flower.jpg" -ForegroundColor Green
        }
    }
    
    Write-Host "🎉 Копирование изображений завершено!" -ForegroundColor Green
    Write-Host "📊 Статистика:" -ForegroundColor Cyan
    Write-Host "   - Скопировано файлов: $copiedCount" -ForegroundColor White
    Write-Host "   - Папка назначения: $destImagePath" -ForegroundColor White
    
} catch {
    Write-Host "❌ Ошибка при копировании: $($_.Exception.Message)" -ForegroundColor Red
}
