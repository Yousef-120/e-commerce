import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductPage/ProductDetails";
import ProductTabs from "../components/ProductPage/ProductTabs";
import Breadcrumbs from "../components/common/Breadcrumbs";
import RandomProducts from "../components/ProductPage/RandomProducts";
import { useOneProduct } from "../modules/shop";
import { useEffect } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const { product, fetchOneProduct, loading } = useOneProduct();

  useEffect(() => {
    fetchOneProduct(id);
  }, [id]);

  useEffect(() => {
    console.log(product);
  }, [product]);
  
  return (
    <>
      <Breadcrumbs />
      <ProductDetails product={product} loading={loading}/>
      <ProductTabs product={product} />
      <RandomProducts />
    </>
  );
}
