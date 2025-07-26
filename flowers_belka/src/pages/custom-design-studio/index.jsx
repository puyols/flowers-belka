import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FlowerSelector from './components/FlowerSelector';
import VaseSelector from './components/VaseSelector';
import ArrangementPreview from './components/ArrangementPreview';
import ConsultationBooking from './components/ConsultationBooking';
import InspirationGallery from './components/InspirationGallery';
import BudgetGuide from './components/BudgetGuide';

const CustomDesignStudio = () => {
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedVase, setSelectedVase] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [activeTab, setActiveTab] = useState('flowers');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);

  const tabs = [
    { id: 'flowers', name: 'Цветы', icon: 'Flower' },
    { id: 'vases', name: 'Вазы', icon: 'Package' },
    { id: 'inspiration', name: 'Вдохновение', icon: 'Sparkles' },
    { id: 'budget', name: 'Бюджет', icon: 'Calculator' }
  ];

  const calculateTotalPrice = () => {
    const flowerTotal = selectedFlowers.reduce((total, flower) => total + (flower.price * flower.quantity), 0);
    const vasePrice = selectedVase?.price || 0;
    const arrangementFee = 500; // Фиксированная стоимость оформления
    return flowerTotal + vasePrice + arrangementFee;
  };

  const handleFlowerSelect = (flower) => {
    setSelectedFlowers(prev => {
      const existingIndex = prev.findIndex(f => f.id === flower.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = flower;
        return updated;
      } else {
        return [...prev, flower];
      }
    });
  };

  const handleFlowerRemove = (flowerId) => {
    setSelectedFlowers(prev => prev.filter(f => f.id !== flowerId));
  };

  const handleUpdateQuantity = (flowerId, newQuantity) => {
    if (newQuantity <= 0) {
      handleFlowerRemove(flowerId);
      return;
    }
    
    setSelectedFlowers(prev => 
      prev.map(flower => 
        flower.id === flowerId 
          ? { ...flower, quantity: newQuantity }
          : flower
      )
    );
  };

  const handleVaseSelect = (vase) => {
    setSelectedVase(vase);
  };

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const handleConsultationBook = (consultationData) => {
    console.log('Consultation booked:', consultationData);
    // Here you would typically send the data to your backend
    alert('Консультация успешно забронирована! Мы свяжемся с вами в ближайшее время.');
  };

  const handleApplyInspiration = (inspiration) => {
    // Apply inspiration to current design
    console.log('Applying inspiration:', inspiration);
    alert(`Дизайн "${inspiration.title}" применен! Настройте детали по своему вкусу.`);
  };

  const handleSaveDesign = () => {
    if (selectedFlowers.length === 0 || !selectedVase) {
      alert('Пожалуйста, выберите цветы и вазу перед сохранением дизайна.');
      return;
    }

    const design = {
      id: Date.now(),
      name: `Дизайн ${new Date().toLocaleDateString()}`,
      flowers: selectedFlowers,
      vase: selectedVase,
      totalPrice: calculateTotalPrice(),
      createdAt: new Date()
    };

    setSavedDesigns(prev => [...prev, design]);
    alert('Дизайн сохранен! Вы можете вернуться к нему позже.');
  };

  const handleProceedToCheckout = () => {
    if (selectedFlowers.length === 0 || !selectedVase) {
      alert('Пожалуйста, выберите цветы и вазу перед оформлением заказа.');
      return;
    }

    // Save current design to localStorage for checkout
    const designData = {
      flowers: selectedFlowers,
      vase: selectedVase,
      totalPrice: calculateTotalPrice(),
      type: 'custom-design'
    };
    
    localStorage.setItem('checkoutData', JSON.stringify(designData));
    // Navigate to checkout would happen here
    alert('Переход к оформлению заказа...');
  };

  // Load saved designs from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedDesigns');
    if (saved) {
      setSavedDesigns(JSON.parse(saved));
    }
  }, []);

  // Save designs to localStorage whenever savedDesigns changes
  useEffect(() => {
    localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Студия индивидуального дизайна
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
              Создайте уникальную цветочную композицию с помощью нашего интерактивного конструктора. 
              Выберите цветы, вазу и получите персональные рекомендации от экспертов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Palette"
                iconPosition="left"
                onClick={() => setActiveTab('flowers')}
              >
                Начать создание
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setIsConsultationOpen(true)}
              >
                Консультация эксперта
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-card rounded-lg shadow-botanical-sm">
              <Icon name="Flower" size={24} className="mx-auto text-primary mb-2" />
              <p className="font-semibold text-text-primary">50+</p>
              <p className="text-xs text-text-secondary">Видов цветов</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg shadow-botanical-sm">
              <Icon name="Package" size={24} className="mx-auto text-primary mb-2" />
              <p className="font-semibold text-text-primary">30+</p>
              <p className="text-xs text-text-secondary">Стилей ваз</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg shadow-botanical-sm">
              <Icon name="Users" size={24} className="mx-auto text-primary mb-2" />
              <p className="font-semibold text-text-primary">1000+</p>
              <p className="text-xs text-text-secondary">Довольных клиентов</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg shadow-botanical-sm">
              <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
              <p className="font-semibold text-text-primary">24/7</p>
              <p className="text-xs text-text-secondary">Поддержка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Design Studio */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation & Preview */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card rounded-xl shadow-botanical border border-botanical p-4">
                <h3 className="font-playfair text-lg font-semibold text-text-primary mb-4">
                  Этапы создания
                </h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-botanical ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      <Icon name={tab.icon} size={20} />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Saved Designs */}
              {savedDesigns.length > 0 && (
                <div className="bg-card rounded-xl shadow-botanical border border-botanical p-4">
                  <h3 className="font-playfair text-lg font-semibold text-text-primary mb-4">
                    Сохраненные дизайны
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {savedDesigns.slice(-3).map((design) => (
                      <div key={design.id} className="p-3 bg-surface rounded-lg">
                        <p className="font-medium text-text-primary text-sm">
                          {design.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {design.totalPrice}₽ • {design.flowers.length} видов цветов
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {activeTab === 'flowers' && (
                <FlowerSelector
                  selectedFlowers={selectedFlowers}
                  onFlowerSelect={handleFlowerSelect}
                  onFlowerRemove={handleFlowerRemove}
                />
              )}
              
              {activeTab === 'vases' && (
                <VaseSelector
                  selectedVase={selectedVase}
                  onVaseSelect={handleVaseSelect}
                />
              )}
              
              {activeTab === 'inspiration' && (
                <InspirationGallery
                  onApplyInspiration={handleApplyInspiration}
                />
              )}
              
              {activeTab === 'budget' && (
                <BudgetGuide
                  onBudgetSelect={handleBudgetSelect}
                />
              )}
            </div>

            {/* Right Sidebar - Preview & Actions */}
            <div className="lg:col-span-1">
              <ArrangementPreview
                selectedFlowers={selectedFlowers}
                selectedVase={selectedVase}
                totalPrice={calculateTotalPrice()}
                onRemoveFlower={handleFlowerRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="py-8 bg-surface border-t border-botanical">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-semibold text-text-primary">
                Готовы оформить заказ?
              </h3>
              <p className="text-text-secondary">
                Ваша композиция: {selectedFlowers.length} видов цветов • {calculateTotalPrice()}₽
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveDesign}
              >
                Сохранить дизайн
              </Button>
              <Button
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setIsConsultationOpen(true)}
              >
                Консультация
              </Button>
              <Link to="/checkout-delivery">
                <Button
                  variant="default"
                  iconName="ShoppingBag"
                  iconPosition="left"
                  onClick={handleProceedToCheckout}
                >
                  Оформить заказ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-text-primary mb-4">
              Почему выбирают нашу студию
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Мы сочетаем традиционное мастерство с современными технологиями для создания уникальных композиций
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-botanical border border-botanical">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Palette" size={32} className="text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2">
                Интерактивный дизайн
              </h3>
              <p className="text-text-secondary">
                Создавайте композиции в реальном времени с предварительным просмотром и расчетом стоимости
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl shadow-botanical border border-botanical">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2">
                Экспертные консультации
              </h3>
              <p className="text-text-secondary">
                Получите персональные рекомендации от профессиональных флористов с многолетним опытом
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl shadow-botanical border border-botanical">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Flower" size={32} className="text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2">
                Сезонная свежесть
              </h3>
              <p className="text-text-secondary">
                Используем только свежие сезонные цветы от проверенных поставщиков с гарантией качества
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationBooking
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onBookConsultation={handleConsultationBook}
      />
    </div>
  );
};

export default CustomDesignStudio;