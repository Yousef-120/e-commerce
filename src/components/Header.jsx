import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoSearch } from "react-icons/io5";
import { navLinks } from "../modules/core";
import { useStore } from "../modules/shop/store/useStore";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getNumberOfProductsInCart } from "../modules/shop";
import { useUserStore } from "../modules/shop/store/useUserStore";
import { cartStore } from "../modules/shop/store/cartStore";
import ProfileMenu from "./ui/ProfileMenu";

export default function Header() {
  const location = useLocation();
  const { setMenuActive } = useStore();
  const { user, token } = useUserStore();
  const cartLength = cartStore((state) => state.cartLength);

  return (
    <div className="w-full flex justify-center py-6">
      <Sidebar />
      <div className="container">
        <div className="content flex justify-between items-center">
          <div className="flex gap-4 lg:gap-10 items-center">
            <button
              onClick={() => setMenuActive(true)}
              className="flex justify-center items-center lg:hidden"
            >
              <IoMenu size={38} />
            </button>
            <div className="header-brand">
              <Link
                to="/"
                className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold leading-none"
              >
                SHOP.CO
              </Link>
            </div>
            <nav>
              <ul className="hidden lg:flex gap-3">
                {navLinks.map(
                  (link, i) =>
                    link.linkName !== "Home" && (
                      <li key={i}>
                        <Link
                          state={{
                            breadcrumbs: [
                              { label: "Home", path: "/" },
                              { label: link.linkName, path: link.linkUrl },
                            ],
                          }}
                          to={link.linkUrl}
                        >
                          {link.linkName}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            </nav>
          </div>
          <div className="md:w-3/5 lg:w-[45%] flex gap-10 items-center">
            <input
              className="w-full outline-0 py-3 px-4 rounded-full bg-[#F0F0F0] hidden md:block"
              type="search"
              name=""
              id=""
              placeholder="Search for products..."
            />
            <div className="actions flex gap-3.5">
              <Link to="/" className="block md:hidden">
                <IoSearch className="w-6 h-6" />
              </Link>
              <Link
                state={{
                  breadcrumbs: [
                    { label: "Home", path: "/" },
                    { label: "Cart", path: "/cart" },
                  ],
                }}
                to="/cart"
              >
                <div className="relative">
                  <FiShoppingCart className="w-6 h-6" />

                  {cartLength !== null && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 text-xs rounded-full bg-red-500 text-white">
                      {cartLength}
                    </span>
                  )}
                </div>{" "}
              </Link>
              <ProfileMenu />
            </div>
          </div>
        </div>
        {location.pathname != "/" && (
          <div className="line bg-[#0000001A] h-px w-full mt-6"></div>
        )}
      </div>
    </div>
  );
}
