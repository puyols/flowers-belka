'use client';

import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
  useEffect(() => {
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Создаем или обновляем script тег
    const existingScript = document.querySelector('script[data-structured-data="faq"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(faqStructuredData);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'faq');
      script.textContent = JSON.stringify(faqStructuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data="faq"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [faqs]);

  return null;
};

export default FAQStructuredData;
