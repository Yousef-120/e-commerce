import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { addToCartApi } from "../../../../modules/shop";
import { useStore } from "../../../../modules/shop/store/useStore";
import { useUserStore } from "../../../../modules/shop/store/useUserStore";

export default function useProductDetails(product) {
  const { cart, setSelectedProductOptions } = useStore();
  const { user, token } = useUserStore();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);

  const hasDiscount = !!product?.discount;

  const inCart = useMemo(
    () => cart.some((item) => item.documentId === product?.documentId),
    [cart, product?.documentId]
  );

  const finalPrice = useMemo(() => {
    if (!product) return 0;

    return product.price - (product.price * (product.discount || 0)) / 100;
  }, [product]);

  useEffect(() => {
    if (!product) return;

    setSelectedColor("");
    setSelectedSize("");
    setSelectedQty(1);
  }, [product?.documentId]);

  const handleAddToCart = async () => {
    if (inCart) return;
  
    const isValidSelection = selectedColor && selectedSize;
  
    if (!isValidSelection) {
      toast.warn("You must complete product information order");
      return;
    }
  
    setBtnLoading(true);
  
    const toastId = toast.loading("Adding product to cart...");
  
    try {
      await addToCartApi({
        token,
        userId: user?.id,
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        qty: selectedQty,
      });
  
      setSelectedProductOptions(product.documentId, "color", selectedColor);
      setSelectedProductOptions(product.documentId, "size", selectedSize);
      setSelectedProductOptions(product.documentId, "qty", selectedQty);
  
      setSelectedQty(1);
  
      toast.update(toastId, {
        render: "Added to cart successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
  
      toast.update(toastId, {
        render: "Failed to add to cart",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return {
  selectedColor,
  setSelectedColor,

  selectedSize,
  setSelectedSize,

  selectedQty,
  setSelectedQty,

  btnLoading,

  hasDiscount,
  finalPrice,
  inCart,

  handleAddToCart,
};
}