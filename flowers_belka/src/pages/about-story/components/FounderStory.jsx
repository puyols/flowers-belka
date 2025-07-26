import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FounderStory = () => {
  const achievements = [
    {
      icon: 'Award',
      title: 'Мастер флористики',
      description: 'Сертифицированный специалист с 12-летним опытом'
    },
    {
      icon: 'Flower',
      title: 'Ботанический эксперт',
      description: 'Глубокие знания российской флоры и сезонности'
    },
    {
      icon: 'Heart',
      title: 'Создатель эмоций',
      description: 'Более 5000 счастливых моментов за карьеру'
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-botanical">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616c9c0b8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Елена Белкина - основатель Flowers Belka"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Quote */}
            <div className="absolute -bottom-8 -right-8 bg-background p-6 rounded-2xl shadow-botanical max-w-xs">
              <div className="flex items-start space-x-3">
                <Icon name="Quote" size={24} className="text-accent flex-shrink-0 mt-1" />
                <p className="font-inter text-sm text-text-primary italic">
                  "Каждый цветок имеет свою душу, и моя задача — помочь ей раскрыться"
                </p>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
                История основателя
              </h2>
              <h3 className="font-inter text-xl font-semibold text-secondary">
                Елена Белкина
              </h3>
              <p className="font-inter text-lg text-text-secondary">
                Основатель и главный флорист Flowers Belka
              </p>
            </div>

            <div className="space-y-6">
              <p className="font-inter text-lg text-text-primary leading-relaxed">
                Моя любовь к цветам началась в детстве, когда я проводила летние каникулы у бабушки в деревне под Москвой. Её сад был настоящим ботаническим раем, где каждое растение имело свою историю и предназначение.
              </p>
              
              <p className="font-inter text-lg text-text-primary leading-relaxed">
                После окончания Московского государственного университета леса по специальности "Ландшафтная архитектура", я работала в крупных цветочных салонах, но всегда мечтала о собственной студии, где можно было бы создавать не просто букеты, а настоящие произведения искусства.
              </p>
              
              <p className="font-inter text-lg text-text-primary leading-relaxed">
                В 2018 году эта мечта стала реальностью. Flowers Belka — это воплощение моей философии: каждая композиция должна рассказывать историю, передавать эмоции и создавать незабываемые моменты.
              </p>
            </div>

            {/* Achievements */}
            <div className="space-y-6">
              <h4 className="font-playfair text-xl font-semibold text-primary">
                Достижения и экспертиза
              </h4>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-background rounded-xl shadow-botanical-sm">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={achievement.icon} size={24} className="text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-inter font-semibold text-primary">
                        {achievement.title}
                      </h5>
                      <p className="font-inter text-sm text-text-secondary">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;