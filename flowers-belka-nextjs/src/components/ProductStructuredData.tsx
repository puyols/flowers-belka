'use client';

import { useEffect } from 'react';

interface ProductStructuredDataProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    slug: string;
    tags: string[];
    inStock?: boolean;
    sku?: string;
    brand?: string;
  };
}

const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({ product }) => {
  useEffect(() => {
    const productStructuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": [product.image],
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Belka Flowers"
      },
      "category": product.category,
      "sku": product.sku || `BF-${product.slug}`,
      "url": `https://flowers-belka.ru/${product.category}/${product.slug}`,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "RUB",
        "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Belka Flowers",
          "url": "https://flowers-belka.ru"
        },
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "RUB"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "RU",
            "addressRegion": "Московская область"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 2,
              "unitCode": "HUR"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "HUR"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Анна П."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Прекрасные цветы, свежие и красивые. Доставка быстрая, упаковка качественная."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Михаил С."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Заказывал букет для жены, она была в восторге! Рекомендую."
        }
      ],
      "additionalProperty": product.tags.map(tag => ({
        "@type": "PropertyValue",
        "name": "Особенность",
        "value": tag
      })),
      "isRelatedTo": {
        "@type": "Service",
        "name": "Доставка цветов",
        "description": "Быстрая доставка цветов в Путилково и Москве",
        "provider": {
          "@type": "Organization",
          "name": "Belka Flowers"
        },
        "areaServed": [
          "Путилково",
          "Москва", 
          "Химки",
          "Красногорск",
          "Куркино",
          "Митино"
        ]
      }
    };

    // Создаем или обновляем script тег
    const existingScript = document.querySelector('script[data-structured-data="product"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(productStructuredData);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'product');
      script.textContent = JSON.stringify(productStructuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data="product"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [product]);

  return null;
};

export default ProductStructuredData;
