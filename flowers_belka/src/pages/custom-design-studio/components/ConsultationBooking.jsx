import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationBooking = ({ isOpen, onClose, onBookConsultation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    occasion: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const consultationTypes = [
    { value: 'phone', label: 'Телефонная консультация' },
    { value: 'video', label: 'Видео-консультация' },
    { value: 'inperson', label: 'Личная встреча в студии' },
    { value: 'onsite', label: 'Выезд на место' }
  ];

  const occasions = [
    { value: 'wedding', label: 'Свадьба' },
    { value: 'birthday', label: 'День рождения' },
    { value: 'anniversary', label: 'Годовщина' },
    { value: 'corporate', label: 'Корпоративное мероприятие' },
    { value: 'funeral', label: 'Траурная церемония' },
    { value: 'holiday', label: 'Праздник' },
    { value: 'justbecause', label: 'Просто так' },
    { value: 'other', label: 'Другое' }
  ];

  const budgetRanges = [
    { value: '3000-5000', label: '3 000 - 5 000₽' },
    { value: '5000-10000', label: '5 000 - 10 000₽' },
    { value: '10000-20000', label: '10 000 - 20 000₽' },
    { value: '20000-50000', label: '20 000 - 50 000₽' },
    { value: '50000+', label: 'Свыше 50 000₽' }
  ];

  const availableSlots = [
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, введите номер телефона';
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Пожалуйста, выберите дату';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Пожалуйста, выберите время';
    }

    if (!formData.consultationType) {
      newErrors.consultationType = 'Пожалуйста, выберите тип консультации';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onBookConsultation(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        consultationType: '',
        occasion: '',
        budget: '',
        message: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-botanical border border-botanical w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-botanical p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-text-primary">
                Консультация с экспертом
              </h2>
              <p className="text-text-secondary mt-1">
                Получите персональные рекомендации от наших флористов
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-botanical"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-inter font-medium text-text-primary">
              Контактная информация
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Имя *"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              
              <Input
                label="Телефон *"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
            </div>
            
            <Input
              label="Email *"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />
          </div>

          {/* Consultation Details */}
          <div className="space-y-4">
            <h3 className="font-inter font-medium text-text-primary">
              Детали консультации
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Предпочтительная дата *"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                error={errors.preferredDate}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              
              <Select
                label="Время *"
                placeholder="Выберите время"
                options={availableSlots}
                value={formData.preferredTime}
                onChange={(value) => handleInputChange('preferredTime', value)}
                error={errors.preferredTime}
                required
              />
            </div>
            
            <Select
              label="Тип консультации *"
              placeholder="Выберите тип консультации"
              options={consultationTypes}
              value={formData.consultationType}
              onChange={(value) => handleInputChange('consultationType', value)}
              error={errors.consultationType}
              required
            />
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="font-inter font-medium text-text-primary">
              О вашем проекте
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Повод"
                placeholder="Выберите повод"
                options={occasions}
                value={formData.occasion}
                onChange={(value) => handleInputChange('occasion', value)}
              />
              
              <Select
                label="Бюджет"
                placeholder="Выберите бюджет"
                options={budgetRanges}
                value={formData.budget}
                onChange={(value) => handleInputChange('budget', value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Дополнительная информация
              </label>
              <textarea
                className="w-full px-3 py-2 border border-botanical rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-botanical resize-none"
                rows={4}
                placeholder="Расскажите о ваших предпочтениях, особых требованиях или вопросах..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>
          </div>

          {/* Consultation Benefits */}
          <div className="bg-accent/10 rounded-lg p-4">
            <h4 className="font-inter font-medium text-text-primary mb-3">
              Что включает консультация:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Персональные рекомендации</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Подбор цветов по сезону</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Советы по уходу</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Расчет стоимости</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
            >
              Записаться на консультацию
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationBooking;