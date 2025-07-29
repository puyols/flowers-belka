# ⚡ Быстрый старт: Создание GitHub репозитория

## 🎯 Краткая инструкция

### 1. Создайте репозиторий на GitHub
- Название: `flowers-belka`
- Описание: `OpenCart интернет-магазин цветов flowers-belka.ru`
- Приватный репозиторий
- **НЕ** инициализируйте с README

### 2. Выполните команды в терминале

```bash
# Добавить удаленный репозиторий
git remote add origin https://github.com/ВАШ_USERNAME/flowers-belka.git

# Проверить подключение
git remote -v

# Добавить файлы и создать коммит
git add .
git commit -m "Initial commit: OpenCart flowers-belka project"

# Отправить на GitHub
git push -u origin main
```

### 3. Обновите .gitignore

Замените содержимое файла `.gitignore` на:

```gitignore
# Node.js
node_modules/
*.log

# OpenCart specific
config.php
admin/config.php
system/storage/cache/
system/storage/logs/
system/storage/session/
image/cache/

# Database dumps
*.sql

# Temporary files
*.tmp
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Project specific
новый*.txt
import_log.txt
test.php
phpinfo.php
```

### 4. Создайте README.md

```markdown
# 🌸 Flowers Belka

OpenCart интернет-магазин цветов flowers-belka.ru

## Локальная установка

1. Клонировать: `git clone https://github.com/ВАШ_USERNAME/flowers-belka.git`
2. Создать БД: `flowers_belka_new`
3. Импортировать: `mysql -u root flowers_belka_new < localhost.sql`
4. Настроить config.php файлы

## Доступ
- Сайт: http://localhost/flowers_belka/
- Админка: http://localhost/flowers_belka/admin/
```

## ✅ Готово!

После выполнения этих шагов у вас будет:
- ✅ GitHub репозиторий
- ✅ Синхронизированный код
- ✅ Правильный .gitignore
- ✅ Документация проекта

**Для детальных инструкций смотрите**: [`GITHUB_SETUP_GUIDE.md`](GITHUB_SETUP_GUIDE.md)