import { BiSolidTrash } from "react-icons/bi";
import QtySelector from "../common/QtySelector";
import { motion } from "framer-motion";
import { domain } from "../../modules/core/";

export default function CartProduct({ product }) {

  return (
    <div className="product flex justify-between items-center text-[#000000] max-h-[124px] h-full">
      <div className="flex gap-4">
        <div className="bg-[#F0EEED] aspect-square max-w-[124px] rounded-lg overflow-hidden">
          <img className="object-cover w-full h-full" src={domain + product.mainImg?.url} alt="" />
        </div>
        <div className="info">
          <h5 className="mb-0.5 font-bold text-[20px]">{product.name}</h5>
          <div className="flex flex-col mb-[15px] text-[14px]">
            <span>
              Size: <span className="text-[#00000099]">Large</span>
            </span>
            <span>
              Color: <span className="text-[#00000099]">White</span>
            </span>
          </div>
          <div className="price font-bold text-[24px] text-[#000000]">$145</div>
        </div>
      </div>
      <div className="actions flex flex-col justify-between items-end h-full">
        <motion.button whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 200 }} className="p-2 rounded-full">
          <BiSolidTrash color="#FF3333" size={24} />
        </motion.button>
        <QtySelector className={"gap-5! px-2!"} iconSize={20} />
      </div>
    </div>
  );
}
