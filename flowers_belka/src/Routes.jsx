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

// Universal components (наши доработки)
import UniversalCategoryPage from "pages/UniversalCategoryPage";
import UniversalProductPage from "pages/UniversalProductPage";
import NewsPage from "pages/NewsPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Главная страница */}
          <Route path="/" element={<Homepage />} />

          {/* Категории товаров с универсальными компонентами */}
          <Route path="/bukety_tsvetov" element={<UniversalCategoryPage category="bukety_tsvetov" />} />
          <Route path="/rozy" element={<UniversalCategoryPage category="rozy" />} />
          <Route path="/tsvety_v_korobke" element={<UniversalCategoryPage category="tsvety_v_korobke" />} />
          <Route path="/tulpany" element={<UniversalCategoryPage category="tulpany" />} />
          <Route path="/khrizantemy" element={<UniversalCategoryPage category="khrizantemy" />} />
          <Route path="/gerbery" element={<UniversalCategoryPage category="gerbery" />} />
          <Route path="/lilii" element={<UniversalCategoryPage category="lilii" />} />
          <Route path="/irisy" element={<UniversalCategoryPage category="irisy" />} />
          <Route path="/piony" element={<UniversalCategoryPage category="piony" />} />
          <Route path="/svezhie_tsvety" element={<UniversalCategoryPage category="svezhie_tsvety" />} />
          <Route path="/sukhotsvety" element={<UniversalCategoryPage category="sukhotsvety" />} />

          {/* Подкатегории роз */}
          <Route path="/rozy/beliye_rozy" element={<UniversalCategoryPage category="rozy" subcategory="beliye_rozy" />} />
          <Route path="/rozy/krasnye_rozy" element={<UniversalCategoryPage category="rozy" subcategory="krasnye_rozy" />} />
          <Route path="/rozy/rozovye_rozy" element={<UniversalCategoryPage category="rozy" subcategory="rozovye_rozy" />} />

          {/* Товары с универсальным компонентом */}
          <Route path="/product/:slug" element={<UniversalProductPage />} />

          {/* Новости */}
          <Route path="/novosti" element={<NewsPage />} />
          <Route path="/novosti/:slug" element={<NewsPage />} />

          {/* Информационные страницы */}
          <Route path="/o_nas" element={<AboutStory />} />
          <Route path="/dostavka" element={<UniversalCategoryPage category="dostavka" />} />
          <Route path="/pravila_i_usloviya" element={<UniversalCategoryPage category="pravila_i_usloviya" />} />

          {/* Остальные страницы */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/product-collection" element={<ProductCollection />} />
          <Route path="/checkout-delivery" element={<CheckoutDelivery />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/custom-design-studio" element={<CustomDesignStudio />} />
          <Route path="/about-story" element={<AboutStory />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
