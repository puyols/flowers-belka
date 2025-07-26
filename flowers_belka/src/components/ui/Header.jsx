import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Данные для мега-меню
  const megaMenuData = {
    categories: [
      {
        name: 'Букеты цветов',
        path: '/bukety_tsvetov',
        subcategories: [
          { name: 'с розами', path: '/bukety_tsvetov?filter=rozy' },
          { name: 'с альстромерией', path: '/bukety_tsvetov?filter=alstromeriya' },
          { name: 'с гортензией', path: '/bukety_tsvetov?filter=gortenziya' },
          { name: 'с тюльпанами', path: '/bukety_tsvetov?filter=tulpany' },
          { name: 'с хризантемой', path: '/bukety_tsvetov?filter=hrizantema' },
          { name: 'с диантусами', path: '/bukety_tsvetov?filter=diantus' },
          { name: 'с эустомой/лизиантусами', path: '/bukety_tsvetov?filter=eustoma' },
          { name: 'с ромашкой', path: '/bukety_tsvetov?filter=romashka' },
          { name: 'без упаковки', path: '/bukety_tsvetov?filter=bez_upakovki' },
        ]
      },
      {
        name: 'Розы',
        path: '/rozy',
        subcategories: [
          { name: '15 роз', path: '/rozy?filter=15' },
          { name: '25 роз', path: '/rozy?filter=25' },
          { name: 'кустовые розы', path: '/rozy?filter=kustovye' },
        ]
      },
      {
        name: 'Тюльпаны',
        path: '/tulpany',
        subcategories: []
      },
      {
        name: 'Цветочные композиции',
        path: '/tsvety_v_korobke',
        subcategories: []
      },
      {
        name: 'Пионы',
        path: '/piony',
        subcategories: []
      },
      {
        name: 'Сухоцветы',
        path: '/sukhotsvety',
        subcategories: []
      },
    ]
  };

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const navigationItems = [
    {
      name: 'Коллекции',
      path: '/bukety_tsvetov',
      icon: 'Flower',
      hasMegaMenu: true,
    },
    {
      name: 'Кому',
      path: '#',
      icon: 'Users',
      hasDropdown: true,
      children: [
        { name: 'Девушке', path: '/bukety_tsvetov?filter=devushke' },
        { name: 'Девочке', path: '/bukety_tsvetov?filter=devochke' },
        { name: 'Маме', path: '/bukety_tsvetov?filter=mame' },
        { name: 'Любимой', path: '/bukety_tsvetov?filter=lyubimoy' },
        { name: 'Мальчику', path: '/bukety_tsvetov?filter=malchiku' },
        { name: 'Мужчине', path: '/bukety_tsvetov?filter=muzhchine' },
        { name: 'Учителю', path: '/tsvety_v_korobke?filter=uchitelyu' },
        { name: 'Ребенку', path: '/bukety_tsvetov?filter=rebenku' },
        { name: 'Бабушке', path: '/tulpany?filter=babushke' },
      ]
    },
    {
      name: 'Повод',
      path: '#',
      icon: 'Calendar',
      hasDropdown: true,
      children: [
        { name: 'День рождения', path: '/bukety_tsvetov?filter=den_rozhdeniya' },
        { name: 'День матери', path: '/bukety_tsvetov?filter=den_materi' },
        { name: '8 марта', path: '/bukety_tsvetov?filter=8_marta' },
        { name: '14 февраля', path: '/bukety_tsvetov?filter=14_fevralya' },
      ]
    },
    { name: 'Новости', path: '/novosti', icon: 'FileText' },
    { name: 'Доставка', path: '/dostavka', icon: 'Truck' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Здесь можно добавить логику поиска
      console.log('Поиск:', searchQuery);
      // Например, перенаправление на страницу поиска
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Contact Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <span className="font-medium">Путилково</span>
          <span className="text-center flex-1 mx-4 text-green-400">
            Интернет-магазин "Белка фловерс" работает ежедневно 10:00 - 22:00 / Доставка курьером
          </span>
          <div className="flex items-center space-x-4">
            <a href="https://api.whatsapp.com/send?phone=79037349844" className="text-green-400 hover:text-green-300 transition-colors">
              WhatsApp
            </a>
            <a href="tel:+79037349844" className="font-bold hover:text-green-400 transition-colors">
              +7 (903) 734-98-44
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-white">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <svg
                width="140"
                height="60"
                viewBox="0 0 140 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                {/* "belka-" text */}
                <text
                  x="0"
                  y="25"
                  fontFamily="Arial, sans-serif"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#f97316"
                  className="select-none"
                >
                  belka-
                </text>

                {/* "flowers" text */}
                <text
                  x="0"
                  y="50"
                  fontFamily="Arial, sans-serif"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#f97316"
                  className="select-none"
                >
                  flowers
                </text>
              </svg>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-inter font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <Icon name="ChevronDown" size={16} className="transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Mega Menu для коллекций */}
                {item.hasMegaMenu && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="flex">
                      {/* Левая колонка - категории */}
                      <div className="w-1/2 border-r border-gray-200">
                        <div className="py-2">
                          {megaMenuData.categories.map((category) => (
                            <div
                              key={category.path}
                              onMouseEnter={() => setHoveredCategory(category)}
                              className="relative"
                            >
                              <Link
                                to={category.path}
                                className={`block px-4 py-3 text-sm transition-colors ${
                                  hoveredCategory?.path === category.path
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {category.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Правая колонка - подкатегории */}
                      <div className="w-1/2">
                        <div className="py-2">
                          {hoveredCategory && hoveredCategory.subcategories.length > 0 ? (
                            hoveredCategory.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.path}
                                to={subcategory.path}
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                              >
                                {subcategory.name}
                              </Link>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">
                              Наведите на категорию
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Обычное Dropdown Menu */}
                {item.hasDropdown && item.children && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {!isSearchOpen ? (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  iconPosition="left"
                  className="text-gray-600 hover:text-orange-600"
                  onClick={toggleSearch}
                >
                  Поиск
                </Button>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск товаров..."
                    className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-orange-600 text-white rounded-r-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <Icon name="Search" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </form>
              )}
            </div>

            <Button
              variant="default"
              size="sm"
              iconName="ShoppingBag"
              iconPosition="left"
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Корзина
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 transition-botanical"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-botanical">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-botanical ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Actions */}
            <div className="px-4 pb-4 space-y-2 border-t border-botanical pt-4">
              <Button
                variant="ghost"
                fullWidth
                iconName="Search"
                iconPosition="left"
                className="justify-start text-text-secondary hover:text-primary"
              >
                Поиск
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                className="justify-start"
              >
                Консультация
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="ShoppingBag"
                iconPosition="left"
                className="justify-start"
              >
                Заказать
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;