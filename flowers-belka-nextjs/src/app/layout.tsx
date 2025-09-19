import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import StructuredData from "@/components/StructuredData";
import { getOrganizationData } from "@/utils/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Доставка цветов в Путилково - Belka Flowers | Свежие букеты и розы",
  description: "🌸 Доставка свежих цветов в Путилково и Москве. Букеты роз, тюльпаны, композиции в коробках. ⚡ Быстрая доставка за 2 часа. 💰 Доступные цены. ☎️ +7 (903) 734-98-44",
  keywords: "доставка цветов Путилково, букеты Путилково, розы доставка, цветы Москва, флористика, свежие цветы, букет на заказ",
  authors: [{ name: "Belka Flowers" }],
  creator: "Belka Flowers",
  publisher: "Belka Flowers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-192.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon-32x32.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Доставка цветов в Путилково - Belka Flowers | Свежие букеты и розы",
    description: "🌸 Доставка свежих цветов в Путилково и Москве. Букеты роз, тюльпаны, композиции в коробках. ⚡ Быстрая доставка за 2 часа. 💰 Доступные цены.",
    type: "website",
    locale: "ru_RU",
    url: "https://flowers-belka.ru",
    siteName: "Belka Flowers",
    images: [
      {
        url: 'https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png',
        width: 1200,
        height: 630,
        alt: 'Belka Flowers - Доставка цветов в Путилково'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@belka_flowers',
    creator: '@belka_flowers',
    title: "Доставка цветов в Путилково - Belka Flowers",
    description: "🌸 Доставка свежих цветов в Путилково и Москве. Букеты роз, тюльпаны, композиции в коробках.",
    images: ['https://flowers-belka.ru/image/cache/catalog/free_horizontal_on_white_by_logaster%20для%20инсты-312x205.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  classification: 'Flower delivery service',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://flowers-belka.ru',
    languages: {
      'ru': 'https://flowers-belka.ru',
      'x-default': 'https://flowers-belka.ru'
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code'
    }
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#d4145a',
    colorScheme: 'light',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationData = getOrganizationData();

  return (
    <html lang="ru" dir="ltr">
      <head>
        {/* Preconnect для улучшения производительности */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://flowers-belka.ru" />

        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//flowers-belka.ru" />

        {/* Дополнительные мета-теги */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="address=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Belka Flowers" />
        <meta name="application-name" content="Belka Flowers" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Геолокация */}
        <meta name="geo.region" content="RU-MOS" />
        <meta name="geo.placename" content="Путилково" />
        <meta name="geo.position" content="55.8094;37.0781" />
        <meta name="ICBM" content="55.8094, 37.0781" />

        {/* Бизнес информация */}
        <meta name="business:contact_data:street_address" content="143441, МО, Красногорский район, д. Путилково" />
        <meta name="business:contact_data:locality" content="Путилково" />
        <meta name="business:contact_data:region" content="Московская область" />
        <meta name="business:contact_data:postal_code" content="143441" />
        <meta name="business:contact_data:country_name" content="Россия" />
        <meta name="business:contact_data:phone_number" content="+7 (903) 734-98-44" />
        <meta name="business:contact_data:email" content="info@belka-flowers.ru" />

        {/* Часы работы */}
        <meta property="business:hours:day" content="monday,tuesday,wednesday,thursday,friday,saturday,sunday" />
        <meta property="business:hours:start" content="10:00" />
        <meta property="business:hours:end" content="22:00" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Structured Data для организации */}
        <StructuredData type="organization" data={organizationData} />
        <StructuredData type="local-business" data={organizationData} />
        <StructuredData type="website" data={{}} />

        <CartProvider>
          <Header />
          <main role="main" id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
