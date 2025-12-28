import { motion } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useStore } from "../modules/shop/store/useStore";
import { navLinks } from "../modules/core";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useDeviceType from "../modules/core/components/useDeviceType";

export default function Sidebar() {
  const { menuActive, setMenuActive } = useStore();
  const location = useLocation();
  const device = useDeviceType();

  useEffect(() => {
    setMenuActive(false);
  }, [location]);

  return (
    <>
      {/* Overlay */}
      {menuActive && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} onClick={() => setMenuActive(false)} className="fixed inset-0 bg-black/5 z-40" />}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: menuActive ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="fixed left-0 top-0 h-full w-[80%] md:w-[40%] bg-white px-5 py-8 flex flex-col gap-4 z-50 border-r border-black/10 rounded-r-2xl"
      >
        {/* Top */}
        <div className="top flex justify-between gap-2">
          {/* Close button */}
          <button className="top-8 right-4 text-black hover:opacity-50 transition" onClick={() => setMenuActive(false)}>
            <IoClose size={30} />
          </button>

          {/* Search */}
          {device == "mobile" && <input className="w-full outline-0 py-3 px-4 rounded-full bg-[#F0F0F0]" type="search" name="" id="" placeholder="Search for products..." />}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 text-lg font-medium text-black mt-2">
          {navLinks.map((link, i) => (
            <Link key={i} to={link.linkUrl} className="hover:opacity-60 transition">
              {link.linkName}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex items-center justify-between">
          <Link to={"/cart"} className="flex items-center gap-2 border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition">
            <FaCartShopping size={18} /> Cart
          </Link>

          <Link to={"/profile"} className="flex items-center gap-2 border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition">
            <FaUser size={18} /> Profile
          </Link>
        </div>
      </motion.div>
    </>
  );
}
