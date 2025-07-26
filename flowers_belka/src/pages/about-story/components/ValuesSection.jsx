import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ValuesSection = () => {
  const values = [
    {
      icon: 'Heart',
      title: 'Качество превыше всего',
      description: 'Мы никогда не идем на компромиссы в вопросах качества. Каждый цветок проходит строгий отбор, а каждая композиция создается с максимальной тщательностью.',
      example: 'Анна заказала букет для мамы на день рождения. Через неделю цветы все еще радовали свежестью, и мама была в восторге.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: 'Leaf',
      title: 'Экологическая ответственность',
      description: 'Мы заботимся о природе и используем только экологически чистые материалы. Наша упаковка биоразлагаема, а цветы выращены без вредных химикатов.',
      example: 'Все наши поставщики сертифицированы по стандартам экологической безопасности, а упаковка изготовлена из переработанных материалов.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'Users',
      title: 'Индивидуальный подход',
      description: 'Каждый клиент уникален, и мы создаем композиции, учитывая личные предпочтения, повод и особенности получателя.',
      example: 'Для свадьбы Марии мы создали букет в стиле рустик с полевыми цветами, идеально подходящий к ее платью и тематике торжества.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Clock',
      title: 'Надежность и пунктуальность',
      description: 'Мы понимаем важность своевременной доставки. Наша служба логистики работает круглосуточно, чтобы ваши цветы прибыли точно в срок.',
      example: 'Даже в новогоднюю ночь мы доставили букет Елене точно к полуночи, сделав ее сюрприз незабываемым.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: 'Sparkles',
      title: 'Инновации в традициях',
      description: 'Мы сочетаем классические флористические традиции с современными техниками и трендами, создавая уникальные композиции.',
      example: 'Наша коллекция "Московские сезоны" объединяет традиционные русские цветы с современными дизайнерскими решениями.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: 'HandHeart',
      title: 'Социальная ответственность',
      description: 'Мы активно участвуем в благотворительных проектах и поддерживаем местные сообщества, делая мир немного лучше.',
      example: 'Каждый месяц мы безвозмездно украшаем детские больницы и дома престарелых, принося радость тем, кто в ней нуждается.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Наши ценности
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Принципы, которые направляют нашу работу и помогают создавать не просто красивые букеты, а настоящие произведения искусства
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-surface rounded-2xl p-8 shadow-botanical hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 ${value.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={value.icon} size={32} className={value.color} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-xl font-semibold text-primary">
                    {value.title}
                  </h3>
                  
                  <p className="font-inter text-text-secondary leading-relaxed">
                    {value.description}
                  </p>

                  {/* Example */}
                  <div className="pt-4 border-t border-botanical">
                    <h4 className="font-inter text-sm font-semibold text-primary mb-2">
                      Пример из практики:
                    </h4>
                    <p className="font-inter text-sm text-text-secondary italic">
                      {value.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-primary-foreground">
                Наше влияние на сообщество
              </h3>
              <p className="font-inter text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                За годы работы мы не только создали тысячи прекрасных композиций, но и внесли значительный вклад в развитие местного сообщества
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="font-playfair text-3xl lg:text-4xl font-bold text-primary-foreground">
                  500+
                </div>
                <div className="font-inter text-sm text-primary-foreground/80">
                  Благотворительных букетов
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-playfair text-3xl lg:text-4xl font-bold text-primary-foreground">
                  15
                </div>
                <div className="font-inter text-sm text-primary-foreground/80">
                  Местных поставщиков
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-playfair text-3xl lg:text-4xl font-bold text-primary-foreground">
                  100%
                </div>
                <div className="font-inter text-sm text-primary-foreground/80">
                  Экологичная упаковка
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-playfair text-3xl lg:text-4xl font-bold text-primary-foreground">
                  25
                </div>
                <div className="font-inter text-sm text-primary-foreground/80">
                  Рабочих мест создано
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-surface rounded-2xl p-8 shadow-botanical">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c9c0b8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Отзыв клиента"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Quote" size={24} className="text-accent" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="font-inter text-lg text-text-primary italic leading-relaxed">
                  "Flowers Belka — это не просто цветочный магазин, это место, где понимают важность каждого момента. Их внимание к деталям, качество цветов и искренняя забота о клиентах делают каждый заказ особенным. Я доверяю им самые важные моменты своей жизни."
                </p>
                <div className="space-y-1">
                  <div className="font-inter font-semibold text-primary">Екатерина Морозова</div>
                  <div className="font-inter text-sm text-text-secondary">Постоянный клиент с 2019 года</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;