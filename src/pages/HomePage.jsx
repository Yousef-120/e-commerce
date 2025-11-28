import Hero from "../components/landing/Hero";
import Sponsors from "../components/landing/Sponsors";
import NewArrivals from "../components/landing/NewArrivals";
import TopSelling from "../components/landing/TopSelling";
import DressStyle from "../components/landing/DressStyle";
import HappyCustomers from "../components/landing/HappyCustomers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <HappyCustomers />
    </>
  );
}
