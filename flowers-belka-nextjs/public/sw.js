// Service Worker для push уведомлений Flowers Belka

const CACHE_NAME = 'flowers-belka-v1';
const urlsToCache = [
  '/',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэшированную версию или загружаем из сети
        return response || fetch(event.request);
      })
  );
});

// Обработка push уведомлений
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: 'Flowers Belka',
    body: 'У вас новое уведомление',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    url: '/',
    tag: 'flowers-belka-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'Посмотреть',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Закрыть'
      }
    ]
  };

  // Парсим данные из push сообщения
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        ...data
      };
    } catch (error) {
      console.error('Error parsing push data:', error);
      notificationData.body = event.data.text() || notificationData.body;
    }
  }

  // Показываем уведомление
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      actions: notificationData.actions,
      data: {
        url: notificationData.url,
        timestamp: Date.now()
      }
    })
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Получаем URL для перехода
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Ищем открытую вкладку с нашим сайтом
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Если вкладка найдена, фокусируемся на ней и переходим по URL
          return client.focus().then(() => {
            if ('navigate' in client) {
              return client.navigate(urlToOpen);
            }
          });
        }
      }
      
      // Если открытой вкладки нет, открываем новую
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Обработка закрытия уведомлений
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event);
  
  // Можно отправить аналитику о закрытии уведомления
  // analytics.track('notification_closed', {
  //   tag: event.notification.tag,
  //   timestamp: Date.now()
  // });
});

// Обработка ошибок push подписки
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription changed:', event);
  
  event.waitUntil(
    // Обновляем подписку на сервере
    fetch('/api/update-push-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldSubscription: event.oldSubscription,
        newSubscription: event.newSubscription
      })
    }).catch((error) => {
      console.error('Failed to update push subscription:', error);
    })
  );
});

// Синхронизация в фоне
self.addEventListener('sync', (event) => {
  console.log('Background sync:', event);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Выполняем отложенные задачи
      doBackgroundSync()
    );
  }
});

// Функция фоновой синхронизации
async function doBackgroundSync() {
  try {
    // Здесь можно выполнить отложенные задачи
    // Например, отправить неотправленные данные
    console.log('Performing background sync...');
    
    // Пример: синхронизация корзины
    const cache = await caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();
    
    // Обрабатываем кэшированные запросы
    for (const request of cachedRequests) {
      if (request.url.includes('/api/')) {
        try {
          await fetch(request);
        } catch (error) {
          console.log('Failed to sync request:', request.url);
        }
      }
    }
    
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Обработка сообщений от главного потока
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      timestamp: Date.now()
    });
  }
});

// Утилиты для работы с уведомлениями
const NotificationUtils = {
  // Создание уведомления о заказе
  createOrderNotification: (orderData) => {
    return {
      title: `Заказ #${orderData.id} подтвержден!`,
      body: `Ваш заказ на сумму ${orderData.total} ₽ принят в обработку`,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `order-${orderData.id}`,
      requireInteraction: true,
      actions: [
        {
          action: 'view-order',
          title: 'Посмотреть заказ'
        },
        {
          action: 'close',
          title: 'Закрыть'
        }
      ],
      data: {
        url: `/order-success?order_id=${orderData.id}`,
        orderId: orderData.id
      }
    };
  },

  // Создание уведомления о доставке
  createDeliveryNotification: (orderData) => {
    return {
      title: 'Заказ в пути!',
      body: `Заказ #${orderData.id} передан курьеру. Ожидайте доставку в течение дня`,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `delivery-${orderData.id}`,
      requireInteraction: true,
      actions: [
        {
          action: 'track-order',
          title: 'Отследить'
        }
      ],
      data: {
        url: `/track-order?id=${orderData.id}`,
        orderId: orderData.id
      }
    };
  },

  // Создание промо уведомления
  createPromoNotification: (promoData) => {
    return {
      title: promoData.title || 'Специальное предложение!',
      body: promoData.message,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `promo-${promoData.id}`,
      requireInteraction: false,
      actions: [
        {
          action: 'view-promo',
          title: 'Посмотреть'
        }
      ],
      data: {
        url: promoData.url || '/',
        promoId: promoData.id
      }
    };
  }
};

// Экспортируем утилиты для использования в других частях SW
self.NotificationUtils = NotificationUtils;
