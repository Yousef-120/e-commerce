import CartProduct from "./CartProduct";
import { useStore } from "../../modules/shop/store/useStore";
import Line from "../ui/Line";

export default function CartProducts() {
  const { cart } = useStore();

  return (
    cart.length !== 0 && (
      <div className="flex flex-col border border-[#0000001A] p-3.5 lg:py-5 lg:px-6 rounded-[20px] w-full lg:w-[50%] lg:max-h-[700px] lg:overflow-y-auto ">
        {cart?.map((product, i) => (
          <div key={product.documentId}>
            <CartProduct product={product} />
            {i !== cart.length - 1 && <Line />}
          </div>
        ))}
      </div>
    )
  );
}
