import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoSearch } from "react-icons/io5";
import { navLinks } from "../modules/core";
import { useStore } from "../modules/shop/store/useStore";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { getNumberOfProductsInCart, searchProducts } from "../modules/shop";
import { useUserStore } from "../modules/shop/store/useUserStore";
import { cartStore } from "../modules/shop/store/cartStore";
import ProfileMenu from "./ui/ProfileMenu";
import SearchInput from "./ui/SearchInput";
import { domain } from "../modules/core";

export default function Header() {
  const location = useLocation();
  const { setMenuActive } = useStore();
  const { user, token } = useUserStore();
  const cartLength = cartStore((state) => state.cartLength);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleSearchProduct = async (search) => {
    setLoadingSearch(true);
    const productFromSearch = await searchProducts({ token, search });
    setProducts(productFromSearch);
    setLoadingSearch(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search.trim()) {
        setProducts([]);
        return;
      }

      handleSearchProduct(search);
    }, 150);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    console.log(search);
    console.log(products);
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div className="relative w-full" ref={searchRef}>
              <SearchInput
                search={search}
                setSearch={setSearch}
                setShowDropdown={setShowDropdown}
              />

              {showDropdown && loadingSearch && products.length === 0 ? (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border p-4 text-center">
                  Searching...
                </div>
              ) : showDropdown && search.trim() !== "" && products.length > 0 ? (
                <div className="absolute top-full mt-2 left-0 w-full no-scrollbar max-h-80 overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                  {products.map((product) => (
                    <Link
                      key={product.documentId}
                      onClick={() => {
                        setSearch("");
                        setProducts([]);
                        setShowDropdown(false);
                      }}
                      to={`/shop/product/${product.documentId}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                    >
                      <img
                        src={domain + product.mainImg?.url}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                      />

                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : showDropdown && search.trim() !== "" ? (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border p-4 text-center text-gray-500 z-50">
                  No products found.
                </div>
              ) : null}
            </div>{" "}
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
