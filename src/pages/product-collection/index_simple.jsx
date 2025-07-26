import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

const ProductCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Загружаем товары...');
        const response = await fetch('/products_full.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Данные загружены:', data);
        
        // Простая адаптация данных
        const adaptedProducts = data.products.map(product => ({
          id: product.product_id,
          name: product.name || 'Без названия',
          price: parseFloat(product.price) || 0,
          image: product.image ? `/images/${product.image}` : '/images/placeholder.jpg',
          description: product.description || '',
          inStock: parseInt(product.quantity) > 0
        }));
        
        setProducts(adaptedProducts);
        console.log('Товары адаптированы:', adaptedProducts.length);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-secondary">Загружаем товары...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h1>
            <p className="text-text-secondary mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-accent text-white px-4 py-2 rounded"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Каталог цветов ({products.length} товаров)
        </h1>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-accent mb-2">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                    <button 
                      className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark transition-colors"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'В корзину' : 'Недоступно'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Товары не найдены
            </h2>
            <p className="text-text-secondary">
              Попробуйте обновить страницу или обратитесь к администратору
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCollection;
