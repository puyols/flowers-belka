# 🚀 Руководство по созданию GitHub репозитория для flowers-belka

## 📋 Пошаговый план настройки

### Шаг 1: Создание репозитория на GitHub

1. **Перейдите на GitHub.com** и войдите в свой аккаунт
2. **Нажмите "New repository"** (зеленая кнопка)
3. **Заполните данные репозитория**:
   - **Repository name**: `flowers-belka`
   - **Description**: `OpenCart интернет-магазин цветов flowers-belka.ru`
   - **Visibility**: `Private` (рекомендуется для коммерческого проекта)
   - **НЕ инициализируйте** с README, .gitignore или лицензией (у нас уже есть локальный репозиторий)

### Шаг 2: Улучшение .gitignore файла

Текущий `.gitignore` содержит только:
```
node_modules
flowers-belka-nextjs/
```

**Рекомендуемый .gitignore для OpenCart проекта**:
```gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OpenCart specific
config.php
admin/config.php
system/storage/cache/
system/storage/logs/
system/storage/session/
system/storage/modification/
system/storage/vendor/
image/cache/
vqmod/vqcache/
vqmod/logs/

# Database dumps (опционально, если не хотите хранить в репозитории)
*.sql
localhost.sql
full_db.sql

# Temporary files
*.tmp
*.temp
*~
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
error.log
access.log

# Environment files
.env
.env.local
.env.production

# Backup files
*.bak
*.backup

# Specific project files
новый*.txt
import_log.txt
test.php
test.html
phpinfo.php
```

### Шаг 3: Подключение к удаленному репозиторию

**Выполните следующие команды в терминале** (в папке проекта):

```bash
# 1. Добавить удаленный репозиторий
git remote add origin https://github.com/ВАШ_USERNAME/flowers-belka.git

# 2. Проверить, что remote добавлен
git remote -v

# 3. Добавить все файлы в staging area
git add .

# 4. Создать коммит
git commit -m "Initial commit: OpenCart flowers-belka project migration"

# 5. Отправить код на GitHub (первый раз)
git push -u origin main
```

### Шаг 4: Настройка branch protection (опционально)

После первого push рекомендуется:

1. **Перейти в Settings репозитория** на GitHub
2. **Выбрать "Branches"** в левом меню
3. **Добавить rule** для `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

### Шаг 5: Создание README.md

Создайте файл `README.md` в корне проекта:

```markdown
# 🌸 Flowers Belka - Интернет-магазин цветов

OpenCart-based интернет-магазин цветов flowers-belka.ru

## 🚀 Локальная установка

### Требования
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx
- XAMPP (для локальной разработки)

### Установка

1. Клонировать репозиторий:
```bash
git clone https://github.com/ВАШ_USERNAME/flowers-belka.git
cd flowers-belka
```

2. Настроить базу данных:
```bash
mysql -u root -e "CREATE DATABASE flowers_belka_new CHARACTER SET utf8 COLLATE utf8_general_ci;"
mysql -u root flowers_belka_new < localhost.sql
```

3. Настроить конфигурацию:
- Скопировать `config-sample.php` в `config.php`
- Скопировать `admin/config-sample.php` в `admin/config.php`
- Обновить настройки базы данных

4. Настроить права доступа:
```bash
chmod 755 system/storage/cache/
chmod 755 system/storage/logs/
chmod 755 system/storage/session/
chmod 755 image/cache/
```

## 📁 Структура проекта

```
flowers_belka/
├── admin/              # Админ-панель OpenCart
├── catalog/            # Фронтенд сайта
├── image/              # Изображения товаров
├── system/             # Ядро OpenCart
├── config.php          # Конфигурация сайта
└── index.php           # Главный файл
```

## 🛠 Разработка

- **Фронтенд**: http://localhost/flowers_belka/
- **Админка**: http://localhost/flowers_belka/admin/
- **Тема**: Journal3 (премиум тема)

## 📝 Лицензия

Частный коммерческий проект
```

### Шаг 6: Дополнительные рекомендации

#### Безопасность
- **Никогда не коммитьте**:
  - Файлы конфигурации с паролями (`config.php`, `admin/config.php`)
  - Дампы базы данных с реальными данными
  - Логи с чувствительной информацией

#### Workflow
1. **Создавайте ветки** для новых функций:
   ```bash
   git checkout -b feature/new-payment-method
   ```

2. **Делайте регулярные коммиты**:
   ```bash
   git add .
   git commit -m "Add: новый способ оплаты"
   ```

3. **Отправляйте изменения**:
   ```bash
   git push origin feature/new-payment-method
   ```

## ⚠️ Важные замечания

1. **Конфигурационные файлы**: Убедитесь, что `config.php` и `admin/config.php` добавлены в `.gitignore`
2. **База данных**: Рассмотрите возможность создания миграций вместо хранения полных дампов
3. **Изображения**: Папка `image/cache/` должна быть в `.gitignore`, так как содержит автогенерируемые файлы
4. **Права доступа**: После клонирования не забудьте настроить права доступа к папкам

## 🔗 Полезные ссылки

- [OpenCart Documentation](https://docs.opencart.com/)
- [Journal3 Theme Documentation](https://www.journal-theme.com/documentation)
- [Git Documentation](https://git-scm.com/doc)

---

**Создано**: $(date)  
**Проект**: flowers-belka.ru  
**Разработчик**: developer@flowers-belka.ru
```

## 🎯 Следующие шаги

После выполнения всех шагов выше:

1. ✅ У вас будет настроенный GitHub репозиторий
2. ✅ Код будет синхронизирован с удаленным репозиторием  
3. ✅ Проект будет готов к командной разработке
4. ✅ Настроена правильная структура .gitignore

**Нужна помощь с выполнением команд?** Переключитесь в режим Code для практической реализации!