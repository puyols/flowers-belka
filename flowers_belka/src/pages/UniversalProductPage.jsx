import React from 'react';
import { useParams } from 'react-router-dom';

// Импортируем существующий компонент для товаров
import ProductDetail from './product-detail';

const UniversalProductPage = () => {
  const { slug } = useParams();
  
  // Передаем slug в существующий компонент ProductDetail
  return <ProductDetail productSlug={slug} />;
};

export default UniversalProductPage;
