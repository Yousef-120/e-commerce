import { FiMinus, FiPlus } from "react-icons/fi";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function QtySelector({ className, iconSize, selectedQty, setSelectedQty, product }) {
  const { selectedProductOptions } = useStore();
  const { cart, isInCart } = useStore();
  const [addedToCart, setAddedToCart] = useState();
  const location = useLocation()

  const handleDecrease = () => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const handleIncrease = () => {
    if (selectedQty < 10) {
      setSelectedQty(selectedQty + 1);
    }
  };

  useEffect(() => {
    location.pathname !== '/cart' && isInCart(product.documentId) ? setAddedToCart(true) : setAddedToCart(false);
  }, [cart]);

  return (
    <div className={`qty-selector ${addedToCart && "opacity-50"} py-2.5 px-4 flex items-center sm:gap-[38px] bg-[#F0F0F0] rounded-full w-full sm:w-fit ${className}`}>
      {/* Minus Button */}
      <button disabled={addedToCart} onClick={handleDecrease} className={`p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors ${addedToCart && "pointer-events-none"}`}>
        <FiMinus size={iconSize || 26} />
      </button>

      {/* Quantity Display */}
      <div className="w-5 flex justify-center items-center select-none">
        <span className="font-bold text-[14px">{selectedQty}</span>
      </div>

      {/* Plus Button */}
      <button disabled={addedToCart} onClick={handleIncrease} className={`p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors ${addedToCart && "pointer-events-none"}`}>
        <FiPlus size={iconSize || 26} />
      </button>
    </div>
  );
}
