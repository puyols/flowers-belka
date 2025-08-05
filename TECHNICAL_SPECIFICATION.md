# 🔧 Техническая спецификация Flowers Belka

**Версия**: 1.0  
**Дата**: 05.08.2025  
**Архитектор**: puyols  

---

## 🏗️ АРХИТЕКТУРА СИСТЕМЫ

### 📊 Общая схема
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   REST API      │    │   OpenCart      │
│   Frontend      │◄──►│   Integration   │◄──►│   Backend       │
│   (Port 3001)   │    │   (api_*.php)   │    │   (Port 8080)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Static Files  │    │   CORS Handler  │    │   MySQL DB      │
│   Images/CSS/JS │    │   Error Handler │    │   flowers_belka │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔄 Поток данных
1. **Пользователь** → Next.js Frontend
2. **Frontend** → REST API (api_products.php)
3. **API** → OpenCart Database (MySQL)
4. **Database** → API → Frontend → Пользователь

---

## 🌐 FRONTEND (Next.js)

### 📁 Структура проекта
```
flowers-belka-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Основной layout
│   │   ├── page.tsx           # Главная страница
│   │   ├── [category]/        # Динамические категории
│   │   ├── bukety_tsvetov/    # Страница букетов
│   │   ├── rozy/              # Страница роз
│   │   ├── piony/             # Страница пионов
│   │   ├── tulpany/           # Страница тюльпанов
│   │   ├── korzina/           # Корзина
│   │   ├── dostavka/          # Доставка
│   │   └── novosti/           # Новости
│   ├── components/            # React компоненты
│   │   ├── Header.tsx         # Шапка сайта
│   │   ├── Footer.tsx         # Подвал сайта
│   │   ├── ProductCard.tsx    # Карточка товара
│   │   ├── HeroSection.tsx    # Главный баннер
│   │   ├── CustomOrderForm.tsx # Форма заказа
│   │   ├── FAQ.tsx            # Часто задаваемые вопросы
│   │   └── Reviews.tsx        # Отзывы клиентов
│   ├── contexts/              # React контексты
│   │   └── CartContext.tsx    # Контекст корзины
│   ├── data/                  # Статические данные
│   │   ├── products-parsed.ts # Товары
│   │   ├── categories.ts      # Категории
│   │   └── news-parsed.ts     # Новости
│   ├── types/                 # TypeScript типы
│   │   └── index.ts           # Основные типы
│   └── utils/                 # Утилиты
│       ├── seo.ts             # SEO функции
│       └── filterProducts.ts  # Фильтрация товаров
├── public/                    # Статические файлы
│   ├── images/                # Изображения
│   │   ├── products/          # Фото товаров
│   │   ├── news/              # Изображения новостей
│   │   └── logo.png           # Логотип
│   ├── favicon.ico            # Иконка сайта
│   └── robots.txt             # Файл для поисковиков
├── package.json               # Зависимости
├── next.config.js             # Конфигурация Next.js
├── tailwind.config.js         # Конфигурация Tailwind
└── tsconfig.json              # Конфигурация TypeScript
```

### 🔧 Технологический стек
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.6
- **Icons**: Heroicons 2.2.0
- **State Management**: React Context API
- **Build Tool**: Next.js встроенный Webpack

### 📱 Компоненты и их функции

#### 🏠 Layout компоненты
- **Header**: Навигация, логотип, поиск, корзина
- **Footer**: Контакты, ссылки, социальные сети
- **Breadcrumbs**: Навигационная цепочка

#### 🛍️ Продуктовые компоненты
- **ProductCard**: Отображение товара с ценой и кнопкой заказа
- **CategoryFilters**: Фильтры по категориям и цене
- **AddToCartButton**: Кнопка добавления в корзину

#### 📄 Контентные компоненты
- **HeroSection**: Главный баннер с призывом к действию
- **WhyChooseUs**: Преимущества магазина
- **FAQ**: Часто задаваемые вопросы
- **Reviews**: Отзывы клиентов

