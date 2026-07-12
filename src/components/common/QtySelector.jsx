import { FiMinus, FiPlus } from "react-icons/fi";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../../modules/shop/store/useUserStore";
import {
  decreaseQty,
  getProductInCartOptions,
  increaseQty,
  isProductInCart,
} from "../../modules/shop";
import { cartStore } from "../../modules/shop/store/cartStore";

export default function QtySelector({
  className,
  iconSize,
  selectedQty,
  setSelectedQty,
  product,
}) {
  const { selectedProductOptions } = useStore();
  const { cart, isInCart } = useStore();
  const { cartLength } = cartStore();
  const [addedToCart, setAddedToCart] = useState();
  const location = useLocation();
  const { user, token } = useUserStore();
  const [qtyFromApi, setQtyFromApi] = useState(null);
  const [updatingQty, setUpdatingQty] = useState(false);
  const refreshCart = cartStore((state) => state.refreshCart);

  const handleDecrease = async () => {
    if (updatingQty) return;
  
    if (location.pathname === "/cart") {
      if (qtyFromApi <= 1) return;
  
      setUpdatingQty(true);
  
      try {
        await decreaseQty({
          userId: user.id,
          token,
          productId: product.documentId,
        });
        const options = await handleGetProductInCartOptions();
        
        setQtyFromApi(options.qty);
        refreshCart();
      } finally {
        setUpdatingQty(false);
      }
  
      return;
    }
  
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const handleIncrease = async () => {
    if (updatingQty) return;
  
    if (location.pathname === "/cart") {
      if (qtyFromApi >= 10) return;
  
      setUpdatingQty(true);
  
      try {
        await increaseQty({
          userId: user.id,
          token,
          productId: product.documentId,
        });
  
        const options = await handleGetProductInCartOptions();
  
        setQtyFromApi(options.qty);
        refreshCart();
      } finally {
        setUpdatingQty(false);
      }
  
      return;
    }
  
    if (selectedQty < 10) {
      setSelectedQty(selectedQty + 1);
    }
  };

  const handleGetProductInCartOptions = async () => {
    const res = await getProductInCartOptions({
      token,
      productId: product.documentId,
    });
    return res;
  };

  useEffect(() => {
    const check = async () => {
      const inCart = await isProductInCart({
        token,
        userId: user?.id,
        productId: product.documentId,
      });
      setAddedToCart(inCart);
      if (inCart) {
        const options = await handleGetProductInCartOptions();
        setQtyFromApi(options?.qty || null);
      }
    };
    check();
  }, [product, cartLength]);

  useEffect(() => {
    console.log(addedToCart);
  }, [addedToCart]);

  return (
    <div
      className={`qty-selector ${addedToCart && location.pathname !== "/cart" && "opacity-50"} py-2.5 px-4 flex items-center sm:gap-[38px] bg-[#F0F0F0] rounded-full w-full sm:w-fit ${className}`}
    >
      {/* Minus Button */}
      <button
        disabled={addedToCart && location.pathname !== "/cart"}
        onClick={handleDecrease}
        className={`p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors ${addedToCart && location.pathname !== "/cart" && "pointer-events-none"}`}
      >
        <FiMinus size={iconSize || 26} />
      </button>

      {/* Quantity Display */}
      <div className="w-5 flex justify-center items-center select-none">
        {addedToCart || location.pathname === "/cart" ? (
          <span className="font-bold text-[14px]">{qtyFromApi}</span>
        ) : (
          <span className="font-bold text-[14px]">{selectedQty}</span>
        )}
      </div>

      {/* Plus Button */}
      <button
        disabled={addedToCart && location.pathname !== "/cart"}
        onClick={handleIncrease}
        className={`p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors ${addedToCart && location.pathname !== "/cart" && "pointer-events-none"}`}
      >
        <FiPlus size={iconSize || 26} />
      </button>
    </div>
  );
}
