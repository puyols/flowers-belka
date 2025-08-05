'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Добавляем главную страницу в начало, если её нет
  const breadcrumbItems = items[0]?.url !== '/' 
    ? [{ name: 'Главная', url: '/' }, ...items]
    : items;

  // Подготавливаем данные для structured data
  const structuredDataItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: `https://flowers-belka.ru${item.url}`
  }));

  return (
    <>
      {/* Structured Data для хлебных крошек */}
      <StructuredData type="breadcrumb" data={structuredDataItems} />
      
      {/* Визуальные хлебные крошки */}
      <nav 
        className={`flex ${className}`} 
        aria-label="Навигация по сайту"
        role="navigation"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon 
                  className="w-4 h-4 text-gray-400 mx-1" 
                  aria-hidden="true"
                />
              )}
              
              {item.current ? (
                <span 
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-current="page"
                >
                  {index === 0 && (
                    <HomeIcon className="w-4 h-4 mr-1 inline" aria-hidden="true" />
                  )}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-pink-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  aria-label={`Перейти к ${item.name}`}
                >
                  {index === 0 && (
                    <HomeIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                  )}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
