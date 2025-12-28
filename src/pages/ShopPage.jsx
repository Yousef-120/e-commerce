import Filters from "../components/ShopPage/Filters";
import BreadCrumbs from "../components/common/Breadcrumbs";
import Products from "../components/ShopPage/products";

export default function ShopPage() {
  return (
    <div className="flex justify-center mb-40">
      <div className="container">
        <div className="content flex gap-5 justify-between">
          <Filters />
          <Products />
        </div>
      </div>
    </div>
  );
}
