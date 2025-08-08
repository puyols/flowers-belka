'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface UseApiCacheOptions {
  cacheTime?: number; // время кэширования в миллисекундах
  staleTime?: number; // время, в течение которого данные считаются свежими
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
}

interface UseApiCacheResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

// Глобальный кэш для всех компонентов
const globalCache = new Map<string, CacheEntry<any>>();

// Очистка устаревших записей каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of globalCache.entries()) {
    if (now > entry.expiry) {
      globalCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function useApiCache<T>(
  url: string,
  options: UseApiCacheOptions = {}
): UseApiCacheResult<T> {
  const {
    cacheTime = 5 * 60 * 1000, // 5 минут по умолчанию
    staleTime = 30 * 1000, // 30 секунд по умолчанию
    refetchOnWindowFocus = true,
    refetchInterval,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Проверка свежести данных
  const checkStale = useCallback((entry: CacheEntry<T>) => {
    const now = Date.now();
    return now - entry.timestamp > staleTime;
  }, [staleTime]);

  // Получение данных из кэша
  const getCachedData = useCallback((): CacheEntry<T> | null => {
    const cached = globalCache.get(url);
    if (!cached) return null;
    
    const now = Date.now();
    if (now > cached.expiry) {
      globalCache.delete(url);
      return null;
    }
    
    return cached as CacheEntry<T>;
  }, [url]);

  // Сохранение данных в кэш
  const setCachedData = useCallback((newData: T) => {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data: newData,
      timestamp: now,
      expiry: now + cacheTime,
    };
    globalCache.set(url, entry);
  }, [url, cacheTime]);

  // Основная функция загрузки данных
  const fetchData = useCallback(async (force = false) => {
    // Проверяем кэш, если не принудительная загрузка
    if (!force) {
      const cached = getCachedData();
      if (cached) {
        setData(cached.data);
        setIsStale(checkStale(cached));
        setIsLoading(false);
        setError(null);
        
        // Если данные не устарели, не делаем запрос
        if (!checkStale(cached)) {
          return;
        }
      }
    }

    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Проверяем структуру ответа API
      if (result.success === false) {
        throw new Error(result.error || 'API returned error');
      }

      const responseData = result.data || result;
      
      setData(responseData);
      setCachedData(responseData);
      setIsStale(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Запрос был отменен
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Если есть кэшированные данные, используем их при ошибке
      const cached = getCachedData();
      if (cached) {
        setData(cached.data);
        setIsStale(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, getCachedData, setCachedData, checkStale]);

  // Функция для принудительного обновления
  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  // Эффект для первоначальной загрузки
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Эффект для периодического обновления
  useEffect(() => {
    if (refetchInterval && refetchInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchData();
      }, refetchInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, fetchData]);

  // Эффект для обновления при фокусе окна
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      const cached = getCachedData();
      if (cached && checkStale(cached)) {
        fetchData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, getCachedData, checkStale, fetchData]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
    isStale,
  };
}

// Утилита для предварительной загрузки данных
export function prefetchData(url: string, cacheTime = 5 * 60 * 1000) {
  const cached = globalCache.get(url);
  const now = Date.now();
  
  if (cached && now < cached.expiry) {
    return; // Данные уже в кэше
  }

  fetch(url)
    .then(response => response.json())
    .then(result => {
      const data = result.data || result;
      const entry: CacheEntry<any> = {
        data,
        timestamp: now,
        expiry: now + cacheTime,
      };
      globalCache.set(url, entry);
    })
    .catch(() => {
      // Игнорируем ошибки предварительной загрузки
    });
}

// Утилита для очистки кэша
export function clearCache(pattern?: string) {
  if (pattern) {
    for (const key of globalCache.keys()) {
      if (key.includes(pattern)) {
        globalCache.delete(key);
      }
    }
  } else {
    globalCache.clear();
  }
}