#### 🔍 SEO компоненты
- **SEOHead**: Meta теги и структурированные данные
- **StructuredData**: JSON-LD разметка
- **ProductStructuredData**: Разметка товаров

### 🎨 Дизайн система
- **Цветовая палитра**: Зеленые оттенки (природная тематика)
- **Типографика**: Inter font family
- **Адаптивность**: Mobile-first подход
- **Анимации**: Плавные переходы с Tailwind

---

## 🛒 BACKEND (OpenCart)

### 📁 Структура OpenCart
```
flowers-belka/ (root)
├── admin/                     # Административная панель
│   ├── controller/           # Контроллеры админки
│   ├── model/               # Модели данных
│   ├── view/                # Шаблоны админки
│   ├── language/            # Языковые файлы
│   └── config.php           # Конфигурация админки
├── catalog/                  # Фронтенд OpenCart
│   ├── controller/          # Контроллеры каталога
│   ├── model/               # Модели каталога
│   ├── view/                # Шаблоны каталога
│   └── language/            # Языковые файлы
├── system/                   # Системные файлы
│   ├── library/             # Библиотеки
│   ├── engine/              # Ядро системы
│   └── config/              # Системные конфигурации
├── image/                    # Изображения товаров
│   ├── catalog/             # Изображения каталога
│   └── cache/               # Кэш изображений
├── storage/                  # Хранилище данных
│   ├── cache/               # Кэш файлы
│   ├── logs/                # Логи системы
│   └── session/             # Сессии пользователей
└── config.php               # Основная конфигурация
```

### 🗄️ База данных

#### 📊 Основные таблицы
```sql
-- Товары
oc_product (product_id, model, price, quantity, status, image)
oc_product_description (product_id, name, description, language_id)
oc_product_to_category (product_id, category_id)

-- Категории
oc_category (category_id, parent_id, status, sort_order)
oc_category_description (category_id, name, description, language_id)

-- Заказы
oc_order (order_id, customer_id, total, order_status_id, date_added)
oc_order_product (order_product_id, order_id, product_id, quantity, price)

-- Клиенты
oc_customer (customer_id, firstname, lastname, email, telephone)
oc_address (address_id, customer_id, firstname, lastname, address_1, city)
```

#### 🔗 Связи между таблицами
- **Товары ↔ Категории**: Many-to-Many через product_to_category
- **Заказы ↔ Товары**: Many-to-Many через order_product
- **Клиенты ↔ Адреса**: One-to-Many
- **Заказы ↔ Клиенты**: Many-to-One

### ⚙️ Конфигурация OpenCart
```php
// config.php
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'flowers_belka_new');
define('DB_PREFIX', 'oc_');

define('HTTP_SERVER', 'http://localhost:8080/');
define('DIR_APPLICATION', '/path/to/catalog/');
define('DIR_SYSTEM', '/path/to/system/');
define('DIR_IMAGE', '/path/to/image/');
```

---

## 🔗 API ИНТЕГРАЦИЯ

### 📄 api_products.php
```php
<?php
// Основные endpoints:
// GET ?action=products - список товаров
// GET ?action=categories - список категорий  
// GET ?action=product&id=N - конкретный товар

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
```

### 🔄 API Endpoints

#### 📦 Получение товаров
```
GET /api_products.php?action=products
Response:
{
  "products": [
    {
      "product_id": "1",
      "name": "Букет роз",
      "description": "Красивый букет из красных роз",
      "price": "2500.00",
      "image": "rose-bouquet.jpg",
      "category_name": "Букеты"
    }
  ]
}
```

#### 📂 Получение категорий
```
GET /api_products.php?action=categories
Response:
{
  "categories": [
    {
      "category_id": "1",
      "name": "Букеты цветов",
      "description": "Готовые букеты на любой случай",
      "parent_id": "0"
    }
  ]
}
```

