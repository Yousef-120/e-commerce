import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { tags } from "../../modules/core";
import { useOneProduct } from "../../modules/shop";

export default function Breadcrumbs() {
  const location = useLocation();
  const { id } = useParams();
  const [alternatePath, setAlternatePath] = useState([]);
  const breadcrumbs = location.state?.breadcrumbs || alternatePath;

  const { product, fetchOneProduct } = useOneProduct();

  const fixedPath = { label: "Home", path: "/" };

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/shop/product") && id) {
      fetchOneProduct(id);
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (!product) return;

    setAlternatePath([fixedPath, { label: "Shop", path: "/shop" }, { label: product.name, path: location.pathname }]);
  }, [product]);

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/shop") && !path.includes("/shop/product")) {
      setAlternatePath([fixedPath, { label: "Shop", path: "/shop" }]);
      return;
    }

    if (path.includes("/brands")) {
      setAlternatePath([fixedPath, { label: "Brands", path: "/brands" }]);
      return;
    }

    const tag = tags.find((tag) => path.includes(tag.path));
    if (tag) {
      setAlternatePath([fixedPath, { label: tag.name, path: tag.path }]);
    }
  }, [location.pathname]);

  return (
    <nav className="flex justify-center mb-6">
      <div className="container flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isHome = crumb.label === "Home";

          return (
            <span key={index} className="flex items-center gap-2">
              {isLast && !isHome ? (
                <span className="text-black font-medium">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} state={{ breadcrumbs: breadcrumbs.slice(0, index + 1) }} className="hover:opacity-80 text-[16px]">
                  {crumb.label}
                </Link>
              )}

              {!isLast && <span>{">"}</span>}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
