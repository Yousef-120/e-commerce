import { useParams } from "react-router-dom";
import ProductDetails from "../components/productPage/ProductDetails";
import ProductTabs from "../components/productPage/ProductTabs";
import RandomProducts from "../components/productPage/RandomProducts";
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
    <div>
      <ProductDetails product={product} loading={loading}/>
      <ProductTabs product={product} />
      <RandomProducts />
    </div>
  );
}
