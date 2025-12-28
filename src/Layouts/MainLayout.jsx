import { Outlet, useLocation } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import Breadcrumbs from "../components/common/Breadcrumbs";

export default function MainLayout() {
  const breadcrumbsPaths = [ 'product' , 'cart' , 'shop' , 'newArrivals' , 'topSelling' ]
  const location = useLocation()

  return (
    <div className="bg-[#FFFFFF] w-full">
      <TopBanner />
      <Header />
      {breadcrumbsPaths.map((path , i)=> location.pathname.includes(path) && <Breadcrumbs key={i}/>)}
      <Outlet />
      <Footer />
    </div>
  );
}
