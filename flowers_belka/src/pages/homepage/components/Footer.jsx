import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Коллекции",
      links: [
        { name: "Букеты цветов", path: "/bukety_tsvetov/" },
        { name: "Розы", path: "/rozy/" },
        { name: "Композиции в коробках", path: "/tsvety_v_korobke/" },
        { name: "Сезонные цветы", path: "/tulpany/" }
      ]
    },
    {
      title: "Услуги",
      links: [
        { name: "Доставка", path: "/dostavka" },
        { name: "Оформление букетов", path: "/bukety_tsvetov/" },
        { name: "Свадебная флористика", path: "/bukety_tsvetov/" },
        { name: "Подарочная упаковка", path: "/tsvety_v_korobke/" }
      ]
    },
    {
      title: "О нас",
      links: [
        { name: "Наша мастерская", path: "/o_nas" },
        { name: "Контакты", path: "/dostavka" },
        { name: "Отзывы", path: "/novosti/" },
        { name: "Галерея работ", path: "/bukety_tsvetov/" }
      ]
    },
    {
      title: "Помощь",
      links: [
        { name: "Как заказать", path: "/dostavka" },
        { name: "Доставка и оплата", path: "/dostavka" },
        { name: "Уход за цветами", path: "/novosti/" },
        { name: "Связаться с нами", path: "/dostavka" }
      ]
    }
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: "MessageSquare", url: "https://api.whatsapp.com/send?phone=79037349844" }
  ];

  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон",
      content: "+7 (903) 734-98-44",
      link: "tel:+79037349844"
    },
    {
      icon: "Mail",
      title: "Email",
      content: "info@belka-flowers.ru",
      link: "mailto:info@belka-flowers.ru"
    },
    {
      icon: "MapPin",
      title: "Адрес",
      content: "Путилково, Московская область",
      link: "https://yandex.ru/maps/org/tsvetochnaya_masterskaya_belka_flowers/4005765345/"
    },
    {
      icon: "Clock",
      title: "Режим работы",
      content: "Ежедневно 10:00 - 22:00",
      link: "#"
    }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                Подпишитесь на новости
              </h3>
              <p className="font-inter text-white/80 leading-relaxed">
                Получайте первыми информацию о новых коллекциях, специальных предложениях 
                и секретах ухода за цветами от наших экспертов
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Ваш email адрес"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <Button
                variant="secondary"
                iconName="Send"
                iconPosition="right"
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h4 className="font-playfair text-2xl font-bold text-orange-400 mb-2">
                belka-flowers
              </h4>
              <p className="font-inter text-sm text-white/70">
                Цветочная мастерская
              </p>
            </div>
            
            <p className="font-inter text-white/80 leading-relaxed mb-6">
              Цветочная мастерская в Путилково. Создаем красивые букеты и композиции из свежих цветов.
              Доставка по Москве и Московской области. Работаем ежедневно с 10:00 до 22:00.
            </p>


          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-playfair text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="font-inter text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={contact.icon} size={18} className="text-orange-400" />
                </div>
                <div>
                  <h5 className="font-inter font-semibold text-white text-sm mb-1">
                    {contact.title}
                  </h5>
                  {contact.link && contact.link !== "#" ? (
                    <a
                      href={contact.link}
                      className="font-inter text-white/80 text-sm hover:text-white transition-colors"
                    >
                      {contact.content}
                    </a>
                  ) : (
                    <p className="font-inter text-white/80 text-sm">
                      {contact.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="font-inter text-white/70 text-sm">
                © {currentYear} Belka-Flowers. Все права защищены.
              </p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="font-inter text-white/70 text-sm hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/terms" className="font-inter text-white/70 text-sm hover:text-white transition-colors">
                  Условия использования
                </Link>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="font-inter text-white/70 text-sm">Принимаем к оплате:</span>
              <div className="flex space-x-2">
                {['CreditCard', 'Smartphone', 'Banknote'].map((icon, index) => (
                  <div key={index} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                    <Icon name={icon} size={14} className="text-white/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;