#### 🌸 Получение товара
```
GET /api_products.php?action=product&id=1
Response:
{
  "product": {
    "product_id": "1",
    "name": "Букет роз",
    "description": "Подробное описание товара",
    "price": "2500.00",
    "quantity": "10",
    "image": "rose-bouquet.jpg"
  }
}
```

### 🛡️ Безопасность API
- **CORS**: Ограничение доступа только с localhost:3001
- **SQL Injection**: Использование PDO с подготовленными запросами
- **Валидация**: Проверка входных параметров
- **Error Handling**: Обработка ошибок с возвратом JSON

---

## 🧪 ТЕСТИРОВАНИЕ

### 🔍 Инструменты тестирования

#### test_api.html
```html
<!-- Интерактивное тестирование API -->
<button onclick="testProducts()">Получить товары</button>
<button onclick="testCategories()">Получить категории</button>
<button onclick="testProduct(1)">Получить товар #1</button>
<div id="result"></div>
```

#### test_db_connection.php
```php
<?php
// Проверка подключения к базе данных
// Проверка существования таблиц
// Вывод примеров данных
// Диагностика проблем
?>
```

### 📊 Типы тестирования
- **Unit тесты**: Тестирование отдельных функций
- **Integration тесты**: Тестирование API endpoints
- **E2E тесты**: Тестирование пользовательских сценариев
- **Performance тесты**: Нагрузочное тестирование

---

## 🚀 ДЕПЛОЙ И ПРОДАКШЕН

### 🌐 Требования к серверу
```
OS: Linux (Ubuntu 20.04+ / CentOS 8+)
Web Server: Nginx 1.18+ или Apache 2.4+
PHP: 7.4+ (с расширениями: mysqli, gd, curl, zip, mbstring)
Database: MySQL 5.7+ или MariaDB 10.2+
Node.js: 18.0+ (для сборки Next.js)
Memory: 2GB+ RAM
Storage: 10GB+ SSD
```

### 📦 Процесс деплоя
1. **Подготовка сервера**: Установка и настройка ПО
2. **Сборка Next.js**: `npm run build` в production режиме
3. **Загрузка файлов**: Копирование на сервер
4. **Настройка БД**: Импорт данных и настройка доступа
5. **Конфигурация**: Обновление путей и URL
6. **SSL сертификат**: Настройка HTTPS
7. **Тестирование**: Проверка всех функций

### 🔧 Конфигурация продакшена
```nginx
# Nginx конфигурация
server {
    listen 80;
    server_name flowers-belka.ru;
    
    # Next.js статика
    location /_next/static/ {
        alias /var/www/flowers-belka/next/static/;
        expires 1y;
    }
    
    # API endpoints
    location /api/ {
        root /var/www/flowers-belka/opencart/;
        index api_products.php;
        try_files $uri $uri/ =404;
    }
    
    # OpenCart админка
    location /admin/ {
        root /var/www/flowers-belka/opencart/;
        index index.php;
    }
}
```

---

## 📈 МОНИТОРИНГ И ПОДДЕРЖКА

### 📊 Метрики для отслеживания
- **Производительность**: Время отклика API, загрузка страниц
- **Доступность**: Uptime сервера, статус сервисов
- **Ошибки**: 4xx/5xx ошибки, исключения в коде
- **Бизнес метрики**: Конверсия, средний чек, количество заказов

### 🔧 Инструменты мониторинга
- **Server**: Zabbix, Nagios, или Prometheus
- **Application**: New Relic, DataDog
- **Logs**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Uptime**: Pingdom, UptimeRobot

### 🛠️ План поддержки
- **Ежедневно**: Проверка логов ошибок
- **Еженедельно**: Анализ производительности
- **Ежемесячно**: Обновления безопасности
- **По требованию**: Исправление критических ошибок

---

**Версия документа**: 1.0  
**Последнее обновление**: 05.08.2025  
**Следующий пересмотр**: 19.08.2025
