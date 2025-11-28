import { FiSliders } from "react-icons/fi";
import Line from "../ui/Line";
import { IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import PriceSlider from "./PriceSlider";
import { colors, categories, styles } from "../../modules/core/constants/constants";
import { useState, useEffect } from "react";
import { MdCheck } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import useIsMobile from "../../modules/core/components/useIsMobile";
import { useStore } from "../../modules/shop/store/useStore";
import { useAllSizes } from "../../modules/shop";

export default function Filters() {
  const { selectedColor, setSelectedColor } = useStore();
  const { selectedSize, setSelectedSize } = useStore();
  const { filterActive, setFilterActive } = useStore();
  const { selectedFilterOptions, setSelectedFilterOptions } = useStore();
  const { applyingFilters, setApplyingFilters } = useStore();
  const [btnDisabled, setBtnDisabled] = useState();
  const { sizes, fetchSizes } = useAllSizes();

  const [openPrice, setOpenPrice] = useState(true);
  const [openColors, setOpenColors] = useState(true);
  const [openSizes, setOpenSizes] = useState(true);
  const [openStyles, setOpenStyles] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchSizes();
  }, []);

  useEffect(() => {
    if (filterActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [filterActive]);

  const selectColor = (color) => {
    if (applyingFilters) return; // منع التغيير أثناء التطبيق
    selectedColor === color ? setSelectedColor("") : setSelectedColor(color);
  };

  const selectSize = (id) => {
    if (applyingFilters) return;
    selectedSize === id ? setSelectedSize(null) : setSelectedSize(id);
  };

  const applyFilter = () => {
    if (applyingFilters) return;
    setApplyingFilters(true);
    setSelectedFilterOptions({ color: selectedColor, size: selectedSize });
    setFilterActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setBtnDisabled(true);
    }, 500);
  };

  const buttonProps = {
    disabled: btnDisabled,
    style: { cursor: applyingFilters ? "not-allowed" : "pointer" },
    className: `p-4 bg-[#000000] rounded-full text-white font-medium w-full active:bg-[#000000e5] transition-color duration-75 ${applyingFilters ? "opacity-50" : ""}`,
  };

  return (
    <div
      className={`w-full lg:w-[22%] bg-[#ffffff] lg:bg-transparent h-[84vh] lg:h-fit overflow-y-scroll lg:overflow-y-auto border border-[#0000001A] pt-5 pb-7 px-6 rounded-[20px] fixed lg:static bottom-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        filterActive ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      } lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto`}
    >
      {/* Header */}
      <div className="head flex justify-between items-center">
        <span className="font-bold text-[20px] leading-[100%] text-[#000000]">Filters</span>
        {isMobile ? (
          <button onClick={() => setFilterActive(false)}>
            <IoClose color="#00000066" size={28} />
          </button>
        ) : (
          <button>
            <FiSliders color="#00000066" size={20} />
          </button>
        )}
      </div>

      <Line />

      {/* Categories */}
      <div className="categories flex flex-col gap-5">
        {categories.map((category, i) => (
          <Link key={i} to={category.url} className="category flex justify-between items-center text-[#00000099]">
            <span className="capitalize">{category.name}</span>
            <IoIosArrowForward />
          </Link>
        ))}
      </div>

      <Line />

      {/* Price */}
      <div className="price">
        <div className="head flex justify-between items-center text-[#000000] mb-5 cursor-pointer" onClick={() => setOpenPrice(!openPrice)}>
          <span className="font-bold text-[20px]">Price</span>
          {openPrice ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
        <div className={`px-3 transition-all duration-300 ease-in-out ${openPrice ? "max-h-[500px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <PriceSlider />
        </div>
      </div>

      <Line />

      {/* Colors */}
      <div className="colors">
        <div className="head flex justify-between items-center text-[#000000] mb-5 cursor-pointer" onClick={() => setOpenColors(!openColors)}>
          <span className="font-bold text-[20px]">Colors</span>
          {openColors ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
        <div className={`colors flex flex-wrap gap-4 transition-all duration-300 ease-in-out  ${openColors ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => selectColor(color)}
              disabled={applyingFilters}
              style={{ backgroundColor: color, cursor: applyingFilters ? "not-allowed" : "pointer" }}
              className={`relative border-[#00000033] ${selectedColor === color ? "border-[3px] scale-[1.05]" : "border"} w-9 h-9 rounded-full transition-all duration-75`}
            >
              {selectedColor === color && <MdCheck size={22} className="absolute inset-0 m-auto text-white" />}
            </button>
          ))}
        </div>
      </div>

      <Line />

      {/* Sizes */}
      <div className="sizes">
        <div className="head flex justify-between items-center text-[#000000] mb-5 cursor-pointer" onClick={() => setOpenSizes(!openSizes)}>
          <span className="font-bold text-[20px]">Sizes</span>
          {openSizes ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
        <div className={`sizes flex gap-2 flex-wrap transition-all duration-300 ease-in-out overflow-hidden ${openSizes ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          {sizes?.map((size) => (
            <button
              key={size.documentId}
              onClick={() => selectSize(size.documentId)}
              disabled={applyingFilters}
              style={{ cursor: applyingFilters ? "not-allowed" : "pointer" }}
              className={`${selectedSize === size.documentId ? "bg-[#000000] text-white" : "bg-[#F0F0F0] text-[#00000099]"} py-2.5 px-5 rounded-full text-[14px] transition-all duration-200`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <Line />

      {/* Styles */}
      <div className="styles mb-6">
        <div className="head flex justify-between items-center text-[#000000] mb-5 cursor-pointer" onClick={() => setOpenStyles(!openStyles)}>
          <span className="font-bold text-[20px]">Dress Style</span>
          {openStyles ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
        <div className={`styles flex flex-col gap-5 transition-all duration-300 ease-in-out overflow-hidden ${openStyles ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          {styles.map((style, i) => (
            <Link key={i} to={style.url} className="style flex justify-between items-center text-[#00000099]">
              <span className="capitalize">{style.name}</span>
              <IoIosArrowForward />
            </Link>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button {...buttonProps} onClick={applyFilter}>
        {applyingFilters ? "Applying Filters..." : "Apply Filter"}
      </button>
    </div>
  );
}
