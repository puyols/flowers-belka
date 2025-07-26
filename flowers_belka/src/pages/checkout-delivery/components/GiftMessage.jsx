import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GiftMessage = ({ onMessageChange }) => {
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const maxMessageLength = 200;

  const handleGiftToggle = (checked) => {
    setIsGift(checked);
    if (!checked) {
      setGiftMessage('');
      setSenderName('');
      setIsAnonymous(false);
    }
    onMessageChange && onMessageChange({
      isGift: checked,
      message: checked ? giftMessage : '',
      senderName: checked && !isAnonymous ? senderName : '',
      isAnonymous: checked ? isAnonymous : false
    });
  };

  const handleMessageChange = (value) => {
    if (value.length <= maxMessageLength) {
      setGiftMessage(value);
      onMessageChange && onMessageChange({
        isGift,
        message: value,
        senderName: !isAnonymous ? senderName : '',
        isAnonymous
      });
    }
  };

  const handleSenderChange = (value) => {
    setSenderName(value);
    onMessageChange && onMessageChange({
      isGift,
      message: giftMessage,
      senderName: !isAnonymous ? value : '',
      isAnonymous
    });
  };

  const handleAnonymousToggle = (checked) => {
    setIsAnonymous(checked);
    onMessageChange && onMessageChange({
      isGift,
      message: giftMessage,
      senderName: checked ? '' : senderName,
      isAnonymous: checked
    });
  };

  const suggestedMessages = [
    "С днем рождения! Желаю счастья и радости!",
    "Поздравляю с праздником! Пусть все мечты сбываются!",
    "Спасибо за все! Ты особенный человек!",
    "Выздоравливай скорее! Мы все тебя любим!",
    "С юбилеем! Желаю здоровья и благополучия!"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={isGift}
          onChange={(e) => handleGiftToggle(e.target.checked)}
        />
        <div>
          <h3 className="font-playfair text-xl font-semibold text-text-primary">
            Это подарок
          </h3>
          <p className="text-sm text-text-secondary">
            Добавьте персональное поздравление
          </p>
        </div>
      </div>

      {isGift && (
        <div className="bg-surface rounded-lg p-6 space-y-6">
          {/* Gift Message */}
          <div>
            <label className="block font-inter font-medium text-text-primary mb-2">
              Поздравительное сообщение
            </label>
            <div className="relative">
              <textarea
                value={giftMessage}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder="Напишите ваше поздравление..."
                className="w-full h-32 px-4 py-3 border border-botanical rounded-lg resize-none font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <div className="absolute bottom-3 right-3 text-xs text-text-secondary">
                {giftMessage.length}/{maxMessageLength}
              </div>
            </div>
          </div>

          {/* Suggested Messages */}
          <div>
            <h4 className="font-inter font-medium text-text-primary mb-3">
              Готовые поздравления:
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {suggestedMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageChange(message)}
                  className="text-left p-3 bg-background rounded-lg border border-botanical hover:border-primary/50 transition-botanical text-sm font-inter text-text-secondary hover:text-text-primary"
                >
                  "{message}"
                </button>
              ))}
            </div>
          </div>

          {/* Sender Information */}
          <div className="space-y-4">
            <Checkbox
              label="Анонимный подарок"
              description="Получатель не увидит имя отправителя"
              checked={isAnonymous}
              onChange={(e) => handleAnonymousToggle(e.target.checked)}
            />

            {!isAnonymous && (
              <Input
                label="От кого"
                placeholder="Ваше имя"
                value={senderName}
                onChange={(e) => handleSenderChange(e.target.value)}
                description="Это имя будет указано в открытке"
              />
            )}
          </div>

          {/* Preview */}
          {giftMessage && (
            <div className="bg-background rounded-lg p-4 border-l-4 border-accent">
              <div className="flex items-start space-x-3">
                <Icon name="MessageCircle" size={20} className="text-accent mt-1" />
                <div>
                  <h4 className="font-inter font-medium text-text-primary mb-2">
                    Предварительный просмотр открытки:
                  </h4>
                  <div className="bg-white p-4 rounded-lg shadow-botanical-sm border border-botanical">
                    <p className="font-inter text-text-primary text-sm leading-relaxed">
                      {giftMessage}
                    </p>
                    {!isAnonymous && senderName && (
                      <p className="font-inter text-text-secondary text-sm mt-3 text-right">
                        — {senderName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gift Options */}
          <div className="bg-accent/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Gift" size={20} className="text-accent" />
              <div>
                <h4 className="font-inter font-semibold text-accent">
                  Подарочная упаковка
                </h4>
                <p className="text-sm text-text-secondary">
                  Ваш заказ будет красиво упакован с лентой и открыткой
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftMessage;