'use client';

import React, { useState, useEffect } from 'react';

interface DashboardData {
  summary: {
    current: {
      total_orders: number;
      total_revenue: number;
      avg_order_value: number;
      unique_customers: number;
    };
    changes: {
      total_orders: number;
      total_revenue: number;
      avg_order_value: number;
      unique_customers: number;
    };
  };
  sales_chart: Array<{
    date: string;
    orders_count: number;
    revenue: number;
    customers_count: number;
  }>;
  top_products: Array<{
    product_id: number;
    name: string;
    total_quantity: number;
    total_revenue: number;
    orders_count: number;
  }>;
  recent_orders: Array<{
    order_id: number;
    firstname: string;
    lastname: string;
    total: number;
    date_added: string;
  }>;
  categories_stats: Array<{
    category_name: string;
    orders_count: number;
    total_revenue: number;
  }>;
}

interface SystemHealth {
  database: {
    status: string;
    response_time_ms: number;
  };
  disk: {
    usage_percent: number;
    free_space_gb: number;
    status: string;
  };
  memory: {
    current_mb: number;
    peak_mb: number;
    status: string;
  };
  overall_status: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState('30');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadDashboardData();
    loadSystemHealth();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadDashboardData();
        loadSystemHealth();
      }, 60000); // Обновляем каждую минуту
      
      return () => clearInterval(interval);
    }
  }, [period, autoRefresh]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api_analytics.php?action=dashboard&period=${period}`);
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSystemHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api_analytics.php?action=system_health');
      const data = await response.json();
      
      if (data.success) {
        setSystemHealth(data.health);
      }
    } catch (err) {
      console.error('Error loading system health:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? 'text-green-600' : 'text-red-600';
    return <span className={color}>{sign}{change}%</span>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-red-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Ошибка загрузки данных</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={() => {
                setError(null);
                loadDashboardData();
              }}
              className="mt-2 text-sm text-red-800 underline hover:text-red-900"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок и настройки */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
        
        <div className="flex items-center space-x-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="7">Последние 7 дней</option>
            <option value="30">Последние 30 дней</option>
            <option value="90">Последние 90 дней</option>
          </select>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Автообновление</span>
          </label>
          
          <button
            onClick={() => {
              loadDashboardData();
              loadSystemHealth();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Обновить
          </button>
        </div>
      </div>

      {/* Статус системы */}
      {systemHealth && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Состояние системы</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.overall_status)}`}>
                {systemHealth.overall_status === 'healthy' ? 'Работает' : 
                 systemHealth.overall_status === 'warning' ? 'Предупреждение' : 'Ошибка'}
              </div>
              <p className="text-sm text-gray-600 mt-1">Общий статус</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.database.response_time_ms}ms</div>
              <p className="text-sm text-gray-600">База данных</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.disk.usage_percent}%</div>
              <p className="text-sm text-gray-600">Диск</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.memory.current_mb}MB</div>
              <p className="text-sm text-gray-600">Память</p>
            </div>
          </div>
        </div>
      )}

      {/* Основные метрики */}
      {dashboardData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Заказы</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardData.summary.current.total_orders)}
                  </p>
                </div>
                <div className="text-right">
                  {formatChange(dashboardData.summary.changes.total_orders)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Выручка</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.summary.current.total_revenue)}
                  </p>
                </div>
                <div className="text-right">
                  {formatChange(dashboardData.summary.changes.total_revenue)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Средний чек</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.summary.current.avg_order_value)}
                  </p>
                </div>
                <div className="text-right">
                  {formatChange(dashboardData.summary.changes.avg_order_value)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Клиенты</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardData.summary.current.unique_customers)}
                  </p>
                </div>
                <div className="text-right">
                  {formatChange(dashboardData.summary.changes.unique_customers)}
                </div>
              </div>
            </div>
          </div>

          {/* График продаж */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Продажи по дням</h2>
            <div className="h-64 flex items-end space-x-2">
              {dashboardData.sales_chart.map((day, index) => {
                const maxRevenue = Math.max(...dashboardData.sales_chart.map(d => d.revenue));
                const height = (day.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="bg-blue-500 w-full rounded-t"
                      style={{ height: `${height}%` }}
                      title={`${day.date}: ${formatCurrency(day.revenue)}`}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2 transform -rotate-45">
                      {new Date(day.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Топ товары */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Топ товары</h2>
              <div className="space-y-3">
                {dashboardData.top_products.slice(0, 5).map((product, index) => (
                  <div key={product.product_id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          {product.total_quantity} шт. • {product.orders_count} заказов
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(product.total_revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Последние заказы */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Последние заказы</h2>
              <div className="space-y-3">
                {dashboardData.recent_orders.slice(0, 5).map((order) => (
                  <div key={order.order_id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        #{order.order_id} • {order.firstname} {order.lastname}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date_added).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Статистика по категориям */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Продажи по категориям</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dashboardData.categories_stats.slice(0, 6).map((category) => (
                <div key={category.category_name} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{category.category_name}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Выручка:</span>
                      <span className="font-medium">{formatCurrency(category.total_revenue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Заказы:</span>
                      <span className="font-medium">{category.orders_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
