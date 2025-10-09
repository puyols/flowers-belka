import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { CartProvider } from '../../contexts/CartContext';
import '@testing-library/jest-dom';

const mockProduct = {
    id: '1',
    product_id: '1',
    name: 'Тестовый продукт',
    price: 1000,
    images: ['test.jpg'],
    slug: 'test-product',
    category: 'test-category',
    isHit: false,
    inStock: true,
};

describe('ProductCard', () => {
    it('renders product name and price', async () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        const nameElement = await screen.findByText(/Тестовый продукт/i);
        const priceElement = await screen.findByText(/1,000/i);

        expect(nameElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
    });
});
