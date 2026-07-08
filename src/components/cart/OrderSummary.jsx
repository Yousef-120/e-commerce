import Line from "../ui/Line";
import { MdOutlineDiscount } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../../modules/shop/store/useUserStore";
import {
  applyPromoCode,
  deleteAppliedPromoCode,
  getAppliedPromoCode,
  getCart,
  getPromoCodes,
} from "../../modules/shop";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const { cart, selectedProductOptions } = useStore();
  const [subTotal, setSubTotal] = useState(0);
  const [discountRate, setDiscountRate] = useState(3);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(15);
  const { token, user } = useUserStore();
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [pCodeApplied, setPcodeApplied] = useState(false);

  const handlePCodeRef = async () => {
    try {
      const cart = await getCart({ token, userId: user?.id });

      if (cart.length < 2) {
        toast.error("At least 2 products are required to apply a promo code.");
        return;
      }

      if (promoCodeValue.trim() !== "") {
        handlePromoCode(promoCodeValue.trim());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePromoCode = async (promoCodeName) => {
    try {
      const promoCodes = await getPromoCodes({ token });

      const promoCodeInfo = promoCodes.find(
        (pCode) => promoCodeName === pCode.name,
      );

      if (promoCodeInfo === undefined) {
        toast.error("Promo Code Not True");
        return;
      }
      if (promoCodeInfo.discount <= discountRate) {
        toast.warning(
          "Your available discount is better than promo code discount!",
        );
        return;
      }

      console.log(promoCodeInfo.discount + "%");
      setPcodeApplied(true);
      setDiscountRate(promoCodeInfo.discount);
      setPromoCodeValue(promoCodeInfo.name);
      await applyPromoCode({
        token,
        userId: user.id,
        promoCodeId: promoCodeInfo.id,
      });
      toast.success("Promo code applied successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAppliedPromoCode = async () => {
    const applied = await getAppliedPromoCode({ token, userId: user.id });

    if (applied.length > 0) {
      const promoDocumentId = applied[0].documentId;
      const res = await deleteAppliedPromoCode({ token, promoDocumentId });
      setPcodeApplied(false);
      setDiscountRate(3);
      setPromoCodeValue("");
    }
  };

  useEffect(() => {
    if (cart && cart.length !== 0) {
      const subTotalCalc = cart.reduce((total, product) => {
        const option = selectedProductOptions.find(
          (opt) => opt.productId === product.documentId,
        );

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

  useEffect(() => {
    if (cart.length < 2 && pCodeApplied && token && user) {
      handleDeleteAppliedPromoCode();
      if (cart.length === 1) {
        toast.warning(
          "The promo code has been removed because your cart must contain at least two items.",
        );
      }
      console.log("Deleted");
    }
  }, [cart, pCodeApplied, token, user]);

  useEffect(() => {
    const loadPromo = async () => {
      const applied = await getAppliedPromoCode({ token, userId: user.id });
      console.log(applied);

      if (cart.length !== 0 && applied.length > 0) {
        const promo = applied[0].promoCode;
        setPcodeApplied(true);
        setDiscountRate(promo.discount);
        setPromoCodeValue(promo.name);
      }
    };

    if (token && user) {
      loadPromo();
      console.log("loaded");
    }
  }, [token, user, cart]);

  // useEffect(() => {
  //   if (pCodeApplied) {
  //     if (discountRate) {

  //     }
  //     setDiscountRate(50);
  //   }
  // }, [pCodeApplied]);

  return (
    cart.length > 0 && (
      <div className="w-full lg:w-[50%] border border-[#0000001A] rounded-[20px] py-5 px-6 text-[#000000]">
        <h4 className="font-bold text-[24px]">Order Summary</h4>
        {/* Summary Details */}
        <div className="details mt-6 text-[18px] leading-[100%] mb-6">
          <ul className="list-none flex flex-col gap-5">
            <li className="flex justify-between items-center">
              <span className="text-[#00000099] text-[16px] lg:text-[20px]">
                Subtotal
              </span>
              <span className="font-bold text-[16px] lg:text-[20px]">
                ${subTotal}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-[#00000099] text-[16px] lg:text-[20px]">
                Discount (-{discountRate}%)
              </span>
              <span className="font-bold text-[16px] lg:text-[20px] text-[#FF3333]">
                -${discount}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-[#00000099] text-[16px] lg:text-[20px]">
                Delivery Fee
              </span>
              <span className="font-bold text-[16px] lg:text-[20px]">
                ${deliveryFee}
              </span>
            </li>
          </ul>
          <Line className={"my-5!"} />
          <div className="flex justify-between items-center">
            <span className="text-[20px] lg:text-2xl">Total</span>
            <span className="font-bold text-[16px] lg:text-[20px]">
              ${total}
            </span>
          </div>
        </div>
        {/* Promo Code  */}
        <div className="flex gap-3 w-full mb-6">
          <div className="relative w-[70%] lg:w-[80%]">
            <MdOutlineDiscount
              size={22}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                pCodeApplied ? "text-green-600" : "text-[#00000066]"
              }`}
            />

            <input
              type="text"
              value={promoCodeValue}
              onChange={(e) => setPromoCodeValue(e.target.value)}
              placeholder="Add promo code"
              disabled={pCodeApplied}
              className={`
      w-full rounded-full py-3.5 px-12
      outline-gray-700
      bg-[#F0F0F0]
      placeholder:text-[#00000066]

      disabled:bg-[#E5E5E5]
      disabled:text-[#666666]
      disabled:pointer-events-none
      disabled:outline-none
      ${pCodeApplied && "select-none"}
    `}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePCodeRef}
            disabled={pCodeApplied}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.8,
            }}
            className={`disabled:bg-black/80 disabled:pointer-events-none disabled:text-white/60 rounded-full bg-[#000000] py-3 px-4 font-medium text-[16px] leading-[100%] text-[#FFFFFF] w-[30%] lg:w-[20%]`}
          >
            {pCodeApplied ? "Applied" : "Apply"}
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
