import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => Math.floor(review.rating) === rating).length,
    percentage: (reviews.filter(review => Math.floor(review.rating) === rating).length / reviews.length) * 100
  }));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card rounded-2xl shadow-botanical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-2xl font-bold text-text-primary">
          Отзывы покупателей
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
        >
          Написать отзыв
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
            <span className="font-playfair text-4xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(averageRating)}
            </div>
          </div>
          <p className="font-inter text-sm text-text-secondary">
            На основе {totalReviews} отзывов
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="font-inter text-sm text-text-secondary w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="font-inter text-sm text-text-secondary w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'Все отзывы' },
          { id: 'photo', label: 'С фото' },
          { id: 'recent', label: 'Недавние' },
          { id: 'high', label: '5 звезд' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-botanical ${
              selectedFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-inter font-semibold text-primary">
                  {review.customerName.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-inter font-medium text-text-primary">
                      {review.customerName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="font-inter text-sm text-text-secondary">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-lg">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="font-inter text-xs text-success">
                        Проверено
                      </span>
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <p className="font-inter text-text-secondary leading-relaxed mb-3">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.images.map((image, index) => (
                      <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Фото от ${review.customerName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Purchase Info */}
                {review.purchaseInfo && (
                  <div className="bg-surface rounded-lg p-3 mb-3">
                    <p className="font-inter text-xs text-text-secondary">
                      <strong>Заказ:</strong> {review.purchaseInfo.productVariant} • 
                      <strong> Размер:</strong> {review.purchaseInfo.size} • 
                      <strong> Дата покупки:</strong> {formatDate(review.purchaseInfo.purchaseDate)}
                    </p>
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-botanical">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="font-inter text-sm">
                      Полезно ({review.helpfulCount})
                    </span>
                  </button>
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-botanical">
                    <Icon name="MessageCircle" size={14} />
                    <span className="font-inter text-sm">Ответить</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Скрыть отзывы' : `Показать все ${reviews.length} отзывов`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;