import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Анна Петрова",
      role: "Постоянный клиент",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Заказываю букеты в Flowers Belka уже больше года. Качество всегда на высоте, 
                цветы свежие и долго стоят. Особенно нравится индивидуальный подход — 
                флористы всегда учитывают мои пожелания и создают что-то особенное.`,
      rating: 5,
      orderImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      date: "15 января 2025"
    },
    {
      id: 2,
      name: "Михаил Соколов",
      role: "Корпоративный клиент",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Сотрудничаем с Flowers Belka для оформления нашего офиса. Профессиональный подход, 
                всегда вовремя, красивые композиции. Сотрудники и клиенты в восторге от атмосферы, 
                которую создают эти цветы.`,
      rating: 5,
      orderImage: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&h=200&fit=crop",
      date: "12 января 2025"
    },
    {
      id: 3,
      name: "Елена Васильева",
      role: "Организатор мероприятий",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Flowers Belka — мой надежный партнер в организации свадеб и торжеств. 
                Креативность, внимание к деталям и безупречное исполнение. 
                Молодожены всегда в восторге от флористического оформления!`,
      rating: 5,
      orderImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=200&fit=crop",
      date: "8 января 2025"
    },
    {
      id: 4,
      name: "Дмитрий Кузнецов",
      role: "Частный клиент",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Заказал букет для жены на годовщину свадьбы. Результат превзошел все ожидания! 
                Композиция была настолько красивой, что жена расплакалась от счастья. 
                Теперь заказываю только здесь.`,
      rating: 5,
      orderImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      date: "5 января 2025"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-2xl mx-auto">
            Более 2000 довольных клиентов доверяют нам создание особенных моментов
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Testimonial Content */}
                    <div className="order-2 lg:order-1">
                      <div className="bg-white rounded-2xl p-8 shadow-botanical">
                        {/* Quote Icon */}
                        <div className="mb-6">
                          <Icon name="Quote" size={32} className="text-primary/30" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                          ))}
                        </div>

                        {/* Content */}
                        <blockquote className="font-inter text-text-primary text-lg leading-relaxed mb-6">
                          "{testimonial.content}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-inter font-semibold text-primary">
                              {testimonial.name}
                            </h4>
                            <p className="font-inter text-sm text-text-secondary">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="mt-4 pt-4 border-t border-botanical">
                          <p className="font-inter text-sm text-text-secondary">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Image */}
                    <div className="order-1 lg:order-2">
                      <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-botanical">
                        <Image
                          src={testimonial.orderImage}
                          alt={`Заказ ${testimonial.name}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        
                        {/* Verified Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center space-x-2 px-3 py-1 bg-success/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                            <Icon name="CheckCircle" size={14} />
                            <span>Проверенный отзыв</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-botanical rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-botanical z-10"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-botanical rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-botanical z-10"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-botanical ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-botanical">
          {[
            { number: "2000+", label: "Довольных клиентов" },
            { number: "15000+", label: "Созданных букетов" },
            { number: "4.9", label: "Средняя оценка" },
            { number: "99%", label: "Повторных заказов" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="font-inter text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;