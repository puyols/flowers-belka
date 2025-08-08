'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from '@/components/Toast';

export interface CartItem {
  cart_id?: number;
  product_id: string;
  id: string;
  name: string;
  price: number;
  image: string;
  image_url?: string;
  quantity: number;
  slug: string;
  category: string;
  total_price?: number;
}

export interface CartData {
  items: CartItem[];
  total_items: number;
  subtotal: number;
  delivery: number;
  total_price: number;
  session_id: string;
}

interface CartContextType {
  cartData: CartData | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Omit<CartItem, 'quantity' | 'cart_id' | 'total_price'>, quantity?: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
  updateQuantity: (cartId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  createOrder: (orderData: any) => Promise<any>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Генерируем или получаем session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem('cart_session_id');
    if (!storedSessionId) {
      storedSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cart_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Загружаем корзину при инициализации
  useEffect(() => {
    if (sessionId) {
      refreshCart();
    }
  }, [sessionId]);

  // Обновление корзины с сервера
  const refreshCart = async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8080/api_products.php?action=cart_get&session_id=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setCartData(data.cart);
      } else {
        throw new Error(data.error || 'Ошибка загрузки корзины');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки корзины';
      setError(errorMessage);
      console.error('Error refreshing cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Добавление товара в корзину
  const addToCart = async (product: Omit<CartItem, 'quantity' | 'cart_id' | 'total_price'>, quantity = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/api_products.php?action=cart_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.product_id || product.id,
          quantity,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartData(data.cart);
        setToast({ message: data.message || 'Товар добавлен в корзину', type: 'success' });
      } else {
        throw new Error(data.error || 'Ошибка добавления товара');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка добавления товара';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление товара из корзины
  const removeFromCart = async (cartId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8080/api_products.php?action=cart_remove&cart_id=${cartId}&session_id=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setCartData(data.cart);
        setToast({ message: data.message || 'Товар удален из корзины', type: 'success' });
      } else {
        throw new Error(data.error || 'Ошибка удаления товара');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка удаления товара';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
      console.error('Error removing from cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление количества товара
  const updateQuantity = async (cartId: number, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/api_products.php?action=cart_update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cartId,
          quantity,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartData(data.cart);
        setToast({ message: data.message || 'Корзина обновлена', type: 'success' });
      } else {
        throw new Error(data.error || 'Ошибка обновления корзины');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка обновления корзины';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
      console.error('Error updating cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Очистка корзины
  const clearCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8080/api_products.php?action=cart_clear&session_id=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setCartData(data.cart);
        setToast({ message: data.message || 'Корзина очищена', type: 'success' });
      } else {
        throw new Error(data.error || 'Ошибка очистки корзины');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка очистки корзины';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
      console.error('Error clearing cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Создание заказа
  const createOrder = async (orderData: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/api_products.php?action=order_create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderData,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartData(null); // Очищаем корзину после успешного заказа
        setToast({ message: data.message || 'Заказ успешно создан', type: 'success' });
        return data.order;
      } else {
        throw new Error(data.error || 'Ошибка создания заказа');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка создания заказа';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
      console.error('Error creating order:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Вспомогательные функции
  const getTotalItems = () => {
    return cartData?.total_items || 0;
  };

  const getTotalPrice = () => {
    return cartData?.total_price || 0;
  };

  const value: CartContextType = {
    cartData,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    createOrder,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </CartContext.Provider>
  );
};
