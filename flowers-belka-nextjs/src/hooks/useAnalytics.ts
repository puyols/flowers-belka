'use client';

import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: number;
  session_id?: string;
}

interface UseAnalyticsReturn {
  trackEvent: (event: AnalyticsEvent) => Promise<void>;
  trackPageView: (page: string, title?: string) => Promise<void>;
  trackProductView: (productId: string, productName: string, category?: string) => Promise<void>;
  trackAddToCart: (productId: string, productName: string, quantity: number, price: number) => Promise<void>;
  trackPurchase: (orderId: string, total: number, items: any[]) => Promise<void>;
  trackSearch: (query: string, resultsCount: number) => Promise<void>;
  initializeAnalytics: () => void;
}

const useAnalytics = (): UseAnalyticsReturn => {
  // Получаем или создаем session ID
  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Основная функция отправки событий
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const eventData = {
        ...event,
        session_id: event.session_id || getSessionId(),
        user_id: event.user_id || 0,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      };

      // Отправляем на наш API
      const response = await fetch('http://localhost:8080/api_analytics.php?action=log_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Также отправляем в Google Analytics, если доступен
      if (typeof gtag !== 'undefined') {
        gtag('event', event.event_type, {
          custom_parameter_1: JSON.stringify(event.event_data),
          session_id: eventData.session_id,
          user_id: eventData.user_id
        });
      }

      // Отправляем в Yandex.Metrica, если доступна
      if (typeof ym !== 'undefined') {
        ym('reachGoal', event.event_type, event.event_data);
      }

    } catch (error) {
      console.error('Analytics tracking error:', error);
      
      // Сохраняем событие в localStorage для повторной отправки
      const failedEvents = JSON.parse(localStorage.getItem('failed_analytics_events') || '[]');
      failedEvents.push({ ...event, timestamp: Date.now() });
      localStorage.setItem('failed_analytics_events', JSON.stringify(failedEvents.slice(-50))); // Храним последние 50
    }
  }, [getSessionId]);

  // Отслеживание просмотра страницы
  const trackPageView = useCallback(async (page: string, title?: string) => {
    await trackEvent({
      event_type: 'page_view',
      event_data: {
        page,
        title: title || document.title,
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      }
    });
  }, [trackEvent]);

  // Отслеживание просмотра товара
  const trackProductView = useCallback(async (productId: string, productName: string, category?: string) => {
    await trackEvent({
      event_type: 'product_view',
      event_data: {
        product_id: productId,
        product_name: productName,
        category,
        timestamp: Date.now()
      }
    });
  }, [trackEvent]);

  // Отслеживание добавления в корзину
  const trackAddToCart = useCallback(async (productId: string, productName: string, quantity: number, price: number) => {
    await trackEvent({
      event_type: 'add_to_cart',
      event_data: {
        product_id: productId,
        product_name: productName,
        quantity,
        price,
        total_value: quantity * price
      }
    });
  }, [trackEvent]);

  // Отслеживание покупки
  const trackPurchase = useCallback(async (orderId: string, total: number, items: any[]) => {
    await trackEvent({
      event_type: 'purchase',
      event_data: {
        order_id: orderId,
        total,
        items_count: items.length,
        items: items.map(item => ({
          product_id: item.product_id || item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      }
    });
  }, [trackEvent]);

  // Отслеживание поиска
  const trackSearch = useCallback(async (query: string, resultsCount: number) => {
    await trackEvent({
      event_type: 'search',
      event_data: {
        query,
        results_count: resultsCount,
        timestamp: Date.now()
      }
    });
  }, [trackEvent]);

  // Повторная отправка неудачных событий
  const retryFailedEvents = useCallback(async () => {
    const failedEvents = JSON.parse(localStorage.getItem('failed_analytics_events') || '[]');
    
    if (failedEvents.length === 0) return;

    const successfulEvents: number[] = [];
    
    for (let i = 0; i < failedEvents.length; i++) {
      try {
        await trackEvent(failedEvents[i]);
        successfulEvents.push(i);
      } catch (error) {
        console.error('Retry failed for event:', failedEvents[i], error);
      }
    }

    // Удаляем успешно отправленные события
    if (successfulEvents.length > 0) {
      const remainingEvents = failedEvents.filter((_, index) => !successfulEvents.includes(index));
      localStorage.setItem('failed_analytics_events', JSON.stringify(remainingEvents));
    }
  }, [trackEvent]);

  // Инициализация аналитики
  const initializeAnalytics = useCallback(() => {
    // Отслеживаем просмотр страницы при инициализации
    trackPageView(window.location.pathname);

    // Повторяем неудачные события
    retryFailedEvents();

    // Отслеживаем время на странице
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      trackEvent({
        event_type: 'page_time',
        event_data: {
          time_on_page_ms: timeOnPage,
          page: window.location.pathname
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Отслеживаем скролл
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Отправляем максимальный скролл при уходе со страницы
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && maxScroll > 0) {
        trackEvent({
          event_type: 'scroll_depth',
          event_data: {
            max_scroll_percent: maxScroll,
            page: window.location.pathname
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Отслеживаем клики по внешним ссылкам
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith(window.location.origin)) {
        trackEvent({
          event_type: 'external_link_click',
          event_data: {
            url: link.href,
            text: link.textContent?.trim() || '',
            page: window.location.pathname
          }
        });
      }
    };

    document.addEventListener('click', handleClick);

    // Cleanup функция
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleClick);
    };
  }, [trackPageView, trackEvent, retryFailedEvents]);

  // Автоматическая инициализация при первом использовании
  useEffect(() => {
    const cleanup = initializeAnalytics();
    
    // Периодически повторяем неудачные события
    const retryInterval = setInterval(retryFailedEvents, 60000); // Каждую минуту
    
    return () => {
      cleanup?.();
      clearInterval(retryInterval);
    };
  }, [initializeAnalytics, retryFailedEvents]);

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackPurchase,
    trackSearch,
    initializeAnalytics
  };
};

export default useAnalytics;
