import Hero from "../components/Hero";
import Sponsors from "../components/Sponsors";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";
import DressStyle from "../components/DressStyle";
import HappyCustomers from "../components/HappyCustomers";

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
