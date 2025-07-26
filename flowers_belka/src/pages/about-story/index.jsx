import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FounderStory from './components/FounderStory';
import TeamSection from './components/TeamSection';
import CraftsmanshipProcess from './components/CraftsmanshipProcess';
import ValuesSection from './components/ValuesSection';
import AwardsSection from './components/AwardsSection';
import CommunitySection from './components/CommunitySection';
import JoinUsSection from './components/JoinUsSection';

const AboutStoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <FounderStory />
        <TeamSection />
        <CraftsmanshipProcess />
        <ValuesSection />
        <AwardsSection />
        <CommunitySection />
        <JoinUsSection />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="18" fill="var(--color-accent)" />
                    <path
                      d="M20 8C16.5 8 14 10.5 14 14C14 17.5 16.5 20 20 20C23.5 20 26 17.5 26 14C26 10.5 23.5 8 20 8Z"
                      fill="var(--color-primary)"
                    />
                    <path
                      d="M20 20C16.5 20 14 22.5 14 26C14 29.5 16.5 32 20 32C23.5 32 26 29.5 26 26C26 22.5 23.5 20 20 20Z"
                      fill="var(--color-background)"
                    />
                    <circle cx="20" cy="20" r="3" fill="var(--color-primary)" />
                  </svg>
                </div>
                <span className="font-playfair text-xl font-bold">Flowers Belka</span>
              </div>
              <p className="font-inter text-sm text-primary-foreground/80">
                Создаем красоту и радость через искусство флористики с 2018 года
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-playfair text-lg font-semibold">Навигация</h4>
              <ul className="space-y-2 font-inter text-sm">
                <li><a href="/homepage" className="hover:text-accent transition-colors">Главная</a></li>
                <li><a href="/product-collection" className="hover:text-accent transition-colors">Коллекции</a></li>
                <li><a href="/custom-design-studio" className="hover:text-accent transition-colors">Студия дизайна</a></li>
                <li><a href="/about-story" className="hover:text-accent transition-colors">О нас</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-playfair text-lg font-semibold">Услуги</h4>
              <ul className="space-y-2 font-inter text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Букеты на заказ</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Свадебная флористика</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Корпоративные заказы</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Доставка цветов</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-playfair text-lg font-semibold">Контакты</h4>
              <div className="space-y-2 font-inter text-sm">
                <p>Москва, ул. Цветочная, 15</p>
                <p>+7 (495) 123-45-67</p>
                <p>info@flowersbelka.ru</p>
                <p>Пн-Вс: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="font-inter text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Flowers Belka. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutStoryPage;