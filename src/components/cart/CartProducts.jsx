import CartProduct from "./CartProduct";
import { useStore } from "../../modules/shop/store/useStore";
import Line from "../ui/Line";

export default function CartProducts() {
  const { cart } = useStore();

  return (
    <div className="flex flex-col border border-[#0000001A] py-5 px-6 rounded-[20px] max-w-[715px] w-full">
      {cart?.map((product, i) => (
        <div key={product.documentId}>
          <CartProduct product={product} />
          {i !== cart.length - 1 && <Line />}
        </div>
      ))}
    </div>
  );
}
