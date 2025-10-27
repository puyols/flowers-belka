# Скрипт для безопасного импорта базы данных flowers_belka
Write-Host "🗄️ Импорт базы данных flowers_belka" -ForegroundColor Green

# Проверяем подключение к MySQL
Write-Host "1️⃣ Проверяем подключение к MySQL..."
try {
    & "C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 1;" 2>$null
    Write-Host "✅ MySQL работает!" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL не работает. Запустите MySQL в XAMPP Control Panel" -ForegroundColor Red
    exit 1
}

# Применяем настройки MySQL
Write-Host "2️⃣ Настраиваем MySQL для больших файлов..."
& "C:\xampp\mysql\bin\mysql.exe" -u root < "mysql_config_fix.sql"

# Проверяем существование базы данных
Write-Host "3️⃣ Проверяем базу данных flowers_belka_new..."
$dbExists = & "C:\xampp\mysql\bin\mysql.exe" -u root -e "SHOW DATABASES LIKE 'flowers_belka_new';" 2>$null
if ($dbExists -match "flowers_belka_new") {
    Write-Host "✅ База данных flowers_belka_new существует" -ForegroundColor Green
} else {
    Write-Host "❌ База данных не найдена. Создаем..." -ForegroundColor Yellow
    & "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE flowers_belka_new CHARACTER SET utf8 COLLATE utf8_general_ci;"
}

# Проверяем размер SQL файла
$sqlFile = "/workspace/localhost.sql"
if (Test-Path $sqlFile) {
    $fileSize = (Get-Item $sqlFile).Length / 1MB
    Write-Host "4️⃣ Размер SQL файла: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    
    if ($fileSize -gt 100) {
        Write-Host "⚠️ Файл очень большой. Импорт может занять много времени..." -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ SQL файл не найден: $sqlFile" -ForegroundColor Red
    exit 1
}

# Начинаем импорт
Write-Host "5️⃣ Начинаем импорт базы данных..." -ForegroundColor Green
Write-Host "⏳ Это может занять несколько минут. Не закрывайте окно!" -ForegroundColor Yellow

$startTime = Get-Date
try {
    & "C:\xampp\mysql\bin\mysql.exe" -u root flowers_belka_new -e "source $sqlFile" 2>&1 | Tee-Object -FilePath "import_log.txt"
    $endTime = Get-Date
    $duration = $endTime - $startTime
    Write-Host "✅ Импорт завершен за $($duration.TotalMinutes.ToString('F1')) минут!" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка импорта: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "📋 Лог сохранен в import_log.txt" -ForegroundColor Yellow
}

# Проверяем результат
Write-Host "6️⃣ Проверяем импортированные таблицы..."
$tables = & "C:\xampp\mysql\bin\mysql.exe" -u root flowers_belka_new -e "SHOW TABLES;" 2>$null
$tableCount = ($tables | Measure-Object -Line).Lines - 1
Write-Host "📊 Импортировано таблиц: $tableCount" -ForegroundColor Cyan

Write-Host "🎉 Готово! Теперь можно проверить сайт: http://localhost/flowers_belka/" -ForegroundColor Green
