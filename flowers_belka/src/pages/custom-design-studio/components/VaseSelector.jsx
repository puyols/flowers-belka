import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VaseSelector = ({ selectedVase, onVaseSelect }) => {
  const [activeStyle, setActiveStyle] = useState('classic');

  const vaseStyles = [
    { id: 'classic', name: 'Классические', icon: 'Crown' },
    { id: 'modern', name: 'Современные', icon: 'Zap' },
    { id: 'rustic', name: 'Рустик', icon: 'TreePine' },
    { id: 'luxury', name: 'Люкс', icon: 'Gem' }
  ];

  const vaseData = {
    classic: [
      {
        id: 'crystal-classic',
        name: 'Хрустальная ваза',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        description: 'Элегантная хрустальная ваза ручной работы',
        height: '25 см',
        material: 'Хрусталь'
      },
      {
        id: 'ceramic-white',
        name: 'Белая керамическая ваза',
        price: 800,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
        description: 'Классическая белая керамическая ваза',
        height: '20 см',
        material: 'Керамика'
      },
      {
        id: 'porcelain-blue',
        name: 'Фарфоровая ваза с узором',
        price: 950,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        description: 'Изысканная фарфоровая ваза с синим узором',
        height: '22 см',
        material: 'Фарфор'
      }
    ],
    modern: [
      {
        id: 'glass-geometric',
        name: 'Геометрическая стеклянная ваза',
        price: 650,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
        description: 'Современная ваза с геометрическими формами',
        height: '18 см',
        material: 'Стекло'
      },
      {
        id: 'metal-copper',
        name: 'Медная ваза',
        price: 750,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        description: 'Стильная медная ваза в современном стиле',
        height: '24 см',
        material: 'Медь'
      }
    ],
    rustic: [
      {
        id: 'wooden-natural',
        name: 'Деревянная ваза',
        price: 550,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
        description: 'Натуральная деревянная ваза ручной работы',
        height: '19 см',
        material: 'Дерево'
      },
      {
        id: 'wicker-basket',
        name: 'Плетеная корзина',
        price: 450,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        description: 'Традиционная плетеная корзина',
        height: '16 см',
        material: 'Лоза'
      }
    ],
    luxury: [
      {
        id: 'gold-crystal',
        name: 'Золотая хрустальная ваза',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
        description: 'Роскошная ваза с золотым декором',
        height: '30 см',
        material: 'Хрусталь с золотом'
      },
      {
        id: 'marble-premium',
        name: 'Мраморная ваза премиум',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        description: 'Эксклюзивная мраморная ваза',
        height: '28 см',
        material: 'Мрамор'
      }
    ]
  };

  const currentVases = vaseData[activeStyle] || [];

  return (
    <div className="bg-card rounded-xl shadow-botanical border border-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-semibold text-text-primary">
          Выберите вазу
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Package" size={16} />
          <span>Включено в стоимость</span>
        </div>
      </div>

      {/* Style Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {vaseStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => setActiveStyle(style.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-inter font-medium transition-botanical ${
              activeStyle === style.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={style.icon} size={16} />
            <span>{style.name}</span>
          </button>
        ))}
      </div>

      {/* Vase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentVases.map((vase) => (
          <div
            key={vase.id}
            className={`relative bg-surface rounded-lg border transition-botanical hover:shadow-botanical-sm cursor-pointer ${
              selectedVase?.id === vase.id
                ? 'border-primary ring-2 ring-primary/20' :'border-botanical'
            }`}
            onClick={() => onVaseSelect(vase)}
          >
            <div className="aspect-square relative">
              <Image
                src={vase.image}
                alt={vase.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-xs font-medium text-text-primary">
                  +{vase.price}₽
                </span>
              </div>
              {selectedVase?.id === vase.id && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Icon name="Check" size={16} />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h4 className="font-inter font-medium text-text-primary mb-1">
                {vase.name}
              </h4>
              <p className="text-xs text-text-secondary mb-3">
                {vase.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Ruler" size={12} />
                  <span>{vase.height}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Package" size={12} />
                  <span>{vase.material}</span>
                </div>
              </div>
              
              <Button
                variant={selectedVase?.id === vase.id ? "default" : "outline"}
                size="sm"
                fullWidth
                iconName={selectedVase?.id === vase.id ? "Check" : "Plus"}
                iconPosition="left"
              >
                {selectedVase?.id === vase.id ? 'Выбрано' : 'Выбрать'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaseSelector;