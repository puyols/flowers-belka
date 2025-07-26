import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode, 
  totalProducts,
  onToggleFilters 
}) => {
  const sortOptions = [
    { value: 'featured', label: 'Рекомендуемые' },
    { value: 'price-low', label: 'Цена: по возрастанию' },
    { value: 'price-high', label: 'Цена: по убыванию' },
    { value: 'newest', label: 'Новинки' },
    { value: 'rating', label: 'Рейтинг' },
    { value: 'popularity', label: 'Популярность' }
  ];

  return (
    <div className="flex items-center justify-between py-4 px-4 lg:px-0 bg-background border-b border-botanical lg:border-0">
      <div className="flex items-center space-x-4">
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={onToggleFilters}
          className="lg:hidden"
        >
          Фильтры
        </Button>

        {/* Results Count */}
        <div className="hidden sm:flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            Найдено:
          </span>
          <span className="text-sm font-medium text-text-primary">
            {totalProducts} товаров
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-background border border-botanical rounded-lg px-4 py-2 pr-8 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-botanical"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon name="ChevronDown" size={16} className="text-text-secondary" />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'grid' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Grid3X3" size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'list' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="List" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingControls;