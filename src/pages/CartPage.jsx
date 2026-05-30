import { useEffect, useState } from "react";
import CartProducts from "../components/cart/CartProducts";
import OrderSummary from "../components/cart/OrderSummary";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { useStore } from "../modules/shop/store/useStore";
import Loader from "../components/ui/Loader";
import { getPromoCodes } from "../modules/shop";
import { useUserStore } from "../modules/shop/store/useUserStore";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setCartEmpty(cart.length === 0);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // ✅ مهم
  }, [cart]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="container">
          <h3 className="font-bold text-[32px] lg:text-[40px] integral-font mb-6">
            Your Cart{" "}
            {cartEmpty && (
              <span className="text-red-500 text-[22px] lg:text-3xl">
                Is Empty
              </span>
            )}
          </h3>
          {loading ? (
            <div className="flex justify-center items-center mt-16 mb-40">
              <Loader />
            </div>
          ) : (
            <div
              className={`content flex gap-5 flex-col lg:flex-row mb-40 items-start`}
            >
              <CartProducts />
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
