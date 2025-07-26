import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CraftsmanshipProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 1,
      title: 'Отбор цветов',
      subtitle: 'Тщательный выбор лучших экземпляров',
      description: 'Каждое утро наши флористы лично отбирают самые свежие и красивые цветы от проверенных поставщиков. Мы работаем только с теми, кто разделяет наши стандарты качества.',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: 'Flower2',
      details: [
        'Проверка свежести каждого стебля',
        'Оценка качества бутонов',
        'Контроль температурного режима',
        'Документирование происхождения'
      ]
    },
    {
      id: 2,
      title: 'Подготовка материалов',
      subtitle: 'Профессиональная обработка и подготовка',
      description: 'Цветы проходят специальную обработку для максимального сохранения свежести. Каждый стебель обрезается под определенным углом и помещается в питательный раствор.',
      image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Scissors',
      details: [
        'Обрезка стеблей под углом 45°',
        'Удаление лишних листьев',
        'Обработка питательным раствором',
        'Кондиционирование в холодильной камере'
      ]
    },
    {
      id: 3,
      title: 'Создание композиции',
      subtitle: 'Художественное воплощение идеи',
      description: 'Наши мастера создают уникальные композиции, учитывая цветовую гармонию, форму, текстуру и символическое значение каждого элемента. Это настоящее искусство флористики.',
      image: 'https://images.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg',
      icon: 'Palette',
      details: [
        'Создание цветовой схемы',
        'Формирование структуры букета',
        'Добавление декоративных элементов',
        'Финальная корректировка композиции'
      ]
    },
    {
      id: 4,
      title: 'Упаковка и оформление',
      subtitle: 'Элегантная презентация результата',
      description: 'Каждая композиция упаковывается с особой тщательностью. Мы используем экологичные материалы и создаем упаковку, которая подчеркивает красоту цветов.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Gift',
      details: [
        'Выбор подходящей упаковки',
        'Добавление декоративных лент',
        'Создание персональной открытки',
        'Финальная проверка качества'
      ]
    },
    {
      id: 5,
      title: 'Доставка',
      subtitle: 'Бережная доставка до получателя',
      description: 'Наша служба доставки обеспечивает сохранность композиций во время транспортировки. Каждый заказ доставляется в специальных условиях с контролем температуры.',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: 'Truck',
      details: [
        'Упаковка для транспортировки',
        'Контроль температурного режима',
        'Отслеживание маршрута доставки',
        'Подтверждение получения'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-surface via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
            Процесс создания
          </h2>
          <p className="font-inter text-lg text-text-secondary max-w-3xl mx-auto">
            От отбора цветов до доставки — каждый этап нашей работы продуман до мелочей и выполняется с максимальной тщательностью
          </p>
        </div>

        {/* Process Steps Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {processSteps.map((step, index) => (
            <Button
              key={step.id}
              variant={activeStep === index ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveStep(index)}
              iconName={step.icon}
              iconPosition="left"
              className="transition-all duration-300"
            >
              {step.title}
            </Button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="bg-background rounded-3xl shadow-botanical overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={processSteps[activeStep].image}
                alt={processSteps[activeStep].title}
                className="w-full h-full min-h-[400px] lg:min-h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              
              {/* Step Number */}
              <div className="absolute top-6 left-6 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <span className="font-playfair text-xl font-bold">{activeStep + 1}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-primary">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="font-inter text-lg font-medium text-secondary">
                    {processSteps[activeStep].subtitle}
                  </p>
                </div>

                <p className="font-inter text-lg text-text-primary leading-relaxed">
                  {processSteps[activeStep].description}
                </p>

                {/* Process Details */}
                <div className="space-y-4">
                  <h4 className="font-inter font-semibold text-primary">
                    Ключевые этапы:
                  </h4>
                  <div className="space-y-3">
                    {processSteps[activeStep].details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <span className="font-inter text-text-secondary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Предыдущий
                  </Button>
                  
                  <div className="flex space-x-2">
                    {processSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === activeStep ? 'bg-primary' : 'bg-primary/20'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === processSteps.length - 1}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Следующий
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Shield" size={48} className="text-primary" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
              Гарантия качества
            </h3>
            <p className="font-inter text-lg text-text-secondary">
              Мы гарантируем свежесть наших цветов в течение 7 дней и предоставляем бесплатную замену в случае несоответствия ожиданиям
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipProcess;