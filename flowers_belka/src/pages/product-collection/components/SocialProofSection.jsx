import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProofSection = ({ socialProof }) => {
  return (
    <div className="bg-background py-12">
      <div className="w-full px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl font-bold text-text-primary mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="font-inter text-text-secondary max-w-2xl mx-auto">
            Более 10,000 довольных клиентов доверяют нам свои особенные моменты
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Star" size={24} className="text-primary" />
            </div>
            <div className="font-playfair text-2xl font-bold text-text-primary mb-1">
              4.9/5
            </div>
            <div className="text-sm text-text-secondary">
              Средний рейтинг
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Truck" size={24} className="text-success" />
            </div>
            <div className="font-playfair text-2xl font-bold text-text-primary mb-1">
              98%
            </div>
            <div className="text-sm text-text-secondary">
              Успешных доставок
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Flower" size={24} className="text-accent" />
            </div>
            <div className="font-playfair text-2xl font-bold text-text-primary mb-1">
              7 дней
            </div>
            <div className="text-sm text-text-secondary">
              Гарантия свежести
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Heart" size={24} className="text-secondary" />
            </div>
            <div className="font-playfair text-2xl font-bold text-text-primary mb-1">
              10K+
            </div>
            <div className="text-sm text-text-secondary">
              Довольных клиентов
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialProof.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-xl p-6 shadow-botanical border border-botanical"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-text-primary">
                    {review.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < review.rating ? 'text-accent fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-text-secondary mb-4 italic">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>{review.date}</span>
                <span className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>Подтверждённая покупка</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Photos */}
        <div className="mt-12">
          <h3 className="font-playfair text-2xl font-semibold text-text-primary text-center mb-6">
            Фото от наших клиентов
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {socialProof.customerPhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;