import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FlowerSelector = ({ selectedFlowers, onFlowerSelect, onFlowerRemove }) => {
  const [activeCategory, setActiveCategory] = useState('roses');

  const flowerCategories = [
    { id: 'roses', name: 'Розы', icon: 'Rose' },
    { id: 'tulips', name: 'Тюльпаны', icon: 'Flower2' },
    { id: 'peonies', name: 'Пионы', icon: 'Flower' },
    { id: 'lilies', name: 'Лилии', icon: 'Sparkles' },
    { id: 'chrysanthemums', name: 'Хризантемы', icon: 'Sun' },
    { id: 'orchids', name: 'Орхидеи', icon: 'Heart' }
  ];

  const flowerData = {
    roses: [
      {
        id: 'red-rose',
        name: 'Красная роза',
        price: 180,
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop',
        available: true,
        season: 'Круглый год',
        description: 'Классическая красная роза премиум качества'
      },
      {
        id: 'white-rose',
        name: 'Белая роза',
        price: 170,
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop',
        available: true,
        season: 'Круглый год',
        description: 'Элегантная белая роза для особых случаев'
      },
      {
        id: 'pink-rose',
        name: 'Розовая роза',
        price: 160,
        image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=300&h=300&fit=crop',
        available: true,
        season: 'Круглый год',
        description: 'Нежная розовая роза для романтических моментов'
      }
    ],
    tulips: [
      {
        id: 'red-tulip',
        name: 'Красный тюльпан',
        price: 120,
        image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=300&h=300&fit=crop',
        available: true,
        season: 'Март - Май',
        description: 'Яркий весенний тюльпан'
      },
      {
        id: 'yellow-tulip',
        name: 'Желтый тюльпан',
        price: 110,
        image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=300&h=300&fit=crop',
        available: true,
        season: 'Март - Май',
        description: 'Солнечный желтый тюльпан'
      }
    ],
    peonies: [
      {
        id: 'pink-peony',
        name: 'Розовый пион',
        price: 280,
        image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=300&h=300&fit=crop',
        available: false,
        season: 'Май - Июнь',
        description: 'Роскошный розовый пион'
      },
      {
        id: 'white-peony',
        name: 'Белый пион',
        price: 300,
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop',
        available: false,
        season: 'Май - Июнь',
        description: 'Изысканный белый пион'
      }
    ],
    lilies: [
      {
        id: 'white-lily',
        name: 'Белая лилия',
        price: 220,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        available: true,
        season: 'Июнь - Август',
        description: 'Ароматная белая лилия'
      }
    ],
    chrysanthemums: [
      {
        id: 'yellow-chrysanthemum',
        name: 'Желтая хризантема',
        price: 140,
        image: 'https://images.unsplash.com/photo-1571043733612-d5444ff2c4f4?w=300&h=300&fit=crop',
        available: true,
        season: 'Сентябрь - Ноябрь',
        description: 'Осенняя желтая хризантема'
      }
    ],
    orchids: [
      {
        id: 'purple-orchid',
        name: 'Фиолетовая орхидея',
        price: 450,
        image: 'https://images.unsplash.com/photo-1583160247711-2191776b4b91?w=300&h=300&fit=crop',
        available: true,
        season: 'Круглый год',
        description: 'Экзотическая фиолетовая орхидея'
      }
    ]
  };

  const currentFlowers = flowerData[activeCategory] || [];

  const handleFlowerSelect = (flower) => {
    const existingFlower = selectedFlowers.find(f => f.id === flower.id);
    if (existingFlower) {
      onFlowerSelect({ ...flower, quantity: existingFlower.quantity + 1 });
    } else {
      onFlowerSelect({ ...flower, quantity: 1 });
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-botanical border border-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-semibold text-text-primary">
          Выберите цветы
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>Сезонная доступность</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {flowerCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-inter font-medium transition-botanical ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentFlowers.map((flower) => (
          <div
            key={flower.id}
            className={`relative bg-surface rounded-lg border border-botanical overflow-hidden transition-botanical hover:shadow-botanical-sm ${
              !flower.available ? 'opacity-60' : ''
            }`}
          >
            <div className="aspect-square relative">
              <Image
                src={flower.image}
                alt={flower.name}
                className="w-full h-full object-cover"
              />
              {!flower.available && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    Не в сезоне
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-xs font-medium text-text-primary">
                  {flower.price}₽
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-inter font-medium text-text-primary mb-1">
                {flower.name}
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                {flower.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="Calendar" size={12} />
                  <span>{flower.season}</span>
                </div>
                {flower.available && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="CheckCircle" size={12} />
                    <span>В наличии</span>
                  </div>
                )}
              </div>
              
              <Button
                variant={flower.available ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={!flower.available}
                onClick={() => handleFlowerSelect(flower)}
                iconName="Plus"
                iconPosition="left"
              >
                {flower.available ? 'Добавить' : 'Недоступно'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {currentFlowers.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Flower" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">
            Цветы в этой категории скоро появятся
          </p>
        </div>
      )}
    </div>
  );
};

export default FlowerSelector;