import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CheckoutSteps from './components/CheckoutSteps';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentMethods from './components/PaymentMethods';
import OrderSummary from './components/OrderSummary';
import GiftMessage from './components/GiftMessage';
import ContactlessDelivery from './components/ContactlessDelivery';

const CheckoutDelivery = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [orderData, setOrderData] = useState({
    delivery: null,
    payment: null,
    giftMessage: null,
    contactlessOptions: null
  });

  const [orderItems] = useState([
    {
      id: 1,
      name: "Букет 'Весенняя нежность'",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
      price: 3490,
      quantity: 1,
      description: "Тюльпаны, нарциссы, зелень",
      size: "Средний"
    },
    {
      id: 2,
      name: "Букет 'Романтический вечер'",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop",
      price: 4290,
      quantity: 1,
      description: "Красные розы, эвкалипт",
      size: "Большой"
    },
    {
      id: 3,
      name: "Открытка с пожеланиями",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      price: 290,
      quantity: 1,
      description: "Персонализированная открытка",
      size: "Стандарт"
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeliveryChange = (deliveryData) => {
    setOrderData(prev => ({
      ...prev,
      delivery: deliveryData
    }));
  };

  const handlePaymentChange = (paymentData) => {
    setOrderData(prev => ({
      ...prev,
      payment: paymentData
    }));
  };

  const handleGiftMessageChange = (giftData) => {
    setOrderData(prev => ({
      ...prev,
      giftMessage: giftData
    }));
  };

  const handleContactlessChange = (contactlessData) => {
    setOrderData(prev => ({
      ...prev,
      contactlessOptions: contactlessData
    }));
  };

  const handleItemUpdate = (itemId, newQuantity) => {
    // In a real app, this would update the cart
    console.log(`Update item ${itemId} quantity to ${newQuantity}`);
  };

  const handleItemRemove = (itemId) => {
    // In a real app, this would remove the item from cart
    console.log(`Remove item ${itemId}`);
  };

  const validateOrder = () => {
    if (!orderData.delivery) {
      alert('Пожалуйста, выберите способ доставки');
      return false;
    }
    
    if (!orderData.payment) {
      alert('Пожалуйста, выберите способ оплаты');
      return false;
    }

    if (orderData.delivery.option !== 'pickup' && !orderData.delivery.recipient.name) {
      alert('Пожалуйста, укажите имя получателя');
      return false;
    }

    if (orderData.delivery.option !== 'pickup' && !orderData.delivery.recipient.phone) {
      alert('Пожалуйста, укажите телефон получателя');
      return false;
    }

    if (orderData.delivery.option !== 'pickup' && !orderData.delivery.recipient.address) {
      alert('Пожалуйста, укажите адрес доставки');
      return false;
    }

    if (orderData.payment.method === 'card') {
      if (!orderData.payment.cardInfo.number || !orderData.payment.cardInfo.expiry || !orderData.payment.cardInfo.cvv) {
        alert('Пожалуйста, заполните все данные карты');
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateOrder()) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would make an API call to create the order
      console.log('Order placed:', orderData);
      
      // Navigate to success page or show success message
      alert('Заказ успешно оформлен! Вы получите подтверждение на email.');
      navigate('/homepage');
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsProcessing(false);
    }
  };

  const deliveryPrice = orderData.delivery?.price || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <button 
                onClick={() => navigate('/product-collection')}
                className="hover:text-primary transition-botanical"
              >
                Каталог
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Оформление заказа</span>
            </div>
            <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-text-primary">
              Оформление заказа
            </h1>
            <p className="text-text-secondary mt-2">
              Заполните данные для доставки и оплаты
            </p>
          </div>

          {/* Checkout Steps */}
          <CheckoutSteps currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Options */}
              <div className="bg-card rounded-lg p-6 shadow-botanical-sm">
                <DeliveryOptions onDeliveryChange={handleDeliveryChange} />
              </div>

              {/* Payment Methods */}
              <div className="bg-card rounded-lg p-6 shadow-botanical-sm">
                <PaymentMethods onPaymentChange={handlePaymentChange} />
              </div>

              {/* Gift Message */}
              <div className="bg-card rounded-lg p-6 shadow-botanical-sm">
                <GiftMessage onMessageChange={handleGiftMessageChange} />
              </div>

              {/* Contactless Delivery */}
              <div className="bg-card rounded-lg p-6 shadow-botanical-sm">
                <ContactlessDelivery onOptionsChange={handleContactlessChange} />
              </div>

              {/* Terms and Conditions */}
              <div className="bg-surface rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Icon name="FileText" size={20} className="text-text-secondary mt-1" />
                  <div>
                    <h4 className="font-inter font-semibold text-text-primary mb-2">
                      Условия заказа
                    </h4>
                    <div className="text-sm text-text-secondary space-y-2">
                      <p>
                        • Доставка осуществляется в рабочие дни с 9:00 до 21:00, в выходные с 10:00 до 20:00
                      </p>
                      <p>
                        • При отсутствии получателя курьер ожидает 15 минут, затем заказ возвращается в салон
                      </p>
                      <p>
                        • Гарантия свежести цветов действует 7 дней с момента доставки
                      </p>
                      <p>
                        • Возврат и обмен возможен в течение 24 часов при сохранении товарного вида
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary
                items={orderItems}
                deliveryPrice={deliveryPrice}
                onItemUpdate={handleItemUpdate}
                onItemRemove={handleItemRemove}
              />

              {/* Place Order Button */}
              <div className="mt-6">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isProcessing}
                  onClick={handlePlaceOrder}
                  iconName="ShoppingBag"
                  iconPosition="left"
                  className="h-14 text-lg font-semibold"
                >
                  {isProcessing ? 'Обработка заказа...' : 'Оформить заказ'}
                </Button>
                
                <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-text-secondary">
                  <Icon name="Lock" size={16} />
                  <span>Безопасная оплата SSL</span>
                </div>
              </div>

              {/* Support Contact */}
              <div className="mt-6 p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Headphones" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-text-primary">
                      Нужна помощь?
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Звоните: +7 (495) 123-45-67
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-botanical py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="font-inter text-sm text-text-secondary">
                Защищенные платежи
              </span>
              <Icon name="Truck" size={20} className="text-success" />
              <span className="font-inter text-sm text-text-secondary">
                Надежная доставка
              </span>
            </div>
            <p className="font-inter text-sm text-text-secondary">
              © {new Date().getFullYear()} Flowers Belka. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutDelivery;