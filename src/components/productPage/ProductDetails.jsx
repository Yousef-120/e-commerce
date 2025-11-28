import productImg from "../../assets/product.png";
import { IoStar } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { domain } from "../../modules/core";
import Line from "../ui/Line"
import QtySelector from "../common/QtySelector";
import { useStore } from "../../modules/shop/store/useStore";

export default function ProductDetails({ product, loading }) {
  const [mainImg, setMainImg] = useState();
  const stars = 5;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setselectedSize] = useState("");
  const isLoading = loading || !product;
  const { addToCart } = useStore();
  useEffect(() => {
    product && setMainImg(domain + product.mainImg.url);
  }, [product]);

  return (
    <div className="w-full flex justify-center mb-[118px]">
      <div className="container flex flex-col lg:flex-row gap-10 lg:items-stretch">
        {isLoading ? (
          // ================== ⏳ SKELETON MODE ==================
          <>
            {/* Skeleton Images */}
            <div className="product-images w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-3.5 max-h-[570px]">
              <div className="sub-images flex lg:flex-col flex-row gap-3 lg:gap-3.5 w-full lg:w-[20%]">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} height={168} width="100%" borderRadius={20} />
                ))}
              </div>
              <div className="main-img w-full lg:w-[80%]">
                <Skeleton height={570} borderRadius={20} />
              </div>
            </div>

            {/* Skeleton Product Details */}
            <div className="product-details w-full lg:w-1/2">
              <Skeleton height={40} width="70%" className="mb-3.5" />
              <Skeleton height={20} width="40%" className="mb-3.5" />
              <Skeleton height={30} width="50%" className="mb-4" />
              <Skeleton count={4} height={18} width="100%" />
              <Line />
              <Skeleton height={40} width="50%" className="mb-3" />
              <Skeleton height={40} width="100%" />
            </div>
          </>
        ) : (
          <>
            {/* Product Images*/}
            <div className={`product-images w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-3.5 max-h-[570px]`}>
              {product.imgs && (
                <div className="sub-images flex lg:flex-col flex-row gap-3 lg:gap-3.5 w-full lg:w-[20%]">
                  {product.imgs.slice(0, 3).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImg(domain + img.url)}
                      className="w-full aspect-square lg:aspect-auto lg:h-[168px] overflow-hidden rounded-[20px] border-[#000000] focus:border"
                    >
                      <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src={domain + img.url} alt={`Product sub image ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              <button className={`main-img w-full ${product.imgs && "lg:w-[80%]"} overflow-hidden rounded-[20px] aspect-square border-[#000000] ${product.imgs && "focus:border"}`}>
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src={mainImg || productImg} alt="Main Product" />
              </button>
            </div>

            {/* Product Details */}
            <div className="product-details w-full lg:w-1/2 flex lg:block flex-col justify-between">
              <div className="info text-[#000000]">
                <h1 className="font-bold integral-font text-[32px] sm:text-[40px] leading-[100%] tracking-normal mb-3.5">{product.name}</h1>

                <div className="stars flex gap-2 mb-3.5">
                  {[...Array(stars)].map((_, i) => (
                    <IoStar key={i} color="#FFC633" size={20} />
                  ))}
                </div>

                <div className="pricing flex flex-wrap gap-3 items-center mb-5">
                  <span className="current-price font-bold text-[28px] sm:text-[32px] text-[#000000]">${product.price}</span>
                  <span className="original-price font-bold text-[28px] sm:text-[32px] text-[#0000004D]">${product.originalPrice}</span>
                  <div className="discount px-3.5 py-1.5 bg-[#FF33331A] rounded-full">
                    <span className="text-[#FF3333] text-[16px] leading-[100%] tracking-normal">{product.discount}%</span>
                  </div>
                </div>

                <p className="text-[#00000099] leading-[22px] tracking-normal">{product.description}</p>
              </div>

              {/* Actions */}
              <div className="actions">
                <Line />

                {/* Colors */}
                <div className="colors flex flex-col gap-4">
                  <span className="text-[#00000099]">Select Color</span>
                  <div className="flex gap-4 flex-wrap">
                    {product.colors.map((color, index) => (
                      <div key={index} onClick={() => setSelectedColor(color.color)} className="w-[37px] h-[37px] rounded-full cursor-pointer relative" style={{ backgroundColor: color.color }}>
                        {selectedColor === color.color && <MdCheck size={22} className="absolute inset-0 m-auto w-5 h-5 text-white" />}
                      </div>
                    ))}
                  </div>
                </div>

                <Line />

                {/* Sizes */}
                <div className="sizing flex flex-col gap-4">
                  <span className="text-[#00000099]">Select Size</span>
                  <div className="sizes flex flex-wrap gap-3">
                    {product.sizes.map((size, i) => (
                      <button
                        onClick={() => setselectedSize(size.name)}
                        key={i}
                        className={`py-3 px-6 rounded-full cursor-pointer transition ${
                          selectedSize === size.name ? "bg-black text-white" : "bg-[#F0F0F0] text-[#00000099] transition-colors duration-200"
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

               
                    <Line />
                {/* Order */}
                <div className="order flex flex-col sm:flex-row gap-5">
                  <QtySelector />
                  <button onClick={()=> addToCart(product)} className="add-to-cart w-full py-4 px-12 bg-[#000000] rounded-full text-[#FFFFFF] font-medium cursor-pointer hover:bg-[#1f1f1f] transition">Add To Cart</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
