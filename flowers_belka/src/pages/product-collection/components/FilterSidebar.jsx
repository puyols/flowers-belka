import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  filters, 
  setFilters, 
  isOpen, 
  onClose,
  onClearFilters 
}) => {
  const priceRanges = [
    { id: 'under-2000', label: 'До ₽2,000', min: 0, max: 2000 },
    { id: '2000-5000', label: '₽2,000 - ₽5,000', min: 2000, max: 5000 },
    { id: '5000-10000', label: '₽5,000 - ₽10,000', min: 5000, max: 10000 },
    { id: 'over-10000', label: 'Свыше ₽10,000', min: 10000, max: Infinity }
  ];

  const colors = [
    { id: 'red', label: 'Красный', color: '#DC2626' },
    { id: 'pink', label: 'Розовый', color: '#EC4899' },
    { id: 'white', label: 'Белый', color: '#FFFFFF' },
    { id: 'yellow', label: 'Жёлтый', color: '#EAB308' },
    { id: 'purple', label: 'Фиолетовый', color: '#9333EA' },
    { id: 'orange', label: 'Оранжевый', color: '#EA580C' }
  ];

  const sizes = [
    { id: 'small', label: 'Маленький' },
    { id: 'medium', label: 'Средний' },
    { id: 'large', label: 'Большой' },
    { id: 'extra-large', label: 'Очень большой' }
  ];

  const occasions = [
    { id: 'birthday', label: 'День рождения' },
    { id: 'anniversary', label: 'Годовщина' },
    { id: 'wedding', label: 'Свадьба' },
    { id: 'sympathy', label: 'Соболезнование' },
    { id: 'new-year', label: 'Новый год' },
    { id: 'womens-day', label: '8 Марта' },
    { id: 'easter', label: 'Пасха' }
  ];

  const handlePriceChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range.id ? null : range.id
    }));
  };

  const handleColorChange = (colorId) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(colorId)
        ? prev.colors.filter(c => c !== colorId)
        : [...prev.colors, colorId]
    }));
  };

  const handleSizeChange = (sizeId) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(sizeId)
        ? prev.sizes.filter(s => s !== sizeId)
        : [...prev.sizes, sizeId]
    }));
  };

  const handleOccasionChange = (occasionId) => {
    setFilters(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasionId)
        ? prev.occasions.filter(o => o !== occasionId)
        : [...prev.occasions, occasionId]
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-64 
        bg-background border-r border-botanical z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-playfair text-xl font-semibold text-text-primary">
              Фильтры
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-text-secondary hover:text-primary"
              >
                Очистить
              </Button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 transition-botanical"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-inter font-medium text-text-primary mb-4">
              Цена
            </h4>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange === range.id}
                    onChange={() => handlePriceChange(range)}
                    className="w-4 h-4 text-primary border-2 border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h4 className="font-inter font-medium text-text-primary mb-4">
              Цвет
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color) => (
                <label
                  key={color.id}
                  className="flex flex-col items-center space-y-2 cursor-pointer group"
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.colors.includes(color.id)
                          ? 'border-primary scale-110' :'border-border group-hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.color }}
                    />
                    {filters.colors.includes(color.id) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Check" size={16} color="white" />
                      </div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color.id)}
                    onChange={() => handleColorChange(color.id)}
                    className="sr-only"
                  />
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors text-center">
                    {color.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <h4 className="font-inter font-medium text-text-primary mb-4">
              Размер
            </h4>
            <div className="space-y-3">
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size.id)}
                    onChange={() => handleSizeChange(size.id)}
                    className="w-4 h-4 text-primary border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {size.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Occasions */}
          <div className="mb-8">
            <h4 className="font-inter font-medium text-text-primary mb-4">
              Повод
            </h4>
            <div className="space-y-3">
              {occasions.map((occasion) => (
                <label
                  key={occasion.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.occasions.includes(occasion.id)}
                    onChange={() => handleOccasionChange(occasion.id)}
                    className="w-4 h-4 text-primary border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {occasion.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;