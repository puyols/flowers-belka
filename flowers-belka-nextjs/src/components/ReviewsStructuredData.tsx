'use client';

import { useEffect } from 'react';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsStructuredDataProps {
  reviews: Review[];
  businessName: string;
  businessUrl: string;
}

const ReviewsStructuredData: React.FC<ReviewsStructuredDataProps> = ({ 
  reviews, 
  businessName, 
  businessUrl 
}) => {
  useEffect(() => {
    // Вычисляем средний рейтинг
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    const reviewsStructuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessName,
      "url": businessUrl,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        "reviewBody": review.text,
        "datePublished": review.date
      }))
    };

    // Создаем или обновляем script тег
    const existingScript = document.querySelector('script[data-structured-data="reviews"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(reviewsStructuredData);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'reviews');
      script.textContent = JSON.stringify(reviewsStructuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data="reviews"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [reviews, businessName, businessUrl]);

  return null;
};

export default ReviewsStructuredData;
