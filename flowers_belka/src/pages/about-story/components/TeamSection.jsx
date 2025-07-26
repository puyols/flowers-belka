import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Анна Петрова',
      position: 'Старший флорист',
      specialty: 'Свадебная флористика',
      experience: '8 лет',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Специализируется на создании роскошных свадебных композиций и оформлении торжественных мероприятий.',
      skills: ['Свадебные букеты', 'Декор мероприятий', 'Флористические инсталляции']
    },
    {
      id: 2,
      name: 'Михаил Соколов',
      position: 'Флорист-дизайнер',
      specialty: 'Корпоративная флористика',
      experience: '6 лет',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Эксперт по созданию стильных композиций для офисов и бизнес-мероприятий.',
      skills: ['Офисное озеленение', 'Корпоративные букеты', 'Минималистичный дизайн']
    },
    {
      id: 3,
      name: 'Ольга Васильева',
      position: 'Флорист-консультант',
      specialty: 'Сезонные композиции',
      experience: '5 лет',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Мастер создания уникальных сезонных букетов с использованием российских цветов.',
      skills: ['Сезонная флористика', 'Российские цветы', 'Консультации клиентов']
    },
    {
      id: 4,
      name: 'Дмитрий Кузнецов',
      position: 'Логист-координатор',
      specialty: 'Доставка и логистика',
      experience: '4 года',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Обеспечивает безупречную доставку наших композиций по всей Москве и области.',
      skills: ['Логистика доставки', 'Упаковка цветов', 'Клиентский сервис']
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Наши мастера
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Команда профессионалов, которые воплощают в жизнь самые смелые флористические идеи и создают незабываемые композиции для наших клиентов
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="bg-surface rounded-2xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Member Photo */}
                <div className="relative mb-6">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    <span className="font-inter text-xs font-medium">{member.experience}</span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-playfair text-xl font-semibold text-primary">
                      {member.name}
                    </h3>
                    <p className="font-inter text-sm font-medium text-secondary">
                      {member.position}
                    </p>
                    <p className="font-inter text-sm text-accent">
                      {member.specialty}
                    </p>
                  </div>

                  <p className="font-inter text-sm text-text-secondary leading-relaxed">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="font-inter text-xs font-semibold text-primary uppercase tracking-wide">
                      Специализация
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <div className="font-playfair text-2xl font-bold text-primary">15+</div>
              <div className="font-inter text-sm text-text-secondary">Специалистов в команде</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <div className="font-playfair text-2xl font-bold text-primary">50+</div>
              <div className="font-inter text-sm text-text-secondary">Лет общего опыта</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Star" size={32} className="text-primary" />
              </div>
              <div className="font-playfair text-2xl font-bold text-primary">25+</div>
              <div className="font-inter text-sm text-text-secondary">Профессиональных наград</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Heart" size={32} className="text-primary" />
              </div>
              <div className="font-playfair text-2xl font-bold text-primary">5000+</div>
              <div className="font-inter text-sm text-text-secondary">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;