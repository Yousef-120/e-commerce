import { IoStar } from "react-icons/io5";
import { domain } from "../../modules/core/index";
import { Link } from "react-router-dom";

export default function Product({ product }) {

  return (
    <Link className="product" to={`/product/${product.documentId}`}>
      <div className={`img-wrapper bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square flex items-center justify-center`}>
        <img className={`w-full h-full object-cover`} src={domain + product.mainImg.url} alt="" />
      </div>
      <h1 className={`capitalize font-bold text-[20px] leading-[100%] tracking-normal mt-4 truncate`}>{product.name}</h1>

      <div className={`evaluations mt-2 flex gap-3 items-center`}>
        <div className="stars flex gap-2">
          <IoStar className="text-[#FFC633] text-[18px]" />
          <IoStar className="text-[#FFC633] text-[18px]" />
          <IoStar className="text-[#FFC633] text-[18px]" />
          <IoStar className="text-[#FFC633] text-[18px]" />
          <IoStar className="text-[#FFC633] text-[18px]" />
        </div>
        <div className="evaluation-text text-[14px]">
          <span>5/5</span>
        </div>
      </div>
      <div className={`pricing flex gap-2.5 mt-2 items-center`}>
        <span className={`final-price text-[#000000] text-2xl font-bold leading-[100%] tracking-normal`}>$120</span>
        <span className={`original-price text-[#00000066] text-2xl font-bold leading-[100%] tracking-normal`}>$260</span>
        <div className={`discount bg-[#FF33331A] py-1.5 px-3.5 rounded-full flex justify-center items-center`}>
          <span className={`text-[#FF3333] text-[12px] font-medium text-center`}>-20%</span>
        </div>
      </div>
    </Link>
  );
}
