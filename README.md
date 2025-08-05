# 🌸 Flowers Belka - Интернет-магазин цветов

**Полнофункциональный интернет-магазин цветов flowers-belka.ru**

Проект включает в себя:
- 🛒 **OpenCart backend** - система управления товарами и заказами
- ⚡ **Next.js frontend** - современный фронтенд с SSR и SEO оптимизацией
- 🔗 **REST API** - интеграция между фронтендом и бэкендом
- 📱 **Адаптивный дизайн** - работает на всех устройствах

## 🚀 Быстрый старт

### Требования
- PHP 7.4+ с MySQL
- Node.js 18+
- Git

### Установка

1. **Клонирование репозитория**:
   ```bash
   git clone https://github.com/puyols83/belkaflo.git
   cd belkaflo
   ```

2. **Настройка базы данных**:
   ```bash
   mysql -u root -e "CREATE DATABASE flowers_belka_new CHARACTER SET utf8 COLLATE utf8_general_ci;"
   mysql -u root flowers_belka_new < localhost.sql
   ```

3. **Запуск Next.js фронтенда**:
   ```bash
   cd flowers-belka-nextjs
   npm install
   npm run dev
   ```

4. **Настройка OpenCart**:
   - Настроить `config.php` и `admin/config.php`
   - Запустить веб-сервер на порту 8080

## 🌐 Доступ к сайту

- **Фронтенд (Next.js)**: http://localhost:3001
- **Бэкенд (OpenCart)**: http://localhost:8080
- **Админка**: http://localhost:8080/admin
- **API тест**: http://localhost:8080/test_api.html
- **Тест БД**: http://localhost:8080/test_db_connection.php

## 📁 Структура проекта

```
flowers-belka/
├── flowers-belka-nextjs/     # Next.js фронтенд
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React компоненты
│   │   ├── data/           # Данные товаров и новостей
│   │   └── utils/          # Утилиты и хелперы
│   ├── public/             # Статические файлы
│   └── package.json        # Зависимости Next.js
├── admin/                  # OpenCart админка
├── catalog/                # OpenCart фронтенд
├── system/                 # OpenCart система
├── api_products.php        # REST API для интеграции
├── test_api.html          # Тестирование API
├── test_db_connection.php  # Тест базы данных
├── config.php             # Конфигурация OpenCart
└── localhost.sql          # Дамп базы данных
```

## 🔧 API Endpoints

### Получение товаров
```
GET /api_products.php?action=products
```

### Получение категорий
```
GET /api_products.php?action=categories
```

### Получение товара по ID
```
GET /api_products.php?action=product&id=1
```

## 🛠 Технологии

### Frontend (Next.js)
- **Next.js 14** - React фреймворк с SSR
- **TypeScript** - Типизация
- **Tailwind CSS** - Стили
- **Heroicons** - Иконки

### Backend (OpenCart)
- **OpenCart 3.x** - E-commerce платформа
- **Journal3** - Премиум тема
- **PHP 7.4+** - Серверный язык
- **MySQL** - База данных

### Интеграция
- **REST API** - Связь между фронтендом и бэкендом
- **CORS** - Настроен для localhost:3001
- **JSON** - Формат обмена данными

## 📞 Контакты

- **Телефон**: +7 (903) 734-98-44
- **WhatsApp**: https://api.whatsapp.com/send?phone=79037349844
- **Email**: info@belka-flowers.ru
- **Сайт**: flowers-belka.ru

## 🔄 Разработка

### Запуск в режиме разработки

1. **OpenCart** (порт 8080):
   ```bash
   # Настроить веб-сервер (Apache/Nginx)
   # Или использовать встроенный сервер PHP
   php -S localhost:8080
   ```

2. **Next.js** (порт 3001):
   ```bash
   cd flowers-belka-nextjs
   npm run dev
   ```

### Тестирование

- Откройте http://localhost:8080/test_api.html для тестирования API
- Откройте http://localhost:8080/test_db_connection.php для проверки БД
- Проверьте фронтенд на http://localhost:3001

## 📝 Лицензия

© 2019-2025 Flowers Belka. Все права защищены.

## 🤝 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [документацию](PERSONALIZED_SETUP.md)
2. Убедитесь, что все сервисы запущены
3. Проверьте логи ошибок в браузере и сервере
4. Обратитесь к разработчику

---

**Разработчик**: puyols  
**GitHub**: https://github.com/puyols83/belkaflo
