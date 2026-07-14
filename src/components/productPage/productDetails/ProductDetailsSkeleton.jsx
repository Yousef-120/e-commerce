import Skeleton from "react-loading-skeleton";
import Line from "../../ui/Line";

export default function ProductDetailsSkeleton() {
  return (
    <>
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

      <div className="w-full lg:w-1/2">
        <Skeleton height={40} width="70%" className="mb-3.5" />
        <Skeleton height={20} width="40%" className="mb-3.5" />
        <Skeleton height={30} width="50%" className="mb-4" />
        <Skeleton count={4} height={18} />
        <Line />
        <Skeleton height={40} width="50%" className="mb-3" />
        <Skeleton height={40} />
      </div>
    </>
  );
}
