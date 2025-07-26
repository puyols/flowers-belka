import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryPage from './CategoryPage';

const UniversalCategoryPage = ({ category, subcategory }) => {
  const params = useParams();
  
  // Если category передан как пропс, используем его, иначе берем из URL
  const currentCategory = category || params.category;
  const currentSubcategory = subcategory || params.subcategory;
  
  // Передаем параметры в существующий CategoryPage
  return (
    <CategoryPage 
      category={currentCategory}
      subcategory={currentSubcategory}
    />
  );
};

export default UniversalCategoryPage;
