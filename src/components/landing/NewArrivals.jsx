import { useEffect } from "react";
import Product from "../common/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProductsByTag } from "../../modules/shop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useDeviceType from "../../modules/core/components/useDeviceType";

export default function NewArrivals() {
  const { productsByTag, fetchProductsByTag, loading } = useProductsByTag();
  const tag = "newArrivals";
  const newArrivals = productsByTag[tag] || [];

  const device = useDeviceType()

   useEffect(() => {
    fetchProductsByTag(tag);
  }, [fetchProductsByTag, tag]);
  
  return (
    <div className="w-full flex justify-center">
      <div className="container pt-[72px] pb-16 border-b border-[#0000001A]">
        <h3 className="integral-font text-center font-bold text-[32px] md:text-5xl leading-[100%] tracking-normal">New Arrivals</h3>

        {/* Mobile */}
        {device == "mobile" ? (
          <Swiper spaceBetween={15} slidesPerView={1.3} grabCursor={true} className="mt-[55px]">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <SwiperSlide key={i}>
                      <Skeleton height={295} borderRadius={20} />
                      <div className="mt-3">
                        <Skeleton width={`60%`} height={20} />
                        <Skeleton width={`40%`} height={20} />
                      </div>
                    </SwiperSlide>
                  ))
              : newArrivals.map((product, i) => (
                  <SwiperSlide key={i}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
          </Swiper>
        ) : (
          // Tablet && Lg Screens
          <div className="products grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-[55px]">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="product">
                      <Skeleton height={295} borderRadius={20} />
                      <div className="mt-3">
                        <Skeleton width={`60%`} height={20} />
                        <Skeleton width={`40%`} height={20} />
                      </div>
                    </div>
                  ))
              : newArrivals.map((product, i) => <Product key={i} product={product} />)}
          </div>
        )}

        <div className="btn-div w-full flex justify-center mt-9">
          <button className=" w-full md:w-auto rounded-full py-[15px] px-20 border border-[#0000001A] text-[#000000] cursor-pointer hover:scale-105 transition-transform duration-300">View All</button>
        </div>
      </div>
    </div>
  );
}
