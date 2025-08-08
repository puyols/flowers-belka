'use client';

import React, { useState, useEffect } from 'react';

interface NotificationSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  order_confirmation: boolean;
  order_status_updates: boolean;
  delivery_notifications: boolean;
  promotional_emails: boolean;
}

interface Notification {
  id: number;
  type: 'email' | 'sms' | 'push';
  subject: string;
  message: string;
  success: boolean;
  created_at: string;
  read_at?: string;
}

const NotificationManager: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email_notifications: true,
    sms_notifications: true,
    push_notifications: true,
    order_confirmation: true,
    order_status_updates: true,
    delivery_notifications: true,
    promotional_emails: false,
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');

  useEffect(() => {
    checkPushSupport();
    loadNotifications();
  }, []);

  const checkPushSupport = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setPushSupported(true);
      checkPushSubscription();
    }
  };

  const checkPushSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setPushSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking push subscription:', error);
    }
  };

  const subscribeToPush = async () => {
    try {
      setIsLoading(true);
      
      const registration = await navigator.serviceWorker.ready;
      
      // VAPID ключи (в продакшене должны быть в переменных окружения)
      const vapidPublicKey = 'your-vapid-public-key';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      // Отправляем подписку на сервер
      const response = await fetch('http://localhost:8080/api_notifications.php?action=subscribe_push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: JSON.stringify(subscription),
          user_id: 0 // Для гостевых пользователей
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setPushSubscribed(true);
        showToast('Push уведомления включены!', 'success');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error subscribing to push:', error);
      showToast('Ошибка подключения push уведомлений', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        setPushSubscribed(false);
        showToast('Push уведомления отключены', 'info');
      }
    } catch (error) {
      console.error('Error unsubscribing from push:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/api_notifications.php?action=get_notifications&user_id=0&limit=10');
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      showToast('Введите email для тестирования', 'error');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('http://localhost:8080/api_notifications.php?action=send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: testEmail,
          subject: 'Тестовое уведомление - Flowers Belka',
          message: 'Это тестовое email уведомление для проверки настроек.',
          template: 'default'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        showToast('Тестовый email отправлен!', 'success');
        loadNotifications();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      showToast('Ошибка отправки email', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestSMS = async () => {
    if (!testPhone) {
      showToast('Введите номер телефона для тестирования', 'error');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('http://localhost:8080/api_notifications.php?action=send_sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: testPhone,
          message: 'Flowers Belka: Тестовое SMS уведомление. Настройки работают корректно!'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        showToast('Тестовое SMS отправлено!', 'success');
        loadNotifications();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error sending test SMS:', error);
      showToast('Ошибка отправки SMS', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestPush = async () => {
    if (!pushSubscribed) {
      showToast('Сначала подпишитесь на push уведомления', 'error');
      return;
    }

    try {
      setIsLoading(true);
      
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      const response = await fetch('http://localhost:8080/api_notifications.php?action=send_push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: JSON.stringify(subscription),
          title: 'Тестовое уведомление',
          body: 'Это тестовое push уведомление от Flowers Belka!',
          icon: '/icon-192x192.png',
          url: '/'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        showToast('Тестовое push уведомление отправлено!', 'success');
        loadNotifications();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error sending test push:', error);
      showToast('Ошибка отправки push уведомления', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    // Простая реализация toast уведомлений
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление уведомлениями</h1>

      {/* Настройки уведомлений */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Настройки уведомлений</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Типы уведомлений</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.email_notifications}
                  onChange={(e) => setSettings({...settings, email_notifications: e.target.checked})}
                  className="mr-3"
                />
                <span>Email уведомления</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.sms_notifications}
                  onChange={(e) => setSettings({...settings, sms_notifications: e.target.checked})}
                  className="mr-3"
                />
                <span>SMS уведомления</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.push_notifications}
                  onChange={(e) => setSettings({...settings, push_notifications: e.target.checked})}
                  className="mr-3"
                  disabled={!pushSupported}
                />
                <span>Push уведомления {!pushSupported && '(не поддерживается)'}</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">События</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.order_confirmation}
                  onChange={(e) => setSettings({...settings, order_confirmation: e.target.checked})}
                  className="mr-3"
                />
                <span>Подтверждение заказа</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.order_status_updates}
                  onChange={(e) => setSettings({...settings, order_status_updates: e.target.checked})}
                  className="mr-3"
                />
                <span>Изменение статуса заказа</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.delivery_notifications}
                  onChange={(e) => setSettings({...settings, delivery_notifications: e.target.checked})}
                  className="mr-3"
                />
                <span>Уведомления о доставке</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.promotional_emails}
                  onChange={(e) => setSettings({...settings, promotional_emails: e.target.checked})}
                  className="mr-3"
                />
                <span>Рекламные рассылки</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Push уведомления */}
      {pushSupported && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Push уведомления</h2>
          
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${
              pushSubscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {pushSubscribed ? 'Подключены' : 'Отключены'}
            </div>
            
            <button
              onClick={pushSubscribed ? unsubscribeFromPush : subscribeToPush}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium ${
                pushSubscribed 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } disabled:opacity-50`}
            >
              {pushSubscribed ? 'Отключить' : 'Подключить'}
            </button>
          </div>
        </div>
      )}

      {/* Тестирование уведомлений */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Тестирование уведомлений</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Email</h3>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <button
              onClick={sendTestEmail}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Отправить тест
            </button>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">SMS</h3>
            <input
              type="tel"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="+7 999 123 45 67"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <button
              onClick={sendTestSMS}
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Отправить тест
            </button>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Push</h3>
            <div className="mb-3 text-sm text-gray-600">
              {pushSubscribed ? 'Готово к тестированию' : 'Требуется подписка'}
            </div>
            <button
              onClick={sendTestPush}
              disabled={isLoading || !pushSubscribed}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 disabled:opacity-50"
            >
              Отправить тест
            </button>
          </div>
        </div>
      </div>

      {/* История уведомлений */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">История уведомлений</h2>
          <button
            onClick={loadNotifications}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Обновить
          </button>
        </div>
        
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Уведомления не найдены</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 ${
                  notification.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      notification.type === 'email' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'sms' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {notification.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      notification.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {notification.success ? 'Отправлено' : 'Ошибка'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(notification.created_at)}
                  </span>
                </div>
                
                {notification.subject && (
                  <h4 className="font-medium text-gray-900 mb-1">{notification.subject}</h4>
                )}
                
                <p className="text-gray-600 text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
