import { useEffect } from "react";
import Product from "./Product";
import { useProductsByTag } from "../../modules/shop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useDeviceType from "../../modules/core/components/useDeviceType";
import { Link, useLocation } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductList({ tag }) {
  const { productsByTag, fetchProductsByTag, loading } = useProductsByTag();
  const location = useLocation();
  const device = useDeviceType();

  const toCamelCase = (str) => str.replace(/[-_ ]+./g, (m) => m.at(-1).toUpperCase()).replace(/^./, (m) => m.toLowerCase());

  const formatHeading = (str) => {
    if (str.includes(" ")) return str;

    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };

  const headingName = tag?.heading || formatHeading(tag?.name || "");
  const direction = tag?.path || `/${toCamelCase(tag?.name || "")}`;

  const isInPage = location.pathname === direction;

  const productList = productsByTag[tag?.name] || [];
  const products = isInPage ? productList : productList.slice(0, 4);

  useEffect(() => {
    if (!tag?.name) return;
    fetchProductsByTag(tag.name);
  }, [tag?.name, fetchProductsByTag]);

  return (
    <div className="w-full flex justify-center">
      <div className={`container ${!isInPage && "pt-[72px] border-b border-[#0000001A]"} pb-16`}>
        <h3 className="integral-font text-center font-bold text-[32px] md:text-5xl">{headingName}</h3>

        {/* Mobile */}
        {!isInPage && device === "mobile" ? (
          <Swiper spaceBetween={15} slidesPerView={1.3} grabCursor className="mt-[55px]">
            {(loading ? Array(4).fill(null) : products).map((item, i) => (
              <SwiperSlide key={i}>
                {loading ? (
                  <ProductSkeleton key={i}/>
                ) : (
                  <Product
                    key={i}
                    product={item}
                    breadcrumbs={[
                      { label: "Home", path: "/" },
                      { label: tag.name, path: `${tag.path}}` },
                    ]}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={`grid lg:grid-cols-4 ${isInPage ? "grid-cols-2" : "md:grid-cols-2"} gap-x-5 gap-y-7 mt-[55px]`}>
            {(loading ? Array(4).fill(null) : products).map((item, i) =>
              loading ? (
                <ProductSkeleton key={i}/>
              ) : (
                <Product
                  key={i}
                  product={item}
                  breadcrumbs={[
                    { label: "Home", path: "/" },
                    { label: tag.name, path: tag.path },
                  ]}
                />
              )
            )}
          </div>
        )}

        {!isInPage && (
          <div className="flex justify-center mt-9">
            <Link
              to={direction}
              state={{
                breadcrumbs: [
                  { label: "Home", path: "/" },
                  { label: headingName, path: tag?.path },
                ],
              }}
              className="rounded-full py-[15px] px-20 border border-[#0000001A] hover:scale-105 transition"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
