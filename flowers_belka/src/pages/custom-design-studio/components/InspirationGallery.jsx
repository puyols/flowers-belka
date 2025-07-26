import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InspirationGallery = ({ onApplyInspiration }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedInspiration, setSelectedInspiration] = useState(null);

  const filters = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'wedding', name: 'Свадьба', icon: 'Heart' },
    { id: 'birthday', name: 'День рождения', icon: 'Gift' },
    { id: 'corporate', name: 'Корпоратив', icon: 'Building' },
    { id: 'romantic', name: 'Романтика', icon: 'Rose' },
    { id: 'sympathy', name: 'Соболезнование', icon: 'Flower' }
  ];

  const inspirationData = [
    {
      id: 'wedding-1',
      title: 'Классическая свадебная композиция',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
      description: `Элегантная композиция из белых роз и пионов в хрустальной вазе.\nИдеально подходит для торжественных моментов и создания романтической атмосферы.`,
      flowers: ['Белые розы', 'Белые пионы', 'Эвкалипт'],
      vase: 'Хрустальная ваза',
      price: 4500,
      customerStory: 'Анна и Михаил выбрали эту композицию для своей свадьбы. Гости были в восторге от изысканности и аромата.',
      occasion: 'Свадьба в загородном клубе'
    },
    {
      id: 'birthday-1',
      title: 'Яркий букет для дня рождения',
      category: 'birthday',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop',
      description: `Жизнерадостная композиция из разноцветных тюльпанов и гербер.\nСоздает праздничное настроение и дарит улыбки.`,
      flowers: ['Красные тюльпаны', 'Желтые герберы', 'Розовые розы'],
      vase: 'Керамическая ваза',
      price: 2800,
      customerStory: 'Мария заказала этот букет для мамы на 60-летие. Именинница была тронута до слез.',
      occasion: 'Семейное празднование дня рождения'
    },
    {
      id: 'corporate-1',
      title: 'Деловая композиция для офиса',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: `Сдержанная и элегантная композиция из белых лилий и зелени.\nПодчеркивает профессионализм и создает приятную рабочую атмосферу.`,
      flowers: ['Белые лилии', 'Зеленые хризантемы', 'Аспидистра'],
      vase: 'Современная стеклянная ваза',
      price: 3200,
      customerStory: 'Компания "Альфа" украсила переговорную этими композициями для важных встреч с партнерами.',
      occasion: 'Корпоративное мероприятие'
    },
    {
      id: 'romantic-1',
      title: 'Романтическая композиция',
      category: 'romantic',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=300&fit=crop',
      description: `Нежная композиция из розовых роз и белых пионов.\nИдеальна для выражения чувств и создания интимной атмосферы.`,
      flowers: ['Розовые розы', 'Белые пионы', 'Гипсофила'],
      vase: 'Фарфоровая ваза с узором',
      price: 3800,
      customerStory: 'Дмитрий подарил эту композицию Елене на годовщину знакомства. Вечер прошел незабываемо.',
      occasion: 'Романтический ужин дома'
    },
    {
      id: 'sympathy-1',
      title: 'Композиция для выражения соболезнований',
      category: 'sympathy',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
      description: `Сдержанная композиция из белых хризантем и лилий.\nВыражает уважение и поддержку в трудные моменты.`,
      flowers: ['Белые хризантемы', 'Белые лилии', 'Зелень'],
      vase: 'Простая керамическая ваза',
      price: 2500,
      customerStory: 'Семья Петровых выразила благодарность за деликатность и красоту композиции.',
      occasion: 'Траурная церемония'
    },
    {
      id: 'wedding-2',
      title: 'Пышная свадебная композиция',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=400&h=300&fit=crop',
      description: `Роскошная композиция из розовых пионов и белых роз.\nСоздает атмосферу сказки и волшебства.`,
      flowers: ['Розовые пионы', 'Белые розы', 'Эвкалипт'],
      vase: 'Золотая ваза',
      price: 6500,
      customerStory: 'Свадьба Ольги и Александра стала настоящей сказкой благодаря этим композициям.',
      occasion: 'Торжественная свадебная церемония'
    }
  ];

  const filteredInspiration = activeFilter === 'all' 
    ? inspirationData 
    : inspirationData.filter(item => item.category === activeFilter);

  const handleApplyInspiration = (inspiration) => {
    onApplyInspiration(inspiration);
    setSelectedInspiration(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-botanical border border-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-semibold text-text-primary">
          Галерея вдохновения
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Sparkles" size={16} />
          <span>Реальные работы</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-inter font-medium transition-botanical ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={filter.icon} size={16} />
            <span>{filter.name}</span>
          </button>
        ))}
      </div>

      {/* Inspiration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInspiration.map((inspiration) => (
          <div
            key={inspiration.id}
            className="bg-surface rounded-lg border border-botanical overflow-hidden hover:shadow-botanical-sm transition-botanical cursor-pointer"
            onClick={() => setSelectedInspiration(inspiration)}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={inspiration.image}
                alt={inspiration.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-xs font-medium text-text-primary">
                  {inspiration.price}₽
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-inter font-medium text-text-primary mb-2">
                {inspiration.title}
              </h4>
              <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                {inspiration.description.split('\n')[0]}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="Flower" size={12} />
                  <span>{inspiration.flowers.length} видов</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspiration Detail Modal */}
      {selectedInspiration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-botanical border border-botanical w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-botanical p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="font-playfair text-2xl font-semibold text-text-primary">
                  {selectedInspiration.title}
                </h2>
                <button
                  onClick={() => setSelectedInspiration(null)}
                  className="text-text-secondary hover:text-text-primary transition-botanical"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                  <Image
                    src={selectedInspiration.image}
                    alt={selectedInspiration.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-inter font-medium text-text-primary mb-2">
                      Описание
                    </h3>
                    <p className="text-text-secondary text-sm whitespace-pre-line">
                      {selectedInspiration.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-inter font-medium text-text-primary mb-2">
                      Состав композиции
                    </h3>
                    <div className="space-y-2">
                      {selectedInspiration.flowers.map((flower, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Flower" size={16} className="text-primary" />
                          <span className="text-text-secondary text-sm">{flower}</span>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Icon name="Package" size={16} className="text-primary" />
                        <span className="text-text-secondary text-sm">{selectedInspiration.vase}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-inter font-medium text-text-primary mb-2">
                      История клиента
                    </h3>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-text-secondary text-sm mb-2">
                        {selectedInspiration.customerStory}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <Icon name="MapPin" size={12} />
                        <span>{selectedInspiration.occasion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-botanical">
                    <div>
                      <span className="text-2xl font-semibold text-primary">
                        {selectedInspiration.price}₽
                      </span>
                      <p className="text-xs text-text-secondary">
                        Включая оформление и доставку
                      </p>
                    </div>
                    <Button
                      variant="default"
                      iconName="Wand2"
                      iconPosition="left"
                      onClick={() => handleApplyInspiration(selectedInspiration)}
                    >
                      Применить дизайн
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspirationGallery;