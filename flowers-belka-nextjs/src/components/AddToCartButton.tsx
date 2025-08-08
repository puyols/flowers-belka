'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
    category: string;
    inStock: boolean;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart({
      product_id: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      category: product.category,
    }, quantity);
  };

  return (
    <div className="space-y-4 pt-6 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
      </div>
      
      <button className="w-full border border-green-600 text-green-600 py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold">
        Купить в один клик
      </button>
    </div>
  );
};

export default AddToCartButton;
