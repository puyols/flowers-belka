import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Original pages
import Homepage from "pages/homepage";
import ProductCollection from "pages/product-collection";
import CheckoutDelivery from "pages/checkout-delivery";
import ProductDetail from "pages/product-detail";
import CustomDesignStudio from "pages/custom-design-studio";
import AboutStory from "pages/about-story";
import NotFound from "pages/NotFound";
// New pages
import CategoryPage from "pages/CategoryPage";
import NewsPage from "pages/NewsPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Category routes - РЕАЛЬНЫЕ URL из sitemap */}
        <Route path="/bukety_tsvetov/*" element={<CategoryPage />} />
        <Route path="/rozy/*" element={<CategoryPage />} />
        <Route path="/tulpany/*" element={<CategoryPage />} />
        <Route path="/tsvety_v_korobke/*" element={<CategoryPage />} />
        <Route path="/piony/*" element={<CategoryPage />} />
        <Route path="/sukhotsvety/*" element={<CategoryPage />} />
        <Route path="/noviygod/*" element={<CategoryPage />} />
        <Route path="/8marta/*" element={<CategoryPage />} />
        <Route path="/podpiska_na_cvety/*" element={<CategoryPage />} />
        <Route path="/novosti/" element={<NewsPage />} />
        <Route path="/novosti/:slug" element={<NewsPage />} />
        <Route path="/o_nas" element={<CategoryPage />} />
        <Route path="/dostavka" element={<CategoryPage />} />
        <Route path="/pravila_i_usloviya" element={<CategoryPage />} />

        {/* Main routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product-collection" element={<ProductCollection />} />
        <Route path="/checkout-delivery" element={<CheckoutDelivery />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/custom-design-studio" element={<CustomDesignStudio />} />
        <Route path="/about-story" element={<AboutStory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
