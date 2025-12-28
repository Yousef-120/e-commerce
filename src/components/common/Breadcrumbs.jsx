import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOneProduct } from "../../modules/shop";

export default function Breadcrumbs() {
  const location = useLocation();

  const [segments, setSegments] = useState([]);
  const { product, fetchOneProduct } = useOneProduct();
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const productIndex = pathSegments.indexOf("product");

    if (productIndex !== -1 && pathSegments[productIndex + 1]) {
      const productId = pathSegments[productIndex + 1];
      fetchOneProduct(productId);
      
      setSegments(pathSegments.slice(0, productIndex));
    } else {
      setSegments(pathSegments);
    }
  }, [location.pathname]);

  // حدث productName لما product يتغير
  useEffect(() => {
    if (product?.title) {
      setProductName(product.title);
    }
  }, [product]);

  return (
    <div className="breadcrumb text-sm text-gray-500 mb-9 flex justify-center">
      <div className="container flex items-center gap-2">

        {/* Home */}
        <Link to="/" className="hover:text-black transition">
          Home
        </Link>

        {/* لو جاي من Home → Category */}
        {from === "home" && product?.category && (
          <>
            <span className="mx-2">{">"}</span>
            <Link
              to={`/category/${product.category}`}
              className="hover:text-black transition"
            >
              {product.category}
            </Link>
          </>
        )}

        {/* لو جاي من Shop / Cart */}
        {from !== "home" &&
          segments.map((segment, index) => (
            <span key={index} className="flex items-center">
              <span className="mx-2">{">"}</span>
              <Link to={`/${segment}`} className="hover:text-black transition">
                {segment.replace(/-/g, " ")}
              </Link>
            </span>
          ))}

        {/* اسم المنتج (دايمًا يظهر آخر واحد) */}
        {productName && (
          <>
            <span className="mx-2">{">"}</span>
            <span className="font-medium text-black">{productName}</span>
          </>
        )}

      </div>
    </div>
  );
}
