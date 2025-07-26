import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BotanicalTips = () => {
  const [activeTip, setActiveTip] = useState(0);

  const careTips = [
    {
      id: 1,
      title: "Правильная обрезка стеблей",
      description: "Обрезайте стебли под углом 45° под проточной водой каждые 2-3 дня",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      icon: "Scissors",
      steps: [
        "Используйте острый нож или секатор",
        "Обрезайте под углом 45 градусов",
        "Делайте срез под проточной водой",
        "Удаляйте листья ниже уровня воды"
      ],
      duration: "2-3 минуты"
    },
    {
      id: 2,
      title: "Выбор правильной воды",
      description: "Используйте отстоянную воду комнатной температуры с добавлением подкормки",
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400&h=300&fit=crop",
      icon: "Droplets",
      steps: [
        "Отстаивайте воду 24 часа",
        "Температура должна быть комнатной",
        "Добавьте специальную подкормку",
        "Меняйте воду каждые 2 дня"
      ],
      duration: "5 минут"
    },
    {
      id: 3,
      title: "Оптимальное расположение",
      description: "Размещайте букет вдали от прямых солнечных лучей и отопительных приборов",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop",
      icon: "Sun",
      steps: [
        "Избегайте прямого солнечного света",
        "Держите подальше от батарей",
        "Обеспечьте хорошую вентиляцию",
        "Поддерживайте прохладную температуру"
      ],
      duration: "1 минута"
    },
    {
      id: 4,
      title: "Ежедневный уход",
      description: "Удаляйте увядшие листья и цветы, опрыскивайте лепестки водой",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      icon: "Sparkles",
      steps: [
        "Осматривайте букет каждый день",
        "Удаляйте увядшие части",
        "Опрыскивайте лепестки",
        "Поворачивайте вазу для равномерного роста"
      ],
      duration: "3-5 минут"
    }
  ];

  const seasonalTips = [
    {
      season: "Зима",
      tip: "В зимний период цветы особенно чувствительны к перепадам температур",
      icon: "Snowflake"
    },
    {
      season: "Весна",
      tip: "Весенние цветы любят прохладу и частую смену воды",
      icon: "Flower"
    },
    {
      season: "Лето",
      tip: "Летом важно защищать букеты от жары и обеспечить дополнительное увлажнение",
      icon: "Sun"
    },
    {
      season: "Осень",
      tip: "Осенние композиции дольше стоят при умеренной влажности воздуха",
      icon: "Leaf"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Секреты ухода за цветами
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            Профессиональные советы наших флористов помогут вам продлить жизнь букета 
            и наслаждаться красотой цветов максимально долго
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Tips Navigation */}
          <div>
            <h3 className="font-playfair text-2xl font-semibold text-primary mb-8">
              Основные правила ухода
            </h3>
            
            <div className="space-y-4">
              {careTips.map((tip, index) => (
                <div
                  key={tip.id}
                  className={`p-6 rounded-2xl cursor-pointer transition-botanical ${
                    activeTip === index
                      ? 'bg-white shadow-botanical border-2 border-primary/20'
                      : 'bg-white/50 hover:bg-white hover:shadow-botanical-sm'
                  }`}
                  onClick={() => setActiveTip(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      activeTip === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon name={tip.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-inter font-semibold text-primary mb-2">
                        {tip.title}
                      </h4>
                      <p className="font-inter text-sm text-text-secondary leading-relaxed">
                        {tip.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="inline-flex items-center space-x-1 text-xs text-text-secondary">
                          <Icon name="Clock" size={12} />
                          <span>{tip.duration}</span>
                        </span>
                        {activeTip === index && (
                          <span className="text-xs text-primary font-medium">
                            Подробнее →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tip Details */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-botanical">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={careTips[activeTip].image}
                  alt={careTips[activeTip].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-playfair text-xl font-semibold">
                    {careTips[activeTip].title}
                  </h4>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h5 className="font-inter font-semibold text-primary mb-4">
                  Пошаговая инструкция:
                </h5>
                <div className="space-y-3">
                  {careTips[activeTip].steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-inter text-sm text-text-secondary leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Duration */}
                <div className="mt-6 pt-4 border-t border-botanical">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span className="font-inter text-sm">
                      Время выполнения: {careTips[activeTip].duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Tips */}
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-8">
            Сезонные особенности ухода
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalTips.map((tip, index) => (
              <div key={index} className="text-center p-6 bg-surface rounded-xl">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={tip.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-playfair text-lg font-semibold text-primary mb-3">
                  {tip.season}
                </h4>
                <p className="font-inter text-sm text-text-secondary leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default BotanicalTips;