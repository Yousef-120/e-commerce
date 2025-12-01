import Line from "../ui/Line";
import { MdOutlineDiscount } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrderSummary() {
  const { cart, selectedProductOptions } = useStore();
  const [subTotal, setSubTotal] = useState(0);
  const [discountRate] = useState(30);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee] = useState(15);

  useEffect(() => {
    if (cart && cart.length !== 0) {
      const subTotalCalc = cart.reduce((total, product) => {
        const option = selectedProductOptions.find((opt) => opt.productId === product.documentId);

        const qty = option?.qty || 1;

        return total + product.price * qty;
      }, 0);

      const discountValue = Math.round((discountRate / 100) * subTotalCalc);
      const totalValue = subTotalCalc - discountValue + deliveryFee;

      setSubTotal(subTotalCalc);
      setDiscount(discountValue);
      setTotal(totalValue);
    }
  }, [cart, discountRate, selectedProductOptions]);

  return (
    cart.length > 0 && (
      <div className="w-full lg:w-[50%] border border-[#0000001A] rounded-[20px] py-5 px-6 text-[#000000]">
        <h4 className="font-bold text-[24px]">Order Summary</h4>
        {/* Summary Details */}
        <div className="details mt-6 text-[18px] leading-[100%] mb-6">
          <ul className="list-none flex flex-col gap-5">
            <li className="flex justify-between items-center">
              <span className="text-[#00000099]">Subtotal</span>
              <span className="font-bold">${subTotal}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-[#00000099]">Discount (-{discountRate}%)</span>
              <span className="font-bold text-[#FF3333]">-${discount}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-[#00000099]">Delivery Fee</span>
              <span className="font-bold">${deliveryFee}</span>
            </li>
          </ul>
          <Line className={"my-5!"} />
          <div className="flex justify-between items-center">
            <span className="">Total</span>
            <span className="font-bold">${total}</span>
          </div>
        </div>
        {/* Promo Code  */}
        <div className="flex gap-3 w-full mb-6">
          <div className="relative w-[80%]">
            <MdOutlineDiscount size={22} className="absolute left-4 top-1/2 translate-y-[-50%] text-[#00000066]" />
            <input placeholder="Add promo code" className="rounded-full bg-[#F0F0F0] py-3.5 px-12 placeholder:text-[#00000066] w-full outline-gray-700" type="text" />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.8,
            }}
            className="rounded-full bg-[#000000] py-3 px-4 font-medium text-[16px] leading-[100%] text-[#FFFFFF] w-[20%]"
          >
            Apply
          </motion.button>
        </div>
        {/* Checkout */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
          className="w-full bg-[#000000] py-6 px-3 text-[#FFFFFF] leading-[100%] flex justify-center gap-3 rounded-full cursor-pointer"
        >
          <span className="font-bold">Go to Checkout</span>
          <FaArrowRight />
        </motion.button>
      </div>
    )
  );
}
