import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
      title: "Зимняя коллекция 2025",
      subtitle: "Создаем уют в холодные дни",
      description: "Элегантные композиции из зимних цветов и благородной зелени для вашего дома",
      category: "winter-collection"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=1920&h=1080&fit=crop",
      title: "Букеты и композиции",
      subtitle: "Воплощаем ваши мечты в цветах",
      description: "Персональные консультации и создание уникальных композиций по вашему вкусу",
      category: "bouquets"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-background">
      {/* Hero Slides */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0">
                <div className="container mx-auto px-4 lg:px-8 h-full flex items-center">
                  <div className="max-w-2xl text-white" style={{ paddingTop: '10vh' }}>
                    <div className="h-20 flex items-end mb-4">
                      <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-shadow-soft leading-tight">
                        {slide.title}
                      </h1>
                    </div>
                    <div className="h-16 flex items-center mb-6">
                      <p className="font-inter text-xl lg:text-2xl text-white/90">
                        {slide.subtitle}
                      </p>
                    </div>
                    <div className="h-20 flex items-start mb-8">
                      <p className="font-inter text-lg text-white/80 leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="bg-primary hover:bg-primary/90 text-white"
                        asChild
                      >
                        <Link to={`/catalog?category=${slide.category}`}>Смотреть каталог</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="MessageCircle"
                        iconPosition="left"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => window.open('https://wa.me/79123456789', '_blank')}
                      >
                        Заказать в WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-botanical z-10"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-botanical z-10"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-botanical ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/60 hidden lg:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-inter">Прокрутите вниз</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;