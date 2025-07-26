import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunitySection = () => {
  const communityProjects = [
    {
      title: 'Цветы для детских больниц',
      description: 'Каждый месяц мы украшаем палаты детских больниц яркими композициями, принося радость маленьким пациентам и их семьям.',
      impact: '12 больниц, 500+ детей в месяц',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      title: 'Поддержка домов престарелых',
      description: 'Регулярно организуем мастер-классы по флористике для пожилых людей, помогая им оставаться активными и творческими.',
      impact: '8 домов престарелых, 200+ участников',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600',
      icon: 'Users',
      color: 'text-blue-600'
    },
    {
      title: 'Экологические инициативы',
      description: 'Участвуем в программах по озеленению города и обучаем школьников основам экологии через флористику.',
      impact: '15 школ, 1000+ учеников',
      image: 'https://images.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg',
      icon: 'Leaf',
      color: 'text-green-600'
    },
    {
      title: 'Поддержка местных фермеров',
      description: 'Работаем напрямую с местными цветочными фермами, поддерживая российских производителей и обеспечивая справедливые цены.',
      impact: '25 ферм-партнеров, 50+ семей',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: 'Handshake',
      color: 'text-purple-600'
    }
  ];

  const partnerships = [
    {
      name: 'Благотворительный фонд "Добрые дела"',
      type: 'Благотворительность',
      description: 'Совместные проекты по поддержке нуждающихся семей',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Московский экологический центр',
      type: 'Экология',
      description: 'Программы по озеленению и экологическому просвещению',
      logo: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Ассоциация российских фермеров',
      type: 'Сельское хозяйство',
      description: 'Поддержка местных производителей цветов',
      logo: 'https://images.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg'
    },
    {
      name: 'Центр социальной помощи',
      type: 'Социальная работа',
      description: 'Программы поддержки пожилых людей и инвалидов',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Наш вклад в сообщество
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Мы верим, что красота должна быть доступна всем. Наши социальные проекты помогают делать мир ярче и добрее
          </p>
        </div>

        {/* Community Projects */}
        <div className="space-y-16 mb-20">
          {communityProjects.map((project, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-botanical">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  
                  {/* Impact Badge */}
                  <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={project.icon} size={20} className={project.color} />
                      <span className="font-inter text-sm font-semibold text-primary">
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center`}>
                    <Icon name={project.icon} size={24} className={project.color} />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-primary">
                    {project.title}
                  </h3>
                </div>

                <p className="font-inter text-lg text-text-primary leading-relaxed">
                  {project.description}
                </p>

                <div className="bg-surface rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={20} className="text-accent" />
                    <span className="font-inter font-semibold text-primary">Наш вклад:</span>
                  </div>
                  <p className="font-inter text-text-secondary">{project.impact}</p>
                </div>

                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Узнать больше о проекте
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Partnerships */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="font-playfair text-2xl font-semibold text-primary">
              Наши партнеры
            </h3>
            <p className="font-inter text-text-secondary max-w-2xl mx-auto">
              Мы работаем с ведущими организациями для максимального социального воздействия
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 shadow-botanical hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  {/* Partner Logo */}
                  <div className="w-16 h-16 overflow-hidden rounded-lg">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Partner Info */}
                  <div className="space-y-2">
                    <h4 className="font-inter font-semibold text-primary text-sm leading-tight">
                      {partner.name}
                    </h4>
                    <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {partner.type}
                    </span>
                    <p className="font-inter text-xs text-text-secondary leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <Icon name="HandHeart" size={48} className="text-primary-foreground" />
            </div>
            
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-primary-foreground">
              Присоединяйтесь к нашим инициативам
            </h3>
            
            <p className="font-inter text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              Хотите стать частью наших социальных проектов? Мы всегда рады новым партнерам и волонтерам, готовым делать мир красивее
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Стать волонтером
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Партнерство
              </Button>
            </div>
          </div>
        </div>

        {/* Social Impact Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="font-playfair text-3xl font-bold text-primary">2500+</div>
            <div className="font-inter text-sm text-text-secondary">Благотворительных букетов</div>
          </div>
          <div className="space-y-2">
            <div className="font-playfair text-3xl font-bold text-primary">35</div>
            <div className="font-inter text-sm text-text-secondary">Социальных проектов</div>
          </div>
          <div className="space-y-2">
            <div className="font-playfair text-3xl font-bold text-primary">150+</div>
            <div className="font-inter text-sm text-text-secondary">Волонтерских часов в месяц</div>
          </div>
          <div className="space-y-2">
            <div className="font-playfair text-3xl font-bold text-primary">25</div>
            <div className="font-inter text-sm text-text-secondary">Организаций-партнеров</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;