import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return (
    <div>
      <Skeleton height={200} borderRadius={20} />
      <Skeleton width="80%" className="mt-3" />
      <Skeleton width="60%" />
      <Skeleton width="40%" />
    </div>
  );
}
