import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Букет \'Весенняя симфония'",
    description: `Изысканная композиция из свежих весенних цветов, созданная нашими мастерами-флористами. Каждый элемент тщательно подобран для создания гармоничного сочетания цветов, текстур и ароматов. Идеальный выбор для выражения самых теплых чувств и создания незабываемых моментов.`,
    rating: 4.8,
    reviewCount: 127,
    expectedLifespan: "7-10 дней",
    overallMeaning: `Этот букет символизирует обновление, надежду и радость жизни. В русской традиции весенние цветы дарят как символ новых начинаний и искренних пожеланий счастья.`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
        alt: "Основное изображение букета"
      },
      {
        url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop",
        alt: "Вид сбоку"
      },
      {
        url: "https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=800&h=800&fit=crop",
        alt: "Детали композиции"
      },
      {
        url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&h=800&fit=crop",
        alt: "В интерьере"
      }
    ],
    composition: [
      { name: "Розы", latinName: "Rosa", quantity: 7 },
      { name: "Тюльпаны", latinName: "Tulipa", quantity: 5 },
      { name: "Альстромерия", latinName: "Alstroemeria", quantity: 3 },
      { name: "Эвкалипт", latinName: "Eucalyptus", quantity: 2 },
      { name: "Гипсофила", latinName: "Gypsophila", quantity: 1 }
    ],
    sizes: [
      {
        id: "small",
        name: "Компактный",
        dimensions: "25×30 см",
        price: 3500,
        originalPrice: 4200
      },
      {
        id: "medium",
        name: "Стандартный",
        dimensions: "30×40 см",
        price: 5500,
        originalPrice: 6800
      },
      {
        id: "large",
        name: "Премиум",
        dimensions: "40×50 см",
        price: 8500,
        originalPrice: null
      }
    ],
    colors: [
      { id: "spring", name: "Весенний микс", hex: "#FFB6C1" },
      { id: "classic", name: "Классический", hex: "#DC143C" },
      { id: "pastel", name: "Пастельный", hex: "#E6E6FA" },
      { id: "bright", name: "Яркий", hex: "#FF69B4" }
    ],
    careInstructions: [
      {
        title: "Подготовка вазы",
        description: "Тщательно вымойте вазу и наполните её свежей прохладной водой. Добавьте питательный раствор для цветов."
      },
      {
        title: "Обрезка стеблей",
        description: "Подрежьте стебли под углом 45° под проточной водой. Удалите листья, которые будут находиться под водой."
      },
      {
        title: "Размещение",
        description: "Поставьте букет в прохладное место, избегая прямых солнечных лучей и сквозняков."
      },
      {
        title: "Ежедневный уход",
        description: "Меняйте воду каждые 2-3 дня, подрезайте стебли на 1-2 см и удаляйте увядшие цветы."
      }
    ],
    flowerMeanings: [
      {
        name: "Розы",
        meaning: "Символ любви, страсти и красоты. В зависимости от цвета могут выражать различные чувства - от нежной привязанности до глубокой страсти.",
        tradition: "В России розы традиционно дарят в знак серьезных намерений и глубоких чувств."
      },
      {
        name: "Тюльпаны",
        meaning: "Олицетворяют совершенную любовь, элегантность и грацию. Символизируют обновление и весеннее пробуждение природы.",
        tradition: "Тюльпаны особенно популярны к 8 марта как символ женственности и весны."
      },
      {
        name: "Альстромерия",
        meaning: "Символ дружбы, преданности и взаимопонимания. Выражает пожелания процветания и долголетия.",
        tradition: null
      }
    ],
    deliveryOptions: [
      {
        name: "Экспресс-доставка",
        description: "Доставка в течение 2-4 часов по Москве и СПб",
        price: 800,
        timeframe: "2-4 часа",
        coverage: "Москва, СПб",
        icon: "Zap"
      },
      {
        name: "Стандартная доставка",
        description: "Доставка на следующий день по всей России",
        price: 400,
        timeframe: "1-2 дня",
        coverage: "Вся Россия",
        icon: "Truck"
      },
      {
        name: "Самовывоз",
        description: "Забрать заказ из нашего салона",
        price: 0,
        timeframe: "В любое время",
        coverage: "Салоны в городе",
        icon: "MapPin"
      }
    ],
    specifications: [
      { label: "Высота букета", value: "40-45 см" },
      { label: "Диаметр", value: "30-35 см" },
      { label: "Количество цветов", value: "18 шт" },
      { label: "Тип упаковки", value: "Крафт-бумага" },
      { label: "Вес", value: "~800 г" },
      { label: "Срок свежести", value: "7-10 дней" }
    ],
    included: [
      "Свежие цветы высшего качества",
      "Профессиональная флористическая упаковка",
      "Питательный раствор для продления жизни цветов",
      "Инструкция по уходу",
      "Гарантия свежести 48 часов"
    ]
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      customerName: "Анна Петрова",
      rating: 5,
      date: "2024-07-15",
      comment: `Потрясающий букет! Цветы свежие, композиция очень красивая. Доставили точно в срок, получательница была в восторге. Обязательно буду заказывать еще!`,
      verified: true,
      helpfulCount: 12,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
      ],
      purchaseInfo: {
        productVariant: "Весенний микс",
        size: "Стандартный",
        purchaseDate: "2024-07-14"
      }
    },
    {
      id: 2,
      customerName: "Михаил Сидоров",
      rating: 4,
      date: "2024-07-10",
      comment: `Заказывал для жены на день рождения. Букет красивый, но один тюльпан был немного подвявший. В целом довольны, служба поддержки отреагировала быстро.`,
      verified: true,
      helpfulCount: 8,
      images: [],
      purchaseInfo: {
        productVariant: "Классический",
        size: "Премиум",
        purchaseDate: "2024-07-09"
      }
    },
    {
      id: 3,
      customerName: "Елена Козлова",
      rating: 5,
      date: "2024-07-05",
      comment: `Восхитительная работа флористов! Каждая деталь продумана, цветы держались больше недели. Упаковка тоже очень стильная. Рекомендую всем!`,
      verified: true,
      helpfulCount: 15,
      images: [
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=200&h=200&fit=crop"
      ],
      purchaseInfo: {
        productVariant: "Пастельный",
        size: "Стандартный",
        purchaseDate: "2024-07-04"
      }
    }
  ];

  // Related products - будут загружены из реальных данных
  const mockRelatedProducts = [];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-inter text-text-secondary">Загрузка товара...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                to="/homepage"
                className="font-inter text-text-secondary hover:text-primary transition-botanical"
              >
                Главная
              </Link>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              <Link
                to="/product-collection"
                className="font-inter text-text-secondary hover:text-primary transition-botanical"
              >
                Коллекции
              </Link>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              <span className="font-inter text-text-primary font-medium">
                {mockProduct.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery
                images={mockProduct.images}
                productName={mockProduct.name}
              />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={mockProduct} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-12">
            <ProductTabs product={mockProduct} />
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews
              reviews={mockReviews}
              averageRating={mockProduct.rating}
              totalReviews={mockProduct.reviewCount}
            />
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts products={mockRelatedProducts} />
          </div>
        </div>

        {/* Sticky Bottom Bar (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="font-playfair text-lg font-bold text-primary">
                {mockProduct.sizes[0].price.toLocaleString('ru-RU')} ₽
              </div>
              <div className="font-inter text-sm text-text-secondary">
                {mockProduct.sizes[0].name}
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-shrink-0"
            >
              В корзину
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;