import { BiSolidTrash } from "react-icons/bi";
import QtySelector from "../common/QtySelector";
import { motion } from "framer-motion";
import { domain } from "../../modules/core/";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";

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
  
  useEffect(() => {
    getOptions();
  });
  
  return (
    <div className="product flex justify-between items-center text-[#000000] max-h-[124px] h-[124px]">
      <div className="flex gap-4">
        <div className="bg-[#F0EEED] aspect-square max-w-[124px] rounded-lg overflow-hidden">
          <img className="object-cover w-full h-full" src={domain + product.mainImg?.url} alt="" />
        </div>
        <div className="info">
          <h5 className="mb-0.5 font-bold text-[20px]">{product.name}</h5>
          <div className="flex flex-col mb-[15px] text-[14px]">
            <span>
              Size: <span className="text-[#00000099]">{size}</span>
            </span>
            <span>
              Color: <span className="text-[#00000099]">{color}</span>
            </span>
          </div>
          <div className="price font-bold text-[24px] text-[#000000]">${product.price}</div>
        </div>
      </div>
      <div className="actions flex flex-col justify-between items-end h-full">
        <motion.button onClick={() => removeFromCart(product)} whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 200 }} className="p-2 rounded-full">
          <BiSolidTrash color="#FF3333" size={24} />
        </motion.button>
        <QtySelector className={"gap-5! px-2!"} iconSize={20} selectedQty={qty} setSelectedQty={(newQty) => setSelectedProductOptions(product.documentId, "qty", newQty)} />
      </div>
    </div>
  );
}
