'use client';

import React from 'react';

interface FilterOptions {
  priceFrom: string;
  priceTo: string;
  flowerType: string;
  color: string;
  occasion: string;
  sortBy: string;
}

interface CategoryFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  category: string;
  productCount: number;
}

// Конфигурация фильтров для разных категорий
const filterConfigs = {
  bukety_tsvetov: {
    flowerTypes: [
      { value: 'розы', label: '🌹 с розами', count: 76 },
      { value: 'хризантемы', label: '🌼 с хризантемами', count: 29 },
      { value: 'эустома', label: '💙 с эустомой', count: 29 },
      { value: 'гвоздики', label: '🌺 с гвоздиками', count: 25 },
      { value: 'альстромерия', label: '🌺 с альстромерией', count: 17 },
      { value: 'тюльпаны', label: '🌷 с тюльпанами', count: 15 },
      { value: 'пионы', label: '🌸 с пионами', count: 20 },
      { value: 'гортензия', label: '💐 с гортензией', count: 8 },
      { value: 'маттиола', label: '🌿 с маттиолой', count: 6 },
      { value: 'ромашка', label: '🌼 с ромашками', count: 5 },
      { value: 'ранункулюсы', label: '🌻 с ранункулюсами', count: 4 },
      { value: 'гипсофила', label: '🤍 с гипсофилой', count: 3 },
      { value: 'анемоны', label: '🌺 с анемонами', count: 1 },
      { value: 'сирень', label: '💜 с сиренью', count: 5 },
      { value: 'смешанный', label: '🎨 смешанные букеты', count: 4 }
    ]
  },
  rozy: {
    flowerTypes: [
      { value: 'эквадор', label: '🌹 Розы Эквадор', count: 24 },
      { value: 'кения', label: '🌹 Розы Кения', count: 9 },
      { value: 'кустовые', label: '🌹 Кустовые розы', count: 26 },
      { value: 'пионовидные', label: '🌹 Пионовидные розы', count: 9 }
    ]
  },
  tulpany: {
    flowerTypes: [
      { value: 'белые', label: '🌷 Белые тюльпаны', count: 3 },
      { value: 'розовые', label: '🌷 Розовые тюльпаны', count: 6 },
      { value: 'желтые', label: '🌷 Желтые тюльпаны', count: 2 },
      { value: 'кремовые', label: '🌷 Кремовые тюльпаны', count: 2 },
      { value: 'пионовидные', label: '🌷 Пионовидные тюльпаны', count: 2 }
    ]
  },
  piony: {
    flowerTypes: [
      { value: 'белые', label: '🌸 Белые пионы', count: 3 },
      { value: 'розовые', label: '🌸 Розовые пионы', count: 5 },
      { value: 'красные', label: '🌸 Красные пионы', count: 2 },
      { value: 'смешанные', label: '🌸 Смешанные пионы', count: 1 }
    ]
  }
};

const colors = [
  { value: 'белые', label: '🤍 Белые', count: 9 },
  { value: 'розовые', label: '🩷 Розовые', count: 8 },
  { value: 'красные', label: '❤️ Красные', count: 6 },
  { value: 'сиреневые', label: '💜 Сиреневые', count: 4 },
  { value: 'желтые', label: '💛 Желтые', count: 2 },
  { value: 'персиковые', label: '🧡 Персиковые', count: 2 }
];

const occasions = [
  { value: '8_marta', label: '🌷 8 Марта', count: 28 },
  { value: 'den_rozhdeniya', label: '🎂 День рождения', count: 2 },
  { value: 'den_materi', label: '👩‍👧‍👦 День матери', count: 2 },
  { value: '14_fevralya', label: '💕 14 февраля', count: 2 },
  { value: 'roskoshnyy', label: '💎 Роскошные', count: 12 },
  { value: 'nezhnyy', label: '🌸 Нежные', count: 11 },
  { value: 'elegantnyy', label: '✨ Элегантные', count: 6 },
  { value: 'romantika', label: '💝 Романтика', count: 3 },
  { value: 'mame', label: '👩 Маме', count: 2 },
  { value: 'devushke', label: '👧 Девушке', count: 1 },
  { value: 'devochke', label: '👶 Девочке', count: 1 },
  { value: 'lyubimoy', label: '💖 Любимой', count: 1 },
  { value: 'muzhchine', label: '👨 Мужчине', count: 1 },
  { value: 'uchitelyu', label: '👩‍🏫 Учителю', count: 1 }
];

export default function CategoryFilters({ filters, setFilters, category, productCount }: CategoryFiltersProps) {
  const config = filterConfigs[category as keyof typeof filterConfigs] || filterConfigs.bukety_tsvetov;

  const resetFilters = () => {
    setFilters({
      priceFrom: '',
      priceTo: '',
      flowerType: '',
      color: '',
      occasion: '',
      sortBy: 'number_desc'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          Фильтры и сортировка
        </h3>
        <button
          onClick={resetFilters}
          className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          Сбросить все
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Price filter */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            💰 Цена
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="от"
              value={filters.priceFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <span className="text-gray-400 font-medium">—</span>
            <input
              type="number"
              placeholder="до"
              value={filters.priceTo}
              onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-500 font-medium">₽</span>
          </div>
        </div>

        {/* Flower type filter */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            🌸 Тип цветов
          </label>
          <select
            value={filters.flowerType}
            onChange={(e) => setFilters(prev => ({ ...prev, flowerType: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Все виды</option>
            {config.flowerTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label} ({type.count} {type.count === 1 ? 'букет' : type.count < 5 ? 'букета' : 'букетов'})
              </option>
            ))}
          </select>
        </div>

        {/* Color filter */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            🎨 Цвет
          </label>
          <select
            value={filters.color}
            onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Любой цвет</option>
            {colors.map(color => (
              <option key={color.value} value={color.value}>
                {color.label} ({color.count} {color.count === 1 ? 'букет' : color.count < 5 ? 'букета' : 'букетов'})
              </option>
            ))}
          </select>
        </div>

        {/* Occasion filter */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            🎉 Повод
          </label>
          <select
            value={filters.occasion}
            onChange={(e) => setFilters(prev => ({ ...prev, occasion: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Любой повод</option>
            {occasions.map(occasion => (
              <option key={occasion.value} value={occasion.value}>
                {occasion.label} ({occasion.count} {occasion.count === 1 ? 'букет' : occasion.count < 5 ? 'букета' : 'букетов'})
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            📊 Сортировка
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="number_desc">По номеру (новые)</option>
            <option value="popular">По популярности</option>
            <option value="price_asc">По цене ↗</option>
            <option value="price_desc">По цене ↘</option>
            <option value="name">По названию</option>
          </select>
        </div>
      </div>

      {/* Active filters display */}
      {(filters.flowerType || filters.color || filters.occasion || filters.priceFrom || filters.priceTo) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Активные фильтры:</span>
            {filters.flowerType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {filters.flowerType}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, flowerType: '' }))}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.color && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filters.color}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, color: '' }))}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.occasion && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {filters.occasion.replace('_', ' ')}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, occasion: '' }))}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
            {(filters.priceFrom || filters.priceTo) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {filters.priceFrom && `от ${filters.priceFrom}₽`}
                {filters.priceFrom && filters.priceTo && ' '}
                {filters.priceTo && `до ${filters.priceTo}₽`}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, priceFrom: '', priceTo: '' }))}
                  className="ml-2 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
