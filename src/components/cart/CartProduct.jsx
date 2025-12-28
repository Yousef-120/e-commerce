import { BiSolidTrash } from "react-icons/bi";
import QtySelector from "../common/QtySelector";
import { motion } from "framer-motion";
import { domain } from "../../modules/core/";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <Link to={`product/${product.documentId}`} className="product flex justify-between text-[#000000]">
      <div className="flex items-center gap-4 w-full">
        <div className="bg-[#F0EEED] aspect-square max-w-[136px] rounded-lg overflow-hidden">
          <img className="object-cover w-full h-full" src={domain + product.mainImg?.url} alt="" />
        </div>
        <div className="info flex justify-between w-full">
          <div className="content w-full">
            <div className="flex justify-between mb-0.5 w-full">
              <h5 className="font-bold text-[16px] lg:text-[20px] truncate w-50">{product.name}</h5>
              <motion.button onClick={() => removeFromCart(product)} whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 200 }} className="px-2 rounded-full">
                <BiSolidTrash color="#FF3333" size={24} />
              </motion.button>
            </div>
            <div className="flex flex-col mb-2.5 text-[14px]">
              <span>
                Size: <span className="text-[#00000099]">{size}</span>
              </span>
              <span>
                Color: <span className="text-[#00000099]">{color}</span>
              </span>
            </div>
            <div className="flex justify-between w-full">
              <div className="price font-bold text-[24px] text-[#000000]">${product.price}</div>
              <QtySelector className={"gap-2.5 lg:gap-5! px-2! py-1! lg:py-2.5! w-fit!"} iconSize={20} selectedQty={qty} setSelectedQty={(newQty) => setSelectedProductOptions(product.documentId, "qty", newQty)} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
