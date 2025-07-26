import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import YandexReviews from './components/YandexReviews';
import BotanicalTips from './components/BotanicalTips';
import FAQ from './components/FAQ';
import LatestNews from './components/LatestNews';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <HeroSection />
        <CategoryGrid />
        <YandexReviews />
        <BotanicalTips />
        <FAQ />
        <LatestNews />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;