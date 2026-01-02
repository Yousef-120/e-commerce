import { useEffect } from "react";
import Product from ".././common/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAllProducts } from "../../modules/shop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useDeviceType from "../../modules/core/components/useDeviceType";

export default function RandomProducts() {
  const { products, fetchProducts, loading } = useAllProducts();
  const secName = "You might also like";
  const productsFiltered = products.slice(0,4) || [];

  const device = useDeviceType()

   useEffect(() => {
    fetchProducts();
  }, [fetchProducts, secName]);
  
  return (
    <div className="w-full flex justify-center">
      <div className="container mt-16 mb-24">
        <h3 className="integral-font text-center font-bold text-[32px] md:text-5xl leading-[100%] tracking-normal capitalize lg:uppercase">{secName}</h3>

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
              : productsFiltered.map((product, i) => (
                  <SwiperSlide key={i}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
          </Swiper>
        ) : (
          // Tablet && Lg Screens
          <div className="products grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-[55px]">
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
              : productsFiltered.map((product, i) => <Product key={i} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
