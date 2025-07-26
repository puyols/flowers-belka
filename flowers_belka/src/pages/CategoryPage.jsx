import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderOld from "../components/ui/HeaderOld";
import ProductCard from "../components/ProductCard";
import Footer from "../pages/homepage/components/Footer";
// Тестовые данные удалены - будут загружены из реальных источников
import categoriesData from "../data/categories.js";

const CategoryPage = () => {
  const { "*": slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // Получаем slug из URL
    const currentSlug = window.location.pathname.replace("/", "");
    
    // Находим категорию по slug
    const foundCategory = categoriesData.find(cat => cat.slug === currentSlug);
    setCategory(foundCategory);

    // Товары будут загружены из реальных источников данных
    const categoryProducts = []; // Тестовые данные удалены
    setProducts(categoryProducts);

    // Обновляем title страницы
    if (foundCategory) {
      document.title = `${foundCategory.name} - Belka Flowers`;
    }
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderOld />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Категория не найдена</h1>
            <p className="text-gray-600">Запрашиваемая категория не существует</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderOld />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Скоро здесь появятся товары</h2>
            <p className="text-gray-600 mb-8">
              Мы работаем над наполнением этой категории. Следите за обновлениями!
            </p>
            <a 
              href="/"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
            >
              Вернуться на главную
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
