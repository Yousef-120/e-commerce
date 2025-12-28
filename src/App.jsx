import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import ScrollToTop from "./components/common/ScrollToTop";
import CartPage from "./pages/CartPage";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* Shop */}
          <Route path="/shop">
            <Route index element={<ShopPage />} />
          </Route>
          {/* Cart */}
          <Route path="/cart">
            <Route index element={<CartPage />} />
          </Route>
        </Route>
        {/* Error 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
