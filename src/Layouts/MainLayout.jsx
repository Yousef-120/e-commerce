import { Outlet } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <div className="bg-[#FFFFFF] w-full">
      <TopBanner />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
