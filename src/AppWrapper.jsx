import { useEffect } from "react";
import { useUserStore } from "./modules/shop/store/useUserStore";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import PageNotFound from "./pages/PageNotFound";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import TopSellingPage from "./pages/TopSellingPage";
import OnSalePage from "./pages/OnSalePage";
import Brands from "./pages/Brands";
import ScrollToTop from "./components/common/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import { tags } from "./modules/core";
import useCheckAuth from "./modules/core/components/useCheckAuth";

export default function AppWrapper() {
  useCheckAuth()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* Shop */}
          <Route path="/shop">
            <Route index element={<ShopPage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* New Arrivals */}
          <Route path="/newArrivals" element={<NewArrivalsPage tag={tags.find((tag) => tag.name == "New Arrivals")} />} />

          {/* On Sale */}
          <Route path="/onSale" element={<OnSalePage tag={tags.find((tag) => tag.name == "On Sale")} />} />

          {/* Top Selling */}
          <Route path="/topSelling" element={<TopSellingPage tag={tags.find((tag) => tag.name == "Top Selling")} />} />

          {/* Brands */}
          <Route path="/brands" element={<Brands />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
