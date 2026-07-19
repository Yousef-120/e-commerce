import { FiMinus, FiPlus } from "react-icons/fi";
import { useStore } from "../../modules/shop/store/useStore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../../modules/shop/store/useUserStore";
import { decreaseQty, increaseQty } from "../../modules/shop";

export default function QtySelector({
  className,
  iconSize,
  selectedQty,
  setSelectedQty,
  product,
}) {
  const location = useLocation();
  const { user, token } = useUserStore();
  const [updatingQty, setUpdatingQty] = useState(false);
  const { cart, updateCartQty } = useStore();

  const isCartPage = location.pathname === "/cart";
  const displayedQty = isCartPage ? product.qty : selectedQty;

  const addedToCart =
    !isCartPage && cart.some((item) => item.documentId === product.documentId);

  const maxQty = product.stock ?? 1;

  const isMinusDisabled = addedToCart || displayedQty <= 1 || updatingQty;

  const isPlusDisabled = addedToCart || displayedQty >= maxQty || updatingQty;

  const handleUpdateQty = async (change) => {
    if (updatingQty) return;

    if (!isCartPage) {
      setSelectedQty((prev) => Math.min(maxQty, Math.max(1, prev + change)));
      return;
    }

    const newQty = product.qty + change;

    if (newQty > maxQty || newQty < 1) return;

    setUpdatingQty(true);

    try {
      const action = change > 0 ? increaseQty : decreaseQty;

      await action({
        userId: user.id,
        token,
        productId: product.documentId,
      });

      updateCartQty(product.documentId, newQty);
    } finally {
      setUpdatingQty(false);
    }
  };

  return (
    <div
      className={`qty-selector ${
        addedToCart && "opacity-50"
      } py-2.5 px-4 flex items-center sm:gap-[38px] bg-[#F0F0F0] rounded-full w-full sm:w-fit ${className}`}
    >
      {/* Minus Button */}
      <button
        disabled={isMinusDisabled}
        onClick={() => handleUpdateQty(-1)}
        className={`p-1.5 rounded-full transition-colors ${
          isMinusDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#e0e0e0]"
        }`}
      >
        <FiMinus size={iconSize || 26} />
      </button>

      {/* Quantity Display */}
      <div className="w-5 flex justify-center items-center select-none">
        <span className="font-bold text-[14px]">{displayedQty}</span>
      </div>

      {/* Plus Button */}
      <button
        disabled={isPlusDisabled}
        onClick={() => handleUpdateQty(1)}
        className={`p-1.5 rounded-full transition-colors ${
          isPlusDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#e0e0e0]"
        }`}
      >
        <FiPlus size={iconSize || 26} />
      </button>
    </div>
  );
}
