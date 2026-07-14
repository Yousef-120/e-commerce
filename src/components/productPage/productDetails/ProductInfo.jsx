import { IoStar } from "react-icons/io5";

export default function ProductInfo({
  product,
  finalPrice,
  hasDiscount,
}) {
  const stars = 5;

  return (
    <div className="info text-[#000000]">
      <h1 className="font-bold integral-font text-[32px] sm:text-[40px] leading-[100%] tracking-normal mb-3.5">
        {product.name}
      </h1>

      <div className="stars flex gap-2 mb-3.5">
        {[...Array(stars)].map((_, i) => (
          <IoStar key={i} color="#FFC633" size={20} />
        ))}
      </div>

      <div className="pricing flex flex-wrap gap-3 items-center mb-5">
        <span className="font-bold text-[28px] sm:text-[32px]">
          ${hasDiscount ? finalPrice : product.price}
        </span>

        {hasDiscount && (
          <>
            <span className="font-bold text-[28px] sm:text-[32px] text-[#0000004D] line-through">
              ${product.price}
            </span>

            <div className="discount px-3.5 py-1.5 bg-[#FF33331A] rounded-full">
              <span className="text-[#FF3333] text-[16px]">
                {product.discount}%
              </span>
            </div>
          </>
        )}
      </div>

      <p className="text-[#00000099] leading-[22px]">
        {product.description}
      </p>
    </div>
  );
}