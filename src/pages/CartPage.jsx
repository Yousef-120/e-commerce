import CartProducts from "../components/cart/CartProducts";
import OrderSummary from "../components/cart/OrderSummary";
import Breadcrumbs from "../components/common/Breadcrumbs";
export default function CartPage() {
  return (
    <div>
      <Breadcrumbs />
      <div className="flex justify-center">
        <div className="container">
          <h3 className="font-bold text-[40px] integral-font mb-6">Your Cart</h3>
          <div className="content flex gap-5 flex-col lg:flex-row mb-40">
            <CartProducts />
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
