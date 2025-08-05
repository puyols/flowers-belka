import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Доставка цветов в Путилково ✔ заказать и купить букет цветов курьером на дом",
  description: "Доставка свежих цветов и букетов в Путилково и соседние районы. Широкий ассортимент, быстрая доставка, гарантия качества. Заказывайте онлайн или по телефону +7 (903) 734-98-44",
  keywords: "доставка цветов, букеты, Путилково, розы, тюльпаны, композиции, флористика",
  openGraph: {
    title: "Flowers Belka - Доставка цветов в Путилково",
    description: "Свежие цветы и букеты с доставкой в Путилково",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
