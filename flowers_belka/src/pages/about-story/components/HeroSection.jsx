import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Flowers Belka Studio Interior"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-primary leading-tight">
                Наша История
              </h1>
              <p className="font-inter text-xl text-text-secondary leading-relaxed">
                Где природа встречается с искусством, а каждая композиция рассказывает свою уникальную историю
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="font-inter text-lg text-text-primary leading-relaxed">
                Flowers Belka родилась из глубокой любви к ботанической красоте и стремления создавать незабываемые моменты через искусство флористики. Наша студия — это место, где традиционные российские цветочные традиции сочетаются с современным дизайном.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-inter font-medium">Основана в 2018 году</span>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-inter font-medium">Более 5000 довольных клиентов</span>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-inter font-medium">15+ наград в области флористики</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Heart"
                iconPosition="left"
              >
                Узнать больше
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
              >
                Связаться с нами
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl shadow-botanical">
                <Image
                  src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Флорист за работой"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-botanical">
                <Image
                  src="https://images.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg?auto=compress&cs=tinysrgb&w=600"
                  alt="Цветочная композиция"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-2xl shadow-botanical">
                <Image
                  src="https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Студия Flowers Belka"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-botanical">
                <Image
                  src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Свежие цветы"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;