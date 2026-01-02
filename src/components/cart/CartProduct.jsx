import { BiSolidTrash } from "react-icons/bi";
import QtySelector from "../common/QtySelector";
import { motion } from "framer-motion";
import { domain } from "../../modules/core/";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CartProduct({ product }) {
  const { cart, removeFromCart } = useStore();
  const { selectedProductOptions, setSelectedProductOptions } = useStore();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [qty, setQty] = useState();

  const getOptions = () => {
    const productOptions = selectedProductOptions.find((productOptions) => productOptions.productId === product.documentId);
    if (productOptions) {
      setColor(productOptions.color);
      setSize(productOptions.size);
      setQty(productOptions.qty);
    }
  };
  const handleRemoveFromCart = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this product from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Removing product from cart...");

        setTimeout(() => {
          removeFromCart(product);
          toast.update(toastId, {
            render: "Product removed from cart successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }, 1000);
      }
    });
  };
  useEffect(() => {
    getOptions();
  });

  return (
    <div className="product flex justify-between text-[#000000]">
      <div className="flex items-center gap-4 w-full">
        <Link to={`/shop/product/${product.documentId}`} className="bg-[#F0EEED] aspect-square max-w-[136px] rounded-lg overflow-hidden">
          <img className="object-cover w-full h-full" src={domain + product.mainImg?.url} alt="" />
        </Link>
        <div className="info flex justify-between w-full">
          <div className="content w-full">
            <div className="flex justify-between mb-0.5 w-full">
              <Link to={`/shop/product/${product.documentId}`} className="font-bold text-[16px] lg:text-[20px] truncate w-50">
                {product.name}
              </Link>
              <motion.button onClick={() => handleRemoveFromCart(product)} whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 200 }} className="px-2 rounded-full">
                <BiSolidTrash color="#FF3333" size={24} />
              </motion.button>
            </div>
            <Link to={`/shop/product/${product.documentId}`} className="flex flex-col mb-2.5 text-[14px]">
              <span>
                Size: <span className="text-[#00000099]">{size}</span>
              </span>
              <span>
                Color: <span className="text-[#00000099]">{color}</span>
              </span>
            </Link>
            <Link to={`/shop/product/${product.documentId}`} className="flex justify-between w-full">
              <div className="price font-bold text-[24px] text-[#000000]">${product.price}</div>
              <QtySelector
                className={"gap-2.5 lg:gap-5! px-2! py-1! lg:py-2.5! w-fit!"}
                iconSize={20}
                selectedQty={qty}
                setSelectedQty={(newQty) => setSelectedProductOptions(product.documentId, "qty", newQty)}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
