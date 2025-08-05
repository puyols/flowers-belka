'use client';

import { useEffect } from 'react';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string;
  areaServed: string[];
  serviceType: string[];
}

interface ProductData {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  category: string;
  brand: string;
  sku?: string;
  url: string;
}

interface ArticleData {
  headline: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  publisher: {
    name: string;
    logo: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'article' | 'breadcrumb' | 'website' | 'local-business';
  data: OrganizationData | ProductData | ArticleData | BreadcrumbItem[] | any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  useEffect(() => {
    let structuredData: any = {};

    switch (type) {
      case 'organization':
        const orgData = data as OrganizationData;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": orgData.name,
          "url": orgData.url,
          "logo": orgData.logo,
          "description": orgData.description,
          "telephone": orgData.telephone,
          "email": orgData.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": orgData.address.streetAddress,
            "addressLocality": orgData.address.addressLocality,
            "addressRegion": orgData.address.addressRegion,
            "postalCode": orgData.address.postalCode,
            "addressCountry": orgData.address.addressCountry
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": orgData.geo.latitude,
            "longitude": orgData.geo.longitude
          },
          "openingHours": orgData.openingHours,
          "priceRange": orgData.priceRange,
          "paymentAccepted": orgData.paymentAccepted,
          "currenciesAccepted": orgData.currenciesAccepted,
          "areaServed": orgData.areaServed,
          "serviceType": orgData.serviceType,
          "sameAs": [
            "https://wa.me/79037349844",
            "https://t.me/belka_flowers"
          ]
        };
        break;

      case 'local-business':
        const businessData = data as OrganizationData;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": businessData.url,
          "name": businessData.name,
          "url": businessData.url,
          "logo": businessData.logo,
          "description": businessData.description,
          "telephone": businessData.telephone,
          "email": businessData.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": businessData.address.streetAddress,
            "addressLocality": businessData.address.addressLocality,
            "addressRegion": businessData.address.addressRegion,
            "postalCode": businessData.address.postalCode,
            "addressCountry": businessData.address.addressCountry
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": businessData.geo.latitude,
            "longitude": businessData.geo.longitude
          },
          "openingHours": businessData.openingHours,
          "priceRange": businessData.priceRange,
          "paymentAccepted": businessData.paymentAccepted,
          "currenciesAccepted": businessData.currenciesAccepted,
          "areaServed": businessData.areaServed,
          "serviceType": businessData.serviceType,
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Каталог цветов и букетов",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Букеты цветов",
                "url": `${businessData.url}/bukety_tsvetov`
              },
              {
                "@type": "OfferCatalog", 
                "name": "Розы",
                "url": `${businessData.url}/rozy`
              },
              {
                "@type": "OfferCatalog",
                "name": "Тюльпаны", 
                "url": `${businessData.url}/tulpany`
              },
              {
                "@type": "OfferCatalog",
                "name": "Цветы в коробке",
                "url": `${businessData.url}/tsvety_v_korobke`
              }
            ]
          },
          "sameAs": [
            "https://wa.me/79037349844",
            "https://t.me/belka_flowers"
          ]
        };
        break;

      case 'product':
        const productData = data as ProductData;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "description": productData.description,
          "image": productData.image,
          "brand": {
            "@type": "Brand",
            "name": productData.brand
          },
          "category": productData.category,
          "sku": productData.sku,
          "url": productData.url,
          "offers": {
            "@type": "Offer",
            "price": productData.price,
            "priceCurrency": productData.currency,
            "availability": `https://schema.org/${productData.availability}`,
            "seller": {
              "@type": "Organization",
              "name": "Belka Flowers",
              "url": "https://flowers-belka.ru"
            },
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        };
        break;

      case 'article':
        const articleData = data as ArticleData;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": articleData.headline,
          "description": articleData.description,
          "image": articleData.image,
          "author": {
            "@type": "Person",
            "name": articleData.author
          },
          "publisher": {
            "@type": "Organization",
            "name": articleData.publisher.name,
            "logo": {
              "@type": "ImageObject",
              "url": articleData.publisher.logo
            }
          },
          "datePublished": articleData.datePublished,
          "dateModified": articleData.dateModified,
          "url": articleData.url,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleData.url
          }
        };
        break;

      case 'breadcrumb':
        const breadcrumbData = data as BreadcrumbItem[];
        structuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbData.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
        break;

      case 'website':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Belka Flowers - Доставка цветов в Путилково",
          "url": "https://flowers-belka.ru",
          "description": "Доставка свежих цветов и букетов в Путилково. Розы, тюльпаны, композиции в коробках. Быстрая доставка, свежие цветы, доступные цены.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://flowers-belka.ru/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Belka Flowers",
            "url": "https://flowers-belka.ru"
          }
        };
        break;

      default:
        return;
    }

    // Создаем или обновляем script тег
    const existingScript = document.querySelector(`script[data-structured-data="${type}"]`);
    if (existingScript) {
      existingScript.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', type);
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector(`script[data-structured-data="${type}"]`);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [type, data]);

  return null;
};

export default StructuredData;
