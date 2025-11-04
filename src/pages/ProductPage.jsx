import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductPageCom/ProductDetails";
import ProductTabs from "../components/ProductPageCom/ProductTabs";
import Breadcrumbs from "../components/Breadcrumbs";
import RandomProducts from "../components/ProductPageCom/RandomProducts";
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
