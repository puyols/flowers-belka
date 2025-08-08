'use client';

import React, { useEffect } from 'react';
import NotificationManager from '@/components/NotificationManager';

const NotificationsPage = () => {
  useEffect(() => {
    // Регистрируем Service Worker при загрузке страницы
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <NotificationManager />
    </div>
  );
};

export default NotificationsPage;
