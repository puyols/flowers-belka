import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentMethods = ({ onPaymentChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [saveCard, setSaveCard] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Банковская карта',
      description: 'Visa, MasterCard, МИР',
      icon: 'CreditCard',
      popular: true
    },
    {
      id: 'sberbank',
      name: 'Сбербанк Онлайн',
      description: 'Оплата через Сбербанк',
      icon: 'Building',
      popular: true
    },
    {
      id: 'yandex',
      name: 'Яндекс.Деньги',
      description: 'Быстрая оплата',
      icon: 'Wallet',
      popular: false
    },
    {
      id: 'qiwi',
      name: 'QIWI Кошелек',
      description: 'Электронный кошелек',
      icon: 'Smartphone',
      popular: false
    },
    {
      id: 'cash',
      name: 'Наличными курьеру',
      description: 'Оплата при получении',
      icon: 'Banknote',
      popular: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onPaymentChange && onPaymentChange({
      method: methodId,
      cardInfo: methodId === 'card' ? cardInfo : null,
      saveCard: methodId === 'card' ? saveCard : false
    });
  };

  const handleCardInfoChange = (field, value) => {
    const updated = { ...cardInfo, [field]: value };
    setCardInfo(updated);
    onPaymentChange && onPaymentChange({
      method: selectedMethod,
      cardInfo: updated,
      saveCard
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-xl font-semibold text-text-primary">
        Способ оплаты
      </h3>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-botanical ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5' :'border-botanical hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={method.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-inter font-semibold text-text-primary">
                    {method.name}
                  </h4>
                  {method.popular && (
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                      Популярно
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {method.description}
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary' :'border-muted'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="bg-surface rounded-lg p-6 space-y-4">
          <h4 className="font-inter font-semibold text-text-primary">
            Данные банковской карты
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Номер карты"
              placeholder="1234 5678 9012 3456"
              value={cardInfo.number}
              onChange={(e) => handleCardInfoChange('number', formatCardNumber(e.target.value))}
              maxLength={19}
              required
            />
            <Input
              label="Имя владельца карты"
              placeholder="IVAN PETROV"
              value={cardInfo.name}
              onChange={(e) => handleCardInfoChange('name', e.target.value.toUpperCase())}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Срок действия"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={(e) => handleCardInfoChange('expiry', formatExpiry(e.target.value))}
                maxLength={5}
                required
              />
              <Input
                label="CVV код"
                placeholder="123"
                value={cardInfo.cvv}
                onChange={(e) => handleCardInfoChange('cvv', e.target.value.replace(/\D/g, ''))}
                maxLength={3}
                required
              />
            </div>
          </div>
          
          <Checkbox
            label="Сохранить карту для будущих покупок"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="mt-4"
          />
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-inter font-semibold text-success">
              Безопасная оплата
            </h4>
            <p className="text-sm text-text-secondary mt-1">
              Все платежи защищены SSL-шифрованием. Мы не храним данные ваших карт.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods Icons */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-botanical">
        <div className="flex items-center space-x-2 text-text-secondary">
          <span className="text-sm font-inter">Принимаем к оплате:</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
              VISA
            </div>
            <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
              MC
            </div>
            <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              МИР
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;