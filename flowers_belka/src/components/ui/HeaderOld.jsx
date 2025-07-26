import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import settings from '../../data/settings.js';

const HeaderOld = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigationItems = [
    { name: 'БУКЕТЫ', path: '/bukety', icon: 'Flower' },
    { name: 'РОЗЫ', path: '/rozy', icon: 'Heart' },
    { name: 'ТЮЛЬПАНЫ', path: '/tulpany', icon: 'Flower' },
    { name: 'ЦВЕТОЧНЫЕ КОМПОЗИЦИИ', path: '/kompozicii', icon: 'Palette' },
    { name: 'ПИОНЫ', path: '/piony', icon: 'Flower' },
    { name: 'КОМУ', path: '/komy', icon: 'Users' },
    { name: 'ПОВОД', path: '/povod', icon: 'Calendar' },
    { name: 'ПОДПИСКА НА ЦВЕТЫ', path: '/podpiska', icon: 'RefreshCw' },
    { name: 'НОВОСТИ', path: '/news', icon: 'FileText' },
    { name: 'ДОСТАВКА', path: '/delivery', icon: 'Truck' },
    { name: 'СУХОЦВЕТЫ', path: '/sukhotsvety', icon: 'Flower' },
  ];

  const isActivePath = (path) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <span className="font-medium">{settings.city}</span>
          <span className="text-center flex-1 mx-4 text-green-400">
             {settings.tagline}
          </span>
          <a href={'tel:' + settings.phone} className="font-bold hover:text-green-400 transition-colors">
            {settings.phone}
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold">
              <span className="text-orange-500">belka-</span>
              <span className="text-orange-600">flowers</span>
            </div>
          </Link>

          {/* Working Hours */}
          <div className="hidden md:block text-center flex-1 mx-8">
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {settings.workingHours}
            </p>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Искать"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-32"
              />
              <Icon name="Search" size={16} className="text-gray-500 ml-2" />
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon name="ShoppingBag" size={20} className="text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-center space-x-6 py-3 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={'whitespace-nowrap px-3 py-2 text-sm font-medium hover:text-yellow-300 transition-colors ' + (isActivePath(item.path) ? 'text-yellow-300' : 'text-white')}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-700">
            {/* Mobile Search */}
            <div className="px-4 py-3 border-b border-blue-700">
              <div className="flex items-center bg-blue-700 rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Искать"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1 text-white placeholder-blue-300"
                />
                <Icon name="Search" size={16} className="text-blue-300 ml-2" />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="px-4 py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={'flex items-center space-x-3 px-2 py-3 text-sm font-medium hover:text-yellow-300 transition-colors ' + (isActivePath(item.path) ? 'text-yellow-300' : 'text-white')}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderOld;
