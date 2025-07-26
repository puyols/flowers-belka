import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeliveryOptions = ({ onDeliveryChange }) => {
  const [selectedOption, setSelectedOption] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'moscow',
    postalCode: '',
    instructions: ''
  });

  const deliveryOptions = [
    {
      id: 'express',
      name: 'Экспресс-доставка',
      description: 'Доставка в течение 2-4 часов',
      price: 890,
      icon: 'Zap',
      available: true
    },
    {
      id: 'standard',
      name: 'Стандартная доставка',
      description: 'Доставка на следующий день',
      price: 390,
      icon: 'Truck',
      available: true
    },
    {
      id: 'scheduled',
      name: 'Запланированная доставка',
      description: 'Выберите удобную дату и время',
      price: 490,
      icon: 'Calendar',
      available: true
    },
    {
      id: 'pickup',
      name: 'Самовывоз',
      description: 'Забрать из нашего салона',
      price: 0,
      icon: 'MapPin',
      available: true
    }
  ];

  const timeSlots = [
    { value: '09-12', label: '09:00 - 12:00' },
    { value: '12-15', label: '12:00 - 15:00' },
    { value: '15-18', label: '15:00 - 18:00' },
    { value: '18-21', label: '18:00 - 21:00' }
  ];

  const cities = [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'kazan', label: 'Казань' }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    const option = deliveryOptions.find(opt => opt.id === optionId);
    onDeliveryChange && onDeliveryChange({
      option: optionId,
      price: option.price,
      date: deliveryDate,
      timeSlot,
      recipient: recipientInfo
    });
  };

  const handleRecipientChange = (field, value) => {
    const updated = { ...recipientInfo, [field]: value };
    setRecipientInfo(updated);
    onDeliveryChange && onDeliveryChange({
      option: selectedOption,
      price: deliveryOptions.find(opt => opt.id === selectedOption)?.price || 0,
      date: deliveryDate,
      timeSlot,
      recipient: updated
    });
  };

  return (
    <div className="space-y-6">
      {/* Delivery Options */}
      <div>
        <h3 className="font-playfair text-xl font-semibold text-text-primary mb-4">
          Способ доставки
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-botanical ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/5' :'border-botanical hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedOption === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={option.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-inter font-semibold text-text-primary">
                      {option.name}
                    </h4>
                    <span className="font-inter font-bold text-primary">
                      {option.price === 0 ? 'Бесплатно' : `₽${option.price}`}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {(selectedOption === 'scheduled' || selectedOption === 'standard') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Дата доставки"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <Select
            label="Время доставки"
            placeholder="Выберите время"
            options={timeSlots}
            value={timeSlot}
            onChange={setTimeSlot}
            required
          />
        </div>
      )}

      {/* Recipient Information */}
      {selectedOption !== 'pickup' && (
        <div>
          <h3 className="font-playfair text-xl font-semibold text-text-primary mb-4">
            Информация о получателе
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Имя получателя"
              placeholder="Введите имя"
              value={recipientInfo.name}
              onChange={(e) => handleRecipientChange('name', e.target.value)}
              required
            />
            <Input
              type="tel"
              label="Телефон получателя"
              placeholder="+7 (999) 123-45-67"
              value={recipientInfo.phone}
              onChange={(e) => handleRecipientChange('phone', e.target.value)}
              required
            />
            <Select
              label="Город"
              options={cities}
              value={recipientInfo.city}
              onChange={(value) => handleRecipientChange('city', value)}
              required
            />
            <Input
              label="Почтовый индекс"
              placeholder="123456"
              value={recipientInfo.postalCode}
              onChange={(e) => handleRecipientChange('postalCode', e.target.value)}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Адрес доставки"
                placeholder="Улица, дом, квартира"
                value={recipientInfo.address}
                onChange={(e) => handleRecipientChange('address', e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Особые указания для курьера"
                placeholder="Домофон, этаж, особенности доставки..."
                value={recipientInfo.instructions}
                onChange={(e) => handleRecipientChange('instructions', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Pickup Information */}
      {selectedOption === 'pickup' && (
        <div className="bg-surface rounded-lg p-6">
          <h3 className="font-playfair text-xl font-semibold text-text-primary mb-4">
            Адрес для самовывоза
          </h3>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-inter font-semibold text-text-primary">
                Flowers Belka - Главный салон
              </h4>
              <p className="text-text-secondary mt-1">
                ул. Тверская, 15, Москва, 125009
              </p>
              <p className="text-text-secondary">
                Режим работы: Пн-Вс 09:00-21:00
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                className="mt-3"
              >
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Guarantee */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={24} className="text-success" />
          <div>
            <h4 className="font-inter font-semibold text-success">
              Гарантия свежести
            </h4>
            <p className="text-sm text-text-secondary">
              Мы гарантируем свежесть цветов в течение 7 дней с момента доставки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;