import Hero from "../components/landing/Hero";
import Brands from "../components/landing/Brands";
import ProductList from "../components/common/ProductList";
import DressStyle from "../components/landing/DressStyle";
import HappyCustomers from "../components/landing/HappyCustomers";
import { tags } from "../modules/core";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      {tags.map((tag) => tag.onHome && <ProductList key={tag.id} tag={tag} />)}
      <DressStyle />
      <HappyCustomers />
    </>
  );
}
