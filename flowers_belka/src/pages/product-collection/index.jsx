import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CollectionHero from './components/CollectionHero';
import FilterSidebar from './components/FilterSidebar';
import SortingControls from './components/SortingControls';
import ProductCard from './components/ProductCard';
import RecommendationSection from './components/RecommendationSection';
import SocialProofSection from './components/SocialProofSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCollection = () => {
  const [filters, setFilters] = useState({
    priceRange: null,
    colors: [],
    sizes: [],
    occasions: []
  });
  
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mock data for current collection
  const currentCollection = {
    name: "Зимняя коллекция 2025",
    description: `Откройте для себя магию зимних композиций, созданных из самых свежих цветов и зелени. Наша зимняя коллекция сочетает в себе классическую элегантность с современными тенденциями флористики.\n\nКаждая композиция тщательно продумана нашими мастерами-флористами и создана с использованием премиальных материалов из лучших питомников Европы.`,
    heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    source: "Европейские питомники",
    season: "Зима 2025"
  };

  // Тестовые данные удалены - будут загружены из реальных источников
  const allProducts = [
    // Тестовые товары удалены
  ];

  // Mock recommendations data
  const recommendations = [
    {
      id: 101,
      name: "Дополнительная зелень",
      description: "Эвкалипт и папоротник для создания объёма",
      price: 800,
      originalPrice: 1000,
      image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?w=400&h=300&fit=crop",
      badge: "Дополнение",
      rating: 4.7,
      deliveryTime: "С основным заказом",
      category: "Зелень"
    },
    {
      id: 102,
      name: "Праздничная упаковка",
      description: "Премиальная упаковка с лентами и декором",
      price: 500,
      image: "https://images.pixabay.com/photo/2017/02/15/10/39/salad-2068220_1280.jpg?w=400&h=300&fit=crop",
      badge: "Популярно",
      rating: 4.8,
      deliveryTime: "Бесплатно",
      category: "Упаковка"
    },
    {
      id: 103,
      name: "Открытка с пожеланиями",
      description: "Персональная открытка с вашим текстом",
      price: 200,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      badge: "Персонализация",
      rating: 4.9,
      deliveryTime: "Включено",
      category: "Аксессуары"
    }
  ];

  // Mock social proof data
  const socialProof = {
    reviews: [
      {
        id: 1,
        name: "Анна Петрова",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        comment: "Потрясающие цветы! Доставили точно в срок, композиция превзошла все ожидания. Обязательно буду заказывать ещё!",
        date: "15 января 2025"
      },
      {
        id: 2,
        name: "Михаил Сидоров",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        comment: "Заказывал для жены на годовщину. Она была в восторге! Цветы свежие, аромат невероятный. Спасибо за качество!",
        date: "12 января 2025"
      },
      {
        id: 3,
        name: "Елена Козлова",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        comment: "Очень красивая композиция, но доставка задержалась на полчаса. В остальном всё отлично, цветы долго стояли.",
        date: "10 января 2025"
      }
    ],
    customerPhotos: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
        caption: "Зимняя элегия в интерьере"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=300&h=300&fit=crop",
        caption: "Рождественская сказка"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
        caption: "Подарок маме"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=300&h=300&fit=crop",
        caption: "Офисное украшение"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
        caption: "Свадебный декор"
      },
      {
        id: 6,
        image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?w=300&h=300&fit=crop",
        caption: "Домашний уют"
      }
    ]
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply filters
    if (filters.priceRange) {
      const ranges = {
        'under-2000': { min: 0, max: 2000 },
        '2000-5000': { min: 2000, max: 5000 },
        '5000-10000': { min: 5000, max: 10000 },
        'over-10000': { min: 10000, max: Infinity }
      };
      const range = ranges[filters.priceRange];
      filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => filters.colors.includes(color))
      );
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => 
        filters.sizes.includes(p.sizes[0])
      );
    }

    if (filters.occasions.length > 0) {
      filtered = filtered.filter(p => 
        p.occasions.some(occasion => filters.occasions.includes(occasion))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      priceRange: null,
      colors: [],
      sizes: [],
      occasions: []
    });
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-16">
        <CollectionHero currentCollection={currentCollection} />
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onClearFilters={clearFilters}
        />

        {/* Products Section */}
        <div className="flex-1 lg:ml-0">
          {/* Sorting Controls */}
          <SortingControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalProducts={filteredProducts.length}
            onToggleFilters={toggleFilters}
          />

          {/* Products Grid */}
          <div className="px-4 lg:px-8 py-6">
            {currentProducts.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
                }`}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ChevronLeft"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page} className="px-2 text-text-secondary">...</span>;
                      }
                      return null;
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ChevronRight"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-text-secondary" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-text-primary mb-4">
                  Товары не найдены
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  По вашему запросу ничего не найдено. Попробуйте изменить фильтры или очистить их.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Очистить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <RecommendationSection recommendations={recommendations} />

      {/* Social Proof Section */}
      <SocialProofSection socialProof={socialProof} />

      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="w-full px-4 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Будьте в курсе новых коллекций
          </h2>
          <p className="font-inter text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Подпишитесь на нашу рассылку и получайте уведомления о новых коллекциях, специальных предложениях и советах по уходу за цветами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg border-0 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button
              variant="secondary"
              iconName="Mail"
              iconPosition="left"
            >
              Подписаться
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;