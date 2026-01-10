import { useEffect, useRef, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Product from "../common/Product";
import { useAllProducts } from "../../modules/shop";
import { useStore } from "../../modules/shop/store/useStore";
import useDeviceType from "../../modules/core/components/useDeviceType";
import Line from "../ui/Line";
import Pagination from "./Pagination";
import ProductSkeleton from "../common/ProductSkeleton";

export default function Products() {
  const { setFilterActive } = useStore();
  const { applyingFilters } = useStore();
  const { products, loading, fetchProducts } = useAllProducts();
  const device = useDeviceType();
  const [tagsOpened, setTagsOpened] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTagsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full lg:w-[75%]">
      <div className={`flex justify-between items-center mb-4 ${applyingFilters && "hidden"}`}>
        <div className={`flex items-center gap-2 justify-baseline lg:justify-between w-full`}>
          <span className="text-2xl lg:text-[32px] font-bold text-[#000000] leading-[100%]">Casual</span>
          <div className="info flex items-center gap-3">
            <span className="text-[14px] text-[#00000099]">Showing 1-10 of 100 Products</span>
            {device == "desktop" && (
              <div className="flex items-center gap-1">
                <span className="text-[14px] text-[#00000099]">Sort By:</span>
                <div ref={dropdownRef} className="relative">
                  <button className="flex gap-1 items-center font-medium " onClick={() => setTagsOpened(!tagsOpened)}>
                    <span>Most Popular</span>
                    {tagsOpened ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                  </button>

                  <div
                    className={`absolute left-0 mt-2 w-36 bg-white shadow-xl rounded-lg z-20 transition-all duration-200 origin-top ${
                      tagsOpened ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
                  >
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">Most Popular</button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">Highest Rated</button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">Newest</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {device != "desktop" && (
          <button onClick={() => setFilterActive(true)} className="rounded-full p-3 bg-[#F0F0F0]">
            <FiSliders size={20} />
          </button>
        )}
      </div>

      <div>
        <div className="content grid grid-cols-2 lg:grid-cols-3 gap-x-3.5 gap-y-6 lg:gap-x-5 lg:gap-y-9">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i}/>
              ))
            : products &&
              products.map((product, i) => (
                <Product
                  variant="shop"
                  key={i}
                  product={product}
                  breadcrumbs={[
                    { label: "Home", path: "/" },
                    { label: "Shop", path: `/shop` },
                  ]}
                />
              ))}
        </div>
        <Line className={"mt-8 mb-5"} />

        <Pagination />
      </div>
    </div>
  );
}
