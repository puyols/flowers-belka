import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AwardsSection = () => {
  const awards = [
    {
      year: '2024',
      title: 'Лучший флористический салон Москвы',
      organization: 'Московская ассоциация флористов',
      description: 'Признание за выдающиеся достижения в области флористического дизайна и клиентского сервиса',
      icon: 'Trophy',
      color: 'text-yellow-600'
    },
    {
      year: '2023',
      title: 'Премия "Экологичный бизнес"',
      organization: 'Экологический фонд России',
      description: 'За внедрение экологически чистых технологий и использование биоразлагаемых материалов',
      icon: 'Leaf',
      color: 'text-green-600'
    },
    {
      year: '2023',
      title: 'Золотая медаль выставки "Цветы России"',
      organization: 'Всероссийская выставка цветов',
      description: 'За инновационную коллекцию "Московские сезоны" и мастерство исполнения',
      icon: 'Medal',
      color: 'text-amber-600'
    },
    {
      year: '2022',
      title: 'Премия клиентского выбора',
      organization: 'Портал отзывов "Флора-Ревью"',
      description: 'Высшая оценка клиентов за качество продукции и уровень обслуживания',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      year: '2021',
      title: 'Диплом за социальную ответственность',
      organization: 'Благотворительный фонд "Добрые дела"',
      description: 'За активное участие в благотворительных проектах и поддержку местного сообщества',
      icon: 'HandHeart',
      color: 'text-pink-600'
    },
    {
      year: '2020',
      title: 'Сертификат качества ISO 9001',
      organization: 'Международная организация по стандартизации',
      description: 'Подтверждение соответствия международным стандартам качества управления',
      icon: 'Shield',
      color: 'text-blue-600'
    }
  ];

  const pressFeatures = [
    {
      outlet: 'Московские Новости',
      date: '15 марта 2024',
      title: 'Flowers Belka: Революция в мире флористики',
      excerpt: 'Как небольшая студия стала лидером московского рынка цветочных композиций',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      outlet: 'Бизнес & Стиль',
      date: '8 февраля 2024',
      title: 'Секреты успеха: интервью с основателем Flowers Belka',
      excerpt: 'Елена Белкина рассказывает о пути от мечты до процветающего бизнеса',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      outlet: 'Эко-Тренды',
      date: '22 января 2024',
      title: 'Зеленый подход: как Flowers Belka заботится о природе',
      excerpt: 'Экологические инициативы флористической студии получили признание экспертов',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Награды и признание
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Наша работа получила признание профессионального сообщества, клиентов и экспертов индустрии
          </p>
        </div>

        {/* Awards Timeline */}
        <div className="space-y-8 mb-20">
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-12">
            Профессиональные награды
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
            
            <div className="space-y-8">
              {awards.map((award, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 bg-background border-4 border-primary rounded-full items-center justify-center shadow-botanical">
                    <Icon name={award.icon} size={24} className={award.color} />
                  </div>
                  
                  {/* Award Content */}
                  <div className="flex-1 bg-background rounded-2xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 md:hidden">
                          <Icon name={award.icon} size={24} className={award.color} />
                          <span className="font-inter text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {award.year}
                          </span>
                        </div>
                        
                        <h4 className="font-playfair text-xl font-semibold text-primary">
                          {award.title}
                        </h4>
                        
                        <p className="font-inter text-sm font-medium text-secondary">
                          {award.organization}
                        </p>
                        
                        <p className="font-inter text-text-secondary leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                      
                      <div className="hidden md:block">
                        <span className="font-inter text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Press Features */}
        <div className="space-y-8">
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-12">
            Упоминания в прессе
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pressFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-background rounded-2xl overflow-hidden shadow-botanical hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-sm font-semibold text-primary">
                        {feature.outlet}
                      </span>
                      <span className="font-inter text-xs text-text-secondary">
                        {feature.date}
                      </span>
                    </div>
                    
                    <h4 className="font-playfair text-lg font-semibold text-primary leading-tight">
                      {feature.title}
                    </h4>
                    
                    <p className="font-inter text-sm text-text-secondary leading-relaxed">
                      {feature.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors cursor-pointer">
                      <span className="font-inter text-sm font-medium">Читать полностью</span>
                      <Icon name="ExternalLink" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h3 className="font-playfair text-2xl font-semibold text-primary">
              Сертификации и членство
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <Icon name="Shield" size={32} className="text-primary" />
                <span className="font-inter text-sm font-medium text-text-primary">ISO 9001:2015</span>
                <span className="font-inter text-xs text-text-secondary">Система менеджмента качества</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Icon name="Leaf" size={32} className="text-green-600" />
                <span className="font-inter text-sm font-medium text-text-primary">Eco-Cert</span>
                <span className="font-inter text-xs text-text-secondary">Экологическая сертификация</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Icon name="Users" size={32} className="text-blue-600" />
                <span className="font-inter text-sm font-medium text-text-primary">РАФ</span>
                <span className="font-inter text-xs text-text-secondary">Российская ассоциация флористов</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Icon name="Award" size={32} className="text-purple-600" />
                <span className="font-inter text-sm font-medium text-text-primary">AIFD</span>
                <span className="font-inter text-xs text-text-secondary">Международный институт флористов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;