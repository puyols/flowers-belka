import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetGuide = ({ onBudgetSelect }) => {
  const [selectedTier, setSelectedTier] = useState(null);

  const budgetTiers = [
    {
      id: 'essential',
      name: 'Базовый',
      priceRange: '2 000 - 4 000₽',
      description: 'Красивые композиции для повседневных поводов',
      features: [
        'Сезонные цветы',
        'Стандартная ваза',
        'Базовое оформление',
        'Доставка по городу'
      ],
      examples: [
        'Букет из 7-9 роз',
        'Композиция из тюльпанов',
        'Простая настольная композиция'
      ],
      icon: 'Flower2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'premium',
      name: 'Премиум',
      priceRange: '4 000 - 8 000₽',
      description: 'Изысканные композиции для особых случаев',
      features: [
        'Премиум цветы',
        'Дизайнерская ваза',
        'Профессиональное оформление',
        'Экспресс доставка',
        'Уход за цветами'
      ],
      examples: [
        'Букет из 15-21 розы',
        'Смешанная композиция',
        'Корпоративное оформление'
      ],
      icon: 'Crown',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'luxury',
      name: 'Люкс',
      priceRange: '8 000 - 20 000₽',
      description: 'Эксклюзивные композиции высочайшего качества',
      features: [
        'Редкие и экзотические цветы',
        'Эксклюзивные вазы',
        'Авторское оформление',
        'VIP доставка',
        'Персональный консультант',
        'Гарантия свежести'
      ],
      examples: [
        'Композиция из орхидей',
        'Свадебное оформление',
        'Эксклюзивные букеты'
      ],
      icon: 'Gem',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'exclusive',
      name: 'Эксклюзив',
      priceRange: 'От 20 000₽',
      description: 'Уникальные композиции по индивидуальному дизайну',
      features: [
        'Импортные цветы',
        'Коллекционные вазы',
        'Индивидуальный дизайн',
        'Круглосуточная доставка',
        'Личный флорист',
        'Полное сопровождение',
        'Фотосессия композиции'
      ],
      examples: [
        'Свадебные арки',
        'Корпоративные инсталляции',
        'Эксклюзивные подарки'
      ],
      icon: 'Sparkles',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const handleTierSelect = (tier) => {
    setSelectedTier(tier.id);
    onBudgetSelect(tier);
  };

  return (
    <div className="bg-card rounded-xl shadow-botanical border border-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-semibold text-text-primary">
          Руководство по бюджету
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calculator" size={16} />
          <span>Прозрачные цены</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative border rounded-xl p-6 transition-botanical cursor-pointer hover:shadow-botanical-sm ${
              selectedTier === tier.id
                ? 'border-primary ring-2 ring-primary/20' :'border-botanical'
            }`}
            onClick={() => handleTierSelect(tier)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${tier.bgColor}`}>
                <Icon name={tier.icon} size={24} className={tier.color} />
              </div>
              {selectedTier === tier.id && (
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <Icon name="Check" size={16} />
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-1">
                {tier.name}
              </h4>
              <p className="text-2xl font-bold text-primary mb-2">
                {tier.priceRange}
              </p>
              <p className="text-text-secondary text-sm">
                {tier.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h5 className="font-inter font-medium text-text-primary mb-2">
                Что включено:
              </h5>
              <ul className="space-y-1">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="mb-4">
              <h5 className="font-inter font-medium text-text-primary mb-2">
                Примеры композиций:
              </h5>
              <ul className="space-y-1">
                {tier.examples.map((example, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Flower" size={14} className={tier.color} />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={selectedTier === tier.id ? "default" : "outline"}
              size="sm"
              fullWidth
              iconName={selectedTier === tier.id ? "Check" : "ArrowRight"}
              iconPosition="left"
            >
              {selectedTier === tier.id ? 'Выбрано' : 'Выбрать уровень'}
            </Button>
          </div>
        ))}
      </div>

      {/* Budget Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-text-primary mb-2">
              Советы по бюджету
            </h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Сезонные цветы стоят дешевле и выглядят свежее</li>
              <li>• Заказ за 2-3 дня позволяет получить лучшие цены</li>
              <li>• Композиции в собственных вазах дешевле на 15-20%</li>
              <li>• Подписка на регулярные поставки дает скидку до 10%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Price Calculator */}
      <div className="mt-6 p-4 border border-botanical rounded-lg">
        <h4 className="font-inter font-medium text-text-primary mb-3">
          Быстрый расчет стоимости
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-surface rounded-lg">
            <Icon name="Flower" size={20} className="mx-auto text-primary mb-1" />
            <p className="text-xs text-text-secondary">Цветы</p>
            <p className="font-medium text-text-primary">60-70%</p>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <Icon name="Package" size={20} className="mx-auto text-primary mb-1" />
            <p className="text-xs text-text-secondary">Ваза</p>
            <p className="font-medium text-text-primary">15-20%</p>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <Icon name="Palette" size={20} className="mx-auto text-primary mb-1" />
            <p className="text-xs text-text-secondary">Оформление</p>
            <p className="font-medium text-text-primary">10-15%</p>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <Icon name="Truck" size={20} className="mx-auto text-primary mb-1" />
            <p className="text-xs text-text-secondary">Доставка</p>
            <p className="font-medium text-text-primary">5-10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetGuide;