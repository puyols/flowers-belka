import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      title: "Букеты цветов",
      description: "Классические и авторские букеты из свежих цветов",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      price: "от 2 500 ₽",
      badge: "Популярно",
      icon: "Flower",
      link: "/bukety_tsvetov/"
    },
    {
      id: 2,
      title: "Розы",
      description: "Элегантные букеты из роз разных сортов",
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=400&fit=crop",
      price: "от 3 200 ₽",
      badge: "Классика",
      icon: "Heart",
      link: "/rozy/"
    },
    {
      id: 3,
      title: "Цветочные композиции",
      description: "Изысканные композиции в коробках и корзинах",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop",
      price: "от 4 500 ₽",
      badge: "Эксклюзив",
      icon: "Crown",
      link: "/tsvety_v_korobke/"
    },
    {
      id: 4,
      title: "Пионы",
      description: "Роскошные пионы для особенных моментов",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      price: "от 5 800 ₽",
      badge: "Сезон",
      icon: "Flower2",
      link: "/piony/"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Наши букеты
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-2xl mx-auto">
            Каждая композиция создается с любовью и вниманием к деталям, 
            чтобы подарить вам незабываемые эмоции
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-botanical hover:shadow-botanical-sm transition-botanical"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    <Icon name={category.icon} size={14} />
                    <span>{category.badge}</span>
                  </span>
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-primary text-sm font-semibold">
                    {category.price}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {category.title}
                </h3>
                <p className="font-inter text-text-secondary text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-inter text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                    Смотреть букеты
                  </span>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-botanical">
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/bukety_tsvetov/"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-botanical font-inter font-medium"
          >
            <span>Посмотреть все букеты</span>
            <Icon name="ArrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;