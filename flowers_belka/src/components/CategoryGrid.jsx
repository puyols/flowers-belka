import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map(category => (
        <Link 
          key={category.id}
          to={/}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/images/placeholder-category.jpg';
                }}
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm text-gray-800 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
