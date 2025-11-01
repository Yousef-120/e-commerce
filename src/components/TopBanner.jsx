import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function TopBanner() {
  const [bannerActive, setBannerActive] = useState(true);

  useEffect(() => {
    setBannerActive(true);
  }, []);
  return (
    <div
      className={`w-full bg-[#000000] text-white flex justify-center items-center overflow-hidden transition-all duration-500 ease-in-out`}
      style={{
        height: bannerActive ? "45px" : "0px",
        opacity: bannerActive ? 1 : 0,
      }}
    >
      <div className="container flex justify-center items-center py-2 md:py-2.5 md:justify-between">
        <p className="hidden md:block"></p>
        <p className="text-[14px] text-center md:text-start md:text-[16px]">
          Sign up and get 20% off to your first order.{" "}
          <Link className="font-medium underline" to="/">
            Sign Up Now
          </Link>
        </p>
        <button onClick={() => setBannerActive(false)} className="cursor-pointer hidden md:block ">
          <IoClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
