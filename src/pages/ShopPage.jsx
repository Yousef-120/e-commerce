import { useEffect } from "react";
import Filters from "../components/shopPage/Filters";
import Products from "../components/ShopPage/products";
import Loader from "../components/ui/Loader";
import { useStore } from "../modules/shop/store/useStore";
import { useLocation } from "react-router-dom";

export default function ShopPage() {
  const { applyingFilters , setApplyingFilters } = useStore();
  const location = useLocation()

  useEffect(()=>{
    setApplyingFilters(false)
  },[location.pathname])
  
  return (
    <div className="flex justify-center mb-40 min-h-[50vh] items-center">
      <div className="container h-full">
        {applyingFilters ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="content flex gap-5 justify-between">
            <Filters />
            <Products />
          </div>
        )}
      </div>
    </div>
  );
}
