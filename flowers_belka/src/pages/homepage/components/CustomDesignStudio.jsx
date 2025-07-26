import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomDesignStudio = () => {
  const [activePreview, setActivePreview] = useState(0);

  const designPreviews = [
    {
      id: 1,
      title: "Романтическая композиция",
      description: "Нежные пионы и розы в пастельных тонах",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
      price: "от 4 500 ₽",
      features: ["Консультация дизайнера", "3D визуализация", "Доставка в день"]
    },
    {
      id: 2,
      title: "Корпоративный стиль",
      description: "Строгие линии и благородные оттенки",
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500&h=600&fit=crop",
      price: "от 6 800 ₽",
      features: ["Брендинг компании", "Регулярное обновление", "Оптовые цены"]
    },
    {
      id: 3,
      title: "Праздничное настроение",
      description: "Яркие краски для особых моментов",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=600&fit=crop",
      price: "от 5 200 ₽",
      features: ["Тематическое оформление", "Подарочная упаковка", "Поздравительная открытка"]
    }
  ];

  const studioFeatures = [
    {
      icon: "Palette",
      title: "Индивидуальный дизайн",
      description: "Создаем композицию по вашим пожеланиям и предпочтениям"
    },
    {
      icon: "Eye",
      title: "3D визуализация",
      description: "Показываем результат до создания букета"
    },
    {
      icon: "Users",
      title: "Консультация эксперта",
      description: "Профессиональные флористы помогут выбрать лучшее решение"
    },
    {
      icon: "Clock",
      title: "Быстрое исполнение",
      description: "Создаем и доставляем в течение 24 часов"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Студия индивидуального дизайна
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Воплощаем ваши идеи в уникальных флористических композициях. 
            Каждый букет создается специально для вас с учетом всех пожеланий
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Preview */}
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-botanical">
                <Image
                  src={designPreviews[activePreview].image}
                  alt={designPreviews[activePreview].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Preview Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-sm font-medium">
                      {designPreviews[activePreview].price}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold mb-2">
                    {designPreviews[activePreview].title}
                  </h3>
                  <p className="font-inter text-white/90 mb-4">
                    {designPreviews[activePreview].description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {designPreviews[activePreview].features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Thumbnails */}
              <div className="flex space-x-4 mt-6">
                {designPreviews.map((preview, index) => (
                  <button
                    key={preview.id}
                    onClick={() => setActivePreview(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-botanical ${
                      index === activePreview 
                        ? 'ring-2 ring-primary ring-offset-2' :'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={preview.image}
                      alt={preview.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                Как это работает
              </h3>
              <p className="font-inter text-text-secondary leading-relaxed mb-6">
                Наша студия дизайна предлагает полный цикл создания уникальных композиций — 
                от первичной консультации до финальной доставки готового букета.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {studioFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="font-inter text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="mb-8">
              <h4 className="font-inter font-semibold text-primary mb-4">
                Процесс создания
              </h4>
              <div className="space-y-3">
                {[
                  "Консультация и обсуждение пожеланий",
                  "Создание эскиза и 3D визуализации",
                  "Согласование деталей и стоимости",
                  "Изготовление и доставка композиции"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-inter text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="flex-1"
                asChild
              >
                <Link to="/custom-design-studio">Записаться на консультацию</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1"
              >
                Задать вопрос
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignStudio;