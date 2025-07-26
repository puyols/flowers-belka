import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('care');

  const tabs = [
    { id: 'care', label: 'Уход', icon: 'Droplets' },
    { id: 'meaning', label: 'Значение цветов', icon: 'Heart' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'specifications', label: 'Характеристики', icon: 'Info' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'care':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-3">
                Инструкция по уходу
              </h4>
              <div className="space-y-4">
                {product.careInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-inter font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-inter font-medium text-text-primary mb-1">
                        {instruction.title}
                      </h5>
                      <p className="font-inter text-sm text-text-secondary leading-relaxed">
                        {instruction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-success/5 border border-success/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-success" />
                <span className="font-inter font-medium text-success">
                  Ожидаемая продолжительность жизни
                </span>
              </div>
              <p className="font-inter text-sm text-text-secondary">
                При правильном уходе композиция сохранит свежесть {product.expectedLifespan}
              </p>
            </div>
          </div>
        );

      case 'meaning':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-3">
                Символическое значение
              </h4>
              <p className="font-inter text-text-secondary leading-relaxed mb-6">
                {product.overallMeaning}
              </p>
            </div>
            
            <div className="space-y-4">
              {product.flowerMeanings.map((flower, index) => (
                <div key={index} className="bg-surface rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <h5 className="font-playfair font-semibold text-text-primary">
                      {flower.name}
                    </h5>
                  </div>
                  <p className="font-inter text-sm text-text-secondary leading-relaxed">
                    {flower.meaning}
                  </p>
                  {flower.tradition && (
                    <div className="mt-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                      <p className="font-inter text-xs text-text-secondary">
                        <strong>Традиция:</strong> {flower.tradition}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'delivery':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-3">
                Варианты доставки
              </h4>
              <div className="space-y-4">
                {product.deliveryOptions.map((option, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-xl">
                    <Icon name={option.icon} size={20} className="text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-inter font-medium text-text-primary">
                          {option.name}
                        </h5>
                        <span className="font-inter font-semibold text-primary">
                          {option.price === 0 ? 'Бесплатно' : `${option.price} ₽`}
                        </span>
                      </div>
                      <p className="font-inter text-sm text-text-secondary mb-2">
                        {option.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span>Время: {option.timeframe}</span>
                        <span>Зона: {option.coverage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="font-inter font-medium text-warning">
                  Важная информация
                </span>
              </div>
              <ul className="font-inter text-sm text-text-secondary space-y-1">
                <li>• Доставка осуществляется только в свежем виде</li>
                <li>• Время доставки может варьироваться в зависимости от погодных условий</li>
                <li>• Для корпоративных заказов доступны специальные условия</li>
              </ul>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-3">
                Технические характеристики
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-surface rounded-lg">
                    <span className="font-inter text-sm text-text-secondary">
                      {spec.label}
                    </span>
                    <span className="font-inter text-sm font-medium text-text-primary">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-3">
                Включено в комплект
              </h4>
              <div className="space-y-2">
                {product.included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="font-inter text-sm text-text-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-botanical overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-inter font-medium transition-botanical whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-surface'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;