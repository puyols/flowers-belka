import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutSteps = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Корзина', icon: 'ShoppingBag' },
    { id: 2, name: 'Доставка', icon: 'Truck' },
    { id: 3, name: 'Оплата', icon: 'CreditCard' },
    { id: 4, name: 'Подтверждение', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full bg-surface rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-botanical ${
                step.id <= currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={step.icon} size={20} />
              </div>
              <div className="hidden sm:block">
                <p className={`font-inter font-medium ${
                  step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step.id < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;