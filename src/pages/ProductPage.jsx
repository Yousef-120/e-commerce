import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ProductTabs from "../components/ProductPageCom/ProductTabs";
import Breadcrumbs from "../components/Breadcrumbs";
import RandomProducts from "../components/ProductPageCom/RandomProducts";

export default function ProductPage() {
  const { id } = useParams();

  return <>
    <Breadcrumbs/>
    <ProductDetails productId={id}/>
    <ProductTabs productId={id}/>
    <RandomProducts />
  </>;
}
