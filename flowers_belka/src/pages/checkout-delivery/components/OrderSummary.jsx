import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ items, deliveryPrice = 0, onItemUpdate, onItemRemove }) => {
  const mockItems = items || [
    {
      id: 1,
      name: "Букет 'Весенняя нежность'",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
      price: 3490,
      quantity: 1,
      description: "Тюльпаны, нарциссы, зелень",
      size: "Средний"
    },
    {
      id: 2,
      name: "Открытка с пожеланиями",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      price: 290,
      quantity: 1,
      description: "Персонализированная открытка",
      size: "Стандарт"
    }
  ];

  const currentItems = items || mockItems;
  const subtotal = currentItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryPrice;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    onItemUpdate && onItemUpdate(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    onItemRemove && onItemRemove(itemId);
  };

  return (
    <div className="bg-surface rounded-lg p-6 sticky top-24">
      <h3 className="font-playfair text-xl font-semibold text-text-primary mb-6">
        Ваш заказ
      </h3>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {currentItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 p-4 bg-background rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-inter font-semibold text-text-primary text-sm">
                {item.name}
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                {item.description}
              </p>
              {item.size && (
                <p className="text-xs text-text-secondary">
                  Размер: {item.size}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-botanical"
                  >
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="font-inter font-medium text-sm w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-botanical"
                  >
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-text-secondary hover:text-destructive transition-botanical"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-inter font-bold text-primary">
                ₽{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="space-y-3 py-4 border-t border-botanical">
        <div className="flex justify-between items-center">
          <span className="font-inter text-text-secondary">Товары:</span>
          <span className="font-inter font-medium">₽{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-inter text-text-secondary">Доставка:</span>
          <span className="font-inter font-medium">
            {deliveryPrice === 0 ? 'Бесплатно' : `₽${deliveryPrice.toLocaleString()}`}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-botanical">
          <span className="font-inter font-semibold text-text-primary">Итого:</span>
          <span className="font-playfair font-bold text-xl text-primary">
            ₽{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6 p-4 bg-background rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={16} className="text-text-secondary" />
          <span className="font-inter text-sm text-text-secondary">
            Есть промокод?
          </span>
        </div>
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            placeholder="Введите промокод"
            className="flex-1 px-3 py-2 border border-botanical rounded-lg text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button variant="outline" size="sm">
            Применить
          </Button>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-inter text-text-secondary">
            Гарантия свежести 7 дней
          </span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="RotateCcw" size={16} className="text-success" />
          <span className="font-inter text-text-secondary">
            Бесплатная замена при повреждении
          </span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="Clock" size={16} className="text-success" />
          <span className="font-inter text-text-secondary">
            Точная доставка в срок
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;