import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full aspect-square object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />
        {product.status && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
            {product.status}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-2xl font-bold text-orange-600 mb-3">{product.priceFormatted}</p>
        <div className="flex space-x-2">
          <Link 
            to={/product/}
            className="flex-1 bg-orange-600 text-white py-2 px-4 rounded text-center hover:bg-orange-700 transition-colors duration-200"
          >
            Подробнее
          </Link>
          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
