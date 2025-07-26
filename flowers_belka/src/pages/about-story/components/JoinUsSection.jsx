import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';


const JoinUsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });

  const [activeTab, setActiveTab] = useState('career');

  const positionOptions = [
    { value: 'florist', label: 'Флорист' },
    { value: 'designer', label: 'Флорист-дизайнер' },
    { value: 'consultant', label: 'Консультант' },
    { value: 'delivery', label: 'Курьер' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'other', label: 'Другое' }
  ];

  const experienceOptions = [
    { value: 'no-experience', label: 'Без опыта' },
    { value: '1-2', label: '1-2 года' },
    { value: '3-5', label: '3-5 лет' },
    { value: '5+', label: 'Более 5 лет' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const openPositions = [
    {
      title: 'Старший флорист',
      department: 'Творческий отдел',
      type: 'Полная занятость',
      location: 'Москва, центр',
      description: 'Ищем опытного флориста для создания премиальных композиций и обучения младших специалистов.',
      requirements: [
        'Опыт работы флористом от 3 лет',
        'Знание современных техник флористики',
        'Творческий подход и внимание к деталям',
        'Умение работать в команде'
      ],
      benefits: [
        'Конкурентная заработная плата',
        'Обучение новым техникам',
        'Творческая свобода',
        'Дружный коллектив'
      ]
    },
    {
      title: 'Консультант-флорист',
      department: 'Клиентский сервис',
      type: 'Полная занятость',
      location: 'Москва, центр',
      description: 'Требуется консультант для работы с клиентами и помощи в выборе цветочных композиций.',
      requirements: [
        'Опыт работы с клиентами',
        'Базовые знания флористики',
        'Коммуникабельность',
        'Желание развиваться в сфере флористики'
      ],
      benefits: [
        'Обучение за счет компании',
        'Гибкий график',
        'Премии за продажи',
        'Карьерный рост'
      ]
    },
    {
      title: 'Курьер-флорист',
      department: 'Логистика',
      type: 'Частичная занятость',
      location: 'Москва и область',
      description: 'Ищем ответственного курьера для доставки цветочных композиций с базовыми знаниями флористики.',
      requirements: [
        'Водительские права категории B',
        'Знание Москвы и области',
        'Ответственность и пунктуальность',
        'Аккуратность в обращении с цветами'
      ],
      benefits: [
        'Свободный график',
        'Оплата за доставку + премии',
        'Обучение уходу за цветами',
        'Возможность карьерного роста'
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: '#', followers: '25.4K' },
    { name: 'VKontakte', icon: 'Users', url: '#', followers: '18.2K' },
    { name: 'Telegram', icon: 'MessageCircle', url: '#', followers: '12.8K' },
    { name: 'YouTube', icon: 'Play', url: '#', followers: '8.5K' }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Присоединяйтесь к нам
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Станьте частью команды профессионалов, которые создают красоту и радость каждый день
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-background rounded-xl p-2 shadow-botanical">
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'career' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('career')}
                iconName="Briefcase"
                iconPosition="left"
              >
                Карьера
              </Button>
              <Button
                variant={activeTab === 'partnership' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('partnership')}
                iconName="Handshake"
                iconPosition="left"
              >
                Партнерство
              </Button>
              <Button
                variant={activeTab === 'social' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('social')}
                iconName="Share2"
                iconPosition="left"
              >
                Соцсети
              </Button>
            </div>
          </div>
        </div>

        {/* Career Tab */}
        {activeTab === 'career' && (
          <div className="space-y-12">
            {/* Open Positions */}
            <div className="space-y-8">
              <h3 className="font-playfair text-2xl font-semibold text-primary text-center">
                Открытые вакансии
              </h3>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {openPositions.map((position, index) => (
                  <div key={index} className="bg-background rounded-2xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300">
                    <div className="space-y-4">
                      {/* Position Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {position.type}
                          </span>
                          <Icon name="MapPin" size={16} className="text-text-secondary" />
                        </div>
                        <h4 className="font-playfair text-xl font-semibold text-primary">
                          {position.title}
                        </h4>
                        <p className="font-inter text-sm text-secondary">
                          {position.department} • {position.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-inter text-sm text-text-secondary leading-relaxed">
                        {position.description}
                      </p>

                      {/* Requirements */}
                      <div className="space-y-2">
                        <h5 className="font-inter text-sm font-semibold text-primary">
                          Требования:
                        </h5>
                        <ul className="space-y-1">
                          {position.requirements.slice(0, 2).map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-inter text-xs text-text-secondary">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <h5 className="font-inter text-sm font-semibold text-primary">
                          Мы предлагаем:
                        </h5>
                        <ul className="space-y-1">
                          {position.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-inter text-xs text-text-secondary">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        iconName="Send"
                        iconPosition="right"
                      >
                        Откликнуться
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-background rounded-2xl p-8 shadow-botanical">
              <div className="max-w-2xl mx-auto">
                <div className="text-center space-y-4 mb-8">
                  <h3 className="font-playfair text-2xl font-semibold text-primary">
                    Отправить резюме
                  </h3>
                  <p className="font-inter text-text-secondary">
                    Не нашли подходящую вакансию? Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих позиций
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Полное имя"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите ваше имя"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Телефон"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                    <Select
                      label="Интересующая позиция"
                      options={positionOptions}
                      value={formData.position}
                      onChange={(value) => handleSelectChange('position', value)}
                      placeholder="Выберите позицию"
                      required
                    />
                  </div>

                  <Select
                    label="Опыт работы"
                    options={experienceOptions}
                    value={formData.experience}
                    onChange={(value) => handleSelectChange('experience', value)}
                    placeholder="Выберите опыт"
                    required
                  />

                  <div className="space-y-2">
                    <label className="font-inter text-sm font-medium text-primary">
                      Сопроводительное письмо
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Расскажите о себе и своих мотивациях..."
                      rows={4}
                      className="w-full px-4 py-3 border border-botanical rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="Send"
                    iconPosition="right"
                  >
                    Отправить заявку
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Partnership Tab */}
        {activeTab === 'partnership' && (
          <div className="space-y-12">
            <div className="text-center space-y-4 mb-12">
              <h3 className="font-playfair text-2xl font-semibold text-primary">
                Партнерские возможности
              </h3>
              <p className="font-inter text-text-secondary max-w-3xl mx-auto">
                Мы открыты для сотрудничества с единомышленниками, которые разделяют наши ценности качества и красоты
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Поставщики цветов',
                  description: 'Ищем надежных поставщиков качественных цветов с соблюдением экологических стандартов',
                  icon: 'Flower',
                  benefits: ['Долгосрочные контракты', 'Справедливые цены', 'Взаимовыгодное сотрудничество']
                },
                {
                  title: 'Event-агентства',
                  description: 'Сотрудничество с организаторами мероприятий для создания незабываемых флористических решений',
                  icon: 'Calendar',
                  benefits: ['Эксклюзивные дизайны', 'Профессиональная команда', 'Гибкие условия']
                },
                {
                  title: 'Корпоративные клиенты',
                  description: 'Специальные программы для офисов, отелей и ресторанов с регулярным обслуживанием',
                  icon: 'Building',
                  benefits: ['Индивидуальные решения', 'Регулярное обслуживание', 'Корпоративные скидки']
                }
              ].map((partnership, index) => (
                <div key={index} className="bg-background rounded-2xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={partnership.icon} size={24} className="text-primary" />
                    </div>
                    
                    <h4 className="font-playfair text-xl font-semibold text-primary">
                      {partnership.title}
                    </h4>
                    
                    <p className="font-inter text-sm text-text-secondary leading-relaxed">
                      {partnership.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="font-inter text-sm font-semibold text-primary">
                        Преимущества:
                      </h5>
                      <ul className="space-y-1">
                        {partnership.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="font-inter text-xs text-text-secondary">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Mail"
                      iconPosition="right"
                    >
                      Связаться
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-12">
            <div className="text-center space-y-4 mb-12">
              <h3 className="font-playfair text-2xl font-semibold text-primary">
                Следите за нами в социальных сетях
              </h3>
              <p className="font-inter text-text-secondary max-w-3xl mx-auto">
                Будьте в курсе наших новинок, мастер-классов и закулисной жизни студии
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <div key={index} className="bg-background rounded-2xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name={social.icon} size={32} className="text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-playfair text-lg font-semibold text-primary">
                        {social.name}
                      </h4>
                      <p className="font-inter text-sm text-text-secondary">
                        {social.followers} подписчиков
                      </p>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ExternalLink"
                      iconPosition="right"
                    >
                      Подписаться
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Feed Preview */}
            <div className="bg-background rounded-2xl p-8 shadow-botanical">
              <div className="text-center space-y-4 mb-8">
                <h4 className="font-playfair text-xl font-semibold text-primary">
                  Последние публикации
                </h4>
                <p className="font-inter text-text-secondary">
                  Посмотрите, что происходит в нашей студии прямо сейчас
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    caption: 'Создание свадебного букета для Анны ✨',
                    platform: 'Instagram',
                    likes: '234'
                  },
                  {
                    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400',
                    caption: 'Мастер-класс по созданию осенних композиций 🍂',
                    platform: 'VKontakte',
                    likes: '156'
                  },
                  {
                    image: 'https://images.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg',
                    caption: 'Новая коллекция "Зимняя сказка" уже в студии! ❄️',
                    platform: 'Telegram',
                    likes: '89'
                  }
                ].map((post, index) => (
                  <div key={index} className="space-y-3">
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-inter text-sm text-text-primary">
                        {post.caption}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-inter text-xs text-text-secondary">
                          {post.platform}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} className="text-red-500" />
                          <span className="font-inter text-xs text-text-secondary">
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinUsSection;