import productImg from "../assets/product.png";
import { IoStar } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetails() {
  const stars = 5;
  const colors = [{ value: "#4F4631" }, { value: "#314F4A" }, { value: "#31344F" }];
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setselectedSize] = useState("");
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full flex justify-center mb-[118px]">
      <div className="container flex flex-col lg:flex-row gap-10 lg:items-stretch">
        {/* Product Images */}
        <div className="product-images w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-3.5  max-h-[570px]">
          <div className="sub-images flex lg:flex-col flex-row gap-3 lg:gap-3.5 w-full lg:w-[20%]">
            {[...Array(3)].map((_, i) => (
              <button key={i} className="w-full aspect-square lg:h-[168px] overflow-hidden rounded-[20px] border-[#000000] focus:border">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src={productImg} alt="" />
              </button>
            ))}
          </div>

          <button className="main-img w-full lg:w-[80%] overflow-hidden rounded-[20px] border-[#000000] focus:border">
            <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src={productImg} alt="Main Product" />
          </button>
        </div>

        {/* Product Details */}
        <div className="product-details w-full lg:w-1/2 flex lg:block flex-col justify-between">
          <div className="info text-[#000000]">
            <h1 className="font-bold integral-font text-[32px] sm:text-[40px] leading-[100%] tracking-normal mb-3.5">One Life Graphic T-shirt</h1>
            <div className="stars flex gap-2 mb-3.5">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} color="#FFC633" size={20} />
              ))}
            </div>
            <div className="pricing flex flex-wrap gap-3 items-center mb-5">
              <span className="current-price font-bold text-[28px] sm:text-[32px] text-[#000000]">$270</span>
              <span className="original-price font-bold text-[28px] sm:text-[32px] text-[#0000004D]">$300</span>
              <div className="discount px-3.5 py-1.5 bg-[#FF33331A] rounded-full">
                <span className="text-[#FF3333] text-[16px] leading-[100%] tracking-normal">-40%</span>
              </div>
            </div>
            <p className="text-[#00000099] leading-[22px] tracking-normal">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>
          </div>

          <div className="actions">
            <div className="line bg-[#0000001A] h-px w-full my-6"></div>

            {/* Colors */}
            <div className="colors flex flex-col gap-4">
              <span className="text-[#00000099]">Select Color</span>
              <div className="flex gap-4 flex-wrap">
                {colors.map((color, index) => (
                  <div key={index} onClick={() => setSelectedColor(color.value)} className="w-[37px] h-[37px] rounded-full cursor-pointer relative" style={{ backgroundColor: color.value }}>
                    {selectedColor === color.value && <MdCheck size={22} className="absolute inset-0 m-auto w-5 h-5 text-white" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="line bg-[#0000001A] h-px w-full my-6"></div>

            {/* Sizes */}
            <div className="sizing flex flex-col gap-4">
              <span className="text-[#00000099]">Select Size</span>
              <div className="sizes flex flex-wrap gap-3">
                {["Small", "Medium", "Large", "XL"].map((size, i) => (
                  <button
                    onClick={() => setselectedSize(size)}
                    key={i}
                    className={`py-3 px-6 rounded-full cursor-pointer transition ${selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0] text-[#00000099] hover:bg-black hover:text-white"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="line bg-[#0000001A] h-px w-full my-6"></div>

            {/* Order */}
            <div className="order flex flex-col sm:flex-row gap-5">
              <div className="qty-selector py-4 px-6 flex items-center justify-between sm:gap-[38px] bg-[#F0F0F0] rounded-full w-full sm:w-fit">
                <button className="cursor-pointer" onClick={() => setQty((qty) => (qty > 1 ? qty - 1 : 1))}>
                  <FiMinus size={26} />
                </button>
                <div className="qty-div w-5 flex justify-center items-center">
                  <span className="font-bold">{qty}</span>
                </div>
                <button className="cursor-pointer" onClick={() => setQty((qty) => (qty < 20 ? qty + 1 : 20))}>
                  <FiPlus size={26} />
                </button>
              </div>
              <button className="add-to-cart w-full py-4 px-12 bg-[#000000] rounded-full text-[#FFFFFF] font-medium cursor-pointer hover:bg-[#1f1f1f] transition">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
