import { useEffect, useState } from "react";
import { domain } from "../../../modules/core";

export default function ProductGallery({ product }) {
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    setMainImg(null);
  }, [product?.documentId]);

  return (
    <div className="product-images w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-3.5 max-h-[570px]">
      {product.imgs && (
        <div className="sub-images flex lg:flex-col flex-row gap-3 lg:gap-3.5 w-full lg:w-[20%]">
          {product.imgs.slice(0, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImg(domain + img.url)}
              className="w-full aspect-square lg:aspect-auto lg:h-[168px] overflow-hidden rounded-[20px] border-[#000000] focus:border"
            >
              <img
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                src={domain + img.url}
                alt={`Product ${i + 1}`}
              />
            </button>
          ))}
        </div>
      )}

      <button
        className={`main-img w-full ${
          product.imgs && "lg:w-[80%]"
        } overflow-hidden rounded-[20px] aspect-square border-[#000000]`}
      >
        <img
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
          src={mainImg || domain + product.mainImg.url}
          alt={product.name}
        />
      </button>
    </div>
  );
}
