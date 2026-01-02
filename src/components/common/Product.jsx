import { IoStar } from "react-icons/io5";
import { domain } from "../../modules/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Product({ product, variant = "default", breadcrumbs = [] }) {
  const isShop = variant === "shop";

  const [priceAfterDiscount, setPriceAfterDiscount] = useState(null);
  const [discountAvailable, setDiscountAvailable] = useState(false);

  useEffect(() => {
    if (product?.discount) {
      setDiscountAvailable(true);
      setPriceAfterDiscount(product.price - (product.discount / 100) * product.price);
    } else {
      setDiscountAvailable(false);
    }
  }, [product]);

  return (
    <Link
      to={isShop ? `product/${product.documentId}` : `/shop/product/${product.documentId}`}
      state={{
        breadcrumbs: [
          ...breadcrumbs, 
          { label: product.name },
        ],
      }}
      className="product"
    >
      <div className="img-wrapper bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square flex items-center justify-center">
        <img className="w-full h-full object-cover" src={domain + product.mainImg.url} alt={product.name} />
      </div>

      <h1 className={`capitalize font-bold leading-[100%] truncate ${isShop ? "text-[16px] lg:text-[20px] mt-2.5 lg:mt-4" : "text-[20px] mt-4"}`}>{product.name}</h1>

      <div className={`evaluations flex gap-3 items-center ${isShop ? "mt-1 lg:mt-2" : "mt-2"}`}>
        <div className="stars flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStar key={i} className="text-[#FFC633] text-[18px]" />
          ))}
        </div>
        <span className="text-[14px]">5/5</span>
      </div>

      <div className={`pricing flex items-center gap-2.5 ${isShop ? "mt-1 lg:mt-2" : "mt-2"}`}>
        <div className={`flex items-center ${isShop ? "gap-[5px] lg:gap-2.5" : "gap-2.5"}`}>
          <span className={`text-[#000000] font-bold ${isShop ? "text-[20px] lg:text-2xl" : "text-2xl"}`}>${discountAvailable ? priceAfterDiscount : product.price}</span>

          {discountAvailable && <span className={`text-[#00000066] font-bold line-through ${isShop ? "text-[20px] lg:text-2xl" : "text-2xl"}`}>${product.price}</span>}
        </div>

        {discountAvailable && (
          <div className={`discount bg-[#FF33331A] py-2 ${isShop ? "px-3 md:px-3.5" : "px-3.5"} rounded-full flex justify-center items-center`}>
            <span className={`text-[#FF3333] font-medium ${isShop ? "text-[11px] md:text-[12px]" : "text-[12px]"}`}>-{product.discount}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}
