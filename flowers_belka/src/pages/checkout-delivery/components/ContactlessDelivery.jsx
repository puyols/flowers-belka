import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ContactlessDelivery = ({ onOptionsChange }) => {
  const [contactlessEnabled, setContactlessEnabled] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    sms: true,
    email: true,
    call: false
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [photoConfirmation, setPhotoConfirmation] = useState(false);

  const handleContactlessToggle = (checked) => {
    setContactlessEnabled(checked);
    onOptionsChange && onOptionsChange({
      contactless: checked,
      notifications: notificationPreferences,
      instructions: specialInstructions,
      photoConfirmation: checked ? photoConfirmation : false
    });
  };

  const handleNotificationChange = (type, checked) => {
    const updated = { ...notificationPreferences, [type]: checked };
    setNotificationPreferences(updated);
    onOptionsChange && onOptionsChange({
      contactless: contactlessEnabled,
      notifications: updated,
      instructions: specialInstructions,
      photoConfirmation
    });
  };

  const handleInstructionsChange = (value) => {
    setSpecialInstructions(value);
    onOptionsChange && onOptionsChange({
      contactless: contactlessEnabled,
      notifications: notificationPreferences,
      instructions: value,
      photoConfirmation
    });
  };

  const handlePhotoToggle = (checked) => {
    setPhotoConfirmation(checked);
    onOptionsChange && onOptionsChange({
      contactless: contactlessEnabled,
      notifications: notificationPreferences,
      instructions: specialInstructions,
      photoConfirmation: checked
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={contactlessEnabled}
          onChange={(e) => handleContactlessToggle(e.target.checked)}
        />
        <div>
          <h3 className="font-playfair text-xl font-semibold text-text-primary">
            Бесконтактная доставка
          </h3>
          <p className="text-sm text-text-secondary">
            Курьер оставит заказ у двери и уведомит вас
          </p>
        </div>
      </div>

      {contactlessEnabled && (
        <div className="bg-surface rounded-lg p-6 space-y-6">
          {/* How it works */}
          <div className="bg-background rounded-lg p-4">
            <h4 className="font-inter font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Info" size={18} className="mr-2 text-primary" />
              Как это работает:
            </h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <p>Курьер приезжает по указанному адресу</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <p>Оставляет заказ у двери согласно вашим указаниям</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <p>Отправляет вам уведомление о доставке</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                <p>При необходимости делает фото подтверждение</p>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <h4 className="font-inter font-semibold text-text-primary mb-3">
              Способы уведомления:
            </h4>
            <div className="space-y-3">
              <Checkbox
                label="SMS-сообщение"
                description="Получить SMS о доставке"
                checked={notificationPreferences.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
              />
              <Checkbox
                label="Email уведомление"
                description="Получить письмо с подтверждением"
                checked={notificationPreferences.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
              />
              <Checkbox
                label="Телефонный звонок"
                description="Курьер позвонит при доставке"
                checked={notificationPreferences.call}
                onChange={(e) => handleNotificationChange('call', e.target.checked)}
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <Input
              label="Особые указания для курьера"
              placeholder="Например: оставить у двери квартиры 15, позвонить в домофон 15..."
              value={specialInstructions}
              onChange={(e) => handleInstructionsChange(e.target.value)}
              description="Максимум 150 символов"
              maxLength={150}
            />
          </div>

          {/* Photo Confirmation */}
          <div>
            <Checkbox
              label="Фото подтверждение доставки"
              description="Курьер сделает фото доставленного заказа"
              checked={photoConfirmation}
              onChange={(e) => handlePhotoToggle(e.target.checked)}
            />
          </div>

          {/* Safety Notice */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-inter font-semibold text-success">
                  Безопасность и гигиена
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  Наши курьеры соблюдают все меры безопасности: используют маски, перчатки и дезинфицирующие средства. Цветы упакованы в защитную пленку.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-inter font-semibold text-accent">
                  Зоны бесконтактной доставки
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  Бесконтактная доставка доступна в Москве, Санкт-Петербурге и других крупных городах. В частных домах и офисных зданиях возможны ограничения.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactlessDelivery;