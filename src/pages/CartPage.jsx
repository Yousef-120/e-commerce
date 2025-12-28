import { useEffect, useState } from "react";
import CartProducts from "../components/cart/CartProducts";
import OrderSummary from "../components/cart/OrderSummary";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { useStore } from "../modules/shop/store/useStore";
import Loader from "../components/ui/Loader";

export default function CartPage() {
  const { cart } = useStore();
  const [loading, setLoading] = useState(false);
  const [ cartEmpty , setCartEmpty ] = useState()

  useEffect(() => {
    setLoading(true);
    cart.length !== 0 && setCartEmpty(false)
    setTimeout(() => {
      cart.length == 0 && setCartEmpty(true)
      setLoading(false);
    }, [1000]);
  }, [cart]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="container">
          <h3 className="font-bold text-[32px] lg:text-[40px] integral-font mb-6">Your Cart {cartEmpty && <span className="text-red-500 text-[22px] lg:text-3xl">Is Empty</span>}</h3>
          {loading ? (
            <div className="flex justify-center items-center mt-16 mb-40">
              <Loader />
            </div>
          ) : (
            <div className={`content flex gap-5 flex-col lg:flex-row mb-40 items-start`}>
              <CartProducts />
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
