import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArrangementPreview = ({ selectedFlowers, selectedVase, totalPrice, onRemoveFlower, onUpdateQuantity }) => {
  const calculateFlowerTotal = () => {
    return selectedFlowers.reduce((total, flower) => total + (flower.price * flower.quantity), 0);
  };

  const vasePrice = selectedVase?.price || 0;
  const flowerTotal = calculateFlowerTotal();

  return (
    <div className="bg-card rounded-xl shadow-botanical border border-botanical p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-semibold text-text-primary">
          Предварительный просмотр
        </h3>
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="Eye" size={16} />
          <span>Живой просмотр</span>
        </div>
      </div>

      {/* Arrangement Visualization */}
      <div className="relative bg-gradient-to-br from-surface to-muted rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
        {selectedVase ? (
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                src={selectedVase.image}
                alt={selectedVase.name}
                className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
              />
              {selectedFlowers.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                  {selectedFlowers.reduce((total, flower) => total + flower.quantity, 0)}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-text-primary">
              {selectedVase.name}
            </p>
            <p className="text-xs text-text-secondary">
              {selectedFlowers.length > 0 
                ? `${selectedFlowers.length} видов цветов` 
                : 'Добавьте цветы'
              }
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Icon name="Package" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary mb-2">Выберите вазу</p>
            <p className="text-xs text-text-secondary">
              Начните создание композиции
            </p>
          </div>
        )}
      </div>

      {/* Selected Flowers List */}
      {selectedFlowers.length > 0 && (
        <div className="mb-6">
          <h4 className="font-inter font-medium text-text-primary mb-3">
            Выбранные цветы
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {selectedFlowers.map((flower) => (
              <div key={flower.id} className="flex items-center space-x-3 bg-surface rounded-lg p-3">
                <Image
                  src={flower.image}
                  alt={flower.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary text-sm truncate">
                    {flower.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {flower.price}₽ за штуку
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(flower.id, Math.max(1, flower.quantity - 1))}
                    className="w-6 h-6 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-botanical"
                  >
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="text-sm font-medium text-text-primary w-6 text-center">
                    {flower.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(flower.id, flower.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-botanical"
                  >
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveFlower(flower.id)}
                  className="text-text-secondary hover:text-error transition-botanical"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-botanical pt-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Цветы:</span>
            <span className="text-text-primary">{flowerTotal}₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Ваза:</span>
            <span className="text-text-primary">{vasePrice}₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Оформление:</span>
            <span className="text-text-primary">500₽</span>
          </div>
          <div className="border-t border-botanical pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-text-primary">Итого:</span>
              <span className="text-primary text-lg">{totalPrice}₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Save"
          iconPosition="left"
          disabled={selectedFlowers.length === 0 || !selectedVase}
        >
          Сохранить дизайн
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Share"
          iconPosition="left"
          disabled={selectedFlowers.length === 0 || !selectedVase}
        >
          Поделиться
        </Button>
      </div>

      {/* Design Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Совет дизайнера
            </p>
            <p className="text-xs text-text-secondary">
              {selectedFlowers.length === 0 
                ? 'Начните с выбора основных цветов, затем добавьте акценты'
                : selectedFlowers.length < 3
                ? 'Добавьте еще 1-2 вида цветов для более богатой композиции' :'Отличный выбор! Композиция будет выглядеть гармонично'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementPreview;