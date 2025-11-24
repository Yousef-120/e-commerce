import { IoStar } from "react-icons/io5";
import { domain } from "../../modules/core/index";
import { Link } from "react-router-dom";

export default function ShopProduct({ product }) {
  return (
    <Link className="product" to={`/product/${product.documentId}`}>
      <div className="img-wrapper bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square flex items-center justify-center">
        <img className="w-full h-full object-cover" src={domain + product.mainImg.url} alt="" />
      </div>

      <h1 className="capitalize font-bold text-[16px] lg:text-[20px] leading-[100%] mt-2.5 lg:mt-4 truncate">{product.name}</h1>

      <div className="evaluations mt-1 lg:mt-2 flex gap-3 items-center">
        <div className="stars flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStar key={i} className="text-[#FFC633] text-[18px]" />
          ))}
        </div>
        <div className="evaluation-text text-[14px]">
          <span>5/5</span>
        </div>
      </div>

      <div className="pricing flex gap-[5px] lg:gap-2.5 mt-1 lg:mt-2 items-center">
        <span className="final-price text-[#000000] text-[20px] lg:text-2xl font-bold">${product.finalPrice}</span>
        <span className="original-price text-[#00000066] text-[20px] lg:text-2xl font-bold">${product.originalPrice}</span>

        <div className="discount bg-[#FF33331A] py-1.5 px-3.5 rounded-full flex justify-center items-center">
          <span className="text-[#FF3333] text-[10px] lg:text-[12px] font-medium">-{product.discount}%</span>
        </div>
      </div>
    </Link>
  );
}
