import Filters from "../components/ShopPageCom/Filters";
import BreadCrumbs from "../components/Breadcrumbs";
import Products from "../components/ShopPageCom/Products";

export default function ShopPage() {
  return (
    <div className="flex justify-center">
      <div className="container">
        <BreadCrumbs />

        <div className="content flex gap-5 justify-between">
          <Filters />
          <Products />
        </div>
      </div>
    </div>
  );
}
