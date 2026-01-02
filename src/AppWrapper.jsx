import { useEffect } from "react";
import { useUserStore } from "./modules/shop/store/useUserStore";
import { useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import { tags } from "./modules/core";

export default function AppWrapper() {
  const { checkTokenServer } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const valid = await checkTokenServer();
        if (!valid) {
          navigate("/signIn");
        }
      }

      const userLogged = sessionStorage.getItem("userLogged");
      const userSignedUp = sessionStorage.getItem("userSignedUp");

      if (userLogged || userSignedUp) {
        sessionStorage.removeItem("userSignedUp");
        sessionStorage.removeItem("userLogged");
      }
    };

    verifyUser();
  }, [checkTokenServer, navigate]);

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